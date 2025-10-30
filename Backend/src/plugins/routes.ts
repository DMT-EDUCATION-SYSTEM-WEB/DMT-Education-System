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

export default async function registerRoutes(app: FastifyInstance) {
  // Core authentication routes
  await authRoutes(app);
  
  // News routes - ACTIVE FOR SQL SERVER
  await newsRoutes(app);
  
  // User management routes - TEMPORARILY COMMENTED FOR SQL SERVER MIGRATION
  // await usersRoutes(app);
  // await rolesRoutes(app);
  
  // Academic entity routes - TEMPORARILY COMMENTED FOR SQL SERVER MIGRATION
  // await studentsRoutes(app);
  // await teachersRoutes(app);
  // await staffRoutes(app);
  // await subjectsRoutes(app);
  // await coursesRoutes(app);
  // await classesRoutes(app);
  // await enrollmentsRoutes(app);
  
  // Academic operations routes - TEMPORARILY COMMENTED FOR SQL SERVER MIGRATION
  // await attendanceRoutes(app);
  // await assignmentsRoutes(app);
  // await materialsRoutes(app);
  
  // Financial routes - TEMPORARILY COMMENTED FOR SQL SERVER MIGRATION
  // await paymentsRoutes(app);
  
  // Survey routes - TEMPORARILY COMMENTED FOR SQL SERVER MIGRATION
  // await surveysRoutes(app);
}
