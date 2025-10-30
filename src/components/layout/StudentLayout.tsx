import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/userSlice';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Video, 
  FileText, 
  Award, 
  CreditCard, 
  Bell, 
  MessageSquare,
  LogOut,
  User
} from 'lucide-react';

const StudentLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Dispatch logout action
    dispatch(logout());
    
    // Redirect to login page
    navigate('/auth/login');
  };

  const navigation = [
    { name: 'Tổng quan', href: '/students/dashboard', icon: Home },
    { name: 'Lịch học', href: '/students/schedule', icon: Calendar },
    { name: 'Video bài giảng', href: '/students/videos', icon: Video },
    { name: 'Tài liệu', href: '/students/materials', icon: FileText },
    { name: 'Bảng điểm', href: '/students/transcript', icon: Award },
    { name: 'Học phí', href: '/students/payments', icon: CreditCard },
    { name: 'Khảo sát', href: '/students/surveys', icon: MessageSquare },
    { name: 'Thông báo', href: '/students/notifications', icon: Bell },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img
                src="/logo-dmt.png"
                alt="DMT Education"
                className="h-10 w-auto"
              />
              <div className="hidden md:block">
                <h1 className="text-lg font-bold text-gray-900">DMT Education</h1>
                <p className="text-xs text-gray-500">Portal học sinh</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Nguyễn Văn A</p>
                  <p className="text-xs text-gray-500">Học sinh</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="space-y-1 bg-white rounded-lg border border-gray-200 p-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <div className="pt-4 mt-4 border-t border-gray-200">
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 w-full transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navigation.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg ${
                  active
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default StudentLayout;
