import { useState, useEffect } from 'react';
import { useIntersectionObserver } from './use-intersection-observer';

export function useLazyImage(src: string, placeholder = '/images/placeholder.jpg') {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useIntersectionObserver();

  useEffect(() => {
    if (inView && !isLoaded) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
    }
  }, [inView, src, isLoaded]);

  return { ref, imageSrc, isLoaded };
}