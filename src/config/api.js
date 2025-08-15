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

// =============================
// 6. src/pages/home.jsx (Fixed imports)
// =============================

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  Sparkles, 
  Zap, 
  Users, 
  ArrowRight, 
  CheckCircle,
  VideoIcon,
  Brain,
  TrendingUp
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Generation',
      description: 'Advanced AI models create stunning videos from your text descriptions'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate professional videos in minutes, not hours'
    },
    {
      icon: TrendingUp,
      title: 'Viral Optimization',
      description: 'Built-in algorithms optimize content for social media engagement'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share and collaborate on video projects with your team'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Content Creator',
      avatar: '/api/placeholder/40/40',
      content: 'Influencore has revolutionized my content creation workflow. I can now produce high-quality videos in minutes!'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Marketing Director',
      avatar: '/api/placeholder/40/40',
      content: 'The viral optimization features helped us increase our social media engagement by 300%.'
    },
    {
      name: 'Emily Watson',
      role: 'Small Business Owner',
      avatar: '/api/placeholder/40/40',
      content: 'Finally, a tool that makes professional video creation accessible to everyone.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-accent-900/50"></div>
        <div className="relative container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Create Viral Videos with AI
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your ideas into stunning videos using cutting-edge AI technology. 
              No editing skills required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/generator" className="btn-primary text-lg px-8 py-4">
                Start Creating Free
              </Link>
              <button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>10 free videos/month</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>HD quality output</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Influencore?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful AI technology meets intuitive design to create the ultimate video generation platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Examples Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">See What's Possible</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From concept to viral video in minutes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                      <h4 className="font-medium mb-1">Video Example {i}</h4>
                      <p className="text-sm text-gray-300">Generated from text prompt</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/generator" className="btn-primary inline-flex items-center space-x-2">
              <span>Try It Yourself</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Loved by Creators</h2>
            <p className="text-xl text-gray-400">
              Join thousands of content creators already using Influencore
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700 rounded-xl p-6"
              >
                <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="font-bold text-white text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Go Viral?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Start creating amazing videos today. No experience needed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/generator" className="btn-primary text-lg px-8 py-4">
                Get Started Free
              </Link>
              <Link to="/pricing" className="btn-secondary text-lg px-8 py-4">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;2 transition-colors ${
                                aspectRatio === ratio.id
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-gray-200 hover:border-primary-300'
                              }`}
                            >
                              <div className="font-medium text-gray-900">{ratio.name}</div>
                              <div className="text-sm text-gray-500">{ratio.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Style */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Style
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {styles.map((styleOption) => (
                            <button
                              key={styleOption.id}
                              onClick={() => setStyle(styleOption.id)}
                              className={`p-4 text-left rounded-lg border-
