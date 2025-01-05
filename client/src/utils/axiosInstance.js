import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://friend-me-one.vercel.app/api', // Base URL for the backend API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the Authorization header to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle response errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can add global error handling logic here
    if (error.response && error.response.status === 401) {
      // If the response is 401 (Unauthorized), redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
