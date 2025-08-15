const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// API health check and initialization
export const initializeApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(5000)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend connected:', data);
      return true;
    } else {
      console.warn('⚠️ Backend health check failed:', response.status);
      return false;
    }
  } catch (error) {
    console.warn('⚠️ Backend connection failed:', error.message);
    return false;
  }
};

// Enhanced API call function with error handling
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('influencore_token');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  };

  // Handle FormData (for file uploads)
  if (options.body instanceof FormData) {
    delete defaultOptions.headers['Content-Type'];
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } else {
      // Handle non-JSON responses (like file downloads)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    }
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Authentication helper
export const setAuthToken = (token, userData) => {
  localStorage.setItem('influencore_token', token);
  localStorage.setItem('influencore_user', JSON.stringify(userData));
};

export const clearAuthToken = () => {
  localStorage.removeItem('influencore_token');
  localStorage.removeItem('influencore_user');
};

export const getAuthToken = () => {
  return localStorage.getItem('influencore_token');
};

export const getUser = () => {
  const userData = localStorage.getItem('influencore_user');
  return userData ? JSON.parse(userData) : null;
};
