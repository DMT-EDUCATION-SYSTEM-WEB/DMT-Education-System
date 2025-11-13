import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CoursesPage from '../pages/CoursesPage';
import TeachersPage from '../pages/TeachersPage';
import TeachersListPage from '../pages/TeachersListPage';
import TeacherDetailPage from '../pages/TeacherDetailPage';
import SchedulePage from '../pages/SchedulePage';
import AnnouncementPage from '../pages/AnnouncementPage';
import AboutPage from '../pages/AboutPage';
import Login from '../features/auth/pages/Login';
import UnauthorizedPage from '../pages/UnauthorizedPage';

// Layout
import AdminLayout from '../components/admin/AdminLayout';
import StudentLayout from '../components/layout/StudentLayout';
import TeacherLayout from '../components/layout/TeacherLayout';

// Guards
import ProtectedRoute from '../components/common/ProtectedRoute';
import { Role } from '../types';

// Student Pages
import StudentDashboard from '../features/students/pages/Dashboard';
import StudentSchedule from '../features/students/pages/Schedule';
import StudentVideos from '../features/students/pages/Videos';
import StudentMaterials from '../features/students/pages/Materials';
import StudentTranscript from '../features/students/pages/Transcript';
import StudentPayments from '../features/students/pages/Payments';
import StudentSurveys from '../features/students/pages/Surveys';
import StudentNotifications from '../features/students/pages/Notifications';

// Teacher Pages
import TeacherDashboard from '../features/teachers/pages/Dashboard';
import TeacherAssignments from '../features/teachers/pages/Assignments';
import TeacherGrading from '../features/teachers/pages/Grading';
import TeacherMaterials from '../features/teachers/pages/Materials';
import TeacherSurveys from '../features/teachers/pages/Surveys';
import TeacherTimesheet from '../features/teachers/pages/Timesheet';
import TeacherCalendar from '../features/teachers/pages/Calendar';
import TeacherReports from '../features/teachers/pages/Reports';

// Admin Pages
import AdminDashboard from '../features/admin/pages/Dashboard';
import StudentsManagement from '../features/admin/pages/Students';
import CoursesManagement from '../features/admin/pages/Courses';
import TeachersManagement from '../features/admin/pages/Teachers';
import StaffManagement from '../features/admin/pages/Staff';
import ClassesManagement from '../features/admin/pages/Classes';
import ScheduleManagement from '../features/admin/pages/Schedule';
import PaymentsManagement from '../features/admin/pages/Payments';
import AttendanceReport from '../features/admin/pages/AttendanceReport';
import PerformanceReport from '../features/admin/pages/PerformanceReport';
import Analytics from '../features/admin/pages/Analytics';
import Roles from '../features/admin/pages/Roles';
import Settings from '../features/admin/pages/Settings';
import Notifications from '../features/admin/pages/Notifications';
import FinanceReport from '../features/admin/pages/FinanceReport';

// New notification page
import NotificationsPage from '../pages/NotificationsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/teachers/list" element={<TeachersListPage />} />
      <Route path="/teachers/:id" element={<TeacherDetailPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/announcements" element={<AnnouncementPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/login" element={<Login />} />

      {/* Student Routes - Protected */}
      <Route 
        path="/students" 
        element={
          <ProtectedRoute allowedRoles={[Role.STUDENT]} fallbackPath="/auth/login">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/students/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="schedule" element={<StudentSchedule />} />
        <Route path="videos" element={<StudentVideos />} />
        <Route path="materials" element={<StudentMaterials />} />
        <Route path="transcript" element={<StudentTranscript />} />
        <Route path="payments" element={<StudentPayments />} />
        <Route path="surveys" element={<StudentSurveys />} />
        <Route path="notifications" element={<StudentNotifications />} />
      </Route>

      {/* Teacher Routes - Protected */}
      <Route 
        path="/teacher" 
        element={
          <ProtectedRoute allowedRoles={[Role.TEACHER]} fallbackPath="/auth/login">
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="assignments" element={<TeacherAssignments />} />
        <Route path="grading" element={<TeacherGrading />} />
        <Route path="materials" element={<TeacherMaterials />} />
        <Route path="surveys" element={<TeacherSurveys />} />
        <Route path="timesheet" element={<TeacherTimesheet />} />
        <Route path="calendar" element={<TeacherCalendar />} />
        <Route path="reports" element={<TeacherReports />} />
      </Route>

      {/* Admin Routes - Protected */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={[Role.ADMIN]} fallbackPath="/auth/login">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users/students" element={<StudentsManagement />} />
        <Route path="users/teachers" element={<TeachersManagement />} />
        <Route path="users/staff" element={<StaffManagement />} />
        <Route path="courses" element={<CoursesManagement />} />
        <Route path="classes" element={<ClassesManagement />} />
        <Route path="schedule" element={<ScheduleManagement />} />
        <Route path="payments" element={<PaymentsManagement />} />
        <Route path="reports/attendance" element={<AttendanceReport />} />
        <Route path="reports/performance" element={<PerformanceReport />} />
        <Route path="reports/finance" element={<FinanceReport />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="surveys" element={<div>Quản lý khảo sát</div>} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="roles" element={<Roles />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Unauthorized Page */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route
        path="*"
        element={
          <div
            style={{
              padding: '2rem',
              textAlign: 'center',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              Không tìm thấy trang
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Liên kết bạn truy cập không tồn tại.
            </p>
            <a
              href="/home"
              style={{
                color: '#6366f1',
                textDecoration: 'underline',
                fontSize: '1.1rem',
              }}
            >
              Quay lại trang chủ
            </a>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
