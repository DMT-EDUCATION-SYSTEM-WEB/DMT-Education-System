import Fastify from 'fastify';
import cors from '@fastify/cors';
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = Fastify({ logger: true });

// CORS
const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
await app.register(cors, {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (corsOrigins.length === 0 || corsOrigins.includes(origin))
      return cb(null, true);
    return cb(new Error('Not allowed'), false);
  },
  credentials: true,
});

// Supabase client (service role for backend)
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
if (!supabaseUrl || !supabaseServiceRoleKey) {
  app.log.warn('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

app.get('/health', async () => ({ status: 'ok' }));

// Register modular routes
import registerRoutes from './plugins/routes';
await registerRoutes(app);

// Example: list subjects
app.get('/subjects', async (req, reply) => {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .order('id');
  if (error) return reply.code(500).send({ error: error.message });
  return { data };
});

// Example: list courses
app.get('/courses', async (req, reply) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('id');
  if (error) return reply.code(500).send({ error: error.message });
  return { data };
});

// Example: classes with joins
app.get('/classes', async (req, reply) => {
  const { data, error } = await supabase
    .from('classes')
    .select('*, courses(name, code)')
    .order('id');
  if (error) return reply.code(500).send({ error: error.message });
  return { data };
});

const port = Number(process.env.PORT || 4000);
app
  .listen({ port, host: '0.0.0.0' })
  .then(() => app.log.info(`API listening on :${port}`))
  .catch(err => {
    app.log.error(err);
    process.exit(1);
  });
