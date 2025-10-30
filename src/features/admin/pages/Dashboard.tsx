import React, { useEffect, useState } from 'react';
import { adminService } from '../../../services/admin';
import Spinner from '../../../components/common/Spinner';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  UserCheck,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  Bell
} from 'lucide-react';

interface StatCardProps { 
  title: string; 
  value: string | number; 
  icon: React.ReactElement;
  change?: number;
  sub?: string; 
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, sub }) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {(change || sub) && (
            <div className="mt-2 flex items-center">
              {change !== undefined && (
                <span className={`flex items-center text-sm ${
                  isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {isPositive && <ArrowUpRight size={16} className="mr-1" />}
                  {isNegative && <ArrowDownRight size={16} className="mr-1" />}
                  {Math.abs(change)}%
                </span>
              )}
              {sub && <span className="text-sm text-gray-500 ml-2">{sub}</span>}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${
          title.includes('Học sinh') ? 'bg-blue-50 text-blue-600' : 
          title.includes('Giáo viên') ? 'bg-purple-50 text-purple-600' : 
          title.includes('Khóa học') ? 'bg-amber-50 text-amber-600' : 
          title.includes('Doanh thu') ? 'bg-emerald-50 text-emerald-600' :
          'bg-gray-50 text-gray-600'
        }`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const ChartCard: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  viewAll?: string;
  className?: string;
}> = ({ title, children, viewAll, className }) => (
  <div className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm ${className}`}>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {viewAll && (
        <a href={viewAll} className="text-sm font-medium text-primary-600 hover:text-primary-700">
          Xem tất cả
        </a>
      )}
    </div>
    {children}
  </div>
);

// Bar chart component
const BarChart: React.FC<{ data: number[]; labels: string[] }> = ({ data, labels }) => {
  const max = Math.max(...data);
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-2 h-44">
        {data.map((value, idx) => (
          <div key={idx} className="flex flex-col items-center justify-end">
            <div className="w-full rounded-t-sm bg-primary-100 relative overflow-hidden">
              <div 
                className="absolute bottom-0 w-full bg-primary-500 transition-all duration-700"
                style={{ height: `${(value / max) * 100}%`, animationDelay: `${idx * 100}ms` }}
              />
              <div className="h-32 w-full"></div>
            </div>
            <span className="text-xs text-gray-600 mt-2">{labels[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Line chart component
const LineChart: React.FC<{ data: number[]; labels: string[] }> = ({ data, labels }) => {
  const max = Math.max(...data) * 1.2; // Add some padding at the top
  const min = Math.min(0, ...data) * 0.9; // Add some padding at the bottom if negative
  const range = max - min;
  
  // Convert data points to SVG coordinates
  const points = data.map((value, idx) => {
    const x = (idx / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="w-full h-44">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {/* Horizontal grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line 
            key={y} 
            x1="0" 
            y1={y} 
            x2="100" 
            y2={y} 
            stroke="#f1f5f9" 
            strokeWidth="1"
          />
        ))}
        
        {/* Data line */}
        <polyline
          points={points}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {data.map((value, idx) => {
          const x = (idx / (data.length - 1)) * 100;
          const y = 100 - ((value - min) / range) * 100;
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r="2"
              fill="#3b82f6"
              stroke="#ffffff"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Fill area under the curve */}
        <polygon
          points={`${points} 100,100 0,100`}
          fill="url(#blue-gradient)"
          fillOpacity="0.2"
        />
        
        {/* Define gradient */}
        <defs>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* X-axis labels */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {labels.map((label, idx) => (
          <div key={idx} className="text-xs text-gray-500 text-center truncate">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

// Activity item component
interface ActivityItem {
  id: string | number;
  text: string;
  time: string;
  type?: 'info' | 'warning' | 'success' | 'error';
}

const ActivityCard: React.FC<{ activity: ActivityItem }> = ({ activity }) => {
  const iconMap = {
    info: <Bell size={14} className="text-blue-600" />,
    warning: <AlertCircle size={14} className="text-amber-600" />,
    success: <UserCheck size={14} className="text-green-600" />,
    error: <AlertCircle size={14} className="text-red-600" />,
  };

  const icon = iconMap[activity.type || 'info'];

  return (
    <div className="flex items-start gap-3 py-3">
      <div className="rounded-full p-1 bg-gray-100">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700">{activity.text}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true); 
      setError(null);
      try {
        // Normally we would call API here
        // const res = await adminService.dashboardStats();
        
        // For demo, use mock data
        setTimeout(() => {
          setStats({
            totalStudents: 846,
            studentChange: 12.5,
            totalTeachers: 48,
            teacherChange: 8.3,
            totalCourses: 95,
            courseChange: 15.2,
            monthRevenue: '485,720,000đ',
            revenueChange: 23.4,
            completionRate: 91,
            weekSignups: [18, 24, 16, 29, 32, 26, 35],
            weekLabels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            revenueTrend: [18, 24, 32, 28, 42, 38, 48, 56],
            revenueLabels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'],
            attendanceRate: 95.2,
            courseCompletionRate: 88.7,
            recentActivities: [
              { id: 1, text: 'Học sinh Nguyễn Minh Anh đăng ký khóa học Toán 10 Nâng cao', time: '15 phút trước', type: 'success' },
              { id: 2, text: 'Giáo viên Trần Quốc Bảo đã upload tài liệu cho lớp Toán 11A1', time: '32 phút trước', type: 'info' },
              { id: 3, text: 'Lớp học Tiếng Anh IELTS 7.0 được lên lịch vào 19h tối nay', time: '1 giờ trước', type: 'info' },
              { id: 4, text: 'Học sinh Lê Thị Bình đã hoàn thành thanh toán khóa học Hóa 12', time: '2 giờ trước', type: 'success' },
              { id: 5, text: 'Hệ thống phát hiện xung đột lịch phòng học P204 vào ngày 25/08', time: '3 giờ trước', type: 'warning' },
              { id: 6, text: 'Nhân viên Vũ Thị Hương đã tạo báo cáo doanh thu Quý 3/2025', time: '5 giờ trước', type: 'info' },
            ],
            newEnrollments: [
              { course: 'Toán 12 Nâng cao', count: 28 },
              { course: 'Luyện thi IELTS', count: 24 },
              { course: 'Lý 11 Cơ bản', count: 19 },
              { course: 'Hóa 10 Nâng cao', count: 16 },
              { course: 'Tiếng Anh Giao tiếp', count: 15 },
            ],
            upcomingEvents: [
              { title: 'Họp phụ huynh Toán 9A', time: '24/08 - 18:00', location: 'Phòng 305' },
              { title: 'Workshop Kỹ năng học tập', time: '25/08 - 14:30', location: 'Phòng Đa năng' },
              { title: 'Thi thử Tiếng Anh', time: '26/08 - 08:00', location: 'Phòng 201-204' },
              { title: 'Khai giảng lớp Lý 12', time: '27/08 - 19:00', location: 'Phòng 102' },
            ]
          });
          setLoading(false);
        }, 1200);
      } catch (e: any) {
        setError(e?.message || 'Không thể tải dữ liệu');
        setLoading(false);
      }
    };
    
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Spinner size={40} />
        <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-red-600">
        <AlertCircle size={48} />
        <p className="mt-4">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Tải lại trang
        </button>
      </div>
    );
  }

  const s = stats || {};

  return (
    <div className="max-w-[1500px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bảng điều khiển</h1>
        <p className="mt-1 text-gray-600">Xem nhanh tổng quan về hoạt động của trung tâm.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard 
          title="Tổng số học sinh" 
          value={s.totalStudents || 0} 
          icon={<Users size={24} />}
          change={s.studentChange}
          sub="So với tháng trước"
        />
        
        <StatCard 
          title="Tổng số giáo viên" 
          value={s.totalTeachers || 0} 
          icon={<UserCheck size={24} />}
          change={s.teacherChange}
          sub="So với tháng trước"
        />
        
        <StatCard 
          title="Tổng số khóa học" 
          value={s.totalCourses || 0} 
          icon={<BookOpen size={24} />}
          change={s.courseChange}
          sub="So với tháng trước"
        />
        
        <StatCard 
          title="Doanh thu tháng" 
          value={s.monthRevenue || 0} 
          icon={<CreditCard size={24} />}
          change={s.revenueChange}
          sub="So với tháng trước"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Học sinh đăng ký (7 ngày qua)">
          <BarChart 
            data={s.weekSignups || [0, 0, 0, 0, 0, 0, 0]} 
            labels={s.weekLabels || ['', '', '', '', '', '', '']} 
          />
        </ChartCard>
        
        <ChartCard title="Xu hướng doanh thu (8 tháng gần đây)">
          <LineChart 
            data={s.revenueTrend || [0, 0, 0, 0, 0, 0, 0, 0]} 
            labels={s.revenueLabels || ['', '', '', '', '', '', '', '']} 
          />
        </ChartCard>
      </div>

      {/* Additional stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ChartCard title="Tỷ lệ điểm danh" className="lg:col-span-1">
          <div className="flex flex-col items-center justify-center h-[160px]">
            <div className="relative flex items-center justify-center w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                />
                
                {/* Progress arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${s.attendanceRate ? (s.attendanceRate / 100) * 251.2 : 0} 251.2`}
                  strokeDashoffset="62.8" // 251.2 / 4 to start at the top
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{s.attendanceRate || 0}%</span>
                <span className="text-xs text-gray-500">Điểm danh</span>
              </div>
            </div>
          </div>
        </ChartCard>
        
        <ChartCard title="Top khóa học đăng ký mới" viewAll="/admin/courses" className="lg:col-span-1">
          <div className="space-y-3">
            {(s.newEnrollments || []).map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-sm text-gray-700 truncate max-w-[70%]">{item.course}</span>
                <div className="flex items-center gap-2">
                  <div className="bg-primary-100 h-2 rounded-full w-16">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ 
                        width: `${(item.count / Math.max(...(s.newEnrollments || []).map((i: any) => i.count))) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
        
        <ChartCard title="Sự kiện sắp tới" viewAll="/admin/schedule" className="lg:col-span-1">
          <div className="space-y-3">
            {(s.upcomingEvents || []).map((event: any, idx: number) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="bg-primary-50 text-primary-700 p-2 rounded text-xs font-medium flex flex-col items-center min-w-[50px]">
                  <span>{event.time.split(' - ')[0]}</span>
                  <span>{event.time.split(' - ')[1]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Recent activities */}
      <ChartCard title="Hoạt động gần đây" viewAll="/admin/activities">
        <div className="divide-y divide-gray-100">
          {(s.recentActivities || []).map((activity: ActivityItem) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </ChartCard>
    </div>
  );
};

export default AdminDashboard;