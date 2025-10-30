import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  DollarSign, 
  Bell, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  User,
  ChevronDown
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const auth = useAuth();
  
  // Mock user data for now
  const user = {
    name: 'Admin DMT',
    email: 'admin@dmt.edu.vn'
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      current: location.pathname === '/admin/dashboard'
    },
    {
      name: 'Quản lý học viên',
      href: '/admin/users/students',
      icon: Users,
      current: location.pathname.includes('/admin/users/students')
    },
    {
      name: 'Quản lý lớp học',
      href: '/admin/classes',
      icon: Calendar,
      current: location.pathname.includes('/admin/classes')
    },
    {
      name: 'Quản lý khóa học',
      href: '/admin/courses',
      icon: BookOpen,
      current: location.pathname.includes('/admin/courses')
    },
    {
      name: 'Quản lý giáo viên',
      href: '/admin/users/teachers',
      icon: GraduationCap,
      current: location.pathname.includes('/admin/users/teachers')
    },
    {
      name: 'Quản lý tài chính',
      href: '/admin/payments',
      icon: DollarSign,
      current: location.pathname.includes('/admin/payments')
    },
    {
      name: 'Thông báo & Tài liệu',
      href: '/admin/notifications',
      icon: Bell,
      current: location.pathname.includes('/admin/notifications')
    },
    {
      name: 'Quản lý nhân viên',
      href: '/admin/users/staff',
      icon: User,
      current: location.pathname.includes('/admin/users/staff')
    },
    {
      name: 'Báo cáo',
      href: '/admin/reports/attendance',
      icon: FileText,
      current: location.pathname.includes('/admin/reports')
    },
    {
      name: 'Cài đặt',
      href: '/admin/settings',
      icon: Settings,
      current: location.pathname.includes('/admin/settings')
    }
  ];

  const handleLogout = async () => {
    await auth.handleLogout();
    // Redirect to login page
    window.location.href = '/auth/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <img 
              src="/logo-dmt.png" 
              alt="DMT Education" 
              className="h-8 w-8"
            />
            <span className="ml-2 text-lg font-bold text-gray-900">DMT Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.current
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <IconComponent
                  className={`mr-3 h-5 w-5 ${
                    item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center flex-1">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'admin@dmt.edu'}</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {userMenuOpen && (
              <div className="absolute bottom-full left-0 w-full mb-1 bg-white border border-gray-200 rounded-md shadow-lg">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            
            <div className="flex items-center space-x-4">
              {/* Search bar */}
              <div className="hidden md:block">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
