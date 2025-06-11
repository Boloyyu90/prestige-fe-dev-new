import { useEffect, useState, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
  });

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Import web-vitals dynamically to avoid SSR issues
    import('web-vitals').then(({ onLCP, onFID, onCLS, onFCP, onTTFB }) => {
      onLCP((metric) => {
        setMetrics(prev => ({ ...prev, lcp: metric.value }));
      });

      onFID((metric) => {
        setMetrics(prev => ({ ...prev, fid: metric.value }));
      });

      onCLS((metric) => {
        setMetrics(prev => ({ ...prev, cls: metric.value }));
      });

      onFCP((metric) => {
        setMetrics(prev => ({ ...prev, fcp: metric.value }));
      });

      onTTFB((metric) => {
        setMetrics(prev => ({ ...prev, ttfb: metric.value }));
      });
    }).catch(() => {
      // Fallback if web-vitals is not available
      console.warn('Web Vitals library not available');
    });
  }, []);

  const getPerformanceGrade = useCallback(() => {
    const { lcp, fid, cls } = metrics;

    if (lcp === null || fid === null || cls === null) return 'unknown';

    // Google's thresholds for good performance
    const lcpGood = lcp <= 2500;
    const fidGood = fid <= 100;
    const clsGood = cls <= 0.1;

    const goodCount = [lcpGood, fidGood, clsGood].filter(Boolean).length;

    if (goodCount === 3) return 'excellent';
    if (goodCount === 2) return 'good';
    if (goodCount === 1) return 'needs-improvement';
    return 'poor';
  }, [metrics]);

  return {
    metrics,
    grade: getPerformanceGrade(),
    isLoading: Object.values(metrics).every(v => v === null),
  };
}