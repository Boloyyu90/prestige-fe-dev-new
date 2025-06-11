'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

export interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  resolvedTheme: string | undefined;
  systemTheme: string | undefined;
  themes: string[];
  isDark: boolean;
  isLight: boolean;
  isSystem: boolean;
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  setSystemTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
                                children,
                                attribute = 'class',
                                defaultTheme = 'system',
                                enableSystem = true,
                                disableTransitionOnChange = false,
                              }: ThemeProviderProps) {
  const {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme,
    themes,
  } = useNextTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent flash during hydration
  if (!mounted) {
    return <>{children}</>;
  }

  const isDark = resolvedTheme === 'dark';
  const isLight = resolvedTheme === 'light';
  const isSystem = theme === 'system';

  const toggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');
  const setSystemTheme = () => setTheme('system');

  const value = {
    theme: theme || defaultTheme,
    setTheme,
    resolvedTheme,
    systemTheme,
    themes: themes || ['light', 'dark'],
    isDark,
    isLight,
    isSystem,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}