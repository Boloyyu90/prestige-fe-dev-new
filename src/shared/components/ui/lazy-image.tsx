'use client';

import { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/shared/lib/utils/cn';

interface LazyImageProps extends ImageProps {
  threshold?: number;
  rootMargin?: string;
  placeholderSrc?: string;
}

export function LazyImage({
                            src,
                            alt,
                            className,
                            threshold = 0.1,
                            rootMargin = '50px',
                            placeholderSrc = '/images/placeholder.jpg',
                            ...props
                          }: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (imageRef && imageSrc === placeholderSrc) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src as string);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold, rootMargin }
      );
      observer.observe(imageRef);
    }

    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef!);
      }
    };
  }, [imageRef, imageSrc, placeholderSrc, src, threshold, rootMargin]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        {...props}
        ref={setImageRef}
        src={imageSrc}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}