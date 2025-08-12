import React, { ReactNode } from 'react';
import { useOptimizedAnimation, useOptimizedHover } from '../../hooks/useOptimizedAnimation';

interface OptimizedCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animationClass?: string;
  delay?: number;
  hoverEffect?: boolean | string;
}

export const OptimizedCard: React.FC<OptimizedCardProps> = ({
  children,
  className = '',
  style = {},
  animationClass = 'fade-in-up',
  delay = 0,
  hoverEffect = true
}) => {
  const { ref: animationRef, inView } = useOptimizedAnimation({ animationClass, delay });
  const { ref: hoverRef, isHovered } = useOptimizedHover();

  return (
    <div
      ref={hoverEffect ? hoverRef : animationRef}
      className={`optimized-card ${className} ${animationClass} ${inView ? 'animate' : ''} ${isHovered ? 'hovered' : ''}`}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out'
      }}
    >
      {children}
    </div>
  );
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animationClass?: string;
  delay?: number;
  id?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  style = {},
  animationClass = 'fade-in-up',
  delay = 0,
  id
}) => {
  const { ref, inView } = useOptimizedAnimation({ animationClass, delay });

  return (
    <section
      ref={ref}
      id={id}
      className={`animated-section ${className} ${animationClass} ${inView ? 'animate' : ''}`}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out'
      }}
    >
      {children}
    </section>
  );
};
