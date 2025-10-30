import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { supabase } from '../server';
import { ResponseHelper } from '../utils/response';
import { authenticateToken, requireRole, ROLES } from '../middleware/auth';
import { validateBody, validateParams, validateQuery, PaginationSchema, IdParamSchema } from '../middleware/validation';

const CreateTeacherSchema = z.object({
  // User info
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(1),
  phone: z.string().optional(),
  address: z.string().optional(),
  birth_date: z.string().optional(),
  
  // Teacher specific info
  teacher_code: z.string().optional(),
  main_subject_id: z.number().int().positive().optional(),
  years_experience: z.number().int().min(0).default(0),
  degree: z.string().optional(),
  specialization: z.string().optional(),
});

const UpdateTeacherSchema = z.object({
  // User info updates
  email: z.string().email().optional(),
  full_name: z.string().min(1).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  birth_date: z.string().optional(),
  status: z.boolean().optional(),
  
  // Teacher specific updates
  teacher_code: z.string().optional(),
  main_subject_id: z.number().int().positive().optional(),
  years_experience: z.number().int().min(0).optional(),
  degree: z.string().optional(),
  specialization: z.string().optional(),
});

const TeacherQuerySchema = PaginationSchema.extend({
  main_subject_id: z.coerce.number().int().positive().optional(),
  status: z.coerce.boolean().optional(),
});

export async function teachersRoutes(app: FastifyInstance) {
  // GET /teachers - List teachers with filters
  app.get('/teachers', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF])],
    preHandler: [validateQuery(TeacherQuerySchema)]
  }, async (req: any, reply: any) => {
    try {
      const { page, limit, search, main_subject_id, status } = req.query;
      const offset = (page - 1) * limit;

      let query = supabase
        .from('teachers')
        .select(`
          *,
          users!inner(
            id, email, full_name, phone, address, birth_date, status, created_at
          ),
          subjects(
            id, name, code
          )
        `, { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('id');

      if (search) {
        query = query.or(`users.full_name.ilike.%${search}%,users.email.ilike.%${search}%,teacher_code.ilike.%${search}%`);
      }

      if (main_subject_id) {
        query = query.eq('main_subject_id', main_subject_id);
      }

      if (status !== undefined) {
        query = query.eq('users.status', status);
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

  // GET /teachers/:id - Get teacher details
  app.get('/teachers/:id', {
    preValidation: [authenticateToken],
    preHandler: [validateParams(IdParamSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from('teachers')
        .select(`
          *,
          users!inner(
            id, email, full_name, phone, address, birth_date, status, created_at
          ),
          subjects(
            id, name, code, description
          )
        `)
        .eq('id', id)
        .single();

      if (error || !data) {
        return ResponseHelper.notFound(reply, 'Teacher');
      }

      return ResponseHelper.success(reply, data);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // POST /teachers - Create new teacher
  app.post('/teachers', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF])],
    preHandler: [validateBody(CreateTeacherSchema)]
  }, async (req: any, reply: any) => {
    try {
      const teacherData = req.body;
      
      // Generate teacher code if not provided
      if (!teacherData.teacher_code) {
        const year = new Date().getFullYear();
        const { count } = await supabase
          .from('teachers')
          .select('*', { count: 'exact', head: true });
        teacherData.teacher_code = `GV${year}${String(count + 1).padStart(4, '0')}`;
      }

      // Create user first
      const saltRounds = 12;
      const password_hash = await bcrypt.hash(teacherData.password, saltRounds);
      
      const { password, teacher_code, main_subject_id, years_experience, degree, specialization, ...userData } = teacherData;
      
      const { data: user, error: userError } = await supabase
        .from('users')
        .insert({ 
          ...userData, 
          password_hash,
          role_id: ROLES.TEACHER 
        })
        .select('id')
        .single();

      if (userError) {
        if (userError.code === '23505') {
          return ResponseHelper.error(reply, 'Email already exists', 409);
        }
        throw userError;
      }

      // Create teacher record
      const { data: teacher, error: teacherError } = await supabase
        .from('teachers')
        .insert({
          user_id: user.id,
          teacher_code,
          main_subject_id,
          years_experience,
          degree,
          specialization,
        })
        .select(`
          *,
          users!inner(
            id, email, full_name, phone, status
          ),
          subjects(
            id, name, code
          )
        `)
        .single();

      if (teacherError) throw teacherError;

      return ResponseHelper.success(reply, teacher, 'Teacher created successfully', 201);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // PUT /teachers/:id - Update teacher
  app.put('/teachers/:id', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF])],
    preHandler: [validateParams(IdParamSchema), validateBody(UpdateTeacherSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Get teacher with user_id
      const { data: teacher, error: getError } = await supabase
        .from('teachers')
        .select('user_id')
        .eq('id', id)
        .single();

      if (getError || !teacher) {
        return ResponseHelper.notFound(reply, 'Teacher');
      }

      // Separate user and teacher updates
      const { email, full_name, phone, address, birth_date, status, ...teacherUpdates } = updateData;
      const userUpdates = { email, full_name, phone, address, birth_date, status };

      // Update user table if needed
      const userKeys = Object.keys(userUpdates).filter(key => userUpdates[key as keyof typeof userUpdates] !== undefined);
      if (userKeys.length > 0) {
        const filteredUserUpdates = Object.fromEntries(
          userKeys.map(key => [key, userUpdates[key as keyof typeof userUpdates]])
        );
        
        const { error: userError } = await supabase
          .from('users')
          .update(filteredUserUpdates)
          .eq('id', teacher.user_id);

        if (userError) throw userError;
      }

      // Update teacher table if needed
      const teacherKeys = Object.keys(teacherUpdates).filter(key => teacherUpdates[key as keyof typeof teacherUpdates] !== undefined);
      if (teacherKeys.length > 0) {
        const filteredTeacherUpdates = Object.fromEntries(
          teacherKeys.map(key => [key, teacherUpdates[key as keyof typeof teacherUpdates]])
        );
        
        const { error: teacherError } = await supabase
          .from('teachers')
          .update(filteredTeacherUpdates)
          .eq('id', id);

        if (teacherError) throw teacherError;
      }

      // Get updated teacher data
      const { data: updatedTeacher, error: fetchError } = await supabase
        .from('teachers')
        .select(`
          *,
          users!inner(
            id, email, full_name, phone, address, birth_date, status
          ),
          subjects(
            id, name, code
          )
        `)
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      return ResponseHelper.success(reply, updatedTeacher, 'Teacher updated successfully');
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // DELETE /teachers/:id - Delete teacher
  app.delete('/teachers/:id', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN])],
    preHandler: [validateParams(IdParamSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;

      // Check if teacher has active classes
      const { data: activeClasses } = await supabase
        .from('classes')
        .select('id')
        .eq('teacher_id', id)
        .eq('status', 'active')
        .limit(1);

      if (activeClasses && activeClasses.length > 0) {
        return ResponseHelper.error(reply, 'Cannot delete teacher with active classes', 409);
      }

      // Get teacher with user_id
      const { data: teacher, error: getError } = await supabase
        .from('teachers')
        .select('user_id')
        .eq('id', id)
        .single();

      if (getError || !teacher) {
        return ResponseHelper.notFound(reply, 'Teacher');
      }

      // Delete teacher record first
      const { error: teacherError } = await supabase
        .from('teachers')
        .delete()
        .eq('id', id);

      if (teacherError) throw teacherError;

      // Delete user record
      const { error: userError } = await supabase
        .from('users')
        .delete()
        .eq('id', teacher.user_id);

      if (userError) throw userError;

      return ResponseHelper.success(reply, null, 'Teacher deleted successfully');
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // GET /teachers/:id/classes - Get teacher's classes
  app.get('/teachers/:id/classes', {
    preValidation: [authenticateToken],
    preHandler: [validateParams(IdParamSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;
      
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          courses!inner(
            id, name, description
          )
        `)
        .eq('teacher_id', id)
        .order('start_date', { ascending: false });

      if (error) throw error;

      return ResponseHelper.success(reply, data);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });

  // GET /teachers/:id/performance - Get teacher performance stats
  app.get('/teachers/:id/performance', {
    preValidation: [authenticateToken, requireRole([ROLES.ADMIN, ROLES.STAFF])],
    preHandler: [validateParams(IdParamSchema)]
  }, async (req: any, reply: any) => {
    try {
      const { id } = req.params;
      
      // Get basic stats
      const [classesResult, studentsResult, ratingsResult] = await Promise.all([
        // Total classes taught
        supabase
          .from('classes')
          .select('id', { count: 'exact', head: true })
          .eq('teacher_id', id),
        
        // Total students taught
        supabase
          .from('enrollments')
          .select('student_id', { count: 'exact', head: true })
          .in('class_id', 
            supabase
              .from('classes')
              .select('id')
              .eq('teacher_id', id)
          ),
        
        // Average attendance rate would require more complex query
        // For now, return mock data structure
        { data: [], error: null, count: 0 }
      ]);

      const stats = {
        total_classes: classesResult.count || 0,
        total_students: studentsResult.count || 0,
        average_rating: 4.5, // Would be calculated from actual feedback
        attendance_rate: 85.5, // Would be calculated from attendance data
      };

      return ResponseHelper.success(reply, stats);
    } catch (error: any) {
      return ResponseHelper.serverError(reply, error.message);
    }
  });
}