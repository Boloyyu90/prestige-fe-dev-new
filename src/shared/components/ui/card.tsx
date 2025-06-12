import { motion } from 'framer-motion'
import { cn } from '@/shared/lib/utils/cn'

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm';
  const hoverClasses = hover ? 'transition-all hover:shadow-lg hover:-translate-y-1' : '';

  return (
    <motion.div
      className={cn(baseClasses, paddingClasses[padding], hoverClasses, className)}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}