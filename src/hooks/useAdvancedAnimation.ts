import { useRef, useEffect, useState, useCallback } from 'react';
import { useResponsive } from './useResponsive';

interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  duration?: number;
  easing?: string;
  repeat?: boolean;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

interface UseAdvancedAnimationReturn {
  ref: (node: HTMLElement | null) => void;
  inView: boolean;
  hasAnimated: boolean;
  progress: number;
  trigger: () => void;
  reset: () => void;
}

export const useAdvancedAnimation = (
  options: AnimationOptions = {}
): UseAdvancedAnimationReturn => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    delay = 0,
    duration = 1000,
    easing = 'ease-out',
    repeat = false,
    direction = 'normal',
    fillMode = 'forwards'
  } = options;

  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [progress, setProgress] = useState(0);
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animationRef = useRef<number | null>(null);
  const { isReducedMotion } = useResponsive();

  const trigger = useCallback(() => {
    if (!elementRef.current || isReducedMotion) return;
    
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime - delay;
      const normalizedProgress = Math.max(0, Math.min(1, elapsed / duration));
      
      // Apply easing function
      const easedProgress = applyEasing(normalizedProgress, easing);
      setProgress(easedProgress);
      
      if (normalizedProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
        if (repeat) {
          setTimeout(reset, 500);
        }
      }
    };
    
    if (delay > 0) {
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, delay);
    } else {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [delay, duration, easing, repeat, isReducedMotion]);

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setProgress(0);
    setHasAnimated(false);
    setInView(false);
  }, []);

  const ref = useCallback((node: HTMLElement | null) => {
    if (elementRef.current) {
      observerRef.current?.unobserve(elementRef.current);
    }
    
    elementRef.current = node;
    
    if (node) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          const isIntersecting = entry.isIntersecting;
          setInView(isIntersecting);
          
          if (isIntersecting && !hasAnimated) {
            trigger();
          }
        },
        { threshold, rootMargin }
      );
      
      observerRef.current.observe(node);
    }
  }, [threshold, rootMargin, hasAnimated, trigger]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    ref,
    inView,
    hasAnimated,
    progress,
    trigger,
    reset
  };
};

// Easing functions
const applyEasing = (t: number, easing: string): number => {
  switch (easing) {
    case 'ease-in':
      return t * t;
    case 'ease-out':
      return 1 - Math.pow(1 - t, 2);
    case 'ease-in-out':
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    case 'bounce':
      return bounce(t);
    case 'elastic':
      return elastic(t);
    case 'back':
      return back(t);
    default:
      return t; // linear
  }
};

const bounce = (t: number): number => {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
};

const elastic = (t: number): number => {
  const c4 = (2 * Math.PI) / 3;
  return t === 0
    ? 0
    : t === 1
    ? 1
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

const back = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return c3 * t * t * t - c1 * t * t;
};

// Hook for scroll-triggered animations
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(currentScrollY / documentHeight, 1);
      
      setScrollY(currentScrollY);
      setScrollProgress(progress);
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    scrollY,
    scrollDirection,
    scrollProgress
  };
};

// Hook for parallax effect
export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const { scrollY } = useScrollAnimation();

  useEffect(() => {
    setOffset(scrollY * speed);
  }, [scrollY, speed]);

  return offset;
};
