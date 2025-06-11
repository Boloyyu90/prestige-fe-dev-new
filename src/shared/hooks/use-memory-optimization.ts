import { useEffect, useRef, useCallback } from 'react';

export function useMemoryOptimization() {
  const cleanupFunctions = useRef<(() => void)[]>([]);

  const addCleanup = useCallback((cleanupFn: () => void) => {
    cleanupFunctions.current.push(cleanupFn);
  }, []);

  const cleanup = useCallback(() => {
    cleanupFunctions.current.forEach(fn => {
      try {
        fn();
      } catch (error) {
        console.warn('Cleanup function failed:', error);
      }
    });
    cleanupFunctions.current = [];
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Memory pressure detection
  const [memoryPressure, setMemoryPressure] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        const usedRatio = memory.usedJSHeapSize / memory.totalJSHeapSize;

        if (usedRatio > 0.9) {
          setMemoryPressure('high');
        } else if (usedRatio > 0.7) {
          setMemoryPressure('medium');
        } else {
          setMemoryPressure('low');
        }
      };

      const interval = setInterval(checkMemory, 10000); // Check every 10 seconds
      checkMemory(); // Initial check

      addCleanup(() => clearInterval(interval));
    }
  }, [addCleanup]);

  // Force garbage collection in development
  const forceGC = useCallback(() => {
    if (process.env.NODE_ENV === 'development' && 'gc' in window) {
      (window as any).gc();
    }
  }, []);

  return {
    addCleanup,
    cleanup,
    memoryPressure,
    forceGC,
    shouldOptimize: memoryPressure !== 'low',
  };
}