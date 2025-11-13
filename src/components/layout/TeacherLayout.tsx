import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/userSlice';
import { HeaderComponent, Footer } from '../sections';
import { ErrorBoundary } from '../common';
import { BarChart3, FileText, ClipboardList, BookOpen, Clock, Calendar, TrendingUp, GraduationCap, LogOut } from 'lucide-react';

const TeacherLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Dispatch logout action
    dispatch(logout());
    
    // Redirect to login page
    navigate('/auth/login');
  };

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'dashboard': <BarChart3 size={20} />,
      'assignments': <FileText size={20} />,
      'grading': <ClipboardList size={20} />,
      'materials': <BookOpen size={20} />,
      'surveys': <BarChart3 size={20} />,
      'timesheet': <Clock size={20} />,
      'calendar': <Calendar size={20} />,
      'reports': <TrendingUp size={20} />,
    };
    return iconMap[iconName];
  };

  const menuItems = [
    { path: '/teacher/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/teacher/assignments', label: 'Bài tập', icon: 'assignments' },
    { path: '/teacher/grading', label: 'Chấm điểm', icon: 'grading' },
    { path: '/teacher/materials', label: 'Tài liệu', icon: 'materials' },
    { path: '/teacher/surveys', label: 'Khảo sát', icon: 'surveys' },
    { path: '/teacher/timesheet', label: 'Chấm công', icon: 'timesheet' },
    { path: '/teacher/calendar', label: 'Lịch dạy', icon: 'calendar' },
    { path: '/teacher/reports', label: 'Báo cáo', icon: 'reports' },
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
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={20} /> Giáo viên
                </span>
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
              
              {/* Logout Button */}
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 20px',
                    color: '#dc2626',
                    backgroundColor: 'transparent',
                    textDecoration: 'none',
                    border: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fef2f2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={{ marginRight: '12px' }}>
                    <LogOut size={20} />
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>
                    Đăng xuất
                  </span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Outlet />
          </main>
        </div>
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default TeacherLayout;
