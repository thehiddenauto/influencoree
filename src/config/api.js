// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backendnew-lz1u.onrender.com';

// API endpoints configuration
export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  GENERATE_TEXT: `${API_BASE_URL}/api/generate-text`,
  GENERATE_VIDEO: `${API_BASE_URL}/api/generate-video`,
  GENERATE_VEO3_VIDEO: `${API_BASE_URL}/api/generate-veo3`,
  GENERATE_SORA_VIDEO: `${API_BASE_URL}/api/generate-sora`,
  GENERATE_VIRAL_SHORT: `${API_BASE_URL}/api/generate-viral`,
  GENERATE_VIDEO_FROM_IMAGE: `${API_BASE_URL}/api/generate-video-from-image`,
  UPLOAD_VIDEO: `${API_BASE_URL}/api/upload-video`,
  CLIP_VIDEO: `${API_BASE_URL}/api/clip-video`,
  USER_PROFILE: `${API_BASE_URL}/api/user/profile`,
  AUTH_LOGIN: `${API_BASE_URL}/api/auth/login`,
  AUTH_SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  AUTH_LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  BILLING: `${API_BASE_URL}/api/billing`,
  SOCIAL_CONNECT: `${API_BASE_URL}/api/social/connect`,
  LIBRARY: `${API_BASE_URL}/api/library`,
  ANALYTICS: `${API_BASE_URL}/api/analytics`,
};

// Enhanced API client with better error handling and CORS support
export const apiClient = {
  async request(endpoint, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...options.headers,
      },
      mode: 'cors',
      credentials: 'include',
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('influencore_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      console.log(`API Request: ${options.method || 'GET'} ${endpoint}`);
      
      const response = await fetch(endpoint, config);
      
      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      console.log(`API Response: ${response.status}`, data);

      if (!response.ok) {
        // Handle auth errors
        if (response.status === 401) {
          localStorage.removeItem('influencore_token');
          localStorage.removeItem('influencore_user');
          window.location.href = '/login';
          throw new Error('Authentication required');
        }
        
        // Handle specific error responses
        const errorMessage = typeof data === 'object' && data ? 
          (data.message || data.error || data.details) : 
          data || `HTTP error! status: ${response.status}`;
          
        throw new Error(errorMessage);
      }
      
      return data;
    } catch (error) {
      console.error(`API ${options.method || 'GET'} Error:`, error);
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      // Handle CORS errors
      if (error.message.includes('CORS')) {
        throw new Error('CORS error. Please contact support if this persists.');
      }
      
      throw error;
    }
  },

  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  },

  async post(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  },

  async put(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  },

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  },

  // File upload helper
  async uploadFile(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    const token = localStorage.getItem('influencore_token');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers,
    });
  },
};

// Specific API endpoint functions
export const apiEndpoints = {
  // Health check
  checkHealth: () => apiClient.get(API_ENDPOINTS.HEALTH),

  // Authentication
  login: (credentials) => apiClient.post(API_ENDPOINTS.AUTH_LOGIN, credentials),
  signup: (userData) => apiClient.post(API_ENDPOINTS.AUTH_SIGNUP, userData),
  logout: () => apiClient.post(API_ENDPOINTS.AUTH_LOGOUT),

  // Video generation
  generateVideo: (data) => apiClient.post(API_ENDPOINTS.GENERATE_VIDEO, data),
  generateVeo3Video: (data) => apiClient.post(API_ENDPOINTS.GENERATE_VEO3_VIDEO, data),
  generateSoraVideo: (data) => apiClient.post(API_ENDPOINTS.GENERATE_SORA_VIDEO, data),
  generateViralShort: (data) => apiClient.post(API_ENDPOINTS.GENERATE_VIRAL_SHORT, data),
  generateVideoFromImage: (data) => apiClient.post(API_ENDPOINTS.GENERATE_VIDEO_FROM_IMAGE, data),

  // Text generation
  generateText: (data) => apiClient.post(API_ENDPOINTS.GENERATE_TEXT, data),

  // Video processing
  uploadVideo: (file, metadata) => apiClient.uploadFile(API_ENDPOINTS.UPLOAD_VIDEO, file, metadata),
  clipVideo: (data) => apiClient.post(API_ENDPOINTS.CLIP_VIDEO, data),

  // User profile
  getUserProfile: () => apiClient.get(API_ENDPOINTS.USER_PROFILE),
  updateUserProfile: (data) => apiClient.put(API_ENDPOINTS.USER_PROFILE, data),

  // Library
  getLibrary: () => apiClient.get(API_ENDPOINTS.LIBRARY),
  deleteVideo: (videoId) => apiClient.delete(`${API_ENDPOINTS.LIBRARY}/${videoId}`),

  // Analytics
  getAnalytics: () => apiClient.get(API_ENDPOINTS.ANALYTICS),

  // Billing
  getBillingInfo: () => apiClient.get(API_ENDPOINTS.BILLING),
  updateBilling: (data) => apiClient.put(API_ENDPOINTS.BILLING, data),

  // Social
  connectSocial: (platform, data) => apiClient.post(`${API_ENDPOINTS.SOCIAL_CONNECT}/${platform}`, data),
};

// Health check function with retry logic
export const checkBackendHealth = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.HEALTH);
      console.log('✅ Backend health check successful:', response);
      return true;
    } catch (error) {
      console.warn(`⚠️ Backend health check attempt ${i + 1} failed:`, error.message);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
      }
    }
  }
  return false;
};

// Initialize health check on app start
export const initializeApi = async () => {
  console.log('🚀 Initializing API connection to:', API_BASE_URL);
  const isHealthy = await checkBackendHealth();
  
  if (!isHealthy) {
    console.warn('⚠️ Backend connection failed. Some features may not work.');
  } else {
    console.log('✅ API connection established successfully');
  }
  
  return isHealthy;
};
