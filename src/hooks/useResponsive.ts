import { useState, useEffect } from 'react';

// Responsive breakpoints following Tailwind CSS standards
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

type Breakpoint = keyof typeof breakpoints;

interface UseResponsiveReturn {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  breakpoint: Breakpoint | 'xs';
  isTouch: boolean;
  orientation: 'portrait' | 'landscape';
  isReducedMotion: boolean;
}

export const useResponsive = (): UseResponsiveReturn => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const [isTouch, setIsTouch] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Detect touch capability
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // Detect reduced motion preference
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('resize', handleResize);
    
    // Initial size
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const { width, height } = dimensions;

  // Determine current breakpoint
  const getBreakpoint = (width: number): Breakpoint | 'xs' => {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  const breakpoint = getBreakpoint(width);
  const isMobile = width < breakpoints.md;
  const isTablet = width >= breakpoints.md && width < breakpoints.lg;
  const isDesktop = width >= breakpoints.lg && width < breakpoints.xl;
  const isLargeDesktop = width >= breakpoints.xl;
  const orientation = height > width ? 'portrait' : 'landscape';

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    breakpoint,
    isTouch,
    orientation,
    isReducedMotion
  };
};

// Hook for media queries
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

// Pre-defined responsive queries
export const useResponsiveQueries = () => {
  return {
    isMobile: useMediaQuery('(max-width: 767px)'),
    isTablet: useMediaQuery('(min-width: 768px) and (max-width: 1023px)'),
    isDesktop: useMediaQuery('(min-width: 1024px)'),
    isLargeScreen: useMediaQuery('(min-width: 1280px)'),
    isReducedMotion: useMediaQuery('(prefers-reduced-motion: reduce)'),
    isDarkMode: useMediaQuery('(prefers-color-scheme: dark)'),
    isHighContrast: useMediaQuery('(prefers-contrast: high)')
  };
};
