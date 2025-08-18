import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
  }
}

export default fp(async function (app) {
  const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
  app.register(fastifyJwt, { secret });

  app.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
