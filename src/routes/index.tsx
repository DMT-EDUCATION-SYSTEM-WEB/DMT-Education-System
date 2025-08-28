import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from '../pages/HomePage';
import CoursesPage from '../pages/CoursesPage';
import TeachersPage from '../pages/TeachersPage';
import SchedulePage from '../pages/SchedulePage';
import AnnouncementPage from '../pages/AnnouncementPage';
import Login from '../features/auth/pages/Login';
import AdminDashboard from '../features/admin/pages/Dashboard';

// Teacher Pages
import TeacherDashboard from '../features/teachers/pages/Dashboard';
import TeacherAssignments from '../features/teachers/pages/Assignments';
import TeacherGrading from '../features/teachers/pages/Grading';
import TeacherMaterials from '../features/teachers/pages/Materials';
import TeacherSurveys from '../features/teachers/pages/Surveys';
import TeacherTimesheet from '../features/teachers/pages/Timesheet';
import TeacherCalendar from '../features/teachers/pages/Calendar';
import TeacherReports from '../features/teachers/pages/Reports';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'opacity, transform' }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/announcement" element={<AnnouncementPage />} />
          <Route path="/auth/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/assignments" element={<TeacherAssignments />} />
          <Route path="/teacher/grading" element={<TeacherGrading />} />
          <Route path="/teacher/materials" element={<TeacherMaterials />} />
          <Route path="/teacher/surveys" element={<TeacherSurveys />} />
          <Route path="/teacher/timesheet" element={<TeacherTimesheet />} />
          <Route path="/teacher/calendar" element={<TeacherCalendar />} />
          <Route path="/teacher/reports" element={<TeacherReports />} />

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
      </motion.div>
    </AnimatePresence>
  );
};

export default AppRoutes;
