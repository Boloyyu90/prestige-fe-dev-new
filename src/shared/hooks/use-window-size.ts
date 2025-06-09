import { useState, useEffect } from 'react';
import { useDebounce } from './use-debounce';

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(debounceMs = 200): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const debouncedSize = useDebounce(windowSize, debounceMs);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return debouncedSize;
}