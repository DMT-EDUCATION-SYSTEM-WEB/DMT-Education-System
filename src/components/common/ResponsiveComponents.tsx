import React from 'react';
import { useResponsive } from '../../hooks/useResponsive';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: {
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
    '2xl'?: string | number;
  };
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  style = {},
  columns = {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
    '2xl': 4
  },
  gap = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    '2xl': 36
  }
}) => {
  const { breakpoint } = useResponsive();
  
  // Get current values based on breakpoint
  const getCurrentValue = (values: any) => {
    if (breakpoint === 'xs') return values.xs || values.sm || values.md || values.lg || values.xl || values['2xl'];
    if (breakpoint === 'sm') return values.sm || values.md || values.lg || values.xl || values['2xl'];
    if (breakpoint === 'md') return values.md || values.lg || values.xl || values['2xl'];
    if (breakpoint === 'lg') return values.lg || values.xl || values['2xl'];
    if (breakpoint === 'xl') return values.xl || values['2xl'];
    return values['2xl'] || values.xl || values.lg || values.md || values.sm || values.xs;
  };

  const currentColumns = getCurrentValue(columns);
  const currentGap = getCurrentValue(gap);

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
    gap: typeof currentGap === 'number' ? `${currentGap}px` : currentGap,
    width: '100%',
    ...style
  };

  return (
    <div className={className} style={gridStyle}>
      {children}
    </div>
  );
};

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxWidth?: {
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
    '2xl'?: string | number;
  };
  padding?: {
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
    '2xl'?: string | number;
  };
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  style = {},
  maxWidth = {
    xs: '100%',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  padding = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48
  }
}) => {
  const { breakpoint } = useResponsive();
  
  const getCurrentValue = (values: any) => {
    if (breakpoint === 'xs') return values.xs || values.sm || values.md || values.lg || values.xl || values['2xl'];
    if (breakpoint === 'sm') return values.sm || values.md || values.lg || values.xl || values['2xl'];
    if (breakpoint === 'md') return values.md || values.lg || values.xl || values['2xl'];
    if (breakpoint === 'lg') return values.lg || values.xl || values['2xl'];
    if (breakpoint === 'xl') return values.xl || values['2xl'];
    return values['2xl'] || values.xl || values.lg || values.md || values.sm || values.xs;
  };

  const currentMaxWidth = getCurrentValue(maxWidth);
  const currentPadding = getCurrentValue(padding);

  const containerStyle: React.CSSProperties = {
    maxWidth: typeof currentMaxWidth === 'number' ? `${currentMaxWidth}px` : currentMaxWidth,
    margin: '0 auto',
    padding: typeof currentPadding === 'number' ? `0 ${currentPadding}px` : currentPadding,
    width: '100%',
    ...style
  };

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  );
};

interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fontSize?: {
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
    '2xl'?: string | number;
  };
  lineHeight?: {
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
    '2xl'?: string | number;
  };
  as?: keyof JSX.IntrinsicElements;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  className = '',
  style = {},
  fontSize = {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22,
    '2xl': 24
  },
  lineHeight = {
    xs: 1.4,
    sm: 1.5,
    md: 1.6,
    lg: 1.6,
    xl: 1.7,
    '2xl': 1.7
  },
  as: Component = 'p'
}) => {
  const { breakpoint } = useResponsive();
  
  const getCurrentValue = (values: any) => {
    if (breakpoint === 'xs') return values.xs || values.sm || values.md || values.lg || values.xl || values['2xl'];
    if (breakpoint === 'sm') return values.sm || values.md || values.lg || values.xl || values['2xl'];
    if (breakpoint === 'md') return values.md || values.lg || values.xl || values['2xl'];
    if (breakpoint === 'lg') return values.lg || values.xl || values['2xl'];
    if (breakpoint === 'xl') return values.xl || values['2xl'];
    return values['2xl'] || values.xl || values.lg || values.md || values.sm || values.xs;
  };

  const currentFontSize = getCurrentValue(fontSize);
  const currentLineHeight = getCurrentValue(lineHeight);

  const textStyle: React.CSSProperties = {
    fontSize: typeof currentFontSize === 'number' ? `${currentFontSize}px` : currentFontSize,
    lineHeight: currentLineHeight,
    ...style
  };

  return (
    <Component className={className} style={textStyle}>
      {children}
    </Component>
  );
};
