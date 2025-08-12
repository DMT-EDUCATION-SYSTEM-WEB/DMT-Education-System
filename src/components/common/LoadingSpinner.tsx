import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = '#dc2626',
  text = 'Đang tải...'
}) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  const textSizeMap = {
    small: '12px',
    medium: '14px',
    large: '16px'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: '20px'
    }}>
      <div
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          border: `3px solid rgba(${color === '#dc2626' ? '220, 38, 38' : '156, 163, 175'}, 0.1)`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      {text && (
        <p style={{
          margin: 0,
          fontSize: textSizeMap[size],
          color: '#6b7280',
          fontWeight: '500'
        }}>
          {text}
        </p>
      )}
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;