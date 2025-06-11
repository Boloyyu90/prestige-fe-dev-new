import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  responsive?: {
    xs?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  };
  animate?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

const colClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

const gapClasses = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
  '2xl': 'gap-16',
};

export function Grid({
                       children,
                       className,
                       cols = 1,
                       gap = 'md',
                       responsive,
                       animate = false,
                       stagger = false,
                       staggerDelay = 0.1,
                     }: GridProps) {
  const responsiveClasses = responsive ? Object.entries(responsive).map(([breakpoint, cols]) => {
    const prefix = breakpoint === 'xs' ? '' : `${breakpoint}:`;
    return `${prefix}${colClasses[cols]}`;
  }).join(' ') : '';

  const gridClasses = cn(
    'grid',
    colClasses[cols],
    gapClasses[gap],
    responsiveClasses,
    className
  );

  if (animate) {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: stagger ? staggerDelay : 0,
          delayChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
      },
    };

    return (
      <motion.div
        className={gridClasses}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return <div className={gridClasses}>{children}</div>;
}