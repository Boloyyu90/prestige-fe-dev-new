import { cn } from '@/shared/lib/utils/cn';

interface HeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  gradient?: boolean;
}

export function Heading({ children, as = 'h2', size = 'lg', className, gradient }: HeadingProps) {
  const Tag = as;

  const sizeClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl lg:text-5xl',
    xl: 'text-4xl md:text-5xl lg:text-6xl',
  };

  const baseClasses = 'font-bold leading-tight tracking-tight';
  const gradientClasses = gradient
    ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
    : 'text-gray-900 dark:text-white';

  return (
    <Tag className={cn(baseClasses, sizeClasses[size], gradientClasses, className)}>
      {children}
    </Tag>
  );
}

interface TextProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  muted?: boolean;
}

export function Text({ children, size = 'md', className, muted }: TextProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base lg:text-lg',
    lg: 'text-lg lg:text-xl',
  };

  const colorClasses = muted
    ? 'text-gray-600 dark:text-gray-400'
    : 'text-gray-900 dark:text-white';

  return (
    <p className={cn(sizeClasses[size], colorClasses, 'leading-relaxed', className)}>
      {children}
    </p>
  );
}
