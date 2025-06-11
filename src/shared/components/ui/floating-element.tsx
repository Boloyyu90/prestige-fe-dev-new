import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'normal' | 'strong';
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'vertical' | 'horizontal' | 'diagonal';
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
                                                           children,
                                                           className,
                                                           intensity = 'normal',
                                                           speed = 'normal',
                                                           direction = 'vertical',
                                                         }) => {
  const intensityMap = {
    subtle: 5,
    normal: 10,
    strong: 20,
  };

  const speedMap = {
    slow: 4,
    normal: 3,
    fast: 2,
  };

  const getAnimation = () => {
    const distance = intensityMap[intensity];
    const duration = speedMap[speed];

    switch (direction) {
      case 'vertical':
        return {
          y: [-distance, distance, -distance],
        };
      case 'horizontal':
        return {
          x: [-distance, distance, -distance],
        };
      case 'diagonal':
        return {
          y: [-distance, distance, -distance],
          x: [-distance/2, distance/2, -distance/2],
        };
      default:
        return { y: [-distance, distance, -distance] };
    }
  };

  return (
    <motion.div
      className={cn(className)}
      animate={getAnimation()}
      transition={{
        duration: speedMap[speed],
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};
