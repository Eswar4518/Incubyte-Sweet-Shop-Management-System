require('dotenv').config();

console.log('Environment variables:');
console.log('JWT_SECRET from env:', process.env.JWT_SECRET);
console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length);

const jwt = require('jsonwebtoken');

// Test token creation and verification
const testPayload = { id: 'test', role: 'admin' };
const secret1 = process.env.JWT_SECRET || 'super-secret-key-change-in-production';
const secret2 = 'your-super-secret-key-change-in-production-12345';

console.log('\nTesting with secret1 (from env):', secret1);
const token1 = jwt.sign(testPayload, secret1);
console.log('Token1:', token1);

try {
  const decoded1 = jwt.verify(token1, secret1);
  console.log('✅ Token1 verification successful:', decoded1);
} catch (err) {
  console.log('❌ Token1 verification failed:', err.message);
}

console.log('\nTesting with secret2 (hardcoded):', secret2);
const token2 = jwt.sign(testPayload, secret2);
console.log('Token2:', token2);

try {
  const decoded2 = jwt.verify(token2, secret2);
  console.log('✅ Token2 verification successful:', decoded2);
} catch (err) {
  console.log('❌ Token2 verification failed:', err.message);
}