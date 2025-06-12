import * as React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimateProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function Animate({ children, className, delay = 0, direction = 'up' }: AnimateProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const variants = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...variants[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...variants[direction] }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}