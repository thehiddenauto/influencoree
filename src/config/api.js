import axios from 'axios';
import toast from 'react-hot-toast';

// API Base URL Configuration
const getApiUrl = () => {
  // Use environment variable if available, fallback to production backend
  const envApiUrl = import.meta.env.VITE_API_URL;
  const fallbackUrl = 'https://influencore-backend.onrender.com';
  
  return envApiUrl || fallbackUrl;
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('influencore_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log API calls in development
    if (import.meta.env.DEV) {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        data: config.data,
      });
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle different error scenarios
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout - please try again');
    } else if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          toast.error('Authentication required');
          localStorage.removeItem('influencore_token');
          // Redirect to login if needed
          break;
        case 403:
          toast.error('Access denied');
          break;
        case 404:
          toast.error('Resource not found');
          break;
        case 429:
          toast.error('Too many requests - please wait');
          break;
        case 500:
          toast.error('Server error - please try again later');
          break;
        default:
          toast.error(data?.message || 'An error occurred');
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error - please check your connection');
    } else {
      toast.error('An unexpected error occurred');
    }
    
    return Promise.reject(error);
  }
);

// API endpoint functions
export const apiEndpoints = {
  // Health check
  healthCheck: () => api.get('/api/health'),
  
  // Video generation
  generateVideo: (data) => api.post('/api/generate-video', data),
  generateVeo3Video: (data) => api.post('/api/generate-veo3-video', data),
  generateSoraVideo: (data) => api.post('/api/generate-sora-video', data),
  generateViralShort: (data) => api.post('/api/generate-viral-short', data),
  generateVideoFromImage: (data) => api.post('/api/generate-video-from-image', data),
  
  // User management
  getUser: () => api.get('/api/user'),
  updateUser: (data) => api.put('/api/user', data),
  
  // Content management
  getVideos: () => api.get('/api/videos'),
  getVideo: (id) => api.get(`/api/videos/${id}`),
  deleteVideo: (id) => api.delete(`/api/videos/${id}`),
  
  // Subscription management
  getSubscription: () => api.get('/api/subscription'),
  getUsage: () => api.get('/api/usage'),
  
  // Analytics
  getAnalytics: () => api.get('/api/analytics'),
};

// Utility functions
export const checkBackendHealth = async () => {
  try {
    const response = await apiEndpoints.healthCheck();
    return {
      isHealthy: true,
      data: response.data,
      url: getApiUrl(),
    };
  } catch (error) {
    return {
      isHealthy: false,
      error: error.message,
      url: getApiUrl(),
    };
  }
};

// Export the configured axios instance
export default api;

// Export API URL for components that need it
export const API_URL = getApiUrl();