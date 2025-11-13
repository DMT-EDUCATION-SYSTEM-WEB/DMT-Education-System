import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Link } from 'react-router-dom';
import { Hand, Loader2 } from 'lucide-react';
import { reportsAPI } from '../../../services/dmtAPI';
import type { StudentReport } from '../../../services/dmtAPI';

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
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<StudentReport | null>(null);
  const [attendanceRate, setAttendanceRate] = useState<number | null>(null);
  const [averageGrade, setAverageGrade] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!user.student_id) {
        setError('Student ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch student report
        const reportData = await reportsAPI.getStudentReport(user.student_id);
        setReport(reportData);

        // Fetch attendance rate and average grade
        const [attendanceData, gradeData] = await Promise.all([
          reportsAPI.getAttendanceRate(user.student_id).catch(() => ({ data: { attendance_rate: null } })),
          reportsAPI.getAverageGrade(user.student_id).catch(() => ({ data: { average_grade: null } })),
        ]);

        setAttendanceRate(attendanceData.data?.attendance_rate || null);
        setAverageGrade(gradeData.data?.average_grade || null);
      } catch (err: any) {
        console.error('Error fetching student data:', err);
        setError(err.response?.data?.error || err.message || 'Failed to load student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [user.student_id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 border border-red-200">
        <p className="text-red-800 font-medium">Lỗi: {error}</p>
        <p className="text-red-600 text-sm mt-1">Vui lòng thử lại sau hoặc liên hệ quản trị viên.</p>
      </div>
    );
  }

  const completedCourses = report?.enrollments?.filter(e => e.status === 'COMPLETED').length || 0;
  const activeCourses = report?.enrollments?.filter(e => e.status === 'ACTIVE').length || 0;
  const pendingAssignments = report?.pending_assignments?.length || 0;

  return (
    <div className="space-y-8">
      <div className="hero mb-2">
        <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          Xin chào, {user.name || 'Học viên'} <Hand size={24} className="inline-block" />
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Mã học sinh: <span className="font-medium">{user.student_code || 'N/A'}</span> • 
          {report?.student_info && (
            <> Cấp học: <span className="font-medium">{report.student_info.school_level}</span></>
          )}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Khóa đang học" 
          value={activeCourses} 
          hint={`${completedCourses} khóa đã hoàn thành`} 
        />
        <StatCard 
          title="Bài tập cần nộp" 
          value={pendingAssignments} 
        />
        <StatCard 
          title="Tỷ lệ điểm danh" 
          value={attendanceRate !== null ? `${attendanceRate.toFixed(1)}%` : 'N/A'} 
        />
        <StatCard 
          title="Điểm trung bình" 
          value={averageGrade !== null ? averageGrade.toFixed(2) : 'N/A'} 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="card">
            <h2 className="text-sm font-semibold text-gray-900">Các lớp học đang tham gia</h2>
            {report?.enrollments && report.enrollments.length > 0 ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {report.enrollments.map((enrollment, idx) => (
                  <div key={idx} className="rounded-md border border-gray-200 p-3">
                    <p className="text-xs font-medium text-gray-600">{enrollment.class_name}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{enrollment.course_name}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className={`px-2 py-1 rounded ${
                        enrollment.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                        enrollment.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {enrollment.status}
                      </span>
                      {enrollment.attendance_rate && (
                        <span className="text-gray-500">
                          Điểm danh: {enrollment.attendance_rate.toFixed(0)}%
                        </span>
                      )}
                    </div>
                    {enrollment.average_grade && (
                      <p className="mt-2 text-xs text-gray-500">
                        Điểm TB: {enrollment.average_grade.toFixed(2)}
                      </p>
                    )}
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        enrollment.payment_status === 'PAID' ? 'bg-green-100 text-green-700' :
                        enrollment.payment_status === 'PARTIAL' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {enrollment.payment_status === 'PAID' ? 'Đã đóng đủ' :
                         enrollment.payment_status === 'PARTIAL' ? 'Đóng một phần' :
                         'Chưa đóng'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">Chưa có lớp học nào.</p>
            )}
          </div>
          
          <div className="card">
            <h2 className="text-sm font-semibold text-gray-900">Bài tập cần nộp</h2>
            {report?.pending_assignments && report.pending_assignments.length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {report.pending_assignments.map((assignment, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" />
                    <div className="flex-1">
                      <span className="font-medium">{assignment.title}</span>
                      <span className="text-gray-500"> - {assignment.class_name}</span>
                      <div className="text-xs text-gray-500 mt-1">
                        Hạn nộp: {new Date(assignment.due_date).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-gray-500">Không có bài tập nào cần nộp.</p>
            )}
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
            <h2 className="text-sm font-semibold text-gray-900">Thông tin học vụ</h2>
            {report?.student_info && (
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng số lớp:</span>
                  <span className="font-medium">{report.student_info.total_enrollments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lớp đang học:</span>
                  <span className="font-medium">{report.student_info.active_enrollments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-xs">{report.student_info.email}</span>
                </div>
                {report.student_info.phone && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Điện thoại:</span>
                    <span className="font-medium">{report.student_info.phone}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;