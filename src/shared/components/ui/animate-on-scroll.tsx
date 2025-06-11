// prestige-fe/src/shared/components/ui/animate-on-scroll.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { cn } from '@/shared/lib/utils/cn';

type AnimationType = 'fadeInUp' | 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  threshold?: number;
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeInUp: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scaleIn: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  slideInLeft: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  slideInRight: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
};

export function AnimateOnScroll({
                                  children, className, animation = 'fadeInUp', delay = 0,
                                  duration = 0.6, staggerChildren, threshold = 0.1,
                                }: AnimateOnScrollProps) {
  const { ref, inView } = useIntersectionObserver<HTMLDivElement>({ threshold, triggerOnce: true });

  const variants = {
    ...animationVariants[animation],
    visible: {
      ...animationVariants[animation].visible,
      transition: { duration, delay, ease: 'easeOut', staggerChildren },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}