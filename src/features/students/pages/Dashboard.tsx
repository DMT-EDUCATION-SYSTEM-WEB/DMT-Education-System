import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Link } from 'react-router-dom';
import { Hand } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: string | number; hint?: string }> = ({ title, value, hint }) => (
  <div className="card relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 to-transparent pointer-events-none" />
    <div className="relative">
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  </div>
);

const QuickLink: React.FC<{ to: string; label: string; desc: string }> = ({ to, label, desc }) => (
  <Link to={to} className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-primary-300 hover:shadow-sm transition group">
    <p className="font-medium text-gray-800 group-hover:text-primary-700">{label}</p>
    <p className="mt-1 text-xs text-gray-500">{desc}</p>
  </Link>
);

const Dashboard: React.FC = () => {
  const student = useSelector((state: RootState) => state.user);

  return (
    <div className="space-y-8">
      <div className="hero mb-2">
        <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          Xin chào, {student.name || 'Học viên'} <Hand size={24} className="inline-block" />
        </h1>
        <p className="mt-1 text-sm text-gray-600">Theo dõi tiến độ học tập và truy cập nhanh các tài nguyên.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Khóa đã hoàn thành" value={3} hint="Cập nhật gần nhất" />
        <StatCard title="Bài tập cần nộp" value={2} />
        <StatCard title="Deadline sắp tới" value={1} />
        <StatCard title="Tỷ lệ hoàn thành" value="75%" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="card">
            <h2 className="text-sm font-semibold text-gray-900">Tiến độ khóa học</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1,2,3].map(i => (
                <div key={i} className="rounded-md border border-gray-200 p-3">
                  <p className="text-xs font-medium text-gray-600">Khóa học {i}</p>
                  <div className="mt-2 h-2 w-full rounded bg-gray-100">
                    <div className="h-full w-2/3 rounded bg-primary-500" />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">45/60 giờ</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h2 className="text-sm font-semibold text-gray-900">Nhắc nhở gần đây</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-primary-500" /> Nộp bài tập Toán trước 20:00 hôm nay.</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-primary-500" /> Hoàn thành khảo sát môn Lý trước ngày 12.</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-primary-500" /> Xem lại video buổi học 05/08.</li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-sm font-semibold text-gray-900">Liên kết nhanh</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <QuickLink to="/students/schedule" label="Thời khóa biểu" desc="Xem lịch học cá nhân" />
              <QuickLink to="/students/videos" label="Video" desc="Xem lại buổi học" />
              <QuickLink to="/students/materials" label="Tài liệu" desc="PDF & tài nguyên" />
              <QuickLink to="/students/transcript" label="Bảng điểm" desc="Điểm & nhận xét" />
            </div>
          </div>
          <div className="card">
            <h2 className="text-sm font-semibold text-gray-900">Thông báo hệ thống</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><span className="h-2 w-2 mt-1 rounded-full bg-primary-500" /> Bảo trì hệ thống 23:00 - 23:30 tối nay.</li>
              <li className="flex gap-2"><span className="h-2 w-2 mt-1 rounded-full bg-primary-500" /> Cập nhật chính sách bảo mật mới.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;