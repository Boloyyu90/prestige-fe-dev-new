'use client';

import { useAnimation, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { motionVariants, staggerContainerVariants, transitions } from '../variants';
import { useTheme } from '../../theme/context';
import { useOptimizedAnimation } from '../../theme/motion-preferences';

// Types aligned with design system
export type MotionVariantKey = keyof typeof motionVariants;
export type ContainerVariantKey = keyof typeof staggerContainerVariants;

interface InViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

// Enhanced in-view animation with theme integration
export function useInViewAnimation(
  variant: MotionVariantKey = 'fadeInUp',
  options: InViewOptions = {}
) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    delay = 0,
    stagger = false,
    staggerDelay = 0.1,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { threshold, triggerOnce });
  const { shouldAnimate, getTransition } = useOptimizedAnimation();

  useEffect(() => {
    if (inView && shouldAnimate) {
      const timer = setTimeout(() => {
        controls.start('visible');
      }, delay * 1000);
      return () => clearTimeout(timer);
    } else if (inView && !shouldAnimate) {
      // Instant show for reduced motion
      controls.set('visible');
    }
  }, [inView, controls, delay, shouldAnimate]);

  const containerVariants = stagger
    ? {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: getTransition({
          staggerChildren: staggerDelay,
          delayChildren: delay,
        }),
      },
    }
    : motionVariants[variant];

  return {
    ref,
    controls,
    inView,
    variants: containerVariants,
    animate: controls,
    initial: 'hidden',
  };
}

// Scroll progress with theme-aware progress bar
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(scrollProgress);
      setIsScrollingDown(scrollTop > lastScrollY.current);
      lastScrollY.current = scrollTop;
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return { progress, isScrollingDown };
}

// Parallax with performance optimization
export function useParallax(strength: number = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const { shouldAnimate } = useOptimizedAnimation();

  const y = useTransform(
    scrollY,
    [0, 1000],
    shouldAnimate ? [0, -1000 * strength] : [0, 0]
  );

  return { ref, y };
}

// Magnetic with reduced motion support
export function useMagnetic(strength: number = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { shouldAnimate } = useOptimizedAnimation();

  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const element = ref.current;
    if (!element || !shouldAnimate) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      x.set(deltaX);
      y.set(deltaY);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y, strength, shouldAnimate]);

  return { ref, x, y, isHovered };
}

// Typewriter with theme integration
export function useTypewriter(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { shouldAnimate } = useOptimizedAnimation();

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, shouldAnimate]);

  return { displayText, isComplete };
}

// Counter with accessibility support
export function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { triggerOnce: true });
  const { shouldAnimate } = useOptimizedAnimation();

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);

      if (!shouldAnimate) {
        setCount(end);
        return;
      }

      const increment = (end - start) / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, end, start, duration, isVisible, shouldAnimate]);

  return { ref, count };
}

// Stagger with performance optimization
export function useStagger(delay: number = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { threshold: 0.1, triggerOnce: true });
  const { shouldAnimate, getTransition } = useOptimizedAnimation();

  useEffect(() => {
    if (inView) {
      if (shouldAnimate) {
        controls.start('visible');
      } else {
        controls.set('visible');
      }
    }
  }, [inView, controls, shouldAnimate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: getTransition({
        staggerChildren: delay,
        delayChildren: 0.1,
      }),
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: getTransition(transitions.smooth),
    },
  };

  return {
    ref,
    containerProps: {
      variants: containerVariants,
      initial: 'hidden',
      animate: controls,
    },
    itemProps: {
      variants: itemVariants,
    },
  };
}

// Reveal with direction support
export function useReveal(direction: 'up' | 'down' | 'left' | 'right' = 'up') {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { threshold: 0.1, triggerOnce: true });
  const { shouldAnimate, getTransition } = useOptimizedAnimation();

  const variants = {
    up: {
      hidden: { opacity: 0, y: shouldAnimate ? 50 : 0 },
      visible: { opacity: 1, y: 0, transition: getTransition(transitions.smooth) }
    },
    down: {
      hidden: { opacity: 0, y: shouldAnimate ? -50 : 0 },
      visible: { opacity: 1, y: 0, transition: getTransition(transitions.smooth) }
    },
    left: {
      hidden: { opacity: 0, x: shouldAnimate ? 50 : 0 },
      visible: { opacity: 1, x: 0, transition: getTransition(transitions.smooth) }
    },
    right: {
      hidden: { opacity: 0, x: shouldAnimate ? -50 : 0 },
      visible: { opacity: 1, x: 0, transition: getTransition(transitions.smooth) }
    },
  };

  useEffect(() => {
    if (inView) {
      if (shouldAnimate) {
        controls.start('visible');
      } else {
        controls.set('visible');
      }
    }
  }, [inView, controls, shouldAnimate]);

  return {
    ref,
    variants: variants[direction],
    animate: controls,
    initial: 'hidden',
  };
}

// Floating with subtle animation
export function useFloat(intensity: number = 10, duration: number = 3) {
  const { shouldAnimate } = useOptimizedAnimation();
  const y = useSpring(0, { stiffness: 100, damping: 10 });

  useEffect(() => {
    if (!shouldAnimate) return;

    const interval = setInterval(() => {
      y.set(y.get() === 0 ? -intensity : 0);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [y, intensity, duration, shouldAnimate]);

  return { y: shouldAnimate ? y : useSpring(0) };
}