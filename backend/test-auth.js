const jwt = require('jsonwebtoken');

// Test JWT token creation and verification
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-production';

// Create a test token
const testPayload = {
  id: '507f1f77bcf86cd799439011',
  role: 'admin'
};

const token = jwt.sign(testPayload, JWT_SECRET, { expiresIn: '7d' });
console.log('Test Token:', token);

// Verify the token
try {
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log('Decoded:', decoded);
} catch (error) {
  console.error('Verification failed:', error);
}