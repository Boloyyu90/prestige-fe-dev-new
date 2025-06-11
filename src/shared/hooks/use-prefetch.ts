import { useEffect, useCallback } from 'react';

interface PrefetchOptions {
  priority?: 'high' | 'low';
  as?: 'script' | 'style' | 'image' | 'document';
}

export function usePrefetch() {
  const prefetch = useCallback((
    href: string,
    options: PrefetchOptions = {}
  ) => {
    if (typeof window === 'undefined') return;

    const { priority = 'low', as = 'document' } = options;

    // Check if already prefetched
    const existing = document.querySelector(
      `link[rel="prefetch"][href="${href}"]`
    );
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = as;

    if (priority === 'high') {
      link.setAttribute('importance', 'high');
    }

    document.head.appendChild(link);
  }, []);

  const preload = useCallback((
    href: string,
    options: PrefetchOptions = {}
  ) => {
    if (typeof window === 'undefined') return;

    const { as = 'script' } = options;

    // Check if already preloaded
    const existing = document.querySelector(
      `link[rel="preload"][href="${href}"]`
    );
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;

    document.head.appendChild(link);
  }, []);

  return { prefetch, preload };
}