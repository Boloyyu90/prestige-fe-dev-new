import { useState, useEffect, useCallback, useMemo } from 'react';

interface VirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  items: any[];
}

export function useVirtualScroll({
                                   itemHeight,
                                   containerHeight,
                                   overscan = 5,
                                   items,
                                 }: VirtualScrollOptions) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length - 1
    );

    return {
      startIndex: Math.max(0, startIndex - overscan),
      endIndex,
      items: items.slice(
        Math.max(0, startIndex - overscan),
        endIndex + 1
      ),
    };
  }, [scrollTop, itemHeight, containerHeight, overscan, items]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleItems.startIndex * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems: visibleItems.items,
    totalHeight,
    offsetY,
    handleScroll,
    startIndex: visibleItems.startIndex,
    endIndex: visibleItems.endIndex,
  };
}