import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeaderComponent, Footer } from '../sections';
import { ErrorBoundary } from '../common';

interface TeacherLayoutProps {
  children: React.ReactNode;
}

const TeacherLayout: React.FC<TeacherLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/teacher/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/teacher/assignments', label: 'Bài tập', icon: '📝' },
    { path: '/teacher/grading', label: 'Chấm điểm', icon: '📋' },
    { path: '/teacher/materials', label: 'Tài liệu', icon: '📚' },
    { path: '/teacher/surveys', label: 'Khảo sát', icon: '📊' },
    { path: '/teacher/timesheet', label: 'Chấm công', icon: '⏰' },
    { path: '/teacher/calendar', label: 'Lịch dạy', icon: '📅' },
    { path: '/teacher/reports', label: 'Báo cáo', icon: '📈' },
  ];

  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <HeaderComponent />
        
        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <aside style={{
            width: '250px',
            backgroundColor: '#f8fafc',
            borderRight: '1px solid #e2e8f0',
            padding: '20px 0'
          }}>
            <div style={{ padding: '0 20px', marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '10px'
              }}>
                🎓 Giáo viên
              </h2>
              <p style={{ fontSize: '14px', color: '#64748b' }}>
                Quản lý giảng dạy
              </p>
            </div>
            
            <nav>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 20px',
                    color: isActive(item.path) ? '#dc2626' : '#4b5563',
                    backgroundColor: isActive(item.path) ? '#fef2f2' : 'transparent',
                    textDecoration: 'none',
                    borderRight: isActive(item.path) ? '3px solid #dc2626' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ marginRight: '12px', fontSize: '16px' }}>
                    {item.icon}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: isActive(item.path) ? '600' : '500' }}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {children}
          </main>
        </div>
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default TeacherLayout;
