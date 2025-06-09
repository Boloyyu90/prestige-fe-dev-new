import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseAnimatedCounterOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useAnimatedCounter({
                                     end,
                                     start = 0,
                                     duration = 2000,
                                     decimals = 0,
                                     suffix = '',
                                     prefix = ''
                                   }: UseAnimatedCounterOptions) {
  const [count, setCount] = useState(start);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const countRef = useRef(start);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!inView) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = start + (end - start) * easeOutQuart;

      countRef.current = currentCount;
      setCount(currentCount);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [inView, start, end, duration]);

  const formattedCount = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return { ref, count: formattedCount, rawCount: count, inView };
}