import { cn } from "@/shared/lib/utils/cn"

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  period?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceDisplay({
                               amount,
                               currency = 'Rp',
                               period,
                               size = 'md',
                               className
                             }: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const formatAmount = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  return (
    <div className={cn('font-bold text-gray-900 dark:text-white', sizeClasses[size], className)}>
      <span className="text-sm font-normal text-gray-500">{currency}</span>
      <span className="ml-1">{formatAmount(amount)}</span>
      {period && <span className="text-sm font-normal text-gray-500">/{period}</span>}
    </div>
  );
}