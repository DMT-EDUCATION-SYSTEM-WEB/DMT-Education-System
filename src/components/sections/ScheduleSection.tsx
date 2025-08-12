import React from 'react';
import { Icons } from '../common/Icons';
import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

const ScheduleSection: React.FC = () => {
  const { ref: scheduleRef, inView: scheduleInView } = useOptimizedAnimation();

  return (
    <section id="schedule" ref={scheduleRef} style={{
      padding: '80px 1rem',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
        zIndex: 0
      }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className={`transform transition-all duration-1000 ${scheduleInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #111827, #374151)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '20px'
            }}>
              Lịch khai giảng
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Thời khóa biểu các khóa học tại các cơ sở DMT Education
            </p>
          </div>
        </div>

        {/* Schedule Grid */}
        <div 
          className={`transform transition-all duration-1000 delay-200 ${scheduleInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}
        >
          {/* Cơ sở Gò Vấp */}
          <div style={{
            background: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 15px 35px rgba(220, 38, 38, 0.1)',
            border: '2px solid rgba(220, 38, 38, 0.1)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, #dc2626, #f43f5e)'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                color: 'white',
                boxShadow: '0 8px 20px rgba(220, 38, 38, 0.3)'
              }}>
                <Icons.Location />
              </div>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '4px'
                }}>
                  Cơ sở Gò Vấp
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280'
                }}>
                  Chung cư K26, Dương Quảng Hàm, Q. Gò Vấp
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{
                background: 'rgba(220, 38, 38, 0.1)',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '15px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#dc2626',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icons.Book />
                  IELTS Intensive
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                  fontSize: '14px'
                }}>
                  <div style={{ color: '#374151' }}>
                    <strong>Thứ 2, 4, 6:</strong> 18:30-20:30
                  </div>
                  <div style={{ color: '#374151' }}>
                    <strong>Chủ nhật:</strong> 14:00-17:00
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '10px',
                padding: '15px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#3b82f6',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icons.Book />
                  Toán Tư duy
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                  fontSize: '14px'
                }}>
                  <div style={{ color: '#374151' }}>
                    <strong>Thứ 3, 5, 7:</strong> 17:00-19:00
                  </div>
                  <div style={{ color: '#374151' }}>
                    <strong>Thứ 7:</strong> 08:00-11:00
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '15px',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '10px',
              fontSize: '14px',
              color: '#92400e'
            }}>
              <strong>📅 Khai giảng:</strong> 15/01/2025
            </div>
          </div>

          {/* Cơ sở Tân Bình */}
          <div style={{
            background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 15px 35px rgba(59, 130, 246, 0.1)',
            border: '2px solid rgba(59, 130, 246, 0.1)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                color: 'white',
                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
              }}>
                <Icons.Location />
              </div>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '4px'
                }}>
                  Cơ sở Tân Bình
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280'
                }}>
                  230 Hoàng Văn Thụ, P.8, Q. Tân Bình
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '15px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#22c55e',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icons.Book />
                  Lập trình Junior
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                  fontSize: '14px'
                }}>
                  <div style={{ color: '#374151' }}>
                    <strong>Thứ 3, 5:</strong> 19:00-21:00
                  </div>
                  <div style={{ color: '#374151' }}>
                    <strong>Chủ nhật:</strong> 09:00-12:00
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '10px',
                padding: '15px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#a855f7',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icons.Book />
                  Tiếng Việt nâng cao
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                  fontSize: '14px'
                }}>
                  <div style={{ color: '#374151' }}>
                    <strong>Thứ 2, 4, 6:</strong> 17:30-19:30
                  </div>
                  <div style={{ color: '#374151' }}>
                    <strong>Thứ 7:</strong> 14:00-17:00
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '15px',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '10px',
              fontSize: '14px',
              color: '#92400e'
            }}>
              <strong>📅 Khai giảng:</strong> 20/01/2025
            </div>
          </div>

          {/* Cơ sở Thủ Đức */}
          <div style={{
            background: 'linear-gradient(135deg, #fff 0%, #f0fdf4 100%)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 15px 35px rgba(34, 197, 94, 0.1)',
            border: '2px solid rgba(34, 197, 94, 0.1)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, #22c55e, #16a34a)'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                color: 'white',
                boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
              }}>
                <Icons.Location />
              </div>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '4px'
                }}>
                  Cơ sở Thủ Đức
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280'
                }}>
                  152 Võ Văn Ngân, P. Bình Thọ, TP. Thủ Đức
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '15px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#f59e0b',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icons.Book />
                  Khoa học tự nhiên
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                  fontSize: '14px'
                }}>
                  <div style={{ color: '#374151' }}>
                    <strong>Thứ 2, 4:</strong> 18:00-20:00
                  </div>
                  <div style={{ color: '#374151' }}>
                    <strong>Thứ 7:</strong> 08:30-11:30
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(220, 38, 38, 0.1)',
                borderRadius: '10px',
                padding: '15px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#dc2626',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icons.Book />
                  IELTS Junior
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                  fontSize: '14px'
                }}>
                  <div style={{ color: '#374151' }}>
                    <strong>Thứ 3, 5, 7:</strong> 16:00-18:00
                  </div>
                  <div style={{ color: '#374151' }}>
                    <strong>Chủ nhật:</strong> 13:00-16:00
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '15px',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '10px',
              fontSize: '14px',
              color: '#92400e'
            }}>
              <strong>📅 Khai giảng:</strong> 25/01/2025
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <div className={`transform transition-all duration-1000 delay-400 ${scheduleInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '15px'
            }}>
              Cần tư vấn thêm về lịch học?
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '25px'
            }}>
              Liên hệ với chúng tôi để được tư vấn lịch học phù hợp nhất
            </p>
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button style={{
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                color: 'white',
                padding: '12px 30px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(220, 38, 38, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(220, 38, 38, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.3)';
              }}
              >
                <Icons.Phone />
                Gọi tư vấn ngay
              </button>
              <button style={{
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                padding: '12px 30px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(34, 197, 94, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3)';
              }}
              >
                <Icons.Email />
                Đăng ký online
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;