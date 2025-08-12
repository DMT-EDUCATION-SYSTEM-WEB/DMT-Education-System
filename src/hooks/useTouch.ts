import { useRef, useEffect, useState } from 'react';

interface TouchState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  isSwiping: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | null;
}

interface UseTouchReturn extends TouchState {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
}

interface UseTouchOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  swipeThreshold?: number;
  tapThreshold?: number;
}

export const useTouch = (options: UseTouchOptions = {}): UseTouchReturn => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    swipeThreshold = 50,
    tapThreshold = 10
  } = options;

  const [touchState, setTouchState] = useState<TouchState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    isSwiping: false,
    direction: null
  });

  const touchStartTimeRef = useRef<number>(0);

  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartTimeRef.current = Date.now();
    
    setTouchState({
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX: 0,
      deltaY: 0,
      isSwiping: false,
      direction: null
    });
  };

  const onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchState.startX;
    const deltaY = touch.clientY - touchState.startY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const isSwiping = distance > 10;
    
    let direction: 'left' | 'right' | 'up' | 'down' | null = null;
    
    if (isSwiping) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }
    }

    setTouchState(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX,
      deltaY,
      isSwiping,
      direction
    }));
  };

  const onTouchEnd = (e: TouchEvent) => {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - touchStartTimeRef.current;
    const { deltaX, deltaY, isSwiping } = touchState;
    
    // Handle tap (short duration, small movement)
    if (touchDuration < 300 && Math.abs(deltaX) < tapThreshold && Math.abs(deltaY) < tapThreshold) {
      onTap?.();
      return;
    }
    
    // Handle swipe gestures
    if (isSwiping) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > swipeThreshold) {
          if (deltaX > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > swipeThreshold) {
          if (deltaY > 0) {
            onSwipeDown?.();
          } else {
            onSwipeUp?.();
          }
        }
      }
    }
    
    setTouchState(prev => ({
      ...prev,
      isSwiping: false,
      direction: null
    }));
  };

  return {
    ...touchState,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap
  };
};

// Hook for touch-optimized interactions
export const useTouchElement = <T extends HTMLElement>(
  callback?: () => void,
  options: {
    hapticFeedback?: boolean;
    rippleEffect?: boolean;
    scaleOnPress?: boolean;
  } = {}
) => {
  const elementRef = useRef<T>(null);
  const [isPressed, setIsPressed] = useState(false);
  const { hapticFeedback = false, rippleEffect = false, scaleOnPress = true } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartTime = Date.now();
      setIsPressed(true);
      
      if (hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
      
      if (scaleOnPress) {
        element.style.transform = 'scale(0.95)';
      }
      
      if (rippleEffect) {
        createRipple(e, element);
      }
    };

    const handleTouchEnd = () => {
      const touchDuration = Date.now() - touchStartTime;
      setIsPressed(false);
      
      if (scaleOnPress) {
        element.style.transform = 'scale(1)';
      }
      
      // Only trigger callback for short taps
      if (touchDuration < 300) {
        callback?.();
      }
    };

    const handleTouchCancel = () => {
      setIsPressed(false);
      if (scaleOnPress) {
        element.style.transform = 'scale(1)';
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchCancel);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [callback, hapticFeedback, rippleEffect, scaleOnPress]);

  return { elementRef, isPressed };
};

// Utility function to create ripple effect
const createRipple = (e: TouchEvent, element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  
  const ripple = document.createElement('div');
  ripple.style.position = 'absolute';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.width = '0';
  ripple.style.height = '0';
  ripple.style.borderRadius = '50%';
  ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
  ripple.style.transform = 'translate(-50%, -50%)';
  ripple.style.pointerEvents = 'none';
  ripple.style.transition = 'all 0.3s ease-out';
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  // Animate ripple
  requestAnimationFrame(() => {
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.opacity = '0';
  });
  
  // Remove ripple after animation
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 300);
};
