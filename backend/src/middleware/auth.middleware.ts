/**
 * Authentication Middleware
 * 
 * This middleware checks if incoming requests have a valid JWT token.
 * If valid, it extracts user info and attaches it to the request.
 * If invalid or missing, it returns a 401 Unauthorized error.
 * 
 * Flow:
 * 1. Client sends request with Authorization header
 * 2. We extract the JWT token from the header
 * 3. We verify the token signature
 * 4. If valid, we attach user info to request and move forward
 * 5. If invalid, we reject the request
 */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Extended Request interface with user info
 * This allows us to add user data to the request object
 */
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'customer' | 'admin';
  };
}

/**
 * Authenticate middleware function
 * Verify JWT token and extract user information
 * 
 * Expected header format: Authorization: Bearer <token>
 */
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
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
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    // Step 4: Verify token using JWT secret
    const secret = process.env.JWT_SECRET || 'super-secret-key-change-in-production';
    const decoded = jwt.verify(token, secret) as {
      id: string;
      role: 'customer' | 'admin';
    };

    // Step 5: Attach decoded user info to request
    req.user = { id: decoded.id, role: decoded.role };

    // Step 6: Call next middleware or route handler
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    // Step 7: Handle invalid or expired tokens
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.'
    });
  }
};
