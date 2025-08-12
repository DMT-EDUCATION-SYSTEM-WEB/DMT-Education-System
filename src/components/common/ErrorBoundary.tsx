import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error; resetError: () => void }> = ({ 
  error, 
  resetError 
}) => {
  return (
    <div style={{
      padding: '40px 20px',
      textAlign: 'center',
      backgroundColor: '#fef2f2',
      border: '2px solid #fecaca',
      borderRadius: '15px',
      margin: '20px',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <div style={{
        fontSize: '48px',
        marginBottom: '20px'
      }}>
        😅
      </div>
      
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#dc2626',
        marginBottom: '15px'
      }}>
        Oops! Có lỗi xảy ra
      </h2>
      
      <p style={{
        fontSize: '16px',
        color: '#6b7280',
        marginBottom: '20px',
        lineHeight: '1.5'
      }}>
        Đã xảy ra lỗi không mong muốn. Đừng lo lắng, chúng tôi đã ghi nhận và sẽ khắc phục sớm.
      </p>

      {process.env.NODE_ENV === 'development' && error && (
        <details style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          textAlign: 'left'
        }}>
          <summary style={{
            cursor: 'pointer',
            fontWeight: '600',
            marginBottom: '10px'
          }}>
            Chi tiết lỗi (Development)
          </summary>
          <pre style={{
            fontSize: '12px',
            color: '#dc2626',
            overflow: 'auto',
            whiteSpace: 'pre-wrap'
          }}>
            {error.message}
            {error.stack}
          </pre>
        </details>
      )}

      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={resetError}
          style={{
            background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
          }}
        >
          Thử lại
        </button>
        
        <button
          onClick={() => window.location.reload()}
          style={{
            background: 'white',
            color: '#6b7280',
            padding: '12px 24px',
            borderRadius: '25px',
            border: '2px solid #e5e7eb',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#dc2626';
            e.currentTarget.style.color = '#dc2626';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.color = '#6b7280';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Tải lại trang
        </button>
      </div>

      <p style={{
        fontSize: '12px',
        color: '#9ca3af',
        marginTop: '20px'
      }}>
        Nếu lỗi vẫn tiếp tục, vui lòng liên hệ: <strong>077 230 5566</strong>
      </p>
    </div>
  );
};

export default ErrorBoundary;