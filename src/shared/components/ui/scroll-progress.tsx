'use client';

import { motion } from 'framer-motion';
import { useScrollProgress } from '@/shared/hooks/use-scroll-progress';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
      style={{ scaleX: progress / 100 }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress / 100 }}
      transition={{ ease: 'linear' }}
    />
  );
}