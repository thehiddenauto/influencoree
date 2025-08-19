const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const initializeApi = async () => {
  try {
    console.log('🔄 Checking backend connection:', `${API_BASE_URL}/health`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Check if response is actually JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Backend returned non-JSON response. Server may not be properly configured.');
    }
    
    const data = await response.json();
    console.log('✅ Backend connected successfully:', data);
    return true;
    
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('⚠️ Backend connection timeout after 10 seconds');
    } else if (error.message.includes('Failed to fetch')) {
      console.warn('⚠️ Backend server is not running or unreachable');
    } else {
      console.warn('⚠️ Backend connection failed:', error.message);
    }
    
    // In development, provide helpful debugging info
    if (import.meta.env.DEV) {
      console.group('🔧 Debug Information');
      console.log('API URL:', API_BASE_URL);
      console.log('Environment:', import.meta.env.MODE);
      console.log('Error details:', error);
      console.groupEnd();
    }
    
    return false;
  }
};

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('influencore_token');

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  };

  // Don't set Content-Type for FormData
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
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } else {
      // Handle non-JSON responses
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText}. Response: ${text.substring(0, 200)}...`);
      }
      
      return response;
    }
  } catch (error) {
    console.error('❌ API call failed:', {
      endpoint,
      error: error.message,
      url: `${API_BASE_URL}${endpoint}`
    });
    throw error;
  }
};

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

// Mock API functions for offline mode
export const mockApiCall = async (endpoint, options = {}) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  
  if (endpoint === '/api/auth/login') {
    const { email, password } = JSON.parse(options.body || '{}');
    
    if (email && password) {
      return {
        success: true,
        token: 'mock-token-' + Date.now(),
        user: {
          id: '1',
          name: email.split('@')[0],
          email: email,
          avatar: null,
          plan: 'free'
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }
  
  if (endpoint === '/api/video/generate') {
    return {
      success: true,
      video: {
        id: Date.now().toString(),
        url: '/api/placeholder/640/360',
        thumbnail: '/api/placeholder/320/180',
        duration: '5',
        quality: 'HD',
        aspectRatio: '16:9',
        style: 'realistic'
      },
      generationId: Date.now().toString()
    };
  }
  
  throw new Error('Endpoint not supported in offline mode');
};