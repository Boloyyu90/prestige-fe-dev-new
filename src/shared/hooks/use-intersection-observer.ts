import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export function useIntersectionObserver(options = {}) {
  const { threshold = 0.1, triggerOnce = true, rootMargin = '50px' } = options;

  const { ref, inView, entry } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  return { ref, inView, entry };
}