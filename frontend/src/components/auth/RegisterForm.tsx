import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validate inputs
      if (!username || !email || !password || !confirmPassword) {
        setError('All fields are required')
        setIsLoading(false)
        return
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match')
        setIsLoading(false)
        return
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long')
        setIsLoading(false)
        return
      }

      console.log('Attempting registration with:', { email, password: '***' })
      // Call register function
      await register(username, email, password)

      // Redirect to dashboard on success
      navigate('/dashboard')
    } catch (err: any) {
      console.error('Registration error:', err)
      const message = err.response?.data?.message || err.message || 'Registration failed. Please try again.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="card w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Create Account</h2>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Enter your username"
              required
            />
          </div>

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

          {/* Confirm Password Input */}
          <div>
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isLoading} className="btn-primary w-full">
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-4 text-black">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-700 hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm