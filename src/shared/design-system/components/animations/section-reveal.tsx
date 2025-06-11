'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/utils/cn';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  stagger?: boolean;
  staggerDelay?: number;
  threshold?: number;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
                                                              children,
                                                              className,
                                                              direction = 'up',
                                                              delay = 0,
                                                              duration = 0.6,
                                                              stagger = false,
                                                              staggerDelay = 0.1,
                                                              threshold = 0.1,
                                                            }) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  const getDirectionVariants = () => {
    const directions = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 },
    };

    return {
      hidden: {
        opacity: 0,
        ...directions[direction],
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.6, -0.05, 0.01, 0.99],
          ...(stagger && {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          }),
        },
      },
    };
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={getDirectionVariants()}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};
