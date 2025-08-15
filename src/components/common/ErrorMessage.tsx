import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#FEF2F2',
      border: '1px solid #FECACA',
      borderRadius: '8px',
      margin: '1rem 0'
    }}>
      <div style={{
        color: '#DC2626',
        fontSize: '1.125rem',
        fontWeight: '600',
        marginBottom: '1rem'
      }}>
        ⚠️ Có lỗi xảy ra
      </div>
      
      <p style={{
        color: '#7F1D1D',
        fontSize: '0.875rem',
        marginBottom: onRetry ? '1.5rem' : '0'
      }}>
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#DC2626',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B91C1C'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#DC2626'}
        >
          Thử lại
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
