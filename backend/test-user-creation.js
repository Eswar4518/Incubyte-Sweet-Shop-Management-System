const axios = require('axios');

const BASE_URL = 'http://localhost:4000';

async function testUserCreation() {
  try {
    console.log('🔐 Testing admin login...');
    
    // Step 1: Login as admin
    const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: 'Eswar@sweetshop.com',
      password: 'admin123'
    });
    
    console.log('✅ Login successful!');
    const token = loginResponse.data.token;
    
    // Step 2: Test user creation
    console.log('\n👤 Testing user creation...');
    
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'customer'
    };
    
    const createResponse = await axios.post(`${BASE_URL}/api/users`, newUser, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ User creation successful!');
    console.log('Created user:', createResponse.data);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testUserCreation();