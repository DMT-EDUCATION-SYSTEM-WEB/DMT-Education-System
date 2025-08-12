import React, { useState, useEffect } from 'react';
import { Icons } from '../common/Icons';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'about', label: 'Giới thiệu' },
    { id: 'courses', label: 'Khóa học' },
    { id: 'teachers', label: 'Giảng viên' },
    { id: 'schedule', label: 'Lịch khai giảng' },
    { id: 'news', label: 'Thông báo' },
  ];

  return (
    <>
      {/* Announcement Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #fecaca, #fde68a)',
        padding: '12px 0',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '500',
        color: '#92400e'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <span style={{ fontSize: '18px' }}>
              <Icons.Celebration />
            </span>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#92400e' }}>
              <strong>KHUYẾN MÃI ĐẶC BIỆT:</strong> Giảm 30% học phí cho 50 học sinh đầu tiên đăng ký khóa học mới!
            </span>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px 16px',
              borderRadius: '15px',
              border: 'none',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              background: '#dc2626',
              color: 'white',
              transition: 'all 0.3s ease'
            }}>
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header style={{
        background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(15px)',
        boxShadow: isScrolled ? '0 8px 30px rgba(0, 0, 0, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            {/* Logo */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <img 
                src="/logo-dmt.png" 
                alt="DMT Education Logo" 
                style={{
                  height: '50px',
                  width: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  marginRight: '12px'
                }}
              />
              <div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#111827',
                  lineHeight: '1.2'
                }}>DMT Education</div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>Vững nguồn tri thức, tiếp bước tương lai</div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav style={{ display: 'flex', gap: '30px' }}>
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    color: activeSection === item.id ? '#dc2626' : '#374151',
                    textDecoration: 'none',
                    fontWeight: activeSection === item.id ? '600' : '500',
                    fontSize: '15px',
                    padding: '8px 0',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    borderBottom: activeSection === item.id ? '2px solid #dc2626' : '2px solid transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
                  onMouseLeave={(e) => e.currentTarget.style.color = activeSection === item.id ? '#dc2626' : '#374151'}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 20px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
              }}>
                Đăng ký học
              </button>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 20px',
                borderRadius: '25px',
                border: '2px solid #dc2626',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: '#dc2626',
                background: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#dc2626';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#dc2626';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                Tư vấn
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;