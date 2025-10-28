import axios from 'axios';

// Prefer an environment-configured API base URL (Vite exposes VITE_* vars via import.meta.env)
// Fallback to localhost:8080 which is the backend default in `backend/app.py`.
const BASE = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE,
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