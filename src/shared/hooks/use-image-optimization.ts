import { useState, useEffect, useCallback } from 'react';

interface ImageOptimizationOptions {
  src: string;
  placeholder?: string;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function useImageOptimization({
                                       src,
                                       placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                                       quality = 75,
                                       priority = false,
                                       sizes,
                                       onLoad,
                                       onError,
                                     }: ImageOptimizationOptions) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(priority);

  // Intersection Observer for lazy loading
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, priority]);

  // Load image when intersecting or priority
  useEffect(() => {
    if (!isIntersecting || hasError) return;

    const img = new Image();

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      onLoad?.();
    };

    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
      onError?.();
    };

    // Create optimized src with quality parameter
    const optimizedSrc = src.includes('?')
      ? `${src}&q=${quality}`
      : `${src}?q=${quality}`;

    img.src = optimizedSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isIntersecting, src, quality, hasError, onLoad, onError]);

  const imageProps = {
    src: imageSrc,
    'data-loaded': !isLoading,
    'data-error': hasError,
    ...(sizes && { sizes }),
  };

  return {
    ref: setRef,
    imageProps,
    isLoading,
    hasError,
    isIntersecting,
  };
}
