'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface AnimatedTextProps {
  children: string;
  variant?: 'fadeInUp' | 'typewriter' | 'reveal' | 'shimmer' | 'stagger';
  className?: string;
  delay?: number;
  stagger?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  duration?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
                                                            children,
                                                            variant = 'fadeInUp',
                                                            className,
                                                            delay = 0,
                                                            stagger = false,
                                                            as: Component = 'div',
                                                            duration = 0.6,
                                                          }) => {
  const text = children;
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ? 0.03 : 0,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration } },
    },
    typewriter: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    reveal: {
      hidden: { opacity: 0, y: 50, skewY: 10 },
      visible: { opacity: 1, y: 0, skewY: 0, transition: { duration } },
    },
    shimmer: {
      hidden: { opacity: 0.5 },
      visible: { opacity: 1 },
    },
    stagger: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration } },
    },
  };

  if (variant === 'typewriter') {
    return (
      <Component className={cn(className)}>
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut', delay }}
          style={{ overflow: 'hidden', display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {text}
        </motion.span>
      </Component>
    );
  }

  if (variant === 'shimmer') {
    return (
      <Component className={cn('text-shimmer', className)}>
        {text}
      </Component>
    );
  }

  return (
    <Component className={cn(className)}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        style={{ display: 'inline-block' }}
      >
        {stagger || variant === 'stagger'
          ? words.map((word, index) => (
            <motion.span
              key={index}
              variants={itemVariants[variant] || itemVariants.stagger}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))
          : <motion.span variants={itemVariants[variant]}>{text}</motion.span>
        }
      </motion.span>
    </Component>
  );
};