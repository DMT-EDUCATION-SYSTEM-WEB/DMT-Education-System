import { FastifyInstance } from 'fastify';
import { authRoutes } from '../routes/auth';
import { usersRoutes } from '../routes/users';
import { rolesRoutes } from '../routes/roles';
import { studentsRoutes } from '../routes/students';
import { teachersRoutes } from '../routes/teachers';
import { subjectsRoutes } from '../routes/subjects';
import { coursesRoutes } from '../routes/courses';
import { classesRoutes } from '../routes/classes';
import { enrollmentsRoutes } from '../routes/enrollments';
import { attendanceRoutes } from '../routes/attendance';
import { assignmentsRoutes } from '../routes/assignments';
import { materialsRoutes } from '../routes/materials';
import { paymentsRoutes } from '../routes/payments';
import { surveysRoutes } from '../routes/surveys';
import { staffRoutes } from '../routes/staff';
import { newsRoutes } from '../routes/news';
import { reportsRoutes } from '../routes/reports';
import { notificationsRoutes } from '../routes/notifications';
import { statisticsRoutes } from '../routes/statistics';
import { activityLogsRoutes } from '../routes/activity-logs';
import { systemSettingsRoutes } from '../routes/system-settings';
import { backupRoutes } from '../routes/backup';

export default async function registerRoutes(app: FastifyInstance) {
  // Core authentication routes - UPDATED WITH STORED PROCEDURES
  await authRoutes(app);
  
  // News routes - ACTIVE FOR SQL SERVER
  await newsRoutes(app);
  
  // Academic entity routes - UPDATED WITH STORED PROCEDURES
  await enrollmentsRoutes(app);  // Uses sp_EnrollStudent, sp_DropEnrollment
  await attendanceRoutes(app);   // Uses sp_BulkMarkAttendance
  await paymentsRoutes(app);     // Uses sp_ProcessPayment, sp_RefundPayment
  await reportsRoutes(app);      // Uses sp_GetSystemOverview, sp_GetStudentReport, sp_GetClassReport
  
  // New advanced routes - ACTIVE FOR SQL SERVER
  await notificationsRoutes(app);   // Notification management
  await statisticsRoutes(app);      // Uses database functions (fn_GetAttendanceRate, fn_GetAverageGrade, etc.)
  await activityLogsRoutes(app);    // Activity logging and tracking
  await systemSettingsRoutes(app);  // System settings management (Admin)
  await backupRoutes(app);          // Database backup/restore (Admin)
  
  // User management routes - ACTIVE FOR SQL SERVER
  await usersRoutes(app);
  await rolesRoutes(app);
  
  // Entity management routes - ACTIVE FOR SQL SERVER
  await studentsRoutes(app);
  await teachersRoutes(app);    // Teachers management - ACTIVE
  await staffRoutes(app);
  await subjectsRoutes(app);
  await coursesRoutes(app);
  await classesRoutes(app);
  
  // Learning resources routes - ACTIVE FOR SQL SERVER
  await assignmentsRoutes(app);
  await materialsRoutes(app);
  
  // Survey routes - ACTIVE FOR SQL SERVER
  await surveysRoutes(app);
}
