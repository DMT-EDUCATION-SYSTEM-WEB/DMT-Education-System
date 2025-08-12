import React from 'react';
import { Icons } from '../common/Icons';
import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';
import { BackgroundSection, SECTION_BACKGROUNDS } from '../common';

const AchievementsSection: React.FC = () => {
  const { ref: achievementsRef, inView: achievementsInView } = useOptimizedAnimation();

  return (
    <BackgroundSection
      id="achievements"
      backgroundImage={SECTION_BACKGROUNDS.achievements.image}
      overlay={SECTION_BACKGROUNDS.achievements.overlay}
      overlayColor={SECTION_BACKGROUNDS.achievements.overlayColor}
      parallax={SECTION_BACKGROUNDS.achievements.parallax}
      style={{
        padding: '80px 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div ref={achievementsRef}>
        {/* Background decorations - now with enhanced visibility */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.3), rgba(255, 140, 0, 0.3))', // More visible on dark background
          borderRadius: '50%',
          animation: 'float 3s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '80px',
        height: '80px',
        background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))',
        borderRadius: '50%',
        animation: 'float 4s ease-in-out infinite reverse',
        animationDelay: '2s'
      }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className={`transform transition-all duration-1000 ${achievementsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              color: 'white', // Changed to white for better contrast with dark background
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Thành tựu & Chứng chỉ
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.9)', // Changed to white with transparency
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
              DMT Education tự hào với những thành tích xuất sắc của học sinh trong các kỳ thi quan trọng
            </p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div 
          className={`transform transition-all duration-1000 delay-200 ${achievementsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '60px'
          }}
        >
          {/* IELTS Certificate */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)',
              borderRadius: '20px',
              padding: '30px 20px',
              textAlign: 'center',
              border: '2px solid rgba(220, 38, 38, 0.2)',
              boxShadow: '0 15px 35px rgba(220, 38, 38, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
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
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, #dc2626, #f43f5e)'
            }}></div>
            <div style={{
              marginBottom: '15px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 8px 20px rgba(220, 38, 38, 0.3)'
              }}>
                <Icons.Trophy />
              </div>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '8px'
            }}>
              IELTS Official
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '15px'
            }}>
              Trung tâm đào tạo IELTS được ủy quyền
            </p>
            <div style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#dc2626'
            }}>
              95%
            </div>
            <p style={{
              fontSize: '12px',
              color: '#9ca3af'
            }}>
              Tỷ lệ đậu band 6.5+
            </p>
          </div>

          {/* Cambridge Certificate */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)',
              borderRadius: '20px',
              padding: '30px 20px',
              textAlign: 'center',
              border: '2px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 15px 35px rgba(59, 130, 246, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.1)';
            }}
          >
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)'
            }}></div>
            <div style={{
              marginBottom: '15px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
              }}>
                <Icons.Star />
              </div>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '8px'
            }}>
              Cambridge
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '15px'
            }}>
              Preparation Centre
            </p>
            <div style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#3b82f6'
            }}>
              98%
            </div>
            <p style={{
              fontSize: '12px',
              color: '#9ca3af'
            }}>
              Tỷ lệ đậu chứng chỉ
            </p>
          </div>

          {/* Quality Education */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #f0fdf4 100%)',
              borderRadius: '20px',
              padding: '30px 20px',
              textAlign: 'center',
              border: '2px solid rgba(34, 197, 94, 0.2)',
              boxShadow: '0 15px 35px rgba(34, 197, 94, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(34, 197, 94, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(34, 197, 94, 0.1)';
            }}
          >
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, #22c55e, #16a34a)'
            }}></div>
            <div style={{
              marginBottom: '15px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
              }}>
                <Icons.Graduation />
              </div>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '8px'
            }}>
              Giáo dục chất lượng
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '15px'
            }}>
              Chứng nhận ISO 9001:2015
            </p>
            <div style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#22c55e'
            }}>
              15+
            </div>
            <p style={{
              fontSize: '12px',
              color: '#9ca3af'
            }}>
              Năm kinh nghiệm
            </p>
          </div>

          {/* Student Achievement */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #fefbf2 100%)',
              borderRadius: '20px',
              padding: '30px 20px',
              textAlign: 'center',
              border: '2px solid rgba(245, 158, 11, 0.2)',
              boxShadow: '0 15px 35px rgba(245, 158, 11, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(245, 158, 11, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(245, 158, 11, 0.1)';
            }}
          >
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, #f59e0b, #d97706)'
            }}></div>
            <div style={{
              marginBottom: '15px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)'
              }}>
                <Icons.Target />
              </div>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '8px'
            }}>
              Thành tích xuất sắc
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '15px'
            }}>
              Học sinh đạt điểm cao
            </p>
            <div style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#f59e0b'
            }}>
              5000+
            </div>
            <p style={{
              fontSize: '12px',
              color: '#9ca3af'
            }}>
              Học sinh thành công
            </p>
          </div>
        </div>

        {/* Statistics Row */}
        <div 
          className={`transform transition-all duration-1000 delay-400 ${achievementsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '10px'
            }}>
              15+
            </div>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              fontWeight: '600'
            }}>
              Năm kinh nghiệm
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '10px'
            }}>
              5000+
            </div>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              fontWeight: '600'
            }}>
              Học sinh thành công
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '10px'
            }}>
              30+
            </div>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              fontWeight: '600'
            }}>
              Giảng viên chuyên nghiệp
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '10px'
            }}>
              95%
            </div>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              fontWeight: '600'
            }}>
              Tỷ lệ đậu IELTS 6.5+
            </p>
          </div>
        </div>
      </div>
      </div>
    </BackgroundSection>
  );
};

export default AchievementsSection;
