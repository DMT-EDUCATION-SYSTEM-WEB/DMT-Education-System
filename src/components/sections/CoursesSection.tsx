import React from 'react';
import { COLORS } from '../../constants';

const CoursesSection: React.FC = () => {
  return (
    <section
      id="courses"
      className="dmt-smooth dmt-spotlight"
      onMouseMove={e => {
        const el = e.currentTarget as HTMLElement;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--mx', `${x}%`);
        el.style.setProperty('--my', `${y}%`);
        el.setAttribute('data-mouse', 'true');
      }}
      style={{
        padding: '80px 20px',
        textAlign: 'center',
        background: `${COLORS.backgrounds.section}, ${COLORS.backgrounds.pattern}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: '100px',
          height: '100px',
          background: 'rgba(220, 38, 38, 0.04)',
          borderRadius: '50%',
          animation: 'float 7s ease-in-out infinite',
        }}
      ></div>

      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '12%',
          width: '80px',
          height: '80px',
          background: 'rgba(220, 38, 38, 0.03)',
          borderRadius: '50%',
          animation: 'float 9s ease-in-out infinite reverse',
        }}
      ></div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '40px',
            fontWeight: '700',
            color: COLORS.neutral.gray900,
            marginBottom: '16px',
          }}
        >
          Khóa học của chúng tôi
        </h2>
        <p
          style={{
            fontSize: '18px',
            color: COLORS.neutral.gray600,
            marginBottom: '60px',
            maxWidth: '600px',
            margin: '0 auto 60px',
          }}
        >
          Chương trình học được thiết kế khoa học, phù hợp với từng độ tuổi
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginBottom: '60px',
          }}
        >
          {/* Course 1 - Math */}
          <div
            className="dmt-card dmt-card-hover dmt-shine dmt-tilt"
            style={{
              background: '#ffffff',
              padding: '40px 30px',
              borderRadius: '16px',
              border: '1px solid #f1f5f9',
              borderTop: '4px solid #dc2626',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              🧮
            </div>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '16px',
              }}
            >
              Toán tư duy
            </h3>
            <p
              style={{
                color: '#64748b',
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '24px',
              }}
            >
              Phát triển tư duy logic và khả năng giải quyết vấn đề thông qua
              các bài toán thú vị
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '20px',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  background: '#f8fafc',
                  padding: '4px 12px',
                  borderRadius: '12px',
                }}
              >
                6-12 tuổi
              </span>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#dc2626',
                }}
              >
                2.5M VNĐ
              </span>
            </div>
          </div>

          {/* Course 2 - Literature */}
          <div
            className="dmt-card dmt-card-hover dmt-shine dmt-tilt"
            style={{
              background: '#ffffff',
              padding: '40px 30px',
              borderRadius: '16px',
              border: '1px solid #f1f5f9',
              borderTop: '4px solid #3b82f6',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              📖
            </div>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '16px',
              }}
            >
              Ngữ văn sáng tạo
            </h3>
            <p
              style={{
                color: '#64748b',
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '24px',
              }}
            >
              Khơi dậy khả năng sáng tạo và tư duy phê phán qua văn học
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '20px',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  background: '#f8fafc',
                  padding: '4px 12px',
                  borderRadius: '12px',
                }}
              >
                8-15 tuổi
              </span>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#3b82f6',
                }}
              >
                2.2M VNĐ
              </span>
            </div>
          </div>

          {/* Course 3 - IELTS */}
          <div
            className="dmt-card dmt-card-hover dmt-shine dmt-tilt"
            style={{
              background: '#ffffff',
              padding: '40px 30px',
              borderRadius: '16px',
              border: '1px solid #f1f5f9',
              borderTop: '4px solid #10b981',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              🌍
            </div>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '16px',
              }}
            >
              IELTS Foundation
            </h3>
            <p
              style={{
                color: '#64748b',
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '24px',
              }}
            >
              Xây dựng nền tảng tiếng Anh vững chắc cho kỳ thi IELTS
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '20px',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  background: '#f8fafc',
                  padding: '4px 12px',
                  borderRadius: '12px',
                }}
              >
                12+ tuổi
              </span>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#10b981',
                }}
              >
                3.5M VNĐ
              </span>
            </div>
          </div>

          {/* Course 4 - Programming */}
          <div
            className="dmt-card dmt-card-hover dmt-shine dmt-tilt"
            style={{
              background: '#ffffff',
              padding: '40px 30px',
              borderRadius: '16px',
              border: '1px solid #f1f5f9',
              borderTop: '4px solid #f59e0b',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              💻
            </div>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '16px',
              }}
            >
              Lập trình cơ bản
            </h3>
            <p
              style={{
                color: '#64748b',
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '24px',
              }}
            >
              Giới thiệu thế giới lập trình qua các dự án thực tế thú vị
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '20px',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  background: '#f8fafc',
                  padding: '4px 12px',
                  borderRadius: '12px',
                }}
              >
                10+ tuổi
              </span>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#f59e0b',
                }}
              >
                3.0M VNĐ
              </span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          style={{
            background: '#ffffff',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid #f1f5f9',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h3
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '16px',
            }}
          >
            Tư vấn chương trình học phù hợp
          </h3>
          <p
            style={{
              color: '#64748b',
              fontSize: '16px',
              marginBottom: '24px',
            }}
          >
            Đội ngũ chuyên gia của chúng tôi sẽ tư vấn chương trình học phù hợp
            nhất cho con bạn
          </p>
          <button
            style={{
              background: COLORS.primary.main,
              color: 'white',
              padding: '12px 32px',
              borderRadius: '25px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.25)',
              transition: 'all 0.3s ease',
            }}
          >
            Đăng ký tư vấn miễn phí
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          
          #courses * {
            outline: none !important;
            -webkit-tap-highlight-color: transparent !important;
          }
          
          #courses *:focus,
          #courses *:focus-visible,
          #courses *:hover {
            outline: none !important;
          }
          
          #courses div:focus {
            outline: none !important;
            border: none !important;
          }
        `}
      </style>
    </section>
  );
};

export default CoursesSection;
