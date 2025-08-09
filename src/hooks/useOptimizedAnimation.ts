import { useEffect, useRef, useState } from 'react';

interface UseOptimizedAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animationClass?: string;
  delay?: number;
}

export const useOptimizedAnimation = (options: UseOptimizedAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    animationClass = 'fade-in-up',
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            element.classList.add(animationClass);
          }, delay);
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
          element.classList.remove(animationClass);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, animationClass, delay]);

  return { elementRef, isVisible };
};

// Hook for optimized hover effects
export const useOptimizedHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (elementRef.current) {
      elementRef.current.style.transform = 'translateY(-8px) translateZ(0)';
      elementRef.current.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (elementRef.current) {
      elementRef.current.style.transform = 'translateY(0) translateZ(0)';
      elementRef.current.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
  };

  return {
    elementRef,
    isHovered,
    hoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      className: 'optimized-card hover-lift',
      style: {
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        willChange: 'transform, box-shadow'
      }
    }
  };
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
          }
        });
      });

      observer.observe({ entryTypes: ['measure'] });

      return () => observer.disconnect();
    }
  }, []);
};

// Debounced scroll hook for better performance
export const useOptimizedScroll = (callback: () => void, delay: number = 100) => {
  useEffect(() => {
    let timeoutId: number;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(callback, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
};
