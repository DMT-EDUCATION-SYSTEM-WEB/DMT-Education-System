import React from 'react';
import { Icons } from '../common/Icons';

const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#111827',
      color: 'white',
      padding: '60px 1rem 40px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Logo và thông tin chung */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img 
                src="/logo-dmt.png" 
                alt="DMT Education Logo" 
                className="hover-scale"
                style={{
                  height: '50px',
                  width: 'auto',
                  backgroundColor: 'rgba(255, 255, 255, 2)',
                  borderRadius: '8px',
                  padding: '8px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icons.ContactPhone />
                <span>077 230 5566</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icons.ContactEmail />
                <span>example@dmteducation.vn</span>
              </div>
            </p>
            
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
                    textDecoration: 'none'
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
                    textDecoration: 'none'
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
                    textDecoration: 'none'
                  }}
                >
                  <Icons.TikTok />
                </a>
              </div>
            </div>
          </div>

          {/* Cơ sở 1 */}
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

          {/* Cơ sở 2*/}
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

          {/* Cơ sở 3 */}
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
            fontSize: '14px'
          }}>
            <a href="#" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}>
              Chính sách bảo mật
            </a>
            <a href="#" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}>
              Điều khoản sử dụng
            </a>
            <a href="#" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}>
              Liên hệ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
