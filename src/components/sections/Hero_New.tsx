import React from 'react';
import { Icons } from '../common/Icons';
import { BackgroundSection, SECTION_BACKGROUNDS } from '../common';

const Hero: React.FC = () => {
  return (
    <BackgroundSection
      id="home"
      backgroundImage={SECTION_BACKGROUNDS.hero.image}
      overlay={SECTION_BACKGROUNDS.hero.overlay}
      overlayColor={SECTION_BACKGROUNDS.hero.overlayColor}
      parallax={SECTION_BACKGROUNDS.hero.parallax}
      style={{
        padding: '100px 1rem',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Hero Left Side - Content */}
          <div>
            <h1 className="fade-in-up" style={{
              fontSize: '52px',
              fontWeight: '800',
              color: 'white',
              lineHeight: '1.1',
              marginBottom: '25px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Phát triển{' '}
              <span style={{
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Tư duy Logic
              </span>
              {' '}& Sáng tạo
            </h1>
            
            <p className="fade-in-up stagger-2" style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '35px',
              lineHeight: '1.7',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
              Phương pháp giáo dục tiên tiến, giúp học sinh phát triển tư duy logic, 
              sáng tạo và kỹ năng giải quyết vấn đề một cách hiệu quả với công nghệ hiện đại.
            </p>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <button className="hover-scale fade-in-up" style={{
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '30px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(220, 38, 38, 0.3)'
              }}>
                Bắt đầu học ngay
              </button>
              <button className="hover-scale fade-in-up stagger-1" style={{
                border: '2px solid white',
                color: 'white',
                padding: '13px 28px',
                borderRadius: '30px',
                background: 'rgba(255, 255, 255, 0.1)',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}>
                Tìm hiểu thêm
              </button>
            </div>
          </div>

          {/* Hero Right Side - Visual Elements */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            padding: '20px'
          }}>
            {/* Feature Cards */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '24px'
              }}>
                <Icons.Book />
              </div>
              <h4 style={{
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Chương trình đa dạng
              </h4>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                lineHeight: '1.4'
              }}>
                Toán học, IELTS, Lập trình
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '24px'
              }}>
                <Icons.Teacher />
              </div>
              <h4 style={{
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Giáo viên chuyên nghiệp
              </h4>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                lineHeight: '1.4'
              }}>
                Đội ngũ giàu kinh nghiệm
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '24px'
              }}>
                <Icons.Star />
              </div>
              <h4 style={{
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Chứng chỉ quốc tế
              </h4>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                lineHeight: '1.4'
              }}>
                Được công nhận toàn cầu
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '24px'
              }}>
                <Icons.Graduation />
              </div>
              <h4 style={{
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Phát triển IQ & EQ
              </h4>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                lineHeight: '1.4'
              }}>
                Kích thích tiềm năng học tập toàn diện
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Stats */}
        <div style={{
          gridColumn: '1 / -1',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          marginTop: '40px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <Icons.Trophy /> Thành tích nổi bật
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#dc2626',
                marginBottom: '5px'
              }}>
                5,000+
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                Học sinh tốt nghiệp
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#f43f5e',
                marginBottom: '5px'
              }}>
                98%
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                Tỷ lệ hài lòng
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#10b981',
                marginBottom: '5px'
              }}>
                15+
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                Năm kinh nghiệm
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundSection>
  );
};

export default Hero;
