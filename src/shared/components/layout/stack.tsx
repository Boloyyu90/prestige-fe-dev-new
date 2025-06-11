import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

interface StackProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  animate?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

const spacingClasses = {
  horizontal: {
    xs: 'space-x-1',
    sm: 'space-x-2',
    md: 'space-x-4',
    lg: 'space-x-6',
    xl: 'space-x-8',
    '2xl': 'space-x-12',
  },
  vertical: {
    xs: 'space-y-1',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
    '2xl': 'space-y-12',
  },
};

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export function Stack({
                        children,
                        className,
                        direction = 'vertical',
                        spacing = 'md',
                        align = 'start',
                        justify = 'start',
                        wrap = false,
                        animate = false,
                        stagger = false,
                        staggerDelay = 0.1,
                      }: StackProps) {
  const stackClasses = cn(
    'flex',
    direction === 'horizontal' ? 'flex-row' : 'flex-col',
    spacingClasses[direction][spacing],
    alignClasses[align],
    justifyClasses[justify],
    { 'flex-wrap': wrap },
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
      hidden: { opacity: 0, y: direction === 'vertical' ? 20 : 0, x: direction === 'horizontal' ? 20 : 0 },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
      },
    };

    return (
      <motion.div
        className={stackClasses}
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

  return <div className={stackClasses}>{children}</div>;
}