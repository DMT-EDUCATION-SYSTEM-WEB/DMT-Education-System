import { useMemo, useCallback, useRef, useEffect } from 'react';

// Hook để tối ưu hóa performance
export const usePerformanceOptimization = () => {
  const observerRef = useRef<IntersectionObserver>();
  const elementsRef = useRef<Set<Element>>(new Set());

  // Memoized intersection observer
  const intersectionObserver = useMemo(() => {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Unobserve once animated to save memory
            observerRef.current?.unobserve(entry.target);
            elementsRef.current.delete(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );
  }, []);

  // Optimized observe function
  const observeElement = useCallback((element: Element) => {
    if (element && !elementsRef.current.has(element)) {
      intersectionObserver.observe(element);
      elementsRef.current.add(element);
    }
  }, [intersectionObserver]);

  // Cleanup function
  const cleanup = useCallback(() => {
    elementsRef.current.forEach(element => {
      intersectionObserver.unobserve(element);
    });
    elementsRef.current.clear();
    intersectionObserver.disconnect();
  }, [intersectionObserver]);

  useEffect(() => {
    observerRef.current = intersectionObserver;
    return cleanup;
  }, [intersectionObserver, cleanup]);

  return { observeElement, cleanup };
};

// Hook để debounce các operations đắt đỏ
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook để throttle các event handlers
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

// Import useState
import { useState } from 'react';
