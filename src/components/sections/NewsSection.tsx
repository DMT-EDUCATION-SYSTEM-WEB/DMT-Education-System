import React from 'react';
import { Icons } from '../common/Icons';
import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

const NewsSection: React.FC = () => {
  const { ref: newsRef, inView: newsInView } = useOptimizedAnimation();

  return (
    <section id="news" ref={newsRef} style={{
      padding: '80px 1rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '10%',
        width: '120px',
        height: '120px',
        background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(245, 158, 11, 0.1))',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '90px',
        height: '90px',
        background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(147, 51, 234, 0.1))',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite reverse'
      }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className={`transform transition-all duration-1000 ${newsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #111827, #374151)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '20px'
            }}>
              Tin tức & Sự kiện
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#64748b',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Cập nhật những tin tức mới nhất về chương trình học, sự kiện và thành tích của DMT Education
            </p>
          </div>
        </div>

        {/* News Grid */}
        <div 
          className={`transform transition-all duration-1000 delay-200 ${newsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}
        >
          {/* News Article 1 */}
          <article 
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #fefbf2 100%)',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&auto=format&q=80"
                alt="Khóa học mới IELTS Intensive"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '25px',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
              }}>
                Mới
              </div>
            </div>
            <div style={{ padding: '25px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  <Icons.Calendar />
                  <span>15 Tháng 12, 2024</span>
                </div>
                <div style={{
                  color: '#f59e0b',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  Chương trình học
                </div>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px',
                lineHeight: '1.3'
              }}>
                Khai giảng khóa IELTS Intensive - Đạt band 7.0 trong 3 tháng
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Chương trình học tập trung với phương pháp độc quyền, giúp học sinh nâng cao kỹ năng IELTS một cách nhanh chóng và hiệu quả...
              </p>
              <button style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                transition: 'all 0.3s ease'
              }}>
                Đọc thêm
              </button>
            </div>
          </article>

          {/* News Article 2 */}
          <article 
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop&auto=format&q=80"
                alt="Lễ tốt nghiệp học sinh"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '25px',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
              }}>
                Sự kiện
              </div>
            </div>
            <div style={{ padding: '25px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  <Icons.Calendar />
                  <span>10 Tháng 12, 2024</span>
                </div>
                <div style={{
                  color: '#3b82f6',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  Thành tích
                </div>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px',
                lineHeight: '1.3'
              }}>
                95% học sinh DMT đạt IELTS 6.5+ trong kỳ thi tháng 11
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Kết quả ấn tượng từ kỳ thi IELTS tháng 11 với tỷ lệ đậu band 6.5 trở lên đạt 95%, khẳng định chất lượng giảng dạy tại DMT Education...
              </p>
              <button style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease'
              }}>
                Đọc thêm
              </button>
            </div>
          </article>

          {/* News Article 3 */}
          <article 
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #f0fdf4 100%)',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop&auto=format&q=80"
                alt="Workshop phương pháp học"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '25px',
                fontSize: '12px',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)'
              }}>
                Workshop
              </div>
            </div>
            <div style={{ padding: '25px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  <Icons.Calendar />
                  <span>18 Tháng 12, 2024</span>
                </div>
                <div style={{
                  color: '#22c55e',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  Phương pháp
                </div>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px',
                lineHeight: '1.3'
              }}>
                Workshop "Phương pháp học hiệu quả" cho phụ huynh
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Buổi chia sẻ về các phương pháp học tập hiệu quả, cách tạo động lực và hỗ trợ con em trong quá trình học tập tại nhà...
              </p>
              <button style={{
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
                transition: 'all 0.3s ease'
              }}>
                Đăng ký tham gia
              </button>
            </div>
          </article>
        </div>

        {/* View All News Button */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <div className={`transform transition-all duration-1000 delay-400 ${newsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: 'white',
              padding: '15px 40px',
              borderRadius: '30px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.3s ease'
            }}>
              Xem tất cả tin tức
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;