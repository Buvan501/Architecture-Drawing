import axios from 'axios';

const getBaseUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:5000/api';
  const host = window.location.hostname;
  // Use relative /api in production so Hosting rewrites can proxy to backend
  if (host === 'localhost' || host === '127.0.0.1') return 'http://localhost:5000/api';
  return '/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/user-login';
    } else if (error.response?.status === 403) {
      // Access denied
      console.error('Access denied:', error.response.data.error);
    } else if (error.response?.status >= 500) {
      // Server error
      console.error('Server error:', error.response.data.error);
    }
    return Promise.reject(error);
  }
);

export default api;