'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  animation?: 'fade' | 'slide' | 'bounce';
}

export function AnimatedText({
                               text,
                               className,
                               delay = 0,
                               duration = 0.5,
                               stagger = 0.03,
                               animation = 'slide',
                             }: AnimatedTextProps) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const animations = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    bounce: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          damping: 12,
          stiffness: 200,
        },
      },
    },
  };

  const child = animations[animation];

  return (
    <motion.div
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-[0.25em]"
          variants={child}
          transition={{ duration }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}