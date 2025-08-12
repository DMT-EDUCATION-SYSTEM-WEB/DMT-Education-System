import React from 'react';
import { Icons } from '../common/Icons';

const FooterSection: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#111827',
      color: 'white',
      padding: '60px 1rem 40px',
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
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(220, 38, 38, 0.05) 0%, transparent 50%)',
        zIndex: 0
      }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Logo và thông tin chung */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img 
                src="/logo-dmt.png" 
                alt="DMT Education Logo" 
                style={{
                  height: '50px',
                  width: 'auto',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  padding: '8px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              />
              <div style={{ marginLeft: '12px' }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  lineHeight: '1.2'
                }}>
                  DMT Education
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  fontWeight: '500'
                }}>
                  Vững nguồn tri thức, tiếp bước tương lai
                </div>
              </div>
            </div>
            
            <p style={{
              fontSize: '14px',
              color: '#9ca3af',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              Với hơn 15 năm kinh nghiệm trong lĩnh vực giáo dục, DMT Education cam kết mang đến chất lượng giảng dạy tốt nhất cho học sinh.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: '#ffffff',
                fontSize: '14px'
              }}>
                <Icons.ContactPhone />
                <span>077 230 5566</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: '#ffffff',
                fontSize: '14px'
              }}>
                <Icons.ContactEmail />
                <span>info@dmteducation.vn</span>
              </div>
            </div>
            
            {/* Mạng xã hội */}
            <div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#ffffff'
              }}>
                Theo dõi chúng tôi
              </h4>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <a 
                  href="https://facebook.com/dmteducation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(24, 119, 242, 0.1)',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    color: '#1877f2'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1877f2';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(24, 119, 242, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.color = '#1877f2';
                  }}
                >
                  <Icons.Facebook />
                </a>
                <a 
                  href="https://youtube.com/@dmteducation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    color: '#ff0000'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff0000';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.color = '#ff0000';
                  }}
                >
                  <Icons.YouTube />
                </a>
                <a 
                  href="https://tiktok.com/@dmteducation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(255, 0, 80, 0.1)',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    color: '#ff0050'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff0050';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 0, 80, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.color = '#ff0050';
                  }}
                >
                  <Icons.TikTok />
                </a>
              </div>
            </div>
          </div>

          {/* Cơ sở Gò Vấp */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icons.MapPin />
              Cơ sở Gò Vấp
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '14px',
              color: '#9ca3af'
            }}>
              <div style={{ lineHeight: '1.5' }}>
                <strong style={{ color: '#ffffff' }}>Địa chỉ:</strong><br />
                Chung cư K26, Dương Quảng Hàm, Phường 7, Quận Gò Vấp<br />
                TP. Hồ Chí Minh
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '8px'
              }}>
                <strong>Giờ làm việc:</strong><br />
                T2-T6: 7:00 - 21:00<br />
                T7-CN: 8:00 - 20:00
              </div>
            </div>
          </div>

          {/* Cơ sở Quận 12 */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icons.MapPin />
              Cơ sở Quận 12
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '14px',
              color: '#9ca3af'
            }}>
              <div style={{ lineHeight: '1.5' }}>
                <strong style={{ color: '#ffffff' }}>Địa chỉ:</strong><br />
                71/31 Song Hành, Phường Tân Hưng Thuận, Quận 12<br />
                TP. Hồ Chí Minh
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '8px'
              }}>
                <strong>Giờ làm việc:</strong><br />
                T2-T6: 7:00 - 21:00<br />
                T7-CN: 8:00 - 20:00
              </div>
            </div>
          </div>

          {/* Cơ sở Quận 3 */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icons.MapPin />
              Cơ sở Quận 3
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '14px',
              color: '#9ca3af'
            }}>
              <div style={{ lineHeight: '1.5' }}>
                <strong style={{ color: '#ffffff' }}>Địa chỉ:</strong><br />
                384/26 Nam Kỳ Khởi Nghĩa, Phường 8, Quận 3<br />
                TP. Hồ Chí Minh
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '8px'
              }}>
                <strong>Giờ làm việc:</strong><br />
                T2-T6: 7:00 - 21:00<br />
                T7-CN: 8:00 - 20:00
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{
            color: '#9ca3af',
            fontSize: '14px',
            margin: 0
          }}>
            © 2025 DMT Education. Bảo lưu mọi quyền.
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            fontSize: '14px',
            flexWrap: 'wrap'
          }}>
            <a href="#" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              Chính sách bảo mật
            </a>
            <a href="#" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              Điều khoản sử dụng
            </a>
            <a href="#" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              Liên hệ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;