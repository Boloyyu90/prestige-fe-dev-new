import { useBreakpoint } from './use-breakpoint';

type ResponsiveValue<T> = {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

export function useResponsiveValue<T>(values: ResponsiveValue<T>): T {
  const { breakpoint } = useBreakpoint();

  const breakpointOrder = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
  const currentIndex = breakpointOrder.indexOf(breakpoint);

  // Find the closest defined value
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (bp in values && values[bp as keyof ResponsiveValue<T>] !== undefined) {
      return values[bp as keyof ResponsiveValue<T>]!;
    }
  }

  return values.base;
}