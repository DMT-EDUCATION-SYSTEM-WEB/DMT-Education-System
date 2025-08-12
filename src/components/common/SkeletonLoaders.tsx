import React from 'react';
import { useResponsive } from '../../hooks/useResponsive';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
  animation?: 'pulse' | 'wave' | 'shimmer' | 'none';
  duration?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  className = '',
  style = {},
  animation = 'shimmer',
  duration = 1.5
}) => {
  const { isReducedMotion } = useResponsive();
  const animationType = isReducedMotion ? 'none' : animation;

  const getAnimation = () => {
    switch (animationType) {
      case 'pulse':
        return `pulse ${duration}s ease-in-out infinite`;
      case 'wave':
        return `wave ${duration}s ease-in-out infinite`;
      case 'shimmer':
        return `shimmer ${duration}s ease-in-out infinite`;
      default:
        return 'none';
    }
  };

  const skeletonStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    backgroundColor: '#f0f0f0',
    background: animationType === 'shimmer' 
      ? 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'
      : '#f0f0f0',
    backgroundSize: animationType === 'shimmer' ? '200% 100%' : 'auto',
    animation: getAnimation(),
    display: 'inline-block',
    ...style
  };

  return <div className={className} style={skeletonStyle} />;
};

interface SkeletonTextProps {
  lines?: number;
  width?: (string | number)[];
  lineHeight?: string | number;
  spacing?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'shimmer' | 'none';
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  width = ['100%', '80%', '60%'],
  lineHeight = '16px',
  spacing = '8px',
  className = '',
  animation = 'shimmer'
}) => {
  const getLineWidth = (index: number) => {
    if (Array.isArray(width)) {
      return width[index] || width[width.length - 1];
    }
    return width;
  };

  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          width={getLineWidth(index)}
          height={lineHeight}
          style={{
            marginBottom: index < lines - 1 ? spacing : 0
          }}
          animation={animation}
        />
      ))}
    </div>
  );
};

interface SkeletonCardProps {
  hasImage?: boolean;
  imageHeight?: string | number;
  hasTitle?: boolean;
  titleWidth?: string | number;
  hasText?: boolean;
  textLines?: number;
  hasButton?: boolean;
  buttonWidth?: string | number;
  padding?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'shimmer' | 'none';
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  hasImage = true,
  imageHeight = '200px',
  hasTitle = true,
  titleWidth = '60%',
  hasText = true,
  textLines = 2,
  hasButton = true,
  buttonWidth = '120px',
  padding = '20px',
  className = '',
  animation = 'shimmer'
}) => {
  const cardStyle: React.CSSProperties = {
    padding: typeof padding === 'number' ? `${padding}px` : padding,
    border: '1px solid #e5e5e5',
    borderRadius: '12px',
    backgroundColor: 'white'
  };

  return (
    <div className={className} style={cardStyle}>
      {hasImage && (
        <Skeleton
          width="100%"
          height={imageHeight}
          borderRadius="8px"
          animation={animation}
          style={{ marginBottom: '16px' }}
        />
      )}
      
      {hasTitle && (
        <Skeleton
          width={titleWidth}
          height="24px"
          animation={animation}
          style={{ marginBottom: '12px' }}
        />
      )}
      
      {hasText && (
        <SkeletonText
          lines={textLines}
          width={['100%', '85%']}
          lineHeight="16px"
          spacing="8px"
          animation={animation}
          style={{ marginBottom: '16px' }}
        />
      )}
      
      {hasButton && (
        <Skeleton
          width={buttonWidth}
          height="36px"
          borderRadius="18px"
          animation={animation}
        />
      )}
    </div>
  );
};

interface SkeletonListProps {
  items?: number;
  itemHeight?: string | number;
  spacing?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'shimmer' | 'none';
}

export const SkeletonList: React.FC<SkeletonListProps> = ({
  items = 5,
  itemHeight = '60px',
  spacing = '12px',
  className = '',
  animation = 'shimmer'
}) => {
  return (
    <div className={className}>
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: index < items - 1 ? spacing : 0
          }}
        >
          <Skeleton
            width="50px"
            height="50px"
            borderRadius="50%"
            animation={animation}
            style={{ marginRight: '12px' }}
          />
          <div style={{ flex: 1 }}>
            <Skeleton
              width="40%"
              height="16px"
              animation={animation}
              style={{ marginBottom: '6px' }}
            />
            <Skeleton
              width="70%"
              height="14px"
              animation={animation}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// CSS animations
const skeletonKeyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
  
  @keyframes wave {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = skeletonKeyframes;
  document.head.appendChild(style);
}
