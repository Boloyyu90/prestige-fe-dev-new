'use client';

import { motion } from 'framer-motion';
import { Card } from './card';
import { cn } from '@/shared/lib/utils/cn';

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  hoverScale?: number;
  tapScale?: number;
  delay?: number;
}

export function AnimatedCard({
                               children,
                               className,
                               hoverScale = 1.03,
                               tapScale = 0.98,
                               delay = 0,
                               ...props
                             }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
    >
      <Card className={cn('transition-shadow', className)} {...props}>
        {children}
      </Card>
    </motion.div>
  );
}