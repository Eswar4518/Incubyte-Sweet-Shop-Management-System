import axios from "axios";

// Base Axios client used by all API modules
// The backend runs by default on port 4000 per .env in the backend
// If the frontend builds for production set VITE_API_URL environment variable
const VITE_ENV = (import.meta as any).env || {};
const BASE_URL = VITE_ENV.VITE_API_URL || "http://localhost:5000";

console.log('API Base URL:', BASE_URL);

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token?: string) => {
  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
  }
};

// Add request interceptor for debugging
axiosClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging and token handling
axiosClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.response?.data || error.message);
    
    // Handle token expiration
    if (error.response?.status === 401 && localStorage.getItem('sweetshop_token')) {
      console.log('Token expired, clearing session');
      localStorage.removeItem('sweetshop_token');
      localStorage.removeItem('sweetshop_user');
      // Only redirect if we're not already on login/register pages
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;
