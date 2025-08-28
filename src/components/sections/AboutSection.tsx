import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      style={{
        padding: '80px 1rem',
        backgroundColor: '#ffffff',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '2.25rem',
              lineHeight: 1.2,
              fontWeight: 800,
              color: '#111827',
              marginBottom: '0.75rem',
            }}
          >
            Về DMT Education
          </h2>
          <p
            style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            Chúng tôi theo đuổi trải nghiệm học tập tinh gọn, hiệu quả và hiện
            đại cho học sinh ở nhiều bậc học khác nhau.
          </p>
        </div>

        {/* Minimal rows (no cards, no shadows) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '16px',
            marginTop: '28px',
          }}
        >
          {/* Row: Tầm nhìn */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '20px 22px',
              border: '1px solid #e5e7eb',
              borderRadius: '14px',
              background: 'transparent',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f3f4f6',
                color: '#111827',
                fontSize: '22px',
                flex: '0 0 auto',
              }}
            >
              🎯
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: '6px',
                }}
              >
                Tầm nhìn
              </div>
              <p style={{ color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                Trở thành trung tâm giáo dục đáng tin cậy, dẫn dắt thế hệ trẻ
                phát triển tư duy sáng tạo và năng lực toàn diện.
              </p>
            </div>
          </div>

          {/* Row: Sứ mệnh */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '20px 22px',
              border: '1px solid #e5e7eb',
              borderRadius: '14px',
              background: 'transparent',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f3f4f6',
                color: '#111827',
                fontSize: '22px',
                flex: '0 0 auto',
              }}
            >
              🏆
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: '6px',
                }}
              >
                Sứ mệnh
              </div>
              <p style={{ color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                Xây dựng chương trình học chất lượng cao, chú trọng nền tảng bền
                vững và khơi dậy tiềm năng của từng học sinh.
              </p>
            </div>
          </div>

          {/* Row: Giá trị cốt lõi */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '20px 22px',
              border: '1px solid #e5e7eb',
              borderRadius: '14px',
              background: 'transparent',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f3f4f6',
                color: '#111827',
                fontSize: '22px',
                flex: '0 0 auto',
              }}
            >
              ⭐
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: '6px',
                }}
              >
                Giá trị cốt lõi
              </div>
              <p style={{ color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                Sáng tạo, trung thực, tôn trọng, hiệu quả và phát triển bền
                vững.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics: clean, flat */}
        <div style={{ marginTop: '36px' }}>
          <div
            style={{
              height: '1px',
              background: '#e5e7eb',
              margin: '0 0 24px 0',
            }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
            }}
          >
            {[
              { value: '500+', label: 'Học sinh' },
              { value: '50+', label: 'Giáo viên' },
              { value: '15+', label: 'Năm kinh nghiệm' },
              { value: '100+', label: 'Giải thưởng' },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#111827',
                    marginBottom: '4px',
                  }}
                >
                  {item.value}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
