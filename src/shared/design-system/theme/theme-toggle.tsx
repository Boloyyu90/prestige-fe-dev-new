import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './context';
import { cn } from '@/shared/lib/utils/cn';
import { useState } from 'react';

interface ThemeToggleProps {
  variant?: 'icon' | 'button' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ThemeToggle({
                              variant = 'icon',
                              size = 'md',
                              className
                            }: ThemeToggleProps) {
  const { theme, toggleTheme, setTheme, isDark, isLight, isSystem } = useTheme();

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  if (variant === 'icon') {
    return (
      <motion.button
        onClick={toggleTheme}
        className={cn(
          'relative rounded-lg border border-border bg-background hover:bg-accent transition-colors',
          sizeClasses[size],
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center w-full h-full"
            >
              <Moon className={cn(iconSizes[size], 'text-foreground')} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center w-full h-full"
            >
              <Sun className={cn(iconSizes[size], 'text-foreground')} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  if (variant === 'dropdown') {
    const [isOpen, setIsOpen] = useState(false);

    const themes = [
      { key: 'light', label: 'Light', icon: Sun },
      { key: 'dark', label: 'Dark', icon: Moon },
      { key: 'system', label: 'System', icon: Monitor },
    ];

    return (
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center space-x-2 rounded-lg border border-border bg-background px-3 py-2 hover:bg-accent transition-colors',
            className
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {isSystem ? (
              <Monitor key="system" className={iconSizes[size]} />
            ) : isDark ? (
              <Moon key="dark" className={iconSizes[size]} />
            ) : (
              <Sun key="light" className={iconSizes[size]} />
            )}
          </AnimatePresence>
          <span className="text-sm font-medium">
            {isSystem ? 'System' : isDark ? 'Dark' : 'Light'}
          </span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40"
              />

              {/* Dropdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-background shadow-lg z-50"
              >
                <div className="p-1">
                  {themes.map((themeOption) => {
                    const Icon = themeOption.icon;
                    const isSelected = theme === themeOption.key;

                    return (
                      <motion.button
                        key={themeOption.key}
                        onClick={() => {
                          setTheme(themeOption.key);
                          setIsOpen(false);
                        }}
                        className={cn(
                          'w-full flex items-center space-x-2 rounded px-3 py-2 text-sm transition-colors',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent hover:text-accent-foreground'
                        )}
                        whileHover={{ x: 2 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{themeOption.label}</span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto h-2 w-2 rounded-full bg-current"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Button variant
  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        'flex items-center space-x-2 rounded-lg border border-border bg-background px-4 py-2 hover:bg-accent transition-colors',
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-2"
          >
            <Moon className={iconSizes[size]} />
            <span className="text-sm font-medium">Dark</span>
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-2"
          >
            <Sun className={iconSizes[size]} />
            <span className="text-sm font-medium">Light</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}