import React from 'react';
import { Icons } from '../common/Icons';
import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';
import { GradientBackground, SECTION_BACKGROUNDS } from '../common';

const CoursesSection: React.FC = () => {
  const { ref: coursesRef, inView: coursesInView } = useOptimizedAnimation();

  return (
    <GradientBackground
      gradient={SECTION_BACKGROUNDS.courses.gradient}
      animated={SECTION_BACKGROUNDS.courses.animated}
      style={{
        padding: '80px 20px',
        textAlign: 'center'
      }}
    >
      <div 
        id="courses" 
        ref={coursesRef}
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <h2 style={{
          fontSize: '48px',
          fontWeight: '800',
          color: 'white', // Changed to white for better contrast with gradient
          marginBottom: '60px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          Khóa học của chúng tôi
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          <div style={{
            background: 'white',
            padding: '40px 30px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '48px', color: '#0ea5e9', marginBottom: '20px' }}>
              <Icons.Book />
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '16px'
            }}>
              Toán tư duy
            </h3>
            <p style={{
              color: '#64748b',
              fontSize: '16px',
              lineHeight: '1.5',
              marginBottom: '20px'
            }}>
              Phát triển tư duy logic và khả năng giải quyết vấn đề
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '20px',
              borderTop: '1px solid #e2e8f0'
            }}>
              <span style={{ fontSize: '14px', color: '#64748b' }}>6-12 tuổi</span>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#0ea5e9' }}>2.5M VNĐ</span>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '40px 30px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '48px', color: '#f59e0b', marginBottom: '20px' }}>
              <Icons.Teacher />
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '16px'
            }}>
              Ngữ văn sáng tạo
            </h3>
            <p style={{
              color: '#64748b',
              fontSize: '16px',
              lineHeight: '1.5',
              marginBottom: '20px'
            }}>
              Khơi dậy khả năng sáng tạo qua văn học
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '20px',
              borderTop: '1px solid #e2e8f0'
            }}>
              <span style={{ fontSize: '14px', color: '#64748b' }}>8-16 tuổi</span>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#f59e0b' }}>2.0M VNĐ</span>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '40px 30px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '48px', color: '#22c55e', marginBottom: '20px' }}>
              <Icons.Bulb />
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '16px'
            }}>
              Khoa học thực hành
            </h3>
            <p style={{
              color: '#64748b',
              fontSize: '16px',
              lineHeight: '1.5',
              marginBottom: '20px'
            }}>
              Khám phá khoa học qua thí nghiệm thú vị
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '20px',
              borderTop: '1px solid #e2e8f0'
            }}>
              <span style={{ fontSize: '14px', color: '#64748b' }}>10-16 tuổi</span>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#22c55e' }}>3.0M VNĐ</span>
            </div>
          </div>
        </div>

        <button style={{
          background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
          color: 'white',
          padding: '15px 40px',
          borderRadius: '25px',
          border: 'none',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 5px 15px rgba(220, 38, 38, 0.2)'
        }}>
          Xem tất cả khóa học
        </button>
      </div>
    </GradientBackground>
  );
};

export default CoursesSection;
