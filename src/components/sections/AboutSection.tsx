import React from 'react';
import { BackgroundSection, SECTION_BACKGROUNDS } from '../common';

const AboutSection: React.FC = () => {
  return (
    <BackgroundSection
      id="about"
      backgroundImage={SECTION_BACKGROUNDS.about.image}
      overlay={SECTION_BACKGROUNDS.about.overlay}
      overlayColor={SECTION_BACKGROUNDS.about.overlayColor}
      parallax={SECTION_BACKGROUNDS.about.parallax}
      style={{
        padding: '80px 1rem'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'white', // Changed to white for better contrast
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          Về DMT Education
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.9)', // Changed to white with transparency
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>
          Trung tâm giáo dục DMT cam kết mang đến chương trình học chất lượng cao, 
          phát triển toàn diện các kỹ năng cần thiết cho trẻ em.
        </p>

        {/* Cards Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          {/* Tầm nhìn */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'left',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              margin: '0 0 1rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              🎯
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '0.5rem'
            }}>
              Tầm Nhìn
            </h3>
            <p style={{
              color: '#64748b',
              lineHeight: 1.6
            }}>
              Trở thành trung tâm giáo dục hàng đầu, phát triển thế hệ trẻ 
              có tư duy sáng tạo và kỹ năng toàn diện.
            </p>
          </div>

          {/* Sứ mệnh */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'left',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#ec4899',
              margin: '0 0 1rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              🏆
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '0.5rem'
            }}>
              Sứ Mệnh
            </h3>
            <p style={{
              color: '#64748b',
              lineHeight: 1.6
            }}>
              Cung cấp nền giáo dục chất lượng cao, nuôi dưỡng tài năng 
              và khơi dậy tiềm năng của mỗi học sinh.
            </p>
          </div>

          {/* Giá trị cốt lõi */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'left',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              margin: '0 0 1rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              ⭐
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '0.5rem'
            }}>
              Giá Trị Cốt Lõi
            </h3>
            <p style={{
              color: '#64748b',
              lineHeight: 1.6
            }}>
              Sáng tạo, trung thực, tôn trọng và phát triển bền vững 
              là những giá trị chúng tôi hướng tới.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginTop: '4rem',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#3b82f6',
              marginBottom: '0.5rem'
            }}>
              500+
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '1rem'
            }}>
              Học sinh
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#ec4899',
              marginBottom: '0.5rem'
            }}>
              50+
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '1rem'
            }}>
              Giáo viên
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#10b981',
              marginBottom: '0.5rem'
            }}>
              15+
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '1rem'
            }}>
              Năm kinh nghiệm
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#f59e0b',
              marginBottom: '0.5rem'
            }}>
              100+
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '1rem'
            }}>
              Giải thưởng
            </div>
          </div>
        </div>
      </div>
    </BackgroundSection>
  );
};

export default AboutSection;
