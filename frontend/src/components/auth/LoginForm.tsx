/**
 * Login Form Component
 *
 * Allows users to login with email and password
 * Handles validation, loading state, and errors
 */

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validate inputs
      if (!email || !password) {
        setError('Email and password are required')
        setIsLoading(false)
        return
      }

      console.log('Attempting login with:', { email, password: '***' })
      // Call login function
      const result = await login(email, password)
      console.log('Login successful:', result)

      // Redirect to homepage on success
      navigate('/')
    } catch (err: any) {
      console.error('Login error details:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      })
      
      // Handle specific error cases
      if (err.response?.status === 401) {
        setError('Invalid email or password. Please check your credentials and try again.')
      } else if (err.response?.status === 404) {
        setError('User not found. Please check your email or register for a new account.')
      } else {
        const message = err.response?.data?.message || err.message || 'Login failed. Please try again.'
        setError(message)
      }
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="card w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isLoading} className="btn-primary w-full">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-4 text-black">
          Don't have an account?{' '}
          <Link to="/register" className="text-amber-700 hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
