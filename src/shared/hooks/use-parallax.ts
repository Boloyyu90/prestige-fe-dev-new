import { useTransform, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface UseParallaxOptions {
  offset?: number;
  speed?: number;
}

export function useParallax({ offset = 50, speed = 0.5 }: UseParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset * speed, offset * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return { ref, y, opacity, scrollYProgress };
}