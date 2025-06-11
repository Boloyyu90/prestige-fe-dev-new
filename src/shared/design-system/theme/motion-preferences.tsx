import { useState, useEffect } from 'react';

export function useMotionPreferences() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);

    // Check for high contrast preference
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    setPrefersHighContrast(contrastQuery.matches);

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches);
    };

    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  const getTransition = (
    normal: any,
    reduced: any = { duration: 0.01 }
  ) => {
    return prefersReducedMotion ? reduced : normal;
  };

  const getAnimationProps = (
    normal: any,
    reduced: any = {}
  ) => {
    return prefersReducedMotion ? reduced : normal;
  };

  return {
    prefersReducedMotion,
    prefersHighContrast,
    getTransition,
    getAnimationProps,
    shouldAnimate: !prefersReducedMotion,
  };
}