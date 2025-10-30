/**
 * DEPRECATED: This file is kept for backward compatibility
 * All Supabase functionality has been replaced with direct API calls to SQL Server backend
 * 
 * Use src/services/database.ts instead for new code
 */

// For backward compatibility - now just re-exports from database.ts
import { TABLES, dbHelpers } from './database';

// Legacy exports (deprecated - kept for existing code)
export const supabase = null; // No longer using Supabase client
export const isSupabaseConfigured = false; // Always false now

// Database table names
export const TABLES = {
  USERS: 'users',
  ROLES: 'roles',
  STUDENTS: 'students',
  TEACHERS: 'teachers',
  STAFF: 'staff',
  SUBJECTS: 'subjects',
  COURSES: 'courses',
  CLASSES: 'classes',
  CLASS_SESSIONS: 'class_sessions',
  ENROLLMENTS: 'enrollments',
  ATTENDANCE: 'attendance',
  ASSIGNMENTS: 'assignments',
  SUBMISSIONS: 'submissions',
  GRADES: 'grades',
  MATERIALS: 'materials',
  NOTIFICATIONS: 'notifications',
  PAYMENTS: 'payments',
  SURVEYS: 'surveys',
  SURVEY_QUESTIONS: 'survey_questions',
  SURVEY_RESPONSES: 'survey_responses',
  ACTIVITY_LOGS: 'activity_logs',
} as const;

// Helper functions for common queries
export const supabaseHelpers = {
  // Users
  async getUserById(userId: number) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*, roles(*)')
      .eq('id', userId)
      .single();
    return error ? null : data;
  },

  async getUserByEmail(email: string) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*, roles(*)')
      .eq('email', email)
      .single();
    return error ? null : data;
  },

  // Students
  async getStudentProfile(userId: number) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from(TABLES.STUDENTS)
      .select('*, users(*)')
      .eq('user_id', userId)
      .single();
    return error ? null : data;
  },

  async getStudentEnrollments(studentId: number) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from(TABLES.ENROLLMENTS)
      .select(`
        *,
        classes(
          *,
          courses(*, subjects(*)),
          teachers:teacher_id(*, users(*))
        )
      `)
      .eq('student_id', studentId)
      .eq('status', 'active');
    return error ? [] : data;
  },

  // Teachers
  async getTeacherProfile(userId: number) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from(TABLES.TEACHERS)
      .select('*, users(*), subjects(*)')
      .eq('user_id', userId)
      .single();
    return error ? null : data;
  },

  // Courses
  async getAllCourses() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from(TABLES.COURSES)
      .select('*, subjects(*)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    return error ? [] : data;
  },

  async getCourseById(courseId: number) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from(TABLES.COURSES)
      .select('*, subjects(*)')
      .eq('id', courseId)
      .single();
    return error ? null : data;
  },

  // Classes
  async getClassesByCourse(courseId: number) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from(TABLES.CLASSES)
      .select(`
        *,
        courses(*, subjects(*)),
        teachers:teacher_id(*, users(*))
      `)
      .eq('course_id', courseId);
    return error ? [] : data;
  },

  // Notifications
  async getNotificationsByUser(userId: number, unreadOnly = false) {
    if (!supabase) return [];
    let query = supabase
      .from(TABLES.NOTIFICATIONS)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (unreadOnly) {
      query = query.eq('is_read', false);
    }
    
    const { data, error } = await query;
    return error ? [] : data;
  },

  async markNotificationRead(notificationId: number) {
    if (!supabase) return false;
    const { error } = await supabase
      .from(TABLES.NOTIFICATIONS)
      .update({ is_read: true })
      .eq('id', notificationId);
    return !error;
  },

  // Payments
  async getPaymentsByEnrollment(enrollmentId: number) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from(TABLES.PAYMENTS)
      .select('*')
      .eq('enrollment_id', enrollmentId)
      .order('payment_date', { ascending: false });
    return error ? [] : data;
  },

  // Materials
  async getMaterialsByClass(classId: number) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from(TABLES.MATERIALS)
      .select('*, uploaded_by_user:uploaded_by(full_name)')
      .eq('class_id', classId)
      .order('created_at', { ascending: false });
    return error ? [] : data;
  },

  // Assignments
  async getAssignmentsByClass(classId: number) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from(TABLES.ASSIGNMENTS)
      .select('*, created_by_user:created_by(full_name)')
      .eq('class_id', classId)
      .order('due_date', { ascending: true });
    return error ? [] : data;
  },

  async getStudentSubmissions(studentId: number, assignmentId?: number) {
    if (!supabase) return [];
    let query = supabase
      .from(TABLES.SUBMISSIONS)
      .select(`
        *,
        assignments(*),
        grades(*)
      `)
      .eq('student_id', studentId);
    
    if (assignmentId) {
      query = query.eq('assignment_id', assignmentId);
    }
    
    const { data, error } = await query;
    return error ? [] : data;
  },

  // Attendance
  async getAttendanceByStudent(studentId: number, startDate?: string, endDate?: string) {
    if (!supabase) return [];
    let query = supabase
      .from(TABLES.ATTENDANCE)
      .select(`
        *,
        session:session_id(*, classes(*, courses(name)))
      `)
      .eq('enrollment_id', studentId);
    
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }
    
    const { data, error } = await query;
    return error ? [] : data;
  },

  // Analytics helpers
  async getStudentStats(studentId: number) {
    if (!supabase) return null;
    
    // Get enrollments count
    const { count: enrollmentsCount } = await supabase
      .from(TABLES.ENROLLMENTS)
      .select('*', { count: 'exact', head: true })
      .eq('student_id', studentId)
      .eq('status', 'active');

    // Get pending assignments count
    const { count: pendingAssignments } = await supabase
      .from(TABLES.ASSIGNMENTS)
      .select('*', { count: 'exact', head: true })
      .gte('due_date', new Date().toISOString())
      .eq('class_id', studentId); // This needs to be filtered by student's classes

    return {
      enrollmentsCount: enrollmentsCount || 0,
      pendingAssignments: pendingAssignments || 0,
    };
  },
};

export default supabase;
