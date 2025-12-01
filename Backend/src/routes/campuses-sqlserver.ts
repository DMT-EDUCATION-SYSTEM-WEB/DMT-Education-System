import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { query } from '../utils/database';

const CampusQuerySchema = z.object({
  is_active: z.enum(['true', 'false']).optional(),
});

export async function campusesRoutes(app: FastifyInstance) {
  // GET /campuses - List all campuses
  app.get('/campuses', async (req, reply) => {
    try {
      const parsed = CampusQuerySchema.safeParse(req.query);
      const is_active = parsed.success && parsed.data.is_active === 'false' ? false : true;

      const sql_query = `
        SELECT 
          ID as id,
          CODE as code,
          NAME as name,
          FULL_NAME as fullName,
          ADDRESS as address,
          PHONE as phone,
          EMAIL as email,
          COLOR as color,
          GRADIENT as gradient,
          IMAGE_URL as image,
          FACILITIES as facilities,
          OPENING_HOURS as openingHours,
          MAP_URL as mapUrl,
          IS_ACTIVE as isActive,
          SORT_ORDER as sortOrder
        FROM CAMPUSES
        WHERE IS_ACTIVE = @p1
        ORDER BY SORT_ORDER ASC
      `;

      const result = await query(sql_query, [is_active ? 1 : 0]);

      // Parse facilities JSON
      const campuses = result.rows.map((row: any) => ({
        ...row,
        facilities: row.facilities ? JSON.parse(row.facilities) : []
      }));

      return reply.send({
        success: true,
        data: campuses
      });

    } catch (error: any) {
      console.error('Get campuses error:', error);
      return reply.code(500).send({
        success: false,
        error: error.message || 'Failed to fetch campuses'
      });
    }
  });

  // GET /campuses/:id - Get campus by ID
  app.get('/campuses/:id', async (req: any, reply) => {
    try {
      const { id } = req.params;

      const sql_query = `
        SELECT 
          ID as id,
          CODE as code,
          NAME as name,
          FULL_NAME as fullName,
          ADDRESS as address,
          PHONE as phone,
          EMAIL as email,
          COLOR as color,
          GRADIENT as gradient,
          IMAGE_URL as image,
          FACILITIES as facilities,
          OPENING_HOURS as openingHours,
          MAP_URL as mapUrl,
          IS_ACTIVE as isActive
        FROM CAMPUSES
        WHERE ID = @p1
      `;

      const result = await query(sql_query, [id]);

      if (result.rows.length === 0) {
        return reply.code(404).send({
          success: false,
          error: 'Campus not found'
        });
      }

      const campus = {
        ...result.rows[0],
        facilities: result.rows[0].facilities ? JSON.parse(result.rows[0].facilities) : []
      };

      return reply.send({
        success: true,
        data: campus
      });

    } catch (error: any) {
      console.error('Get campus error:', error);
      return reply.code(500).send({
        success: false,
        error: error.message || 'Failed to fetch campus'
      });
    }
  });

  // GET /campuses/:id/classes - Get classes for a campus
  app.get('/campuses/:id/classes', async (req: any, reply) => {
    try {
      const { id } = req.params;

      const sql_query = `
        SELECT 
          c.ID as id,
          c.CODE as code,
          c.NAME as name,
          c.CAPACITY as capacity,
          c.CURRENT_STUDENTS as currentStudents,
          c.START_DATE as startDate,
          c.END_DATE as endDate,
          c.SCHEDULE_DAYS as scheduleDays,
          c.SCHEDULE_TIME as scheduleTime,
          c.CLASSROOM as classroom,
          c.STATUS as status,
          co.ID as courseId,
          co.NAME as courseName,
          co.LEVEL as level,
          co.PRICE as price,
          s.ID as subjectId,
          s.NAME as subjectName,
          s.CODE as subjectCode,
          u.FULL_NAME as teacherName
        FROM CLASSES c
        LEFT JOIN COURSES co ON c.COURSE_ID = co.ID
        LEFT JOIN SUBJECTS s ON co.SUBJECT_ID = s.ID
        LEFT JOIN TEACHERS t ON c.TEACHER_ID = t.ID
        LEFT JOIN USERS u ON t.USER_ID = u.ID
        WHERE c.CAMPUS_ID = @p1 AND c.STATUS = 'ACTIVE'
        ORDER BY c.START_DATE ASC
      `;

      const result = await query(sql_query, [id]);

      return reply.send({
        success: true,
        data: result.rows
      });

    } catch (error: any) {
      console.error('Get campus classes error:', error);
      return reply.code(500).send({
        success: false,
        error: error.message || 'Failed to fetch campus classes'
      });
    }
  });
}
