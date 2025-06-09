import { cn } from "@/shared/lib/utils/cn"
import CountUp from "react-countup"

interface PriceDisplayProps {
  price: number
  className?: string
  duration?: number
  prefix?: string
  separator?: string
}

export function PriceDisplay({
                               price,
                               className,
                               duration = 1,
                               prefix = "",
                               separator = "."
                             }: PriceDisplayProps) {
  return (
    <CountUp
      start={0}
      end={price}
      duration={duration}
      separator={separator}
      prefix={prefix}
      className={cn("tabular-nums", className)}
    />
  )
}