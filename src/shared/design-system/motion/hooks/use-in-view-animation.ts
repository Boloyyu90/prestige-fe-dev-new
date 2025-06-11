import { useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import {
  motionVariants,
  staggerContainerVariants,
  type MotionVariantKey,
} from '../variants';

interface UseInViewAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

export function useInViewAnimation(
  variant: MotionVariantKey = 'fadeInUp',
  options: UseInViewAnimationOptions = {}
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

// Export to main hooks index
export { useInViewAnimation };