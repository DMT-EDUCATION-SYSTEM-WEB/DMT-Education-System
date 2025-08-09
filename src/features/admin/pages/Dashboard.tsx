import React, { useEffect, useState } from 'react';
import { adminService } from '../../../services/admin';
import Card from '../../../components/common/Card';
import Spinner from '../../../components/common/Spinner';

interface StatCardProps { title: string; value: string | number; sub?: string; }
const StatCard: React.FC<StatCardProps> = ({ title, value, sub }) => (
  <Card className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 to-transparent" />
    <div className="relative">
      <p className="text-xs font-medium text-gray-600">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
    </div>
  </Card>
);

const MiniBar: React.FC<{ data: number[] }> = ({ data }) => (
  <div className="flex items-end gap-1 h-14">
    {data.map((v, i) => (
      <div key={i} className="flex-1 bg-primary-200 rounded-sm" style={{ height: `${(v / Math.max(...data)) * 100}%` }} />
    ))}
  </div>
);

const MiniLine: React.FC<{ data: number[] }> = ({ data }) => (
  <svg viewBox="0 0 100 40" className="w-full h-16">
    {data.length > 1 && (
      <polyline
        fill="none"
        stroke="#f43f5e"
        strokeWidth="2"
        points={data.map((v, i) => `${(i / (data.length - 1)) * 100},${40 - (v / Math.max(...data)) * 38}`).join(' ')}
      />
    )}
  </svg>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const res: any = await adminService.dashboardStats();
        setStats(res?.data || res);
      } catch (e: any) {
        setError(e?.message || 'Không thể tải dữ liệu');
      } finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <div className="p-6 flex items-center gap-2 text-sm text-gray-600"><Spinner /> Đang tải dashboard...</div>;
  if (error) return <div className="p-6 text-sm text-red-600">{error}</div>;

  const s = stats || {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Tổng quan hệ thống</h1>
        <p className="text-sm text-gray-600">Số liệu nhanh và xu hướng chính.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Tổng người dùng" value={s.totalUsers ?? '-'} />
        <StatCard title="Khóa học" value={s.totalCourses ?? '-'} />
        <StatCard title="Doanh thu tháng" value={s.monthRevenue ?? '-'} />
        <StatCard title="Tỷ lệ hoàn thành" value={s.completionRate ? s.completionRate + '%' : '-'} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <p className="text-sm font-semibold text-gray-900 mb-2">Đăng ký mới (7d)</p>
          <MiniBar data={s.weekSignups || [5,3,6,4,7,5,8]} />
        </Card>
        <Card>
          <p className="text-sm font-semibold text-gray-900 mb-2">Doanh thu (8 kỳ)</p>
          <MiniLine data={s.revenueTrend || [3,5,4,6,8,7,9,11]} />
        </Card>
        <Card>
          <p className="text-sm font-semibold text-gray-900 mb-2">Hoàn thành khóa (7d)</p>
          <MiniBar data={s.completionTrend || [2,4,3,5,6,5,7]} />
        </Card>
      </div>

      <Card>
        <p className="text-sm font-semibold text-gray-900 mb-4">Hoạt động gần đây</p>
        <ul className="space-y-2 text-sm text-gray-700">
          {(s.recentActivities || [
            { id: 1, text: 'Admin tạo khóa học mới Toán 9.' },
            { id: 2, text: 'Giáo viên A chấm bài Assignment #45.' },
            { id: 3, text: 'Học sinh B hoàn thành khảo sát phản hồi.' },
          ]).map((a: any) => (
            <li key={a.id || a.text} className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" /> {a.text}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Dashboard;