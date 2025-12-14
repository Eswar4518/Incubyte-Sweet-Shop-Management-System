"use strict";
/**
 * Authentication Routes
 *
 * Defines all authentication-related API endpoints.
 * These routes handle user registration and login.
 *
 * Endpoints:
 * POST /register - Create a new user account
 * POST /login - Authenticate user and receive JWT token
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
/**
 * POST /api/auth/register
 * Creates a new user account
 *
 * Request body:
 * {
 *   email: string (required)
 *   password: string (required, min 6 characters)
 * }
 *
 * Response on success (201):
 * {
 *   success: true
 *   message: "User registered successfully!"
 *   token: "JWT_TOKEN_HERE"
 *   user: { id, email, role }
 * }
 *
 * Response on error (400 or 409):
 * {
 *   success: false
 *   message: "Error description"
 * }
 */
router.post('/register', auth_controller_1.register);
/**
 * POST /api/auth/login
 * Authenticates user with email and password
 *
 * Request body:
 * {
 *   email: string (required)
 *   password: string (required)
 * }
 *
 * Response on success (200):
 * {
 *   success: true
 *   message: "Logged in successfully!"
 *   token: "JWT_TOKEN_HERE"
 *   user: { id, email, role }
 * }
 *
 * Response on error (401 or 400):
 * {
 *   success: false
 *   message: "Error description"
 * }
 */
router.post('/login', auth_controller_1.login);
exports.default = router;
