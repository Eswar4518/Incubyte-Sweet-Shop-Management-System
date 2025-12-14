"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const sweet_routes_1 = __importDefault(require("./routes/sweet.routes"));
// Create Express application
const app = (0, express_1.default)();
/**
 * MIDDLEWARE SETUP
 * These middleware functions process incoming requests
 */
// Enable CORS (Cross-Origin Resource Sharing)
// Allows frontend (running on different port) to communicate with backend
app.use((0, cors_1.default)());
// Parse incoming JSON request bodies
// Converts JSON strings to JavaScript objects
app.use(express_1.default.json());
/**
 * API ROUTES
 * All API endpoints are mounted here
 */
// Authentication routes: /api/auth/register and /api/auth/login
app.use('/api/auth', auth_routes_1.default);
// Sweet management routes: /api/sweets/*
app.use('/api/sweets', sweet_routes_1.default);
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
exports.default = app;
