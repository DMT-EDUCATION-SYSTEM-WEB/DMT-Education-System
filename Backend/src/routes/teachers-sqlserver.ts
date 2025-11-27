import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import * as sql from 'mssql';
import { getPool } from '../utils/database';

const TeacherQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  subject_id: z.coerce.number().int().positive().optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export async function teachersRoutes(app: FastifyInstance) {
  // GET /teachers - List teachers with filters (PUBLIC - no auth)
  app.get('/teachers', async (request, reply) => {
    try {
      const { page = 1, limit = 50, search = '', is_active } = request.query as any;
      const offset = (page - 1) * limit;

      const pool = await getPool();
      if (!pool) {
        return reply.status(500).send({
          success: false,
          message: 'Database connection not available'
        });
      }

      const requestObj = pool.request();
      
      // Build WHERE clause with parameters
      let whereClause = '';
      const conditions: string[] = [];
      
      if (is_active !== undefined) {
        const activeValue = is_active === true || is_active === 'true' || is_active === '1' ? 1 : 0;
        conditions.push(`u.STATUS = @is_active`);
        requestObj.input('is_active', sql.Bit, activeValue);
      }
      
      if (search) {
        conditions.push(`(UPPER(u.FULL_NAME) LIKE UPPER(@search) OR UPPER(t.TEACHER_CODE) LIKE UPPER(@search))`);
        requestObj.input('search', sql.NVarChar, `%${search}%`);
      }
      
      if (conditions.length > 0) {
        whereClause = 'WHERE ' + conditions.join(' AND ');
      }

      // Query with subject information
      const teachersQuery = `
        SELECT 
          t.ID as id,
          t.TEACHER_CODE as teacher_code,
          t.MAIN_SUBJECT_ID as main_subject_id,
          t.YEARS_EXPERIENCE as years_experience,
          t.DEGREE as degree,
          t.SPECIALIZATION as specialization,
          t.CREATED_AT as created_at,
          u.FULL_NAME as full_name,
          u.PHONE as phone,
          u.ADDRESS as address,
          u.BIRTH_DATE as birth_date,
          u.STATUS as is_active,
          s.ID as subject_id,
          s.NAME as subject_name,
          s.CODE as subject_code
        FROM TEACHERS t
        INNER JOIN USERS u ON t.USER_ID = u.ID
        LEFT JOIN SUBJECTS s ON t.MAIN_SUBJECT_ID = s.ID
        ${whereClause}
        ORDER BY t.CREATED_AT DESC
        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY
      `;

      requestObj.input('offset', sql.Int, offset);
      requestObj.input('limit', sql.Int, limit);

      // Count query
      const countQuery = `
        SELECT COUNT(*) as total
        FROM TEACHERS t
        INNER JOIN USERS u ON t.USER_ID = u.ID
        ${whereClause}
      `;

      const countRequest = pool.request();
      if (is_active !== undefined) {
        const activeValue = is_active === true || is_active === 'true' || is_active === '1' ? 1 : 0;
        countRequest.input('is_active', sql.Bit, activeValue);
      }
      if (search) {
        countRequest.input('search', sql.NVarChar, `%${search}%`);
      }

      const result = await requestObj.query(teachersQuery);
      const countResult = await countRequest.query(countQuery);
      const total = countResult.recordset[0]?.total || 0;

      // Transform data to match PublicTeacher interface
      const transformedData = (result.recordset || []).map((row: any) => ({
        id: row.id,
        teacher_code: row.teacher_code,
        main_subject_id: row.main_subject_id,
        years_experience: row.years_experience || 0,
        degree: row.degree,
        specialization: row.specialization,
        created_at: row.created_at,
        full_name: row.full_name,
        phone: row.phone,
        address: row.address,
        birth_date: row.birth_date,
        is_active: row.is_active === 1 || row.is_active === true,
        main_subject: row.subject_id ? {
          id: row.subject_id,
          name: row.subject_name,
          code: row.subject_code
        } : undefined
      }));

      return reply.send({
        success: true,
        data: transformedData,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Error fetching teachers:', error);
      return reply.status(500).send({
        success: false,
        message: 'Failed to fetch teachers',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
}
