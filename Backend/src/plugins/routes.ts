import { FastifyInstance } from 'fastify';
import { usersRoutes } from '../routes/users';

export default async function registerRoutes(app: FastifyInstance) {
  await usersRoutes(app);
}
