import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
                                                               children,
                                                               className,
                                                               speed = 0.5,
                                                               direction = 'up',
                                                             }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y = useTransform(
    scrollY,
    [0, 1000],
    direction === 'up' ? [0, -1000 * speed] : [0, 1000 * speed]
  );

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};