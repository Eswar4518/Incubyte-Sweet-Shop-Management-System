import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';

const TestAuth: React.FC = () => {
  const [result, setResult] = useState<string>('');

  const testBackend = async () => {
    try {
      const response = await axiosClient.get('/health');
      setResult(`✅ Backend connected: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      setResult(`❌ Backend error: ${error.message}`);
    }
  };

  const testRegister = async () => {
    try {
      const response = await axiosClient.post('/api/auth/register', {
        email: 'test@example.com',
        password: 'password123'
      });
      setResult(`✅ Register success: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      setResult(`❌ Register error: ${error.response?.data?.message || error.message}`);
    }
  };

  const testLogin = async () => {
    try {
      const response = await axiosClient.post('/api/auth/login', {
        email: 'test@example.com',
        password: 'password123'
      });
      setResult(`✅ Login success: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      setResult(`❌ Login error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Authentication Test</h2>
      
      <div className="space-y-4">
        <button 
          onClick={testBackend}
          className="btn-primary mr-4"
        >
          Test Backend Connection
        </button>
        
        <button 
          onClick={testRegister}
          className="btn-primary mr-4"
        >
          Test Register
        </button>
        
        <button 
          onClick={testLogin}
          className="btn-primary"
        >
          Test Login
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default TestAuth;