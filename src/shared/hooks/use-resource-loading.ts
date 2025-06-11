import { useState, useEffect, useCallback } from 'react';

interface ResourceState {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  error?: Error;
}

export function useResourceLoading() {
  const [resources, setResources] = useState<Map<string, ResourceState>>(new Map());

  const loadResource = useCallback(async (
    url: string,
    type: 'script' | 'style' | 'image' = 'script'
  ): Promise<void> => {
    // Update loading state
    setResources(prev => new Map(prev).set(url, {
      isLoading: true,
      isLoaded: false,
      hasError: false,
    }));

    try {
      await new Promise<void>((resolve, reject) => {
        if (type === 'script') {
          const script = document.createElement('script');
          script.src = url;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
          document.head.appendChild(script);
        } else if (type === 'style') {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = url;
          link.onload = () => resolve();
          link.onerror = () => reject(new Error(`Failed to load stylesheet: ${url}`));
          document.head.appendChild(link);
        } else if (type === 'image') {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
          img.src = url;
        }
      });

      // Update success state
      setResources(prev => new Map(prev).set(url, {
        isLoading: false,
        isLoaded: true,
        hasError: false,
      }));
    } catch (error) {
      // Update error state
      setResources(prev => new Map(prev).set(url, {
        isLoading: false,
        isLoaded: false,
        hasError: true,
        error: error as Error,
      }));
      throw error;
    }
  }, []);

  const getResourceState = useCallback((url: string): ResourceState => {
    return resources.get(url) || {
      isLoading: false,
      isLoaded: false,
      hasError: false,
    };
  }, [resources]);

  return {
    loadResource,
    getResourceState,
    resources,
  };
}