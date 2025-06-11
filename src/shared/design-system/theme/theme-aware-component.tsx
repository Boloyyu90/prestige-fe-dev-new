import { motion } from 'framer-motion';
import { useTheme } from './context';
import { useThemeColors } from './use-theme-colors';

interface ThemeAwareComponentProps {
  children: React.ReactNode;
  className?: string;
  adaptToTheme?: boolean;
  lightProps?: any;
  darkProps?: any;
}

export function ThemeAwareComponent({
                                      children,
                                      className,
                                      adaptToTheme = true,
                                      lightProps = {},
                                      darkProps = {},
                                    }: ThemeAwareComponentProps) {
  const { isDark, isLight } = useTheme();
  const { getTextColor, getSurfaceColor } = useThemeColors();

  const themeProps = isDark ? darkProps : lightProps;

  if (!adaptToTheme) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        color: getTextColor('primary'),
        backgroundColor: getSurfaceColor('primary'),
      }}
      animate={{
        backgroundColor: getSurfaceColor('primary'),
        color: getTextColor('primary'),
      }}
      transition={{ duration: 0.2 }}
      {...themeProps}
    >
      {children}
    </motion.div>
  );
}