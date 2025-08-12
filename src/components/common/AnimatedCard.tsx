import React, { useState, useRef } from 'react';
import { useAdvancedAnimation, useParallax } from '../../hooks/useAdvancedAnimation';
import { useTouchElement } from '../../hooks/useTouch';
import { useResponsive } from '../../hooks/useResponsive';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hoverEffect?: 'lift' | 'tilt' | 'glow' | 'scale' | 'none';
  clickEffect?: 'ripple' | 'scale' | 'pulse' | 'none';
  parallaxSpeed?: number;
  animationDelay?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  style = {},
  hoverEffect = 'lift',
  clickEffect = 'ripple',
  parallaxSpeed = 0,
  animationDelay = 0,
  onClick,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTouch } = useResponsive();
  
  const { ref: animationRef, progress } = useAdvancedAnimation({
    delay: animationDelay,
    duration: 800,
    easing: 'back'
  });
  
  const parallaxOffset = useParallax(parallaxSpeed);
  
  const { elementRef: touchRef, isPressed } = useTouchElement(onClick, {
    hapticFeedback: true,
    rippleEffect: clickEffect === 'ripple',
    scaleOnPress: clickEffect === 'scale'
  });

  const handleMouseEnter = () => {
    if (!isTouch) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isTouch) {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTouch && hoverEffect === 'tilt' && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePosition({ x, y });
    }
  };

  const getHoverTransform = () => {
    if (disabled) return 'none';
    
    switch (hoverEffect) {
      case 'lift':
        return isHovered ? 'translateY(-8px)' : 'translateY(0)';
      case 'tilt':
        return isHovered 
          ? `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg) translateZ(20px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      case 'scale':
        return isHovered ? 'scale(1.05)' : 'scale(1)';
      default:
        return 'none';
    }
  };

  const getClickTransform = () => {
    if (disabled) return '';
    
    switch (clickEffect) {
      case 'scale':
        return isPressed ? 'scale(0.95)' : '';
      case 'pulse':
        return isPressed ? 'scale(1.1)' : '';
      default:
        return '';
    }
  };

  const getBoxShadow = () => {
    if (disabled) return '0 4px 6px rgba(0, 0, 0, 0.1)';
    
    let baseShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    
    if (hoverEffect === 'lift' && isHovered) {
      baseShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    } else if (hoverEffect === 'glow' && isHovered) {
      baseShadow = '0 8px 32px rgba(59, 130, 246, 0.3), 0 4px 6px rgba(0, 0, 0, 0.1)';
    } else if (hoverEffect === 'tilt' && isHovered) {
      baseShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
    }
    
    return baseShadow;
  };

  const combinedRef = (node: HTMLDivElement | null) => {
    animationRef(node);
    if (touchRef) {
      (touchRef as any).current = node;
    }
    cardRef.current = node;
  };

  const cardStyle: React.CSSProperties = {
    transform: `
      ${getHoverTransform()} 
      ${getClickTransform()}
      translateY(${parallaxOffset}px)
      translateY(${(1 - progress) * 30}px)
    `,
    opacity: progress,
    boxShadow: getBoxShadow(),
    transition: disabled 
      ? 'none' 
      : `all 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)`,
    cursor: disabled ? 'default' : (onClick ? 'pointer' : 'default'),
    borderRadius: '16px',
    background: 'white',
    overflow: 'hidden',
    position: 'relative',
    filter: disabled ? 'grayscale(0.5) opacity(0.7)' : 'none',
    ...style
  };

  return (
    <div
      ref={combinedRef}
      className={className}
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={disabled ? undefined : onClick}
    >
      {/* Shimmer effect for loading */}
      {progress < 1 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `-100%`,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: `shimmer 1.5s ease-in-out`,
            zIndex: 1
          }}
        />
      )}
      
      {/* Hover overlay for glow effect */}
      {hoverEffect === 'glow' && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, rgba(59, 130, 246, 0.1), transparent 50%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

// Keyframes for shimmer effect
const shimmerKeyframes = `
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerKeyframes;
  document.head.appendChild(style);
}
