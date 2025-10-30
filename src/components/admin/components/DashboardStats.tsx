import React from 'react';
import { Users, BookOpen, DollarSign, Calendar, TrendingUp, UserCheck } from 'lucide-react';

interface DashboardStatsProps {
  data: {
    totalStudents: number;
    totalTeachers: number;
    totalCourses: number;
    totalClasses: number;
    monthlyRevenue: number;
    attendanceRate: number;
    newEnrollments: number;
    activeClasses: number;
  };
  formatCurrency: (amount: number) => string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ data, formatCurrency }) => {
  const stats = [
    {
      title: 'Tổng học viên',
      value: data.totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+12%',
      trendColor: 'text-green-600'
    },
    {
      title: 'Giáo viên',
      value: data.totalTeachers,
      icon: UserCheck,
      color: 'bg-green-500',
      trend: '+2',
      trendColor: 'text-green-600'
    },
    {
      title: 'Khóa học',
      value: data.totalCourses,
      icon: BookOpen,
      color: 'bg-purple-500',
      trend: '+1',
      trendColor: 'text-green-600'
    },
    {
      title: 'Lớp học',
      value: data.totalClasses,
      icon: Calendar,
      color: 'bg-orange-500',
      trend: '+5',
      trendColor: 'text-green-600'
    },
    {
      title: 'Doanh thu tháng',
      value: formatCurrency(data.monthlyRevenue),
      icon: DollarSign,
      color: 'bg-red-500',
      trend: '+15%',
      trendColor: 'text-green-600',
      isLarge: true
    },
    {
      title: 'Tỉ lệ điểm danh',
      value: `${data.attendanceRate}%`,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      trend: '+2.5%',
      trendColor: 'text-green-600'
    },
    {
      title: 'Đăng ký mới',
      value: data.newEnrollments,
      icon: Users,
      color: 'bg-pink-500',
      trend: '+8',
      trendColor: 'text-green-600'
    },
    {
      title: 'Lớp đang học',
      value: data.activeClasses,
      icon: Calendar,
      color: 'bg-cyan-500',
      trend: '+3',
      trendColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow ${
              stat.isLarge ? 'md:col-span-2' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className={`font-bold text-gray-900 ${stat.isLarge ? 'text-2xl' : 'text-xl'}`}>
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${stat.trendColor}`}>
                    {stat.trend}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">từ tháng trước</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
