import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { supabase } from '../server';
import { ResponseHelper } from '../utils/response';
import { authenticateToken, requireRole, ROLES } from '../middleware/auth';
import { validateBody, validateParams, validateQuery, PaginationSchema, IdParamSchema } from '../middleware/validation';

const CreateAttendanceSchema = z.object({
  session_id: z.number().int().positive(),
  enrollment_id: z.number().int().positive(),
  status: z.enum(['present', 'absent', 'late', 'excused']),
  check_in_time: z.string().optional(),
  notes: z.string().optional(),
  marked_by: z.number().int().positive(),
});

const UpdateAttendanceSchema = z.object({
  status: z.enum(['present', 'absent', 'late', 'excused']).optional(),
  check_in_time: z.string().optional(),
  notes: z.string().optional(),
});

const CreateSessionSchema = z.object({
  class_id: z.number().int().positive(),
  session_number: z.number().int().positive(),
  title: z.string().optional(),
  session_date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  content: z.string().optional(),
  homework: z.string().optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled']).default('scheduled'),
});

const UpdateSessionSchema = z.object({
  session_number: z.number().int().positive().optional(),
  title: z.string().optional(),
  session_date: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  content: z.string().optional(),
  homework: z.string().optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled']).optional(),
});

export async function attendanceRoutes(app: FastifyInstance) {
  // GET /attendance - List attendance records
  app.get('/attendance', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF, ROLES.TEACHER])],
    preHandler: [validateQuery(PaginationSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { page, limit, search } = req.query;
      const offset = (page - 1) * limit;

      let query = supabase
        .from('attendance')
        .select(`
          *,
          class_sessions!inner(
            id, session_number, title, session_date,
            classes(id, name, code)
          ),
          enrollments!inner(
            id,
            students!inner(
              id, student_code,
              users!inner(
                id, full_name, email
              )
            )
          )
        `, { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      const { data, error, count } = await query;
      if (error) throw error;

      return ResponseHelper.successWithPagination(
        reply,
        data,
        { page, limit, total: count || 0 }
      );
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // POST /attendance - Mark attendance
  app.post('/attendance', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF, ROLES.TEACHER])],
    preHandler: [validateBody(CreateAttendanceSchema)]
  }, async (req: any, reply: any) => {
    try {
      const attendanceData = req.body;

      // Check if attendance already exists
      const { data: existing } = await supabase
        .from('attendance')
        .select('id')
        .eq('session_id', attendanceData.session_id)
        .eq('enrollment_id', attendanceData.enrollment_id)
        .single();

      if (existing) {
        return ResponseHelper.badRequest(reply, 'Attendance already marked for this session');
      }

      const { data, error } = await supabase
        .from('attendance')
        .insert([attendanceData])
        .select()
        .single();

      if (error) throw error;

      return ResponseHelper.created(reply, data);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // PUT /attendance/:id - Update attendance
  app.put('/attendance/:id', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF, ROLES.TEACHER])],
    preHandler: [validateParams(IdParamSchema), validateBody(UpdateAttendanceSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const { data, error } = await supabase
        .from('attendance')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) {
        return ResponseHelper.notFound(reply, 'Attendance record not found');
      }

      return ResponseHelper.success(reply, data);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // POST /attendance/bulk - Bulk mark attendance for a session
  app.post('/attendance/bulk', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF, ROLES.TEACHER])],
  }, async (req: any, reply: any) => {
    try {
      const { session_id, attendance_records, marked_by } = req.body;

      if (!session_id || !attendance_records || !Array.isArray(attendance_records)) {
        return ResponseHelper.badRequest(reply, 'Invalid request data');
      }

      // Prepare attendance data
      const attendanceData = attendance_records.map((record: any) => ({
        session_id,
        enrollment_id: record.enrollment_id,
        status: record.status,
        check_in_time: record.check_in_time,
        notes: record.notes,
        marked_by,
      }));

      const { data, error } = await supabase
        .from('attendance')
        .upsert(attendanceData, {
          onConflict: 'session_id,enrollment_id',
          ignoreDuplicates: false
        })
        .select();

      if (error) throw error;

      return ResponseHelper.success(reply, data, 'Attendance marked successfully');
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // GET /sessions/:id/attendance - Get attendance for a session
  app.get('/sessions/:id/attendance', {
    preValidation: [authenticateToken],
    preHandler: [validateParams(IdParamSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
        .from('attendance')
        .select(`
          *,
          enrollments!inner(
            id,
            students!inner(
              id, student_code,
              users!inner(
                id, full_name, email
              )
            )
          )
        `)
        .eq('session_id', id)
        .order('enrollments.students.users.full_name');

      if (error) throw error;

      return ResponseHelper.success(reply, data);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // ========== CLASS SESSIONS ROUTES ==========

  // GET /sessions - List class sessions
  app.get('/sessions', {
    preValidation: [authenticateToken],
    preHandler: [validateQuery(PaginationSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { page, limit } = req.query;
      const offset = (page - 1) * limit;

      const { data, error, count } = await supabase
        .from('class_sessions')
        .select(`
          *,
          classes!inner(
            id, name, code,
            courses(id, name)
          )
        `, { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('session_date', { ascending: false });

      if (error) throw error;

      return ResponseHelper.successWithPagination(
        reply,
        data,
        { page, limit, total: count || 0 }
      );
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // GET /sessions/:id - Get session details
  app.get('/sessions/:id', {
    preValidation: [authenticateToken],
    preHandler: [validateParams(IdParamSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
        .from('class_sessions')
        .select(`
          *,
          classes!inner(
            id, name, code, capacity,
            courses(id, name)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) {
        return ResponseHelper.notFound(reply, 'Session not found');
      }

      return ResponseHelper.success(reply, data);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // POST /sessions - Create session
  app.post('/sessions', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF, ROLES.TEACHER])],
    preHandler: [validateBody(CreateSessionSchema)]
  }, async (req: any, reply: any) => {
    try {
      const sessionData = req.body;

      const { data, error } = await supabase
        .from('class_sessions')
        .insert([sessionData])
        .select()
        .single();

      if (error) throw error;

      return ResponseHelper.created(reply, data);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // PUT /sessions/:id - Update session
  app.put('/sessions/:id', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF, ROLES.TEACHER])],
    preHandler: [validateParams(IdParamSchema), validateBody(UpdateSessionSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const { data, error } = await supabase
        .from('class_sessions')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) {
        return ResponseHelper.notFound(reply, 'Session not found');
      }

      return ResponseHelper.success(reply, data);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // DELETE /sessions/:id - Delete session
  app.delete('/sessions/:id', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN])],
    preHandler: [validateParams(IdParamSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;

      const { error } = await supabase
        .from('class_sessions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return ResponseHelper.success(reply, { message: 'Session deleted successfully' });
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });
}
