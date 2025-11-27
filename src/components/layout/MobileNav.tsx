import React, { useState, useEffect } from 'react';
import { Icons } from '../common/Icons';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onToggle, onClose }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Trang chủ', icon: 'Home' },
    { id: 'about', label: 'Giới thiệu', icon: 'Info' },
    { id: 'courses', label: 'Khóa học', icon: 'Book' },
    { id: 'teachers', label: 'Giáo viên', icon: 'Users' },
    { id: 'achievements', label: 'Thành tựu', icon: 'Award' },
    { id: 'news', label: 'Tin tức', icon: 'News' },
    { id: 'schedule', label: 'Lịch học', icon: 'Calendar' },
    { id: 'contact', label: 'Liên hệ', icon: 'Phone' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 right-4 z-[110] p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300"
        style={{
          background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'white',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none'
        }}
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <Icons.X /> : <Icons.Menu />}
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[105] md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[106] transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
        }}
      >
        <div className="p-6 pt-20">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/logo-dmt.png" 
              alt="DMT Education" 
              className="h-12 w-auto"
            />
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const IconComponent = Icons[item.icon as keyof typeof Icons];
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 text-left group"
                >
                  <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-blue-600">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Contact Info */}
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icons.Phone className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">0123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icons.Mail className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">info@dmt-edu.vn</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icons.MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            onClick={() => scrollToSection('contact')}
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
