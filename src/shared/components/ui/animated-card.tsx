'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardProps } from './card';
import { cn } from '@/shared/lib/utils/cn';

interface AnimatedCardProps extends CardProps {
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  children: React.ReactNode;
}

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({
     className,
     delay = 0,
     direction = 'up',
     duration = 0.6,
     children,
     ...props
   }, ref) => {
    const directions = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 },
    };

    return (
      <motion.div
        ref={ref}
        initial={{
          opacity: 0,
          ...directions[direction],
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration,
          delay,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <Card className={cn(className)} {...props}>
          {children}
        </Card>
      </motion.div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';
