import * as React from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useRef, useState, useEffect } from 'react';

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  distance?: number;
  disabled?: boolean;
}

export const MagneticWrapper: React.FC<MagneticWrapperProps> = ({
                                                                  children,
                                                                  className,
                                                                  strength = 0.2,
                                                                  distance = 100,
                                                                  disabled = false,
                                                                }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (disabled) return;

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distanceFromCenter = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distanceFromCenter < distance) {
        const magnetX = deltaX * strength;
        const magnetY = deltaY * strength;

        x.set(magnetX);
        y.set(magnetY);
      }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };

    document.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y, strength, distance, disabled]);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
};