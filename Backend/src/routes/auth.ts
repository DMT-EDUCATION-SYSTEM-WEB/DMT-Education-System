import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { supabase } from '../server';
import bcrypt from 'bcryptjs';

export async function authRoutes(app: FastifyInstance) {
  // Login with email + password
  app.post('/auth/login', async (req, reply) => {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
      return reply.code(400).send({ error: parsed.error.flatten() });

    const { email, password } = parsed.data;

    // Fetch user by email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error || !user)
      return reply.code(401).send({ error: 'Invalid credentials' });

    // Verify password
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return reply.code(401).send({ error: 'Invalid credentials' });

    // issue a simple signed JWT (Fastify JWT)
    const token = await reply.jwtSign({
      sub: String(user.id),
      email: user.email,
      role_id: user.role_id,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role_id: user.role_id,
      },
    };
  });

  // Get current user
  app.get(
    '/auth/me',
    { preValidation: [app.authenticate] },
    async (req: any) => {
      const userId = Number(req.user?.sub);
      const { data, error } = await supabase
        .from('users')
        .select('id, email, full_name, role_id, status, created_at')
        .eq('id', userId)
        .single();
      if (error) throw error;
      return { user: data };
    }
  );
}
