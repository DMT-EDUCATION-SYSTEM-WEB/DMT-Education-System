import React, { useState } from 'react';
import { MobileNav } from '../layout/MobileNav';
import { useResponsive } from '../../hooks/useResponsive';

const HeaderSection: React.FC = () => {
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { isMobile } = useResponsive();

  const handleNavClick = (navItem: string) => {
    setActiveNavItem(navItem);
  };

  const handleMobileNavToggle = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleMobileNavClose = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <header style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(15px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px'
      }}>
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/logo-dmt.png" 
            alt="DMT Education Logo" 
            style={{
              height: '50px',
              width: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          />
          <div style={{ marginLeft: '12px' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#111827',
              lineHeight: '1.2'
            }}>
              DMT Education
            </div>
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              fontWeight: '500'
            }}>
              Vững nguồn tri thức, tiếp bước tương lai
            </div>
          </div>
        </div>
        
        {/* Navigation Menu - Hidden on mobile */}
        {!isMobile && (
          <nav style={{ 
            display: 'flex', 
            gap: '30px'
          }}>
            {[
              { id: 'home', label: 'Trang chủ', href: '#home' },
              { id: 'about', label: 'Giới thiệu', href: '#about' },
              { id: 'courses', label: 'Khóa học', href: '#courses' },
              { id: 'teachers', label: 'Giảng viên', href: '#teachers' },
              { id: 'schedule', label: 'Lịch khai giảng', href: '#schedule' },
              { id: 'news', label: 'Thông báo', href: '#news' }
            ].map((item, index) => (
              <a 
                key={item.id}
                href={item.href} 
                style={{
                color: activeNavItem === item.id ? '#dc2626' : '#374151',
                textDecoration: 'none',
                fontWeight: activeNavItem === item.id ? '600' : '500',
                fontSize: '15px',
                padding: '8px 0',
                borderBottom: activeNavItem === item.id ? '2px solid #dc2626' : 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (activeNavItem !== item.id) {
                  e.currentTarget.style.color = '#dc2626';
                }
              }}
              onMouseLeave={(e) => {
                if (activeNavItem !== item.id) {
                  e.currentTarget.style.color = '#374151';
                }
              }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
                // Smooth scroll to section
                const element = document.querySelector(item.href);
                if (element) {
                  element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
            >
              {item.label}
            </a>
          ))}
          </nav>
        )}
        
        {/* Action Buttons - Responsive */}
        {!isMobile && (
          <div style={{ 
            display: 'flex', 
            gap: '12px'
          }}>
            <button style={{
              background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
          }}
          onClick={() => {
            // Handle registration
            const element = document.querySelector('#courses');
            if (element) {
              element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }
          }}
          >
            Đăng ký học
          </button>
          
          <button style={{
            border: '2px solid #dc2626',
            color: '#dc2626',
            padding: '8px 18px',
            borderRadius: '25px',
            background: 'white',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.background = '#dc2626';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#dc2626';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onClick={() => {
            // Handle contact/consultation
            window.open('tel:0772305566', '_self');
          }}
          >
            Tư vấn
          </button>
          </div>
        )}

        {/* Mobile Navigation Component */}
        <MobileNav 
          isOpen={isMobileNavOpen}
          onToggle={handleMobileNavToggle}
          onClose={handleMobileNavClose}
        />
      </div>
    </header>
  );
};

export default HeaderSection;