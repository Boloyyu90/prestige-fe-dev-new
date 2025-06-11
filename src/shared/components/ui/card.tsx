'use client';

import * as React from 'react';
import { motion} from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';
import { hoverVariants, transitions } from '@/shared/design-system/motion/variants';


interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  interactive?: boolean;
  loading?: boolean;
  elevation?: 1 | 2 | 3 | 4 | 5;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
     className,
     hover = false,
     interactive = false,
     loading = false,
     elevation = 1,
     children,
     ...props
   }, ref) => {
    const elevationClasses = {
      1: 'shadow-elevation-1',
      2: 'shadow-elevation-2',
      3: 'shadow-elevation-3',
      4: 'shadow-elevation-4',
      5: 'shadow-elevation-5',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'card-base relative overflow-hidden',
          elevationClasses[elevation],
          {
            'cursor-pointer': interactive,
          },
          className
        )}
        variants={hover || interactive ? hoverVariants.lift : undefined}
        initial="initial"
        whileHover={hover || interactive ? "hover" : undefined}
        whileTap={interactive ? "tap" : undefined}
        transition={transitions.smooth}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
            <motion.div
              className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        )}

        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';