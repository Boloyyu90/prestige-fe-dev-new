// src/shared/components/ui/scroll-progress.tsx
'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

interface ScrollProgressProps {
  className?: string;
  height?: number;
  color?: string;
  position?: 'top' | 'bottom';
  showPercentage?: boolean;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    restDelta?: number;
  };
}

export function ScrollProgress({
                                 className,
                                 height = 3,
                                 color = 'bg-gradient-to-r from-primary to-secondary',
                                 position = 'top',
                                 showPercentage = false,
                                 springConfig = {
                                   stiffness: 100,
                                   damping: 30,
                                   restDelta: 0.001,
                                 },
                               }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  // Smooth spring animation untuk progress
  const scaleX = useSpring(scrollYProgress, springConfig);

  // Convert progress to percentage untuk display
  const percentage = useSpring(0, springConfig);

  // Update percentage value
  scrollYProgress.on('change', (latest) => {
    percentage.set(Math.round(latest * 100));
  });

  const positionClasses = {
    top: 'top-0',
    bottom: 'bottom-0',
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className={cn(
          'fixed left-0 right-0 z-50 origin-left',
          positionClasses[position],
          color,
          className
        )}
        style={{
          scaleX,
          height: `${height}px`,
        }}
      />

      {/* Optional Percentage Display */}
      {showPercentage && (
        <motion.div
          className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border rounded-lg px-3 py-1 text-sm font-medium text-foreground shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span>{percentage}%</motion.span>
        </motion.div>
      )}
    </>
  );
}

// Komponen ScrollProgress dengan variants yang berbeda
export function CircularScrollProgress({
                                         className,
                                         size = 60,
                                         strokeWidth = 4,
                                         showPercentage = true,
                                       }: {
  className?: string;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
}) {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className={cn('fixed bottom-6 right-6 z-50', className)}>
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            fill="none"
            className="opacity-20"
          />

          {/* Progress Circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            style={{
              pathLength,
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
            }}
          />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="progressGradient" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage Text */}
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-xs font-bold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.round(scrollYProgress.get() * 100)}%
            </motion.span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Hook untuk menggunakan scroll progress
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return {
    scrollYProgress,
    progress,
    percentage: Math.round(scrollYProgress.get() * 100),
  };
}

// Komponen ScrollProgress dengan milestone indicators
export function MilestoneScrollProgress({
                                          milestones = [25, 50, 75],
                                          className,
                                        }: {
  milestones?: number[];
  className?: string;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className={cn('fixed top-0 left-0 right-0 z-50', className)}>
      {/* Background Track */}
      <div className="h-1 bg-muted/30" />

      {/* Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left"
        style={{ scaleX }}
      />

      {/* Milestone Indicators */}
      {milestones.map((milestone, index) => (
        <motion.div
          key={milestone}
          className="absolute top-0 w-3 h-3 bg-white border-2 border-primary rounded-full transform -translate-y-1 -translate-x-1.5"
          style={{ left: `${milestone}%` }}
          initial={{ scale: 0 }}
          animate={{
            scale: scrollYProgress.get() * 100 >= milestone ? 1 : 0.7,
            backgroundColor: scrollYProgress.get() * 100 >= milestone ? 'hsl(var(--primary))' : 'white',
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      ))}
    </div>
  );
}

// Advanced ScrollProgress dengan section indicators
export function SectionScrollProgress({
                                        sections = [],
                                        className,
                                      }: {
  sections?: Array<{ id: string; label: string; color?: string }>;
  className?: string;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className={cn('fixed top-0 left-0 right-0 z-50', className)}>
      {/* Multi-colored Progress Bar */}
      <div className="h-1 bg-muted/30 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-secondary to-primary origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* Section Labels (optional) */}
      {sections.length > 0 && (
        <div className="absolute top-2 left-0 right-0 flex justify-between px-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="text-xs font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {section.label}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}