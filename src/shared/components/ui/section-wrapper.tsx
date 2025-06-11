'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionWrapper({ children, className, delay = 0 }: SectionWrapperProps) {
  const { ref, inView } = useIntersectionObserver();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={cn("section", className)}
    >
      {children}
    </motion.section>
  );
}