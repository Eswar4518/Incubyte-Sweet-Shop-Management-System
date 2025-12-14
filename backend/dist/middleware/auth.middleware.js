"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Authenticate middleware function
 * Verify JWT token and extract user information
 *
 * Expected header format: Authorization: Bearer <token>
 */
const authenticate = (req, res, next) => {
    // Step 1: Get the Authorization header
    const authHeader = req.headers.authorization;
    // Step 2: Check if header exists
    if (!authHeader) {
        res.status(401).json({
            success: false,
            message: 'Authorization header is missing. Please log in first.'
        });
        return;
    }
    // Step 3: Extract token from "Bearer <token>" format
    const token = authHeader.replace('Bearer ', '');
    try {
        // Step 4: Verify token using JWT secret
        const secret = process.env.JWT_SECRET || 'super-secret-key-change-in-production';
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Step 5: Attach decoded user info to request
        req.user = { id: decoded.id, role: decoded.role };
        // Step 6: Call next middleware or route handler
        next();
    }
    catch (error) {
        // Step 7: Handle invalid or expired tokens
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token. Please log in again.'
        });
    }
};
exports.authenticate = authenticate;
