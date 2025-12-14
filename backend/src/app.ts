/**
 * Express Application Setup
 *
 * This file configures and initializes the Express server.
 * It sets up middleware for CORS and JSON parsing,
 * then registers all API routes.
 *
 * The app object is exported so it can be:
 * 1. Used by server.ts to start the HTTP listener
 * 2. Used by tests to run without starting the actual server
 */

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import sweetRoutes from './routes/sweet.routes';

// Create Express application
const app = express();

/**
 * MIDDLEWARE SETUP
 * These middleware functions process incoming requests
 */

// Enable CORS (Cross-Origin Resource Sharing)
// Allows frontend (running on different port) to communicate with backend
app.use(cors({
  origin: true,
  credentials: true
}));

// Parse incoming JSON request bodies
// Converts JSON strings to JavaScript objects
app.use(express.json());

/**
 * API ROUTES
 * All API endpoints are mounted here
 */

// Authentication routes: /api/auth/register and /api/auth/login
app.use('/api/auth', authRoutes);

// Sweet management routes: /api/sweets/*
app.use('/api/sweets', sweetRoutes);

// User management routes: /api/users/*
const userRoutes = require('./routes/user.routes').default;
app.use('/api/users', userRoutes);

/**
 * HEALTH CHECK ROUTE
 * Simple endpoint to verify that the API is running
 */
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Sweet Shop API is running!',
    timestamp: new Date().toISOString()
  });
});

/**
 * 404 Error Handler
 * Handles requests to routes that don't exist
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`
  });
});

export default app;
