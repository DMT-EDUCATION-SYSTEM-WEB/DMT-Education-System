import { FastifyInstance } from 'fastify';
import { usersRoutes } from '../routes/users';
import { authRoutes } from '../routes/auth';

export default async function registerRoutes(app: FastifyInstance) {
  await authRoutes(app);
  await usersRoutes(app);
}
