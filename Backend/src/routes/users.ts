import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { supabase } from '../server';

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async (req, reply) => {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, full_name, role_id, status, created_at')
      .order('id');
    if (error) return reply.code(500).send({ error: error.message });
    return { data };
  });

  app.post('/users', async (req, reply) => {
    const schema = z.object({
      email: z.string().email(),
      password_hash: z.string().min(6),
      full_name: z.string().min(1).optional(),
      role_id: z.number().int(),
      status: z.boolean().default(true),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
      return reply.code(400).send({ error: parsed.error.flatten() });

    const { data, error } = await supabase
      .from('users')
      .insert(parsed.data)
      .select('id')
      .single();
    if (error) return reply.code(500).send({ error: error.message });
    return reply.code(201).send({ id: data.id });
  });
}
