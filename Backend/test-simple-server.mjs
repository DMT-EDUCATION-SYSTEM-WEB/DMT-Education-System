#!/usr/bin/env node

/**
 * Simple test server to isolate the issue
 */

import Fastify from 'fastify';

const app = Fastify({ 
  logger: true,
});

// Simple health check
app.get('/health', async () => ({ 
  status: 'ok', 
  timestamp: new Date().toISOString() 
}));

const port = 3002;

// Start server
const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`Simple test server running on http://localhost:${port}`);
    console.log(`Test: curl http://localhost:${port}/health`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
