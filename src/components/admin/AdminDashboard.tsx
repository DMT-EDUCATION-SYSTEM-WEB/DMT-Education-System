import React, { useState, useEffect } from 'react';
import { BarChart3, Users, BookOpen, DollarSign, Calendar, TrendingUp, Bell, Settings } from 'lucide-react';
import adminService from '../../services/admin';
import DashboardStats from './components/DashboardStats';
import DashboardCharts from './components/DashboardCharts';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';

interface DashboardData {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalClasses: number;
  monthlyRevenue: number;
  attendanceRate: number;
  newEnrollments: number;
  activeClasses: number;
  recentTransactions: any[];
  studentTrends: any[];
  revenueTrends: any[];
  coursesDistribution: any[];
}

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    totalClasses: 0,
    monthlyRevenue: 0,
    attendanceRate: 0,
    newEnrollments: 0,
    activeClasses: 0,
    recentTransactions: [],
    studentTrends: [],
    revenueTrends: [],
    coursesDistribution: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, userTrendsResponse, revenueTrendsResponse] = await Promise.all([
        adminService.dashboardStats(),
        adminService.trendUsers(selectedPeriod),
        adminService.trendRevenue(selectedPeriod)
      ]);

      setDashboardData({
        ...statsResponse.data,
        studentTrends: userTrendsResponse.data,
        revenueTrends: revenueTrendsResponse.data
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set mock data for development
      setDashboardData({
        totalStudents: 245,
        totalTeachers: 18,
        totalCourses: 12,
        totalClasses: 35,
        monthlyRevenue: 125000000,
        attendanceRate: 87.5,
        newEnrollments: 23,
        activeClasses: 28,
        recentTransactions: [
          { id: '1', student: 'Nguyễn Văn A', amount: 2500000, course: 'IELTS 6.5', date: '2025-09-03' },
          { id: '2', student: 'Trần Thị B', amount: 3000000, course: 'TOEIC 800+', date: '2025-09-02' },
          { id: '3', student: 'Lê Văn C', amount: 2000000, course: 'Giao tiếp cơ bản', date: '2025-09-01' }
        ],
        studentTrends: [
          { month: 'T1', students: 180 },
          { month: 'T2', students: 195 },
          { month: 'T3', students: 210 },
          { month: 'T4', students: 225 },
          { month: 'T5', students: 235 },
          { month: 'T6', students: 245 }
        ],
        revenueTrends: [
          { month: 'T1', revenue: 85000000 },
          { month: 'T2', revenue: 92000000 },
          { month: 'T3', revenue: 105000000 },
          { month: 'T4', revenue: 118000000 },
          { month: 'T5', revenue: 125000000 },
          { month: 'T6', revenue: 135000000 }
        ],
        coursesDistribution: [
          { name: 'IELTS', value: 35, color: '#3B82F6' },
          { name: 'TOEIC', value: 25, color: '#10B981' },
          { name: 'Giao tiếp', value: 20, color: '#F59E0B' },
          { name: 'Business English', value: 15, color: '#EF4444' },
          { name: 'Khác', value: 5, color: '#8B5CF6' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Quản Lý</h1>
          <p className="text-gray-600 mt-1">Tổng quan hoạt động trung tâm DMT</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">7 ngày qua</option>
            <option value="month">30 ngày qua</option>
            <option value="quarter">3 tháng qua</option>
            <option value="year">12 tháng qua</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            Cài đặt
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats data={dashboardData} formatCurrency={formatCurrency} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCharts 
          studentTrends={dashboardData.studentTrends}
          revenueTrends={dashboardData.revenueTrends}
          coursesDistribution={dashboardData.coursesDistribution}
          formatCurrency={formatCurrency}
        />
        
        {/* Recent Activity */}
        <div className="space-y-6">
          <RecentActivity transactions={dashboardData.recentTransactions} formatCurrency={formatCurrency} />
          <QuickActions />
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-yellow-500" />
            Thông báo quan trọng
          </h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Xem tất cả
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-start p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">
                Lớp IELTS 6.5 - Sáng thứ 2 có 3 học viên vắng mặt liên tiếp
              </p>
              <p className="text-xs text-yellow-600 mt-1">2 giờ trước</p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-800">
                Có 5 đơn đăng ký khóa học mới cần duyệt
              </p>
              <p className="text-xs text-blue-600 mt-1">4 giờ trước</p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-green-50 border-l-4 border-green-400 rounded">
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">
                Doanh thu tháng này đã vượt mục tiêu 15%
              </p>
              <p className="text-xs text-green-600 mt-1">1 ngày trước</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
