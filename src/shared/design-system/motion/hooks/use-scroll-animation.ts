import { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';

export function useScrollAnimation(element?: React.RefObject<HTMLElement>) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = currentScroll / maxScroll;

      setScrollProgress(progress);
      setIsScrollingDown(currentScroll > (window as any).lastScrollY || 0);
      (window as any).lastScrollY = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    scrollProgress,
    isScrollingDown,
    isInView: scrollProgress > 0 && scrollProgress < 1,
    scrollY,
  };
}
