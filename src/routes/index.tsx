import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>

      {/* Auth */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/two-factor" component={TwoFactor} />
      <Route exact path="/unauthorized" component={Unauthorized} />

      {/* Students */}
      <Route exact path="/students/dashboard" component={StudentDashboard} />
      <Route exact path="/students/schedule" component={StudentSchedule} />
      <Route exact path="/students/videos" component={StudentVideos} />
      <Route exact path="/students/materials" component={StudentMaterials} />
      <Route exact path="/students/transcript" component={StudentTranscript} />

      {/* Teachers */}
      <Route exact path="/teachers/assignments" component={TeacherAssignments} />
      <Route exact path="/teachers/grading" component={TeacherGrading} />
      <Route exact path="/teachers/surveys" component={TeacherSurveys} />
      <Route exact path="/teachers/timesheet" component={TeacherTimesheet} />

      {/* Admin */}
      <Route exact path="/admin/dashboard" render={() => (
        <RequireRole allowed={[Role.ADMIN]}>
          <AdminDashboard />
        </RequireRole>
      )} />
      <Route exact path="/admin/users" render={() => (
        <RequireRole allowed={[Role.ADMIN]}>
          <AdminUsers />
        </RequireRole>
      )} />
      <Route exact path="/admin/roles" render={() => (
        <RequireRole allowed={[Role.ADMIN]}>
          <AdminRoles />
        </RequireRole>
      )} />
      <Route exact path="/admin/analytics" render={() => (
        <RequireRole allowed={[Role.ADMIN]}>
          <AdminAnalytics />
        </RequireRole>
      )} />
      <Route exact path="/admin/notifications" render={() => (
        <RequireRole allowed={[Role.ADMIN]}>
          <AdminNotifications />
        </RequireRole>
      )} />
      <Route exact path="/admin/settings" render={() => (
        <RequireRole allowed={[Role.ADMIN]}>
          <AdminSettings />
        </RequireRole>
      )} />

      {/* Staff */}
      <Route exact path="/staff/tasks" component={StaffTasks} />
      <Route exact path="/staff/support" component={StaffSupport} />

      {/* Courses & Schedule */}
      <Route exact path="/courses/catalog" component={CourseCatalog} />
      <Route exact path="/courses/detail" component={CourseDetail} />
      <Route exact path="/schedule/calendar" component={Calendar} />

      {/* Surveys & Analytics & Support */}
      <Route exact path="/surveys/list" component={SurveyList} />
      <Route exact path="/analytics/reports" component={Reports} />
      <Route exact path="/support/tickets" component={Tickets} />

      {/* 404 fallback */}
      <Route>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">Không tìm thấy trang</h2>
          <p className="text-gray-600">Liên kết bạn truy cập không tồn tại.</p>
        </div>
      </Route>
    </Switch>
  );
};

export default Routes;