'use client';

import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/shared/lib/utils/cn';
import { useState } from 'react';

type OptimizedImageProps = ImageProps & {
  containerClassName?: string;
};

export function OptimizedImage({
                                 src,
                                 alt,
                                 className,
                                 containerClassName,
                                 priority = false,
                                 ...props
                               }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const effectiveSrc = inView || priority ? src : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  return (
    <div ref={ref} className={cn("relative overflow-hidden", containerClassName)}>
      <motion.div
        className="absolute inset-0 bg-muted shimmer"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />
      <Image
        src={effectiveSrc}
        alt={alt}
        className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
        onLoad={() => setIsLoaded(true)}
        priority={priority}
        {...props}
      />
    </div>
  );
}