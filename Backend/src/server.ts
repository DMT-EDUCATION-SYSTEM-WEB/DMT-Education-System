import Fastify from 'fastify';
import cors from '@fastify/cors';
import * as dotenv from 'dotenv';
import authPlugin from './plugins/auth.js';
import registerRoutes from './plugins/routes.js';
import { errorHandler } from './utils/errorHandler.js';
import { initializeDatabase, closePool } from './utils/database.js';

dotenv.config({ path: '.env.local' });

const app = Fastify({ 
  logger: true,
});

// Global error handler
app.setErrorHandler(errorHandler);

// CORS
const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.register(cors, {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (corsOrigins.length === 0 || corsOrigins.includes(origin))
      return cb(null, true);
    return cb(new Error('Not allowed'), false);
  },
  credentials: true,
});

// JWT/auth plugin
app.register(authPlugin);

// Database connection pool - will be initialized in start()
let db: any = null;

// Export db for use in routes (backward compatibility with 'supabase' name)
export { db as supabase };
export { db };

// Health check
app.get('/health', async () => ({ 
  status: 'ok', 
  timestamp: new Date().toISOString(),
  version: '1.0.0',
  database: db ? 'connected' : 'not connected'
}));

// Register API routes
app.register(registerRoutes);

const port = Number(process.env.PORT || 3001);

// Graceful shutdown
const gracefulShutdown = async () => {
  app.log.info('🛑 Shutting down gracefully...');
  await closePool();
  await app.close();
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
const start = async () => {
  try {
    // Initialize SQL Server database connection
    db = await initializeDatabase();
    
    if (!db) {
      app.log.error('❌ Failed to initialize database connection');
      app.log.warn('⚠️  Server will run but database operations will fail');
    } else {
      app.log.info('✅ SQL Server database connected successfully');
    }
    
    await app.listen({ port, host: '0.0.0.0' });
    app.log.info(`🚀 DMT Education API Server running on http://localhost:${port}`);
    app.log.info(`📋 Health check: http://localhost:${port}/health`);
    app.log.info(`🗄️  Database: ${db ? 'Connected' : 'Not connected'}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
