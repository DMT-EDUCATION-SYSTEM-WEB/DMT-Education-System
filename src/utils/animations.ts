// Animation utility functions for DMT Education System
import { ANIMATIONS } from '../constants';

// Animation constants
const ANIMATION_CONFIG = {
  durations: {
    fast: 200,
    normal: 300,
    slow: 500
  },
  easing: {
    easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
};

export const animations = {
  // CSS animation helpers
  fadeIn: (element: HTMLElement, duration = ANIMATION_CONFIG.durations.normal): void => {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ${ANIMATION_CONFIG.easing.easeOut}`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
  },

  fadeOut: (element: HTMLElement, duration = ANIMATION_CONFIG.durations.normal): Promise<void> => {
    return new Promise((resolve) => {
      element.style.transition = `opacity ${duration}ms ${ANIMATION_CONFIG.easing.easeOut}`;
      element.style.opacity = '0';
      
      setTimeout(() => resolve(), duration);
    });
  },

  slideIn: (element: HTMLElement, direction: 'up' | 'down' | 'left' | 'right' = 'up', duration = ANIMATION_CONFIG.durations.normal): void => {
    const transforms = {
      up: 'translateY(20px)',
      down: 'translateY(-20px)',
      left: 'translateX(20px)',
      right: 'translateX(-20px)'
    };

    element.style.transform = transforms[direction];
    element.style.opacity = '0';
    element.style.transition = `all ${duration}ms ${ANIMATION_CONFIG.easing.easeOut}`;
    
    requestAnimationFrame(() => {
      element.style.transform = 'translate(0)';
      element.style.opacity = '1';
    });
  },

  slideOut: (element: HTMLElement, direction: 'up' | 'down' | 'left' | 'right' = 'up', duration = ANIMATION_CONFIG.durations.normal): Promise<void> => {
    return new Promise((resolve) => {
      const transforms = {
        up: 'translateY(-20px)',
        down: 'translateY(20px)',
        left: 'translateX(-20px)',
        right: 'translateX(20px)'
      };

      element.style.transition = `all ${duration}ms ${ANIMATION_CONFIG.easing.easeOut}`;
      element.style.transform = transforms[direction];
      element.style.opacity = '0';
      
      setTimeout(() => resolve(), duration);
    });
  },

  scale: (element: HTMLElement, scale = 1.05, duration = ANIMATION_CONFIG.durations.fast): void => {
    element.style.transition = `transform ${duration}ms ${ANIMATION_CONFIG.easing.easeOut}`;
    element.style.transform = `scale(${scale})`;
    
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, duration);
  },

  bounce: (element: HTMLElement, intensity = 0.1, duration = ANIMATION_CONFIG.durations.normal): void => {
    const keyframes = [
      { transform: 'scale(1)', offset: 0 },
      { transform: `scale(${1 + intensity})`, offset: 0.5 },
      { transform: 'scale(1)', offset: 1 }
    ];

    element.animate(keyframes, {
      duration: duration,
      easing: ANIMATION_CONFIG.easing.bounce
    });
  },

  shake: (element: HTMLElement, intensity = 5, duration = ANIMATION_CONFIG.durations.fast): void => {
    const keyframes = [
      { transform: 'translateX(0)', offset: 0 },
      { transform: `translateX(-${intensity}px)`, offset: 0.25 },
      { transform: `translateX(${intensity}px)`, offset: 0.75 },
      { transform: 'translateX(0)', offset: 1 }
    ];

    element.animate(keyframes, {
      duration: duration,
      easing: ANIMATION_CONFIG.easing.easeInOut
    });
  },

  pulse: (element: HTMLElement, intensity = 0.05, duration = ANIMATION_CONFIG.durations.normal): void => {
    const keyframes = [
      { transform: 'scale(1)', opacity: '1', offset: 0 },
      { transform: `scale(${1 + intensity})`, opacity: '0.8', offset: 0.5 },
      { transform: 'scale(1)', opacity: '1', offset: 1 }
    ];

    element.animate(keyframes, {
      duration: duration,
      easing: ANIMATION_CONFIG.easing.easeInOut,
      iterations: Infinity
    });
  },

  // Advanced animations
  typeWriter: (element: HTMLElement, text: string, speed = 50): Promise<void> => {
    return new Promise((resolve) => {
      element.textContent = '';
      let i = 0;
      
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  },

  countUp: (element: HTMLElement, start: number, end: number, duration = 2000): Promise<void> => {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const difference = end - start;

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (difference * easeProgress));
        
        element.textContent = current.toString();
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = end.toString();
          resolve();
        }
      };
      
      requestAnimationFrame(step);
    });
  },

  progressBar: (element: HTMLElement, percentage: number, duration = ANIMATION_CONFIG.durations.normal): Promise<void> => {
    return new Promise((resolve) => {
      element.style.width = '0%';
      element.style.transition = `width ${duration}ms ${ANIMATION_CONFIG.easing.easeOut}`;
      
      requestAnimationFrame(() => {
        element.style.width = `${percentage}%`;
      });
      
      setTimeout(() => resolve(), duration);
    });
  },

  // Scroll animations
  scrollReveal: (elements: NodeListOf<Element> | Element[], threshold = 0.1): void => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          animations.slideIn(element, 'up');
          observer.unobserve(element);
        }
      });
    }, { threshold });

    elements.forEach((element) => {
      observer.observe(element);
    });
  },

  parallax: (element: HTMLElement, speed = 0.5): () => void => {
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      element.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', updateParallax);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('scroll', updateParallax);
    };
  },

  // Loading animations
  spinner: (element: HTMLElement): void => {
    const keyframes = [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' }
    ];

    element.animate(keyframes, {
      duration: 1000,
      easing: 'linear',
      iterations: Infinity
    });
  },

  skeleton: (element: HTMLElement): void => {
    element.classList.add('skeleton-loading');
    
    const keyframes = [
      { backgroundPosition: '-200px 0' },
      { backgroundPosition: 'calc(200px + 100%) 0' }
    ];

    element.animate(keyframes, {
      duration: 1300,
      easing: 'ease-in-out',
      iterations: Infinity
    });
  },

  // Card animations
  cardHover: (element: HTMLElement): () => void => {
    const handleMouseEnter = () => {
      element.style.transition = `all ${ANIMATION_CONFIG.durations.fast}ms ${ANIMATION_CONFIG.easing.easeOut}`;
      element.style.transform = 'translateY(-4px)';
      element.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translateY(0)';
      element.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    // Return cleanup function
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  },

  // Button animations
  buttonClick: (element: HTMLElement): void => {
    element.addEventListener('click', () => {
      animations.scale(element, 0.95, ANIMATION_CONFIG.durations.fast);
    });
  },

  // Page transitions
  pageTransition: {
    fadeIn: (element: HTMLElement): Promise<void> => {
      return new Promise((resolve) => {
        element.style.opacity = '0';
        element.style.transition = `opacity ${ANIMATION_CONFIG.durations.normal}ms ${ANIMATION_CONFIG.easing.easeOut}`;
        
        requestAnimationFrame(() => {
          element.style.opacity = '1';
          setTimeout(() => resolve(), ANIMATION_CONFIG.durations.normal);
        });
      });
    },

    slideFromRight: (element: HTMLElement): Promise<void> => {
      return new Promise((resolve) => {
        element.style.transform = 'translateX(100%)';
        element.style.transition = `transform ${ANIMATION_CONFIG.durations.normal}ms ${ANIMATION_CONFIG.easing.easeOut}`;
        
        requestAnimationFrame(() => {
          element.style.transform = 'translateX(0)';
          setTimeout(() => resolve(), ANIMATION_CONFIG.durations.normal);
        });
      });
    },

    slideFromLeft: (element: HTMLElement): Promise<void> => {
      return new Promise((resolve) => {
        element.style.transform = 'translateX(-100%)';
        element.style.transition = `transform ${ANIMATION_CONFIG.durations.normal}ms ${ANIMATION_CONFIG.easing.easeOut}`;
        
        requestAnimationFrame(() => {
          element.style.transform = 'translateX(0)';
          setTimeout(() => resolve(), ANIMATION_CONFIG.durations.normal);
        });
      });
    }
  },

  // Utility functions
  getRandomDelay: (min = 0, max = 500): number => {
    return Math.random() * (max - min) + min;
  },

  staggeredAnimation: (elements: NodeListOf<Element> | Element[], animationFn: Function, delay = ANIMATIONS.delays.normal): void => {
    elements.forEach((element, index) => {
      setTimeout(() => {
        animationFn(element);
      }, index * delay);
    });
  },

  createCSSAnimation: (name: string, keyframes: Record<string, any>): void => {
    const styleSheet = document.styleSheets[0];
    const keyframeRule = `@keyframes ${name} {
      ${Object.entries(keyframes).map(([key, value]) => 
        `${key} { ${Object.entries(value).map(([prop, val]) => `${prop}: ${val}`).join('; ')} }`
      ).join('\n')}
    }`;
    
    styleSheet.insertRule(keyframeRule, styleSheet.cssRules.length);
  }
};

export default animations;
