/**
 * Protected Route Component
 *
 * Wraps routes that require authentication
 * Redirects to login if not authenticated
 * Checks admin role for admin routes
 */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'customer' | 'admin'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth()

  // Not logged in - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Check role if required
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
