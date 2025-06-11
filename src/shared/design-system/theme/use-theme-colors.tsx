import { useTheme } from './context';
import { designTokens } from '../tokens';

export function useThemeColors() {
  const { isDark, isLight } = useTheme();

  const getColor = (colorPath: string, opacity?: number) => {
    const pathArray = colorPath.split('.');
    let color = designTokens.colors;

    for (const path of pathArray) {
      color = (color as any)[path];
    }

    if (typeof color === 'string') {
      return opacity ? `${color}${Math.round(opacity * 255).toString(16)}` : color;
    }

    return color;
  };

  const getBrandColor = (shade: keyof typeof designTokens.colors.brand.primary = 600) => {
    return designTokens.colors.brand.primary[shade];
  };

  const getSemanticColor = (
    type: keyof typeof designTokens.colors.semantic,
    shade: keyof typeof designTokens.colors.semantic.success = 500
  ) => {
    return designTokens.colors.semantic[type][shade];
  };

  const getSurfaceColor = (variant: keyof typeof designTokens.colors.surface.background) => {
    return designTokens.colors.surface.background[variant];
  };

  const getTextColor = (variant: 'primary' | 'secondary' | 'muted' = 'primary') => {
    if (isDark) {
      switch (variant) {
        case 'primary':
          return '#ffffff';
        case 'secondary':
          return '#e5e7eb';
        case 'muted':
          return '#9ca3af';
        default:
          return '#ffffff';
      }
    } else {
      switch (variant) {
        case 'primary':
          return '#111827';
        case 'secondary':
          return '#374151';
        case 'muted':
          return '#6b7280';
        default:
          return '#111827';
      }
    }
  };

  return {
    isDark,
    isLight,
    getColor,
    getBrandColor,
    getSemanticColor,
    getSurfaceColor,
    getTextColor,
    colors: designTokens.colors,
  };
}