import React from 'react';
import { useScrollAnimation } from '../../hooks/useAdvancedAnimation';
import { useResponsive } from '../../hooks/useResponsive';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
  showPercentage?: boolean;
  className?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = '#3b82f6',
  height = 4,
  position = 'top',
  showPercentage = false,
  className = ''
}) => {
  const { scrollProgress } = useScrollAnimation();
  const { isReducedMotion } = useResponsive();

  const progressBarStyle: React.CSSProperties = {
    position: 'fixed',
    [position]: 0,
    left: 0,
    width: `${scrollProgress * 100}%`,
    height: `${height}px`,
    backgroundColor: color,
    transition: isReducedMotion ? 'none' : 'width 0.1s ease-out',
    zIndex: 1000,
    boxShadow: `0 0 10px ${color}40`
  };

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    [position]: 0,
    left: 0,
    width: '100%',
    height: `${height}px`,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 999
  };

  return (
    <>
      <div style={containerStyle} />
      <div className={className} style={progressBarStyle} />
      {showPercentage && (
        <div
          style={{
            position: 'fixed',
            top: position === 'top' ? `${height + 10}px` : 'auto',
            bottom: position === 'bottom' ? `${height + 10}px` : 'auto',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 1001
          }}
        >
          {Math.round(scrollProgress * 100)}%
        </div>
      )}
    </>
  );
};

interface FloatingActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  position?: {
    bottom?: number;
    right?: number;
    left?: number;
    top?: number;
  };
  size?: 'small' | 'medium' | 'large';
  color?: string;
  backgroundColor?: string;
  tooltip?: string;
  visible?: boolean;
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  icon,
  position = { bottom: 20, right: 20 },
  size = 'medium',
  color = 'white',
  backgroundColor = '#3b82f6',
  tooltip,
  visible = true,
  className = ''
}) => {
  const { isReducedMotion } = useResponsive();

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: '40px', height: '40px', fontSize: '16px' };
      case 'large':
        return { width: '64px', height: '64px', fontSize: '24px' };
      default:
        return { width: '56px', height: '56px', fontSize: '20px' };
    }
  };

  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    ...position,
    ...getSizeStyles(),
    borderRadius: '50%',
    backgroundColor,
    color,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: isReducedMotion 
      ? 'none'
      : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease',
    transform: visible ? 'scale(1)' : 'scale(0)',
    opacity: visible ? 1 : 0,
    zIndex: 1000
  };

  return (
    <button
      className={className}
      style={buttonStyle}
      onClick={onClick}
      title={tooltip}
      onMouseEnter={(e) => {
        if (!isReducedMotion) {
          e.currentTarget.style.transform = visible ? 'scale(1.1)' : 'scale(0)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isReducedMotion) {
          e.currentTarget.style.transform = visible ? 'scale(1)' : 'scale(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }
      }}
    >
      {icon}
    </button>
  );
};

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  className = '',
  style = {}
}) => {
  const { scrollY } = useScrollAnimation();
  const { isReducedMotion } = useResponsive();

  const parallaxStyle: React.CSSProperties = {
    transform: isReducedMotion ? 'none' : `translateY(${scrollY * speed}px)`,
    ...style
  };

  return (
    <div className={className} style={parallaxStyle}>
      {children}
    </div>
  );
};
