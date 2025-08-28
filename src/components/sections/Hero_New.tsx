import React from 'react';
import { COLORS } from '../../constants';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="dmt-smooth"
      style={{
        padding: '90px 1rem 70px',
        background: '#fff7ed',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'rgba(220, 38, 38, 0.03)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite',
        }}
      ></div>

      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'rgba(220, 38, 38, 0.02)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      ></div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* Left column */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 14px',
              borderRadius: 9999,
              background: 'rgba(220,38,38,0.08)',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#dc2626',
              }}
            />
            <span style={{ fontWeight: 800, fontSize: 12, color: '#dc2626' }}>
              DMT EDUCATION
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4.8vw, 3.2rem)',
              fontWeight: 900,
              color: COLORS.neutral.gray900,
              lineHeight: '1.15',
              marginBottom: '14px',
            }}
          >
            Học viện định hướng tư duy cho học sinh Việt Nam
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              color: COLORS.neutral.gray600,
              marginBottom: '26px',
              lineHeight: '1.7',
              maxWidth: '640px',
            }}
          >
            Phương pháp học theo tư duy và bản chất, kết hợp nền tảng công nghệ
            hỗ trợ học tập toàn diện.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px' }}>
            {[
              'Phương pháp học theo tư duy và bản chất',
              'Nền tảng công nghệ hỗ trợ học tập toàn diện',
              'Đội ngũ giáo viên tận tâm, kinh nghiệm',
              'Lộ trình cho IELTS, Toán THCS/THPT, IC3, Starters, Movers',
            ].map((t, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: '#fee2e2',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#dc2626',
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  ✓
                </span>
                <span style={{ color: COLORS.neutral.gray700 }}>{t}</span>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="dmt-btn dmt-btn-premium">Đăng ký tư vấn</button>
            <button className="dmt-btn dmt-btn-outline">Tìm hiểu thêm</button>
          </div>
        </div>
        {/* Right column: image collage */}
        <div
          aria-hidden
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
        >
          {[
            '/confident-teacher-explaining-lesson-pupils.jpg',
            '/little-classmates-discussing-lesson-doing-task.jpg',
            '/front-view-school-covid-concept.jpg',
            '/young-boy-playing-aviator-toy-air-plane-imagination-dreaming-being-pilot-future-business-district-urban.jpg',
          ].map((src, idx) => (
            <div
              key={idx}
              className="dmt-card dmt-shine"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 16,
                height: idx % 3 === 0 ? 200 : 160,
              }}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          #home * {
            outline: none !important;
            -webkit-tap-highlight-color: transparent !important;
          }
          
          #home *:focus,
          #home *:focus-visible {
            outline: none !important;
            border: none !important;
          }
          
          @media (max-width: 768px) {
            #home { padding: 60px 1rem !important; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
