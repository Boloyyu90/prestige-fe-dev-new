import { useState, useEffect } from 'react';
import { useDebounce } from './use-debounce';

interface ViewportSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useViewportSize(debounceMs: number = 150): ViewportSize {
  const [size, setSize] = useState<ViewportSize>(() => {
    if (typeof window === 'undefined') {
      return {
        width: 0,
        height: 0,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      width,
      height,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
    };
  });

  const debouncedSize = useDebounce(size, debounceMs);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return debouncedSize;
}