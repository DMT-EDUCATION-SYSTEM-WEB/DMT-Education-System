import React, { useEffect, useState } from 'react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Spinner from '../../../components/common/Spinner';

interface AnalyticsData {
  userStats: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    teacherCount: number;
    studentCount: number;
    staffCount: number;
    userGrowth: { month: string; count: number }[];
  };
  courseStats: {
    totalCourses: number;
    activeCourses: number;
    completionRate: number;
    popularCourses: { name: string; students: number; rating: number }[];
    completionTrend: { month: string; rate: number }[];
  };
  revenueStats: {
    totalRevenue: number;
    monthlyRevenue: number;
    revenueGrowth: number;
    paymentMethods: { method: string; percentage: number }[];
    revenueByMonth: { month: string; amount: number }[];
  };
  systemStats: {
    uptime: number;
    activeConnections: number;
    serverLoad: number;
    errorRate: number;
    responseTime: number;
    storageUsed: number;
  };
}

const StatCard: React.FC<{
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  color: string;
}> = ({ title, value, change, icon, color }) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <p className={`text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}{change}% so với tháng trước
            </p>
          )}
        </div>
        <div className={`text-3xl ${color}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

const MiniChart: React.FC<{
  title: string;
  data: { label: string; value: number }[];
  type: 'line' | 'bar';
}> = ({ title, data, type }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{item.label}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all" 
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900 w-12 text-right">
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Mock analytics data
      const mockData: AnalyticsData = {
        userStats: {
          totalUsers: 1247,
          activeUsers: 856,
          newUsers: 45,
          teacherCount: 89,
          studentCount: 1098,
          staffCount: 60,
          userGrowth: [
            { month: 'T1', count: 950 },
            { month: 'T2', count: 1020 },
            { month: 'T3', count: 1150 },
            { month: 'T4', count: 1200 },
            { month: 'T5', count: 1247 }
          ]
        },
        courseStats: {
          totalCourses: 156,
          activeCourses: 142,
          completionRate: 78.5,
          popularCourses: [
            { name: 'Toán 9', students: 245, rating: 4.8 },
            { name: 'Văn 8', students: 198, rating: 4.6 },
            { name: 'Tiếng Anh 7', students: 167, rating: 4.7 },
            { name: 'Lý 10', students: 134, rating: 4.5 },
            { name: 'Hóa 11', students: 112, rating: 4.4 }
          ],
          completionTrend: [
            { month: 'T1', rate: 72.3 },
            { month: 'T2', rate: 75.1 },
            { month: 'T3', rate: 76.8 },
            { month: 'T4', rate: 77.9 },
            { month: 'T5', rate: 78.5 }
          ]
        },
        revenueStats: {
          totalRevenue: 2450000000, // VND
          monthlyRevenue: 485000000,
          revenueGrowth: 12.3,
          paymentMethods: [
            { method: 'Chuyển khoản', percentage: 45 },
            { method: 'Ví điện tử', percentage: 35 },
            { method: 'Thẻ tín dụng', percentage: 15 },
            { method: 'Tiền mặt', percentage: 5 }
          ],
          revenueByMonth: [
            { month: 'T1', amount: 420000000 },
            { month: 'T2', amount: 445000000 },
            { month: 'T3', amount: 460000000 },
            { month: 'T4', amount: 475000000 },
            { month: 'T5', amount: 485000000 }
          ]
        },
        systemStats: {
          uptime: 99.8,
          activeConnections: 2847,
          serverLoad: 65.4,
          errorRate: 0.02,
          responseTime: 234,
          storageUsed: 67.8
        }
      };

      setData(mockData);
    } catch (err: any) {
      setError(err.message || 'Không thể tải dữ liệu thống kê');
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

  if (loading) return (
    <div className="flex items-center gap-2 text-gray-600">
      <Spinner /> Đang tải dữ liệu thống kê...
    </div>
  );

  if (error) return (
    <div className="text-red-600 bg-red-50 p-4 rounded-md">
      Lỗi: {error}
    </div>
  );

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Thống kê & Phân tích</h1>
          <p className="text-sm text-gray-600">Tổng quan hiệu suất hệ thống và doanh thu</p>
        </div>
        
        <div className="flex gap-2">
          {[
            { key: '7d', label: '7 ngày' },
            { key: '30d', label: '30 ngày' },
            { key: '90d', label: '90 ngày' },
            { key: '1y', label: '1 năm' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTimeRange(key as any)}
              className={`px-3 py-1 text-sm rounded-md transition ${
                timeRange === key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Tổng người dùng"
          value={data.userStats.totalUsers.toLocaleString()}
          change={8.2}
          icon="👥"
          color="text-blue-500"
        />
        <StatCard
          title="Người dùng hoạt động"
          value={data.userStats.activeUsers.toLocaleString()}
          change={5.7}
          icon="📈"
          color="text-green-500"
        />
        <StatCard
          title="Doanh thu tháng"
          value={formatCurrency(data.revenueStats.monthlyRevenue)}
          change={data.revenueStats.revenueGrowth}
          icon="💰"
          color="text-yellow-500"
        />
        <StatCard
          title="Tỷ lệ hoàn thành"
          value={`${data.courseStats.completionRate}%`}
          change={2.1}
          icon="🎯"
          color="text-purple-500"
        />
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố người dùng</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Học sinh</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(data.userStats.studentCount / data.userStats.totalUsers) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-16 text-right">
                  {data.userStats.studentCount}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Giáo viên</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(data.userStats.teacherCount / data.userStats.totalUsers) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-16 text-right">
                  {data.userStats.teacherCount}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Nhân viên</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${(data.userStats.staffCount / data.userStats.totalUsers) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-16 text-right">
                  {data.userStats.staffCount}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <MiniChart
          title="Khóa học phổ biến"
          data={data.courseStats.popularCourses.map(course => ({
            label: course.name,
            value: course.students
          }))}
          type="bar"
        />
      </div>

      {/* Revenue and Payment Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo tháng</h3>
          <div className="space-y-3">
            {data.revenueStats.revenueByMonth.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tháng {item.month}</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <MiniChart
          title="Phương thức thanh toán"
          data={data.revenueStats.paymentMethods.map(method => ({
            label: method.method,
            value: method.percentage
          }))}
          type="bar"
        />
      </div>

      {/* System Performance */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiệu suất hệ thống</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{data.systemStats.uptime}%</div>
            <div className="text-sm text-gray-600">Thời gian hoạt động</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{data.systemStats.activeConnections}</div>
            <div className="text-sm text-gray-600">Kết nối đang hoạt động</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{data.systemStats.responseTime}ms</div>
            <div className="text-sm text-gray-600">Thời gian phản hồi</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{data.systemStats.serverLoad}%</div>
            <div className="text-sm text-gray-600">Tải máy chủ</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{data.systemStats.errorRate}%</div>
            <div className="text-sm text-gray-600">Tỷ lệ lỗi</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{data.systemStats.storageUsed}%</div>
            <div className="text-sm text-gray-600">Dung lượng đã dùng</div>
          </div>
        </div>
      </Card>

      {/* Export Actions */}
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Xuất báo cáo</h3>
            <p className="text-sm text-gray-600">Tải xuống các báo cáo chi tiết</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              📊 Xuất Excel
            </Button>
            <Button variant="outline">
              📄 Xuất PDF
            </Button>
            <Button variant="primary">
              📈 Báo cáo đầy đủ
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;