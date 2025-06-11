export { useTheme } from './context';
export { ThemeProvider } from './context';
export { ThemeToggle } from './theme-toggle';
export { ColorModeScript } from './color-mode-script';
export { useThemeColors } from './use-theme-colors';
export { useBreakpoint } from './responsive';
export { useMotionPreferences } from './motion-preferences';
export { useCSSVariables } from './css-variables';
export { EnhancedThemeProvider } from './theme-provider';
export { ThemeAwareComponent } from './theme-aware-component';

// Export types
export type { ThemeContextType } from './context';

// Constants
export const THEME_STORAGE_KEY = 'prestige-academy-theme';
export const THEME_ATTRIBUTE = 'class';
export const DEFAULT_THEME = 'system';

// Theme configuration
export const themeConfig = {
  storageKey: THEME_STORAGE_KEY,
  attribute: THEME_ATTRIBUTE,
  defaultTheme: DEFAULT_THEME,
  enableSystem: true,
  disableTransitionOnChange: false,
  themes: ['light', 'dark', 'system'],
} as const;