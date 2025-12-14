/**
 * Server Startup
 *
 * This file is the entry point of the application.
 * It loads environment variables, connects to MongoDB,
 * then starts the Express HTTP server.
 *
 * Run with: npm run dev (for development with hot-reload)
 */

import dotenv from 'dotenv';
import app from './app';
import { connectToDatabase } from './config/db';

// Load environment variables from .env file
dotenv.config();

// Get port from environment or use default
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Start the server
 * This is an async function because database connection is asynchronous
 */
const startServer = async () => {
  // Step 1: Connect to MongoDB
  console.log('Connecting to MongoDB...');
  await connectToDatabase();
  console.log('✓ Successfully connected to MongoDB database');

  // Step 2: Start HTTP server
  app.listen(PORT, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║      Sweet Shop API Server Started!          ║');
    console.log('╚══════════════════════════════════════════════╝');
    console.log('');
    console.log(`✓ API running on http://localhost:${PORT}`);
    console.log(`✓ Environment: ${NODE_ENV}`);
    console.log('');
    console.log('Endpoints:');
    console.log(`  Health Check: GET http://localhost:${PORT}/health`);
    console.log(`  Auth:        POST http://localhost:${PORT}/api/auth/register`);
    console.log(`  Auth:        POST http://localhost:${PORT}/api/auth/login`);
    console.log(`  Sweets:      GET  http://localhost:${PORT}/api/sweets`);
    console.log('');
  });
};

// Start the server and handle any errors
startServer().catch((error) => {
  console.error('\n✗ Failed to start server:');
  console.error(error);
  process.exit(1);
});

// Graceful shutdown on process termination
process.on('SIGTERM', () => {
  console.log('\nSIGTERM signal received: closing HTTP server');
  process.exit(0);
});
