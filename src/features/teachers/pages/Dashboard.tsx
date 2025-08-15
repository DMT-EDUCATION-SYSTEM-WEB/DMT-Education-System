import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../../components/common';
import TeacherLayout from '../../../components/layout/TeacherLayout';

interface DashboardStats {
  totalAssignments: number;
  pendingGrading: number;
  totalStudents: number;
  upcomingDeadlines: number;
}

interface UpcomingDeadline {
  id: string;
  title: string;
  type: string;
  dueDate: string;
  pendingSubmissions: number;
}

interface RecentActivity {
  id: string;
  type: 'submission' | 'graded' | 'created';
  description: string;
  timestamp: string;
}

const TeacherDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalAssignments: 12,
    pendingGrading: 8,
    totalStudents: 156,
    upcomingDeadlines: 3
  });

  const [upcomingDeadlines] = useState<UpcomingDeadline[]>([
    {
      id: '1',
      title: 'Kiểm tra Toán học - Chương 3',
      type: 'quiz',
      dueDate: '2025-08-16',
      pendingSubmissions: 5
    },
    {
      id: '2',
      title: 'Bài tập Vật lý - Động học',
      type: 'homework',
      dueDate: '2025-08-18',
      pendingSubmissions: 12
    },
    {
      id: '3',
      title: 'Kiểm tra giữa kỳ Hóa học',
      type: 'midterm',
      dueDate: '2025-08-20',
      pendingSubmissions: 0
    }
  ]);

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'submission',
      description: 'Nguyễn Văn A nộp bài tập Toán học',
      timestamp: '2025-08-14T10:30:00'
    },
    {
      id: '2',
      type: 'graded',
      description: 'Đã chấm xong bài kiểm tra Vật lý cho lớp 10A',
      timestamp: '2025-08-14T09:15:00'
    },
    {
      id: '3',
      type: 'created',
      description: 'Tạo bài tập mới: Phương trình bậc hai',
      timestamp: '2025-08-13T16:45:00'
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission': return '📥';
      case 'graded': return '✅';
      case 'created': return '➕';
      default: return '📌';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'midterm': return 'bg-red-100 text-red-700';
      case 'quiz': return 'bg-blue-100 text-blue-700';
      case 'homework': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <SEOHead 
        title="Dashboard Giáo viên - DMT Education"
        description="Dashboard quản lý giảng dạy cho giáo viên"
        keywords="giáo viên, dashboard, quản lý, bài tập, chấm điểm"
      />
      
      <TeacherLayout>
        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '8px'
            }}>
              Dashboard Giáo viên
            </h1>
            <p style={{ color: '#64748b', fontSize: '16px' }}>
              Chào mừng trở lại! Hôm nay là {formatDate(new Date().toISOString())}
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                    Tổng bài tập
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
                    {stats.totalAssignments}
                  </p>
                </div>
                <div style={{ fontSize: '32px' }}>📝</div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                    Cần chấm điểm
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
                    {stats.pendingGrading}
                  </p>
                </div>
                <div style={{ fontSize: '32px' }}>📋</div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                    Tổng học sinh
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
                    {stats.totalStudents}
                  </p>
                </div>
                <div style={{ fontSize: '32px' }}>👥</div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                    Deadline sắp tới
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
                    {stats.upcomingDeadlines}
                  </p>
                </div>
                <div style={{ fontSize: '32px' }}>⏰</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            {/* Upcoming Deadlines */}
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>
                  Deadline sắp tới
                </h2>
                <Link to="/teacher/assignments" style={{
                  color: '#dc2626',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Xem tất cả →
                </Link>
              </div>
              
              <div style={{ gap: '16px' }}>
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} style={{
                    padding: '16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                          {deadline.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }} className={getTypeColor(deadline.type)}>
                            {deadline.type === 'quiz' ? 'Kiểm tra' : 
                             deadline.type === 'homework' ? 'Bài tập' : 
                             deadline.type === 'midterm' ? 'Giữa kỳ' : 'Cuối kỳ'}
                          </span>
                          <span style={{ fontSize: '14px', color: '#64748b' }}>
                            📅 {formatDate(deadline.dueDate)}
                          </span>
                        </div>
                        {deadline.pendingSubmissions > 0 && (
                          <p style={{ fontSize: '14px', color: '#f59e0b' }}>
                            ⚠️ {deadline.pendingSubmissions} bài chưa nộp
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px' }}>
                Hoạt động gần đây
              </h2>
              
              <div style={{ gap: '12px' }}>
                {recentActivities.map((activity) => (
                  <div key={activity.id} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px 0',
                    borderBottom: '1px solid #f1f5f9'
                  }}>
                    <div style={{ fontSize: '20px' }}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', color: '#1e293b', marginBottom: '4px' }}>
                        {activity.description}
                      </p>
                      <p style={{ fontSize: '12px', color: '#64748b' }}>
                        {formatDateTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ marginTop: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Thao tác nhanh
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              <Link to="/teacher/assignments" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                textDecoration: 'none',
                color: '#1e293b',
                transition: 'transform 0.2s ease'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📝</div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Tạo bài tập mới</span>
              </Link>
              
              <Link to="/teacher/grading" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                textDecoration: 'none',
                color: '#1e293b',
                transition: 'transform 0.2s ease'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Chấm điểm</span>
              </Link>
              
              <Link to="/teacher/materials" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                textDecoration: 'none',
                color: '#1e293b',
                transition: 'transform 0.2s ease'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📚</div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Upload tài liệu</span>
              </Link>
              
              <Link to="/teacher/surveys" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                textDecoration: 'none',
                color: '#1e293b',
                transition: 'transform 0.2s ease'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Tạo khảo sát</span>
              </Link>
            </div>
          </div>
        </div>
      </TeacherLayout>
    </>
  );
};

export default TeacherDashboard;
