'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface EnhancedThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
}

export function EnhancedThemeProvider({
                                        children,
                                        attribute = 'class',
                                        defaultTheme = 'system',
                                        enableSystem = true,
                                        disableTransitionOnChange = false,
                                        storageKey = 'theme',
                                      }: EnhancedThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle theme transition animation
  const handleThemeChange = () => {
    if (!disableTransitionOnChange && mounted) {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  if (!mounted) {
    return (
      <div className="animate-pulse bg-background">
        {children}
      </div>
    );
  }

  return (
    <NextThemeProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      storageKey={storageKey}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isTransitioning ? 'transitioning' : 'stable'}
          initial={false}
          animate={{ opacity: isTransitioning ? 0.8 : 1 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </NextThemeProvider>
  );
}