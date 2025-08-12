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
          {/* Logo & Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <span style={{
                  color: 'white',
                  fontWeight: '800',
                  fontSize: '16px'
                }}>
                  DMT
                </span>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                margin: 0
              }}>
                DMT Education
              </h3>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#9ca3af',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              Trung tâm giáo dục hàng đầu với phương pháp giảng dạy hiện đại và đội ngũ giáo viên chất lượng cao.
            </p>
            <div style={{
              display: 'flex',
              gap: '15px'
            }}>
              <div style={{
                width: '35px',
                height: '35px',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontSize: '16px' }}>📘</span>
              </div>
              <div style={{
                width: '35px',
                height: '35px',
                background: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontSize: '16px' }}>📱</span>
              </div>
              <div style={{
                width: '35px',
                height: '35px',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontSize: '16px' }}>📺</span>
              </div>
            </div>
          </div>

          {/* Cơ sở Gò Vấp */}
          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#dc2626'
            }}>
              Cơ sở Gò Vấp
            </h4>
            <div style={{
              fontSize: '14px',
              color: '#9ca3af',
              lineHeight: '1.6'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '10px'
              }}>
                <span style={{ marginRight: '8px', fontSize: '16px' }}>📍</span>
                <span>Chung cư K26, Dương Quảng Hàm, Q. Gò Vấp, TP.HCM</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <span style={{ marginRight: '8px', fontSize: '16px' }}>📞</span>
                <span>028.6789.1234</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <span style={{ marginRight: '8px', fontSize: '16px' }}>⏰</span>
                <span>8:00 - 20:00 (T2-CN)</span>
              </div>
            </div>
          </div>

          {/* Cơ sở Quận 12 */}
          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#f43f5e'
            }}>
              Cơ sở Quận 12
            </h4>
            <div style={{
              fontSize: '14px',
              color: '#9ca3af',
              lineHeight: '1.6'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '10px'
              }}>
                <span style={{ marginRight: '8px', fontSize: '16px' }}>📍</span>
                <span>71/31 Song Hành, P. Tân Hưng Thuận, Q. 12, TP.HCM</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <span style={{ marginRight: '8px', fontSize: '16px' }}>📞</span>
                <span>028.6789.5678</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <span style={{ marginRight: '8px', fontSize: '16px' }}>⏰</span>
                <span>8:00 - 20:00 (T2-CN)</span>
              </div>
            </div>
          </div>

          {/* Cơ sở Quận 3 */}
          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#3b82f6'
            }}>
              Cơ sở Quận 3
            </h4>
            <div style={{
              fontSize: '14px',
              color: '#9ca3af',
              lineHeight: '1.6'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '10px'
              }}>
                <span style={{ marginRight: '8px', fontSize: '16px' }}>📍</span>
                <span>384/26 Nam Kỳ Khởi Nghĩa, P. 8, Q. 3, TP.HCM</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <span style={{ marginRight: '8px', fontSize: '16px' }}>📞</span>
                <span>028.6789.9012</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <span style={{ marginRight: '8px', fontSize: '16px' }}>⏰</span>
                <span>8:00 - 20:00 (T2-CN)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '30px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#9ca3af'
            }}>
              © 2025 DMT Education. Tất cả quyền được bảo lưu.
            </div>
            <div style={{
              display: 'flex',
              gap: '25px',
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
          
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: 'rgba(220, 38, 38, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(220, 38, 38, 0.2)'
          }}>
            <p style={{
              fontSize: '13px',
              color: '#fca5a5',
              margin: 0,
              fontWeight: '500'
            }}>
              🔥 Hotline tư vấn 24/7: <strong style={{ color: '#dc2626' }}>1900.1234</strong> | 
              Email: <strong style={{ color: '#dc2626' }}>info@dmteducation.vn</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;