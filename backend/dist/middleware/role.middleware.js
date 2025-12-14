"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
/**
 * requireAdmin middleware
 * Checks if the authenticated user has admin role
 *
 * Returns 403 Forbidden if user is not admin
 */
const requireAdmin = (req, res, next) => {
    // Check if user exists and has admin role
    if (!req.user || req.user.role !== 'admin') {
        res.status(403).json({
            success: false,
            message: 'Admin access required. Only administrators can perform this action.'
        });
        return;
    }
    // User is admin, allow request to proceed
    next();
};
exports.requireAdmin = requireAdmin;
