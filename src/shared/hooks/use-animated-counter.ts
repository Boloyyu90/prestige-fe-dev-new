import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseAnimatedCounterOptions {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
  trigger?: 'inView' | 'manual';
}

export function useAnimatedCounter({
                                     end,
                                     start = 0,
                                     duration = 2000,
                                     prefix = '',
                                     suffix = '',
                                     separator = ',',
                                     decimals = 0,
                                     trigger = 'inView'
                                   }: UseAnimatedCounterOptions) {
  const [count, setCount] = useState(start);
  const [isActive, setIsActive] = useState(trigger === 'manual');
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (trigger === 'inView' && inView) {
      setIsActive(true);
    }
  }, [inView, trigger]);

  useEffect(() => {
    if (!isActive) return;

    const increment = (end - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, 16);

    return () => clearInterval(timer);
  }, [isActive, start, end, duration]);

  const formatNumber = (num: number) => {
    const formatted = num.toFixed(decimals);
    if (separator && num >= 1000) {
      return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    return formatted;
  };

  const formattedCount = `${prefix}${formatNumber(count)}${suffix}`;

  return {
    ref: trigger === 'inView' ? ref : null,
    count: formattedCount,
    rawCount: count,
    isActive,
    setIsActive
  };
}