import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';

const ProgramsSection: React.FC = () => {
  const cards = [
    {
      title: 'Chương trình Toán & Khoa học',
      description:
        'Nền tảng tư duy, rèn luyện kỹ năng giải quyết vấn đề qua các dự án thực tế.',
      image:
        '/young-boy-playing-aviator-toy-air-plane-imagination-dreaming-being-pilot-future-business-district-urban.jpg',
      accent: '#dc2626',
    },
    {
      title: 'Anh ngữ & Chứng chỉ quốc tế',
      description:
        'Lộ trình IELTS, IC3, Starters, Movers… cá nhân hoá theo mục tiêu học viên.',
      image: '/little-classmates-discussing-lesson-doing-task.jpg',
      accent: '#3b82f6',
    },
    {
      title: 'Lịch học linh hoạt',
      description:
        'Học trực tiếp và trực tuyến, theo dõi tiến độ học tập ngay trên hệ thống.',
      image: '/front-view-school-covid-concept.jpg',
      accent: '#10b981',
    },
  ];

  return (
    <section
      className="dmt-smooth"
      style={{ padding: '80px 0', background: '#fff' }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: COLORS.neutral.gray900,
              marginBottom: 8,
            }}
          >
            Các chương trình học tại DMT
          </h2>
          <p
            style={{
              color: COLORS.neutral.gray600,
              fontSize: '1.0625rem',
            }}
          >
            Bố cục thẻ lớn, hình ảnh thực tế, nổi bật lộ trình học – lấy cảm
            hứng từ trang mẫu
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="dmt-card dmt-card-hover dmt-shine dmt-tilt"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                height: '100%',
              }}
            >
              <motion.div
                initial={{ scale: 1, y: 0 }}
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{
                  type: 'tween',
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  minHeight: 260,
                  willChange: 'transform',
                }}
              />
              <div
                style={{
                  padding: '22px 24px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 10px',
                    borderRadius: 9999,
                    background: `${card.accent}14`,
                    color: card.accent,
                    fontWeight: 700,
                    fontSize: 12,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      background: card.accent,
                      borderRadius: '50%',
                    }}
                  />
                  Lộ trình đề xuất
                </div>
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: COLORS.neutral.gray900,
                    marginBottom: 10,
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ color: COLORS.neutral.gray600, lineHeight: 1.6 }}>
                  {card.description}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: 16 }}>
                  <button
                    className="dmt-btn dmt-btn-outline"
                    style={{ borderColor: card.accent, color: card.accent }}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
