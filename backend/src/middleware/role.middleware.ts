/**
 * Role-Based Access Control Middleware
 * 
 * This middleware ensures that only admin users can access certain endpoints.
 * It's applied to sensitive operations like delete, restock, etc.
 * 
 * Usage: Apply this after the authenticate middleware
 */
import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

/**
 * requireAdmin middleware
 * Checks if the authenticated user has admin role
 * 
 * Returns 403 Forbidden if user is not admin
 */
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
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
