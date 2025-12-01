import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import sql from 'mssql';
import { getPool } from '../utils/database';

const TeacherQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  subject_id: z.coerce.number().int().positive().optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export async function teachersRoutes(app: FastifyInstance) {
  // Test endpoint - simple response
  app.get('/teachers/test', async (request, reply) => {
    return reply.send({
      success: true,
      message: 'Teachers route is working!',
      timestamp: new Date().toISOString()
    });
  });

  // GET /teachers - List teachers with filters (PUBLIC - no auth)
  app.get('/teachers', async (request, reply) => {
    const startTime = Date.now();
    console.log('=== Teachers API called ===');
    try {
      const { page = 1, limit = 12, search = '', is_active } = request.query as any;
      console.log(`Query params: page=${page}, limit=${limit}, is_active=${is_active}`);
      const offset = (page - 1) * limit;

      const pool = getPool();
      if (!pool) {
        return reply.status(500).send({
          success: false,
          message: 'Database connection not available'
        });
      }

      const requestObj = pool.request();
      // Note: timeout is set at pool level, not request level
      
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

      // Ultra-simplified query - NO LEFT JOIN for speed
      const teachersQuery = `
        SELECT TOP (@limit)
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
          u.STATUS as is_active
        FROM TEACHERS t WITH (NOLOCK)
        INNER JOIN USERS u WITH (NOLOCK) ON t.USER_ID = u.ID
        ${whereClause}
        ORDER BY t.ID DESC
      `;

      requestObj.input('limit', sql.Int, limit);

      console.log(`Executing teachers query with limit=${limit}, is_active=${is_active}`);
      
      // Execute main query
      const result = await requestObj.query(teachersQuery);
      
      // Use approximate count for speed - exact count only when needed
      const total = result.recordset.length < limit ? result.recordset.length : 100; // Approximate
      
      const queryTime = Date.now() - startTime;
      console.log(`Teachers query completed in ${queryTime}ms, returned ${result.recordset.length} rows`);

      // Transform data to match PublicTeacher interface (without subject join for speed)
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
        main_subject: undefined // Will be fetched separately if needed
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
