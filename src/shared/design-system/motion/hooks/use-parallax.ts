import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export function useParallax(strength: number = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * strength]);

  return { ref, y };
}