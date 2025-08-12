import { useRef, useEffect, useState } from 'react';

interface AnimationOptions {
  animationClass?: string;
  delay?: number;
  threshold?: number;
}

// Hook for optimized animations using IntersectionObserver
export const useOptimizedAnimation = (options?: number | AnimationOptions) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Handle both old API (number) and new API (object)
  let threshold = 0.1;
  let delay = 0;
  let animationClass = 'fade-in-up';

  if (typeof options === 'number') {
    threshold = options;
  } else if (options) {
    threshold = options.threshold || 0.1;
    delay = options.delay || 0;
    animationClass = options.animationClass || 'fade-in-up';
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay if specified
          if (delay > 0) {
            setTimeout(() => setInView(true), delay);
          } else {
            setInView(true);
          }
          // Optional: Keep observing for exit animations
          // observer.unobserve(entry.target);
        } else {
          setInView(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay]);

  return { ref, inView, animationClass };
};

// Hook for optimized hover effects
export const useOptimizedHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { ref, isHovered };
};
