import React, { ReactNode } from 'react';
import { useOptimizedHover } from '../hooks/useOptimizedAnimation';

interface OptimizedCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hoverEffect?: 'lift' | 'scale' | 'none';
  animationDelay?: number;
}

export const OptimizedCard: React.FC<OptimizedCardProps> = ({
  children,
  className = '',
  style = {},
  hoverEffect = 'lift',
  animationDelay = 0
}) => {
  const { elementRef, hoverProps } = useOptimizedHover();

  const baseClassName = `optimized-card ${hoverEffect !== 'none' ? `hover-${hoverEffect}` : ''} ${className}`;
  
  const combinedStyle = {
    ...style,
    animationDelay: `${animationDelay}ms`,
    ...hoverProps.style
  };

  if (hoverEffect === 'none') {
    return (
      <div
        ref={elementRef}
        className={baseClassName}
        style={combinedStyle}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      className={baseClassName}
      style={combinedStyle}
      onMouseEnter={hoverProps.onMouseEnter}
      onMouseLeave={hoverProps.onMouseLeave}
    >
      {children}
    </div>
  );
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right';
  delay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animationType = 'fade-in-up',
  delay = 0
}) => {
  const { elementRef } = useOptimizedAnimation({
    animationClass: animationType,
    delay
  });

  return (
    <div
      ref={elementRef}
      className={`${className} ${animationType}`}
      style={{
        opacity: 0,
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  );
};
