import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { supabase } from '../server';
import { ResponseHelper } from '../utils/response';
import { authenticateToken, requireRole, ROLES } from '../middleware/auth';
import { validateBody, validateParams, validateQuery, PaginationSchema, IdParamSchema } from '../middleware/validation';

const CreateEnrollmentSchema = z.object({
  class_id: z.number().int().positive(),
  student_id: z.number().int().positive(),
  enrollment_date: z.string().optional(),
  status: z.enum(['active', 'completed', 'dropped', 'suspended']).default('active'),
  payment_status: z.enum(['pending', 'paid', 'partial', 'overdue']).default('pending'),
  total_fee: z.number().positive(),
  paid_amount: z.number().nonnegative().default(0),
  discount_percent: z.number().min(0).max(100).default(0),
  notes: z.string().optional(),
});

const UpdateEnrollmentSchema = z.object({
  status: z.enum(['active', 'completed', 'dropped', 'suspended']).optional(),
  payment_status: z.enum(['pending', 'paid', 'partial', 'overdue']).optional(),
  total_fee: z.number().positive().optional(),
  paid_amount: z.number().nonnegative().optional(),
  discount_percent: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
});

const EnrollmentQuerySchema = PaginationSchema.extend({
  class_id: z.coerce.number().int().positive().optional(),
  student_id: z.coerce.number().int().positive().optional(),
  status: z.enum(['active', 'completed', 'dropped', 'suspended']).optional(),
  payment_status: z.enum(['pending', 'paid', 'partial', 'overdue']).optional(),
});

export async function enrollmentsRoutes(app: FastifyInstance) {
  // GET /enrollments - List enrollments with filters
  app.get('/enrollments', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF, ROLES.TEACHER])],
    preHandler: [validateQuery(EnrollmentQuerySchema)]
  }, async (req: any, reply: any) => {
    try {
      const { page, limit, search, class_id, student_id, status, payment_status } = req.query;
      const offset = (page - 1) * limit;

      let query = supabase
        .from('enrollments')
        .select(`
          *,
          classes!inner(
            id, code, name, status,
            courses(id, name, code)
          ),
          students!inner(
            id, student_code,
            users!inner(
              id, full_name, email, phone
            )
          )
        `, { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('enrollment_date', { ascending: false });

      if (search) {
        query = query.or(`students.users.full_name.ilike.%${search}%,classes.name.ilike.%${search}%`);
      }

      if (class_id) {
        query = query.eq('class_id', class_id);
      }

      if (student_id) {
        query = query.eq('student_id', student_id);
      }

      if (status) {
        query = query.eq('status', status);
      }

      if (payment_status) {
        query = query.eq('payment_status', payment_status);
      }

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

  // GET /enrollments/:id - Get enrollment details
  app.get('/enrollments/:id', {
    preValidation: [authenticateToken],
    preHandler: [validateParams(IdParamSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          classes!inner(
            id, code, name, status, start_date, end_date, schedule_days, schedule_time,
            courses(id, name, code, description, price, level)
          ),
          students!inner(
            id, student_code, school_level, parent_name, parent_phone,
            users!inner(
              id, full_name, email, phone, address
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) {
        return ResponseHelper.notFound(reply, 'Enrollment not found');
      }

      return ResponseHelper.success(reply, data);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // POST /enrollments - Create new enrollment
  app.post('/enrollments', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF])],
    preHandler: [validateBody(CreateEnrollmentSchema)]
  }, async (req: any, reply: any) => {
    try {
      const enrollmentData = req.body;

      // Verify class exists and has capacity
      const { data: classInfo, error: classError } = await supabase
        .from('classes')
        .select('id, capacity, current_students, status')
        .eq('id', enrollmentData.class_id)
        .single();

      if (classError || !classInfo) {
        return ResponseHelper.badRequest(reply, 'Class not found');
      }

      if (classInfo.status === 'completed' || classInfo.status === 'cancelled') {
        return ResponseHelper.badRequest(reply, 'Cannot enroll in completed or cancelled class');
      }

      if (classInfo.current_students >= classInfo.capacity) {
        return ResponseHelper.badRequest(reply, 'Class is full');
      }

      // Verify student exists
      const { data: student } = await supabase
        .from('students')
        .select('id')
        .eq('id', enrollmentData.student_id)
        .single();

      if (!student) {
        return ResponseHelper.badRequest(reply, 'Student not found');
      }

      // Check if student is already enrolled
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('id')
        .eq('class_id', enrollmentData.class_id)
        .eq('student_id', enrollmentData.student_id)
        .single();

      if (existingEnrollment) {
        return ResponseHelper.badRequest(reply, 'Student already enrolled in this class');
      }

      const { data, error } = await supabase
        .from('enrollments')
        .insert([enrollmentData])
        .select()
        .single();

      if (error) throw error;

      // Update class current_students count
      await supabase
        .from('classes')
        .update({ current_students: classInfo.current_students + 1 })
        .eq('id', enrollmentData.class_id);

      return ResponseHelper.created(reply, data);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // PUT /enrollments/:id - Update enrollment
  app.put('/enrollments/:id', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF])],
    preHandler: [validateParams(IdParamSchema), validateBody(UpdateEnrollmentSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Verify enrollment exists
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('*')
        .eq('id', id)
        .single();

      if (!existingEnrollment) {
        return ResponseHelper.notFound(reply, 'Enrollment not found');
      }

      const { data, error } = await supabase
        .from('enrollments')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return ResponseHelper.success(reply, data);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // DELETE /enrollments/:id - Delete enrollment
  app.delete('/enrollments/:id', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN])],
    preHandler: [validateParams(IdParamSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;

      // Get enrollment info
      const { data: enrollment } = await supabase
        .from('enrollments')
        .select('class_id')
        .eq('id', id)
        .single();

      if (!enrollment) {
        return ResponseHelper.notFound(reply, 'Enrollment not found');
      }

      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update class current_students count
      const { data: classInfo } = await supabase
        .from('classes')
        .select('current_students')
        .eq('id', enrollment.class_id)
        .single();

      if (classInfo && classInfo.current_students > 0) {
        await supabase
          .from('classes')
          .update({ current_students: classInfo.current_students - 1 })
          .eq('id', enrollment.class_id);
      }

      return ResponseHelper.success(reply, { message: 'Enrollment deleted successfully' });
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // GET /enrollments/:id/attendance - Get enrollment attendance records
  app.get('/enrollments/:id/attendance', {
    preValidation: [authenticateToken],
    preHandler: [validateParams(IdParamSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
        .from('attendance')
        .select(`
          *,
          class_sessions!inner(
            id, session_number, title, session_date, start_time, end_time
          )
        `)
        .eq('enrollment_id', id)
        .order('class_sessions.session_date', { ascending: true });

      if (error) throw error;

      return ResponseHelper.success(reply, data);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });
}
