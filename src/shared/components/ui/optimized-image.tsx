
'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/shared/lib/utils/cn';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  aspectRatio?: number;
  objectPosition?: string;
}

export function OptimizedImage({
                                 src,
                                 alt,
                                 className,
                                 fallbackSrc = '/images/placeholder.jpg',
                                 aspectRatio,
                                 objectPosition = 'center',
                                 priority = false,
                                 quality = 75,
                                 ...props
                               }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-100",
        aspectRatio && "w-full",
        className
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton loader */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
          animate={{
            x: ["0%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 100%",
          }}
        />
      )}

      <Image
        {...props}
        src={error ? fallbackSrc : src}
        alt={alt}
        quality={quality}
        priority={priority}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          "object-cover"
        )}
        style={{ objectPosition }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        sizes={props.fill ? "100vw" : props.sizes}
      />
    </div>
  );
}