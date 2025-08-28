import React, { useEffect, useRef } from 'react';
import { COLORS } from '../../constants';
import animations from '../../utils/animations';

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.dmt-card');
    animations.scrollReveal(cards, 0.15);

    const ctas = sectionRef.current.querySelectorAll('button');
    ctas.forEach(btn => animations.buttonClick(btn as HTMLElement));
  }, []);

  const features = [
    {
      icon: '🎯',
      title: 'Phương pháp Tư duy Linearthinking',
      description:
        'Phương pháp giúp học Tiếng Anh một cách logic và bản chất do DMT sáng tạo ra.',
      color: '#dc2626',
      gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    },
    {
      icon: '📚',
      title: 'Tư liệu học tập độc quyền',
      description:
        'Tất cả sách đều do DMT tự lên nội dung và thiết kế theo tư duy riêng.',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    },
    {
      icon: '💻',
      title: 'Nền tảng công nghệ toàn diện',
      description:
        'Hệ thống học tập trực tuyến với AI, bài tập tương tác và theo dõi tiến độ.',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    {
      icon: '👨‍🏫',
      title: 'Đội ngũ giáo viên giỏi',
      description:
        'Là những giáo viên giỏi kiến thức và giỏi truyền đạt, rất tận tâm với học viên.',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
    {
      icon: '🏆',
      title: 'Thành tích học viên nổi bật',
      description:
        'Hàng trăm học viên đạt kết quả cao trong các kỳ thi quốc tế.',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    },
    {
      icon: '🌍',
      title: 'Hệ thống cơ sở toàn quốc',
      description:
        'Nhiều chi nhánh tại các thành phố lớn, tạo điều kiện học tập thuận lợi.',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    },
  ];

  return (
    <section
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
        padding: '100px 0',
        background: '#ffffff',
        position: 'relative',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background:
            'radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      ></div>

      <div
        ref={sectionRef}
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: '2',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '80px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(220, 38, 38, 0.1)',
              borderRadius: '20px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                background: COLORS.primary.main,
                borderRadius: '50%',
              }}
            ></div>
            <span
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: COLORS.primary.main,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Tính năng nổi bật
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: COLORS.neutral.gray900,
              marginBottom: '20px',
              lineHeight: '1.2',
            }}
          >
            Tại sao chọn{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #7c2d12 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              DMT Education?
            </span>
          </h2>

          <p
            style={{
              fontSize: '1.125rem',
              color: COLORS.neutral.gray600,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            Chúng tôi cung cấp giải pháp giáo dục toàn diện với phương pháp hiện
            đại, công nghệ tiên tiến và đội ngũ chuyên nghiệp.
          </p>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="dmt-card dmt-card-hover dmt-hover-zoom dmt-shine dmt-tilt"
              style={{
                padding: '40px 30px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Background Accent */}
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '4px',
                  background: feature.gradient,
                }}
              ></div>

              {/* Icon */}
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  background: feature.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '25px',
                  boxShadow: `0 8px 25px ${feature.color}40`,
                }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: COLORS.neutral.gray900,
                  marginBottom: '15px',
                  lineHeight: '1.3',
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  fontSize: '1rem',
                  color: COLORS.neutral.gray600,
                  lineHeight: '1.6',
                  margin: '0',
                }}
              >
                {feature.description}
              </p>

              {/* Hover Effect Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  background: feature.gradient,
                  opacity: '0',
                  transition: 'opacity 0.3s ease',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.opacity = '0.95';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.opacity = '0';
                }}
              >
                Tìm hiểu thêm
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '80px',
          }}
        >
          <button className="dmt-btn dmt-btn-gradient">
            Khám phá tất cả tính năng
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
