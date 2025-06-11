'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/utils/cn';

interface EntranceAnimationProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'slide' | 'fade' | 'scale' | 'flip' | 'bounce' | 'fadeInUp';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const EntranceAnimation: React.FC<EntranceAnimationProps> = ({
                                                                      children,
                                                                      className,
                                                                      variant = 'fade',
                                                                      direction = 'up',
                                                                      delay = 0,
                                                                      duration = 0.6,
                                                                      once = true,
                                                                    }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: once,
  });

  const getVariants = () => {
    const baseTransition = {
      duration,
      delay,
      ease: [0.6, -0.05, 0.01, 0.99],
    };

    switch (variant) {
      case 'slide':
      case 'fadeInUp':
        const slideDistance = 50;
        const slideOffsets = {
          up: { y: slideDistance },
          down: { y: -slideDistance },
          left: { x: slideDistance },
          right: { x: -slideDistance },
        };
        return {
          hidden: {
            opacity: 0,
            ...slideOffsets[direction],
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: baseTransition,
          },
        };

      case 'scale':
        return {
          hidden: {
            opacity: 0,
            scale: 0.8,
          },
          visible: {
            opacity: 1,
            scale: 1,
            transition: baseTransition,
          },
        };

      case 'flip':
        return {
          hidden: {
            opacity: 0,
            rotateY: -90,
            transformPerspective: 1000,
          },
          visible: {
            opacity: 1,
            rotateY: 0,
            transformPerspective: 1000,
            transition: baseTransition,
          },
        };

      case 'bounce':
        return {
          hidden: {
            opacity: 0,
            scale: 0.3,
          },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              ...baseTransition,
              type: 'spring',
              damping: 10,
              stiffness: 300,
            },
          },
        };

      default: // fade
        return {
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
            transition: baseTransition,
          },
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={getVariants()}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};