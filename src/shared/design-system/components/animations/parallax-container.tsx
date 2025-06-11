import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
  offset?: [string, string];
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
                                                                      children,
                                                                      className,
                                                                      speed = 0.5,
                                                                      direction = 'up',
                                                                      offset = ["start end", "end start"],
                                                                    }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
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