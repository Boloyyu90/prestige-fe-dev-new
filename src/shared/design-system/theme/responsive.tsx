import { useState, useEffect } from 'react';
import { designTokens } from '../tokens';

type Breakpoint = keyof typeof designTokens.breakpoints;

export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });

      // Determine current breakpoint
      if (width >= parseInt(designTokens.breakpoints['2xl'])) {
        setCurrentBreakpoint('2xl');
      } else if (width >= parseInt(designTokens.breakpoints.xl)) {
        setCurrentBreakpoint('xl');
      } else if (width >= parseInt(designTokens.breakpoints.lg)) {
        setCurrentBreakpoint('lg');
      } else if (width >= parseInt(designTokens.breakpoints.md)) {
        setCurrentBreakpoint('md');
      } else if (width >= parseInt(designTokens.breakpoints.sm)) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint('xs');
      }
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const isBreakpoint = (breakpoint: Breakpoint) => currentBreakpoint === breakpoint;
  const isBreakpointUp = (breakpoint: Breakpoint) => {
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = breakpoints.indexOf(currentBreakpoint);
    const targetIndex = breakpoints.indexOf(breakpoint);
    return currentIndex >= targetIndex;
  };
  const isBreakpointDown = (breakpoint: Breakpoint) => {
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = breakpoints.indexOf(currentBreakpoint);
    const targetIndex = breakpoints.indexOf(breakpoint);
    return currentIndex <= targetIndex;
  };

  return {
    currentBreakpoint,
    windowSize,
    isBreakpoint,
    isBreakpointUp,
    isBreakpointDown,
    isMobile: currentBreakpoint === 'xs' || currentBreakpoint === 'sm',
    isTablet: currentBreakpoint === 'md',
    isDesktop: isBreakpointUp('lg'),
    isLargeScreen: isBreakpointUp('xl'),
  };
}