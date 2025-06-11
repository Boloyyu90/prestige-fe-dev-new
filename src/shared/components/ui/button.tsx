'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils/cn';
import { hoverVariants, transitions } from '@/shared/design-system/motion/variants';

const buttonVariants = cva(
  'btn-base relative overflow-hidden transform-gpu',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-md hover:shadow-lg',
        destructive: 'bg-error-500 text-white shadow-md hover:shadow-lg',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-md hover:shadow-lg',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-lg hover:shadow-xl',
      },
      size: {
        default: 'h-11 px-6 py-2 text-sm',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
      animation: {
        none: '',
        lift: '',
        scale: '',
        glow: '',
        shimmer: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'lift',
    },
  }
);

interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'size'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
     className,
     variant,
     size,
     animation = 'lift',
     loading = false,
     icon,
     rightIcon,
     children,
     disabled,
     ...props
   }, ref) => {
    const getHoverVariant = () => {
      switch (animation) {
        case 'lift':
          return hoverVariants.lift;
        case 'scale':
          return hoverVariants.scale;
        case 'glow':
          return hoverVariants.glow;
        default:
          return {};
      }
    };

    const shimmerEffect = animation === 'shimmer' && (
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['0%', '200%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    );

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, animation, className }))}
        disabled={disabled || loading}
        variants={getHoverVariant()}
        initial="initial"
        whileHover={!disabled && !loading ? "hover" : undefined}
        whileTap={!disabled && !loading ? "tap" : undefined}
        transition={transitions.fast}
        {...props}
      >
        {shimmerEffect}

        {loading && (
          <motion.div
            className="mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          </motion.div>
        )}

        {icon && !loading && (
          <span className="mr-2">{icon}</span>
        )}

        {children}

        {rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';