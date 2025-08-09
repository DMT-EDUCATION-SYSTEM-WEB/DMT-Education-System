import React from 'react';

const Spinner: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => {
  const style: React.CSSProperties = { width: size, height: size };
  return (
    <span
      style={style}
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent text-primary-600 ${className}`}
    />
  );
};

export default Spinner;