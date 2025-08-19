const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const initializeApi = async () => {
  try {
    console.log('Trying to connect to:', `${API_BASE_URL}/health`);
    const response = await fetch(`${API_BASE_URL}/health`);
    
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

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('influencore_token');

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  };

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
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      return data;
    } else {
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