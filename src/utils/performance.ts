// Performance optimization configurations
export const PERFORMANCE_CONFIG = {
  // Animation settings
  ANIMATION: {
    DEFAULT_DURATION: 300,
    FAST_DURATION: 150,
    SLOW_DURATION: 500,
    EASING: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    STAGGER_DELAY: 100
  },

  // Intersection Observer settings
  OBSERVER: {
    THRESHOLD: 0.1,
    ROOT_MARGIN: '0px 0px -50px 0px'
  },

  // Scroll optimization
  SCROLL: {
    DEBOUNCE_DELAY: 100,
    PASSIVE: true
  },

  // Device detection
  IS_MOBILE: typeof window !== 'undefined' && window.innerWidth <= 768,
  IS_LOW_END: typeof window !== 'undefined' && 
    ('connection' in navigator && (navigator as any).connection?.effectiveType === 'slow-2g'),

  // Feature detection
  SUPPORTS_WILL_CHANGE: typeof window !== 'undefined' && 
    CSS.supports('will-change', 'transform'),
  SUPPORTS_BACKDROP_FILTER: typeof window !== 'undefined' && 
    CSS.supports('backdrop-filter', 'blur(10px)'),
  PREFERS_REDUCED_MOTION: typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

// Performance utilities
export const performanceUtils = {
  // Debounce function for scroll events
  debounce: (func: Function, wait: number) => {
    let timeout: number;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
    };
  },

  // Throttle function for frequent events
  throttle: (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function(...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport: (element: Element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Preload images
  preloadImage: (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  },

  // Optimize animation based on device capabilities
  getOptimizedAnimationConfig: () => {
    if (PERFORMANCE_CONFIG.PREFERS_REDUCED_MOTION) {
      return {
        duration: 0,
        enabled: false
      };
    }

    if (PERFORMANCE_CONFIG.IS_LOW_END || PERFORMANCE_CONFIG.IS_MOBILE) {
      return {
        duration: PERFORMANCE_CONFIG.ANIMATION.FAST_DURATION,
        enabled: true,
        reducedEffects: true
      };
    }

    return {
      duration: PERFORMANCE_CONFIG.ANIMATION.DEFAULT_DURATION,
      enabled: true,
      reducedEffects: false
    };
  }
};

// Memory management utilities
export const memoryUtils = {
  // Clean up unused resources
  cleanup: () => {
    // Force garbage collection if available (Chrome DevTools)
    if ((window as any).gc) {
      (window as any).gc();
    }
  },

  // Monitor memory usage
  getMemoryUsage: () => {
    if ('memory' in performance) {
      return (performance as any).memory;
    }
    return null;
  }
};
