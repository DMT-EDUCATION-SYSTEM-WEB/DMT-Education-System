import { AnimatedSection } from '../common/OptimizedCard';
import { Icons } from '../common/Icons';

const SponsorsSection = () => {
  return (
    <AnimatedSection
      style={{
        padding: '80px 1rem 40px',
        backgroundColor: '#f8fafc',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Elements */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-150px',
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(168, 85, 247, 0.1))',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Special Offer */}
        <div style={{
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '60px',
          position: 'relative',
          overflow: 'hidden',
          color: 'white',
          boxShadow: '0 20px 40px rgba(251, 191, 36, 0.3)'
        }}>
          {/* Floating decorations */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '30px',
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              animation: 'float 3s ease-in-out infinite'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              right: '40px',
              width: '30px',
              height: '30px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              animation: 'float 4s ease-in-out infinite reverse'
            }}
          />

          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            opacity: 0.9
          }}>
            ✨ Ưu đại đặc biệt
          </div>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '800',
            marginBottom: '15px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            Giảm 30% học phí
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '25px',
            opacity: 0.95,
            lineHeight: '1.5'
          }}>
            Dành cho 100 học viên đăng ký sớm các khóa học lập trình
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            <button
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#f59e0b',
                border: 'none',
                borderRadius: '12px',
                padding: '15px 30px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              Đăng ký ngay
            </button>
            <button
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '13px 28px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Tìm hiểu thêm
            </button>
          </div>
          <p style={{
            fontSize: '13px',
            marginTop: '15px',
            opacity: 0.8
          }}>
            Chương trình có hiệu lực đến hết ngày 30/09/2025
          </p>
        </div>

        {/* Sponsors */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #111827, #374151)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '15px'
            }}>
              Đối tác và nhà tài trợ
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              DMT Education tự hào được đồng hành cùng các đối tác uy tín
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Vietcombank */}
            <div 
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)',
                borderRadius: '20px',
                padding: '30px 20px',
                textAlign: 'center',
                boxShadow: '0 15px 35px rgba(30, 64, 175, 0.1)',
                border: '2px solid rgba(30, 64, 175, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(30, 64, 175, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(30, 64, 175, 0.1)';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '24px',
                color: 'white',
                boxShadow: '0 8px 20px rgba(30, 64, 175, 0.3)'
              }}>
                <Icons.Bank />
              </div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '8px'
              }}>
                Ngân hàng Vietcombank
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                Đối tác tài chính uy tín
              </p>
            </div>

            {/* Đại học Quốc gia TP.HCM */}
            <div 
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #f0fdf4 100%)',
                borderRadius: '20px',
                padding: '30px 20px',
                textAlign: 'center',
                boxShadow: '0 15px 35px rgba(5, 150, 105, 0.1)',
                border: '2px solid rgba(5, 150, 105, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(5, 150, 105, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(5, 150, 105, 0.1)';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #059669, #10b981)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '24px',
                color: 'white',
                boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)'
              }}>
                <Icons.Bank />
              </div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '8px'
              }}>
                Đại học Quốc gia TP.HCM
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                Đối tác giáo dục hàng đầu
              </p>
            </div>

            {/* Microsoft Education */}
            <div 
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #faf5ff 100%)',
                borderRadius: '20px',
                padding: '30px 20px',
                textAlign: 'center',
                boxShadow: '0 15px 35px rgba(124, 58, 237, 0.1)',
                border: '2px solid rgba(124, 58, 237, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(124, 58, 237, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(124, 58, 237, 0.1)';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '24px',
                color: 'white',
                boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)'
              }}>
                <Icons.Teacher />
              </div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '8px'
              }}>
                Microsoft Education
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                Đối tác công nghệ toàn cầu
              </p>
            </div>

            {/* British Council */}
            <div 
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)',
                borderRadius: '20px',
                padding: '30px 20px',
                textAlign: 'center',
                boxShadow: '0 15px 35px rgba(220, 38, 38, 0.1)',
                border: '2px solid rgba(220, 38, 38, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(220, 38, 38, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(220, 38, 38, 0.1)';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '24px',
                color: 'white',
                boxShadow: '0 8px 20px rgba(220, 38, 38, 0.3)'
              }}>
                <Icons.Graduation />
              </div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '8px'
              }}>
                British Council
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                Đối tác giáo dục quốc tế
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default SponsorsSection;
