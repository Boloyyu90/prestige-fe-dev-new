// src/shared/design-system/motion/hooks/index.ts
import { useAnimation, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  motionVariants,
  staggerContainerVariants,
  transitions,
  type MotionVariantKey,
  type ContainerVariantKey
} from '../variants';

// Enhanced intersection observer hook with motion controls
export function useInViewAnimation(
  variant: MotionVariantKey = 'fadeInUp',
  options: {
    threshold?: number;
    triggerOnce?: boolean;
    rootMargin?: string;
    delay?: number;
    stagger?: boolean;
    staggerDelay?: number;
  } = {}
) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px',
    delay = 0,
    stagger = false,
    staggerDelay = 0.1,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { threshold, triggerOnce, rootMargin });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        if (stagger) {
          controls.start('visible');
        } else {
          controls.start(motionVariants[variant].visible);
        }
      }, delay * 1000);

      return () => clearTimeout(timer);
    } else if (!triggerOnce) {
      controls.start(motionVariants[variant].hidden);
    }
  }, [inView, controls, variant, delay, stagger, triggerOnce]);

  const containerVariants = stagger
    ? {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delay,
        },
      },
    }
    : undefined;

  return {
    ref,
    controls,
    inView,
    variants: stagger ? containerVariants : motionVariants[variant],
    animate: controls,
    initial: 'hidden',
  };
}

// Scroll-triggered animations
export function useScrollAnimation(
  element?: React.RefObject<HTMLElement>
) {
  const ref = useRef<HTMLElement>(null);
  const targetRef = element || ref;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1)
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
      );

      setScrollProgress(progress);

      // Detect scroll direction
      const currentScroll = window.pageYOffset;
      setIsScrollingDown(currentScroll > (window as any).lastScrollY || 0);
      (window as any).lastScrollY = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);

  return {
    ref: targetRef === ref ? ref : undefined,
    scrollProgress,
    isScrollingDown,
    isInView: scrollProgress > 0 && scrollProgress < 1,
  };
}

// Parallax scroll hook
export function useParallax(strength: number = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * strength]);

  return { ref, y };
}

// Mouse tracking and magnetic effects
export function useMouseTracking(magnetStrength: number = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * magnetStrength;
      const deltaY = (e.clientY - centerY) * magnetStrength;

      x.set(deltaX);
      y.set(deltaY);

      setMousePosition({ x: e.clientX, y: e.clientY });
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
  }, [x, y, magnetStrength]);

  return {
    ref,
    x,
    y,
    mousePosition,
    isHovered,
  };
}

// Staggered children animations
export function useStaggeredAnimation(
  containerVariant: ContainerVariantKey = 'normal',
  itemVariant: MotionVariantKey = 'fadeInUp'
) {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return {
    ref,
    containerProps: {
      variants: staggerContainerVariants[containerVariant],
      initial: 'hidden',
      animate: controls,
    },
    itemProps: {
      variants: motionVariants[itemVariant],
    },
  };
}

// Loading state animations
export function useLoadingAnimation(
  isLoading: boolean,
  type: 'spin' | 'pulse' | 'bounce' | 'dots' = 'spin'
) {
  const controls = useAnimation();

  useEffect(() => {
    if (isLoading) {
      controls.start('animate');
    } else {
      controls.stop();
    }
  }, [isLoading, controls]);

  const variants = {
    spin: {
      animate: {
        rotate: 360,
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        },
      },
    },
    pulse: {
      animate: {
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    },
    bounce: {
      animate: {
        y: [0, -15, 0],
        transition: {
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    },
    dots: {
      animate: {
        opacity: [0, 1, 0],
        transition: {
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    },
  };

  return {
    variants: variants[type],
    animate: controls,
    initial: {},
  };
}

// Page transition hook
export function usePageTransition(direction: 'slide' | 'fade' | 'scale' = 'fade') {
  const [isExiting, setIsExiting] = useState(false);

  const variants = {
    slide: {
      initial: { x: 300, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -300, opacity: 0 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.2, opacity: 0 },
    },
  };

  return {
    variants: variants[direction],
    transition: transitions.smooth,
    isExiting,
    setIsExiting,
  };
}

// Gesture-based animations
export function useGestureAnimation() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  return {
    isDragging,
    dragConstraints,
    setDragConstraints,
    dragProps: {
      drag: true,
      dragConstraints,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      dragElastic: 0.1,
      dragTransition: { bounceStiffness: 300, bounceDamping: 30 },
    },
  };
}

// Scroll-triggered reveal animation
export function useRevealAnimation(threshold: number = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { threshold, triggerOnce: true });

  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    if (inView && !hasRevealed) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: [0.6, -0.05, 0.01, 0.99],
        },
      });
      setHasRevealed(true);
    }
  }, [inView, controls, hasRevealed]);

  return {
    ref,
    animate: controls,
    initial: { opacity: 0, y: 50, scale: 0.95 },
    hasRevealed,
  };
}

// Typewriter animation hook
export function useTypewriter(
  text: string,
  speed: number = 50,
  startDelay: number = 0
) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startTyping = () => {
      setIsTyping(true);
      let currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeNextChar, speed);
        } else {
          setIsTyping(false);
          setIsComplete(true);
        }
      };

      typeNextChar();
    };

    timeoutId = setTimeout(startTyping, startDelay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, speed, startDelay]);

  const reset = () => {
    setDisplayText('');
    setIsTyping(false);
    setIsComplete(false);
  };

  return {
    displayText,
    isTyping,
    isComplete,
    reset,
  };
}

// Performance optimized animation hook
export function useOptimizedAnimation() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getTransition = (normal: any, reduced: any = { duration: 0 }) => {
    return shouldReduceMotion ? reduced : normal;
  };

  const getVariants = (normal: any, reduced: any = { hidden: {}, visible: {} }) => {
    return shouldReduceMotion ? reduced : normal;
  };

  return {
    shouldReduceMotion,
    getTransition,
    getVariants,
    respectsMotionPreference: true,
  };
}

// Export commonly used scroll hook
import { useScroll } from 'framer-motion';
export { useScroll };

// Utility hook for combining multiple motion hooks
export function useCombinedMotion(
  options: {
    inView?: Parameters<typeof useInViewAnimation>[1];
    scroll?: boolean;
    mouse?: { enabled: boolean; strength?: number };
    gesture?: boolean;
  } = {}
) {
  const inViewHook = useInViewAnimation('fadeInUp', options.inView);
  const scrollHook = options.scroll ? useScrollAnimation() : null;
  const mouseHook = options.mouse?.enabled ? useMouseTracking(options.mouse.strength) : null;
  const gestureHook = options.gesture ? useGestureAnimation() : null;

  return {
    inView: inViewHook,
    scroll: scrollHook,
    mouse: mouseHook,
    gesture: gestureHook,
  };
}