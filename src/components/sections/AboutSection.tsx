import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      style={{
        padding: '80px 1rem',
        backgroundColor: '#f8fafc', // Light gray background instead of image
        minHeight: '600px'
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
          color: '#1f2937', // Dark gray text for light background
          marginBottom: '1rem'
        }}>
          Về DMT Education
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280', // Gray text for light background
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem'
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
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            outline: 'none',
            border: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
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
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            outline: 'none',
            border: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
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
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            outline: 'none',
            border: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
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
        <div 
          className="statistics-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginTop: '4rem',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            outline: 'none !important',
            border: 'none !important'
          }}>
          <div 
            className="stat-item"
            style={{ 
              textAlign: 'center',
              outline: 'none !important',
              border: 'none !important'
            }}
          >
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#3b82f6',
              marginBottom: '0.5rem',
              outline: 'none !important',
              border: 'none !important'
            }}>
              500+
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '1rem',
              outline: 'none !important',
              border: 'none !important'
            }}>
              Học sinh
            </div>
          </div>

          <div 
            className="stat-item"
            style={{ 
              textAlign: 'center',
              outline: 'none !important',
              border: 'none !important'
            }}
          >
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#ec4899',
              marginBottom: '0.5rem',
              outline: 'none !important',
              border: 'none !important'
            }}>
              50+
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '1rem',
              outline: 'none !important',
              border: 'none !important'
            }}>
              Giáo viên
            </div>
          </div>

          <div 
            className="stat-item"
            style={{ 
              textAlign: 'center',
              outline: 'none !important',
              border: 'none !important'
            }}
          >
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#10b981',
              marginBottom: '0.5rem',
              outline: 'none !important',
              border: 'none !important'
            }}>
              15+
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '1rem',
              outline: 'none !important',
              border: 'none !important'
            }}>
              Năm kinh nghiệm
            </div>
          </div>

          <div 
            className="stat-item"
            style={{ 
              textAlign: 'center',
              outline: 'none !important',
              border: 'none !important'
            }}
          >
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#f59e0b',
              marginBottom: '0.5rem',
              outline: 'none !important',
              border: 'none !important'
            }}>
              100+
            </div>
            <div style={{
              color: '#64748b',
              fontSize: '1rem',
              outline: 'none !important',
              border: 'none !important'
            }}>
              Giải thưởng
            </div>
          </div>
        </div>
      </div>

      {/* CSS to remove unwanted outlines */}
      <style>
        {`
          #about,
          #about *,
          #about *::before,
          #about *::after {
            outline: none !important;
            -webkit-tap-highlight-color: transparent !important;
            -webkit-focus-ring-color: transparent !important;
            -moz-outline: none !important;
          }
          
          #about *:focus,
          #about *:focus-visible,
          #about *:focus-within,
          #about *:hover,
          #about *:active {
            outline: none !important;
            outline-color: transparent !important;
            outline-width: 0 !important;
            outline-style: none !important;
            border: none !important;
            box-shadow: none !important;
          }
          
          #about div:focus,
          #about div:focus-visible,
          #about div:hover,
          #about div:active {
            outline: none !important;
            outline-color: transparent !important;
            outline-width: 0 !important;
            outline-style: none !important;
            border: none !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          }

          #about h2:focus,
          #about h3:focus,
          #about p:focus,
          #about h2:hover,
          #about h3:hover,
          #about p:hover {
            outline: none !important;
            outline-color: transparent !important;
            outline-width: 0 !important;
            outline-style: none !important;
            border: none !important;
          }

          .statistics-container,
          .statistics-container *,
          .stat-item,
          .stat-item * {
            outline: none !important;
            outline-color: transparent !important;
            outline-width: 0 !important;
            outline-style: none !important;
            border: none !important;
          }

          .statistics-container:focus,
          .statistics-container:hover,
          .stat-item:focus,
          .stat-item:hover,
          .statistics-container *:focus,
          .statistics-container *:hover,
          .stat-item *:focus,
          .stat-item *:hover {
            outline: none !important;
            outline-color: transparent !important;
            outline-width: 0 !important;
            outline-style: none !important;
            border: none !important;
            box-shadow: none !important;
          }
        `}
      </style>
    </section>
  );
};

export default AboutSection;
