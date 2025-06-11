import { useTheme } from './context';
import { designTokens } from '../tokens';

export function useCSSVariables() {
  const { isDark } = useTheme();

  const setCSSVariable = (property: string, value: string) => {
    document.documentElement.style.setProperty(`--${property}`, value);
  };

  const getCSSVariable = (property: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${property}`);
  };

  const updateThemeVariables = () => {
    if (typeof window === 'undefined') return;

    // Update color variables based on theme
    const colors = isDark ? {
      background: '224 71% 4%',
      foreground: '210 40% 98%',
      card: '224 71% 4%',
      'card-foreground': '210 40% 98%',
      primary: '199 51% 50%',
      'primary-foreground': '0 0% 100%',
      secondary: '32 86% 65%',
      'secondary-foreground': '24 9.8% 10%',
      muted: '215 28% 17%',
      'muted-foreground': '215 20.2% 65.1%',
      accent: '215 28% 17%',
      'accent-foreground': '210 40% 98%',
      border: '215 28% 17%',
      input: '215 28% 17%',
      ring: '199 51% 50%',
    } : {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      'card-foreground': '222.2 84% 4.9%',
      primary: '199 51% 40%',
      'primary-foreground': '0 0% 100%',
      secondary: '32 86% 60%',
      'secondary-foreground': '24 9.8% 10%',
      muted: '210 40% 96.1%',
      'muted-foreground': '215.4 16.3% 46.9%',
      accent: '210 40% 96.1%',
      'accent-foreground': '222.2 47.4% 11.2%',
      border: '214.3 31.8% 91.4%',
      input: '214.3 31.8% 91.4%',
      ring: '199 51% 40%',
    };

    Object.entries(colors).forEach(([key, value]) => {
      setCSSVariable(key, value);
    });
  };

  return {
    setCSSVariable,
    getCSSVariable,
    updateThemeVariables,
  };
}