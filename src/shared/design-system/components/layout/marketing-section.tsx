'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/utils/cn';

interface MarketingSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  'aria-labelledby'?: string;
}

export function MarketingSection({
                                   children,
                                   className,
                                   ...props
                                 }: MarketingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className={cn("section relative overflow-hidden", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.2 }}
      {...props}
    >
      {children}
    </motion.section>
  );
}