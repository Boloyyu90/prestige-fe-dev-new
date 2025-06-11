import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
                                                       children,
                                                       className,
                                                       direction = 'up',
                                                       delay = 0,
                                                       duration = 0.6,
                                                       stagger = false,
                                                       staggerDelay = 0.1,
                                                     }) => {
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
      className={cn(className)}
      variants={getDirectionVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
