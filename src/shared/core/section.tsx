import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
  id?: string;
}

export function Section({ children, className, animate = true, delay = 0, id }: SectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  if (!animate) {
    return (
      <section id={id} className={cn('py-16 md:py-24 lg:py-32', className)}>
        <div className="container mx-auto px-4">
          {children}
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn('py-16 md:py-24 lg:py-32', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </motion.section>
  );
}