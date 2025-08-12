import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import TwoFactor from '../features/auth/pages/TwoFactor';
import StudentDashboard from '../features/students/pages/Dashboard';
import StudentSchedule from '../features/students/pages/Schedule';
import StudentVideos from '../features/students/pages/Videos';
import StudentMaterials from '../features/students/pages/Materials';
import StudentTranscript from '../features/students/pages/Transcript';
import TeacherAssignments from '../features/teachers/pages/Assignments';
import TeacherGrading from '../features/teachers/pages/Grading';
import TeacherSurveys from '../features/teachers/pages/Surveys';
import TeacherTimesheet from '../features/teachers/pages/Timesheet';
import AdminDashboard from '../features/admin/pages/Dashboard';
import AdminUsers from '../features/admin/pages/Users';
import AdminRoles from '../features/admin/pages/Roles';
import AdminAnalytics from '../features/admin/pages/Analytics';
import AdminNotifications from '../features/admin/pages/Notifications';
import AdminSettings from '../features/admin/pages/Settings';
import StaffTasks from '../features/staff/pages/Tasks';
import StaffSupport from '../features/staff/pages/Support';
import CourseCatalog from '../features/courses/pages/Catalog';
import CourseDetail from '../features/courses/pages/Detail';
import Calendar from '../features/schedule/pages/Calendar';
import SurveyList from '../features/surveys/pages/SurveyList';
import Reports from '../features/analytics/pages/Reports';
import Tickets from '../features/support/pages/Tickets';
import RequireRole from '../guards/RequireRole';
import { Role } from '../types';
import Unauthorized from '../features/auth/pages/Unauthorized';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/two-factor" element={<TwoFactor />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Students */}
      <Route path="/students/dashboard" element={<StudentDashboard />} />
      <Route path="/students/schedule" element={<StudentSchedule />} />
      <Route path="/students/videos" element={<StudentVideos />} />
      <Route path="/students/materials" element={<StudentMaterials />} />
      <Route path="/students/transcript" element={<StudentTranscript />} />

      {/* Teachers */}
      <Route path="/teachers/assignments" element={<TeacherAssignments />} />
      <Route path="/teachers/grading" element={<TeacherGrading />} />
      <Route path="/teachers/surveys" element={<TeacherSurveys />} />
      <Route path="/teachers/timesheet" element={<TeacherTimesheet />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={
        <RequireRole allowed={[Role.ADMIN]}>
          <AdminDashboard />
        </RequireRole>
      } />
      <Route path="/admin/users" element={
        <RequireRole allowed={[Role.ADMIN]}>
          <AdminUsers />
        </RequireRole>
      } />
      <Route path="/admin/roles" element={
        <RequireRole allowed={[Role.ADMIN]}>
          <AdminRoles />
        </RequireRole>
      } />
      <Route path="/admin/analytics" element={
        <RequireRole allowed={[Role.ADMIN]}>
          <AdminAnalytics />
        </RequireRole>
      } />
      <Route path="/admin/notifications" element={
        <RequireRole allowed={[Role.ADMIN]}>
          <AdminNotifications />
        </RequireRole>
      } />
      <Route path="/admin/settings" element={
        <RequireRole allowed={[Role.ADMIN]}>
          <AdminSettings />
        </RequireRole>
      } />

      {/* Staff */}
      <Route path="/staff/tasks" element={<StaffTasks />} />
      <Route path="/staff/support" element={<StaffSupport />} />

      {/* Courses & Schedule */}
      <Route path="/courses/catalog" element={<CourseCatalog />} />
      <Route path="/courses/detail" element={<CourseDetail />} />
      <Route path="/schedule/calendar" element={<Calendar />} />

      {/* Surveys & Analytics & Support */}
      <Route path="/surveys/list" element={<SurveyList />} />
      <Route path="/analytics/reports" element={<Reports />} />
      <Route path="/support/tickets" element={<Tickets />} />

      {/* 404 fallback */}
      <Route path="*" element={
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">Không tìm thấy trang</h2>
          <p className="text-gray-600">Liên kết bạn truy cập không tồn tại.</p>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;