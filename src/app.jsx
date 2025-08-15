import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { initializeApi } from './config/api.js';
import Home from './pages/home.jsx';
import Dashboard from './pages/dashboard.jsx';
import VideoClipper from './pages/videoclipper.jsx';
import Login from './pages/login.jsx';
import Analytics from './pages/analytics.jsx';
import Settings from './pages/settings.jsx';
import NotFound from './pages/notfound.jsx';
import VideoGenerator from './pages/videogenerator.jsx';
import Generator from './pages/generator.jsx';

// Create placeholder components for missing pages
const AdvancedVideoGenerator = () => (
  <div className="p-6 lg:p-8 max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Video Generator</h1>
    <p className="text-gray-600 mb-8">Generate videos with Veo 3 & Sora models</p>
    <div className="card p-8 text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium AI Models</h3>
      <p className="text-gray-600">Advanced video generation with Google Veo 3 and OpenAI Sora coming soon.</p>
      <Link to="/generate" className="btn-primary mt-4">
        Try Standard Generator
      </Link>
    </div>
  </div>
);

const Library = () => (
  <div className="p-6 lg:p-8 max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Library</h1>
    <p className="text-gray-600 mb-8">Manage your generated videos</p>
    <div className="card p-8 text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Content Yet</h3>
      <p className="text-gray-600">Start generating videos to see them here.</p>
      <Link to="/generate" className="btn-primary mt-4">
        Create Your First Video
      </Link>
    </div>
  </div>
);

const SocialConnector = () => (
  <div className="p-6 lg:p-8 max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Media Connector</h1>
    <p className="text-gray-600 mb-8">Connect your social media accounts</p>
    <div className="card p-8 text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
      <p className="text-gray-600">Social media integration features will be available soon.</p>
    </div>
  </div>
);

const ProfileSettings = () => <Settings />;

const Pricing = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="container-custom">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">Choose the perfect plan for your needs</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-4">Free</h3>
          <p className="text-3xl font-bold mb-4">$0<span className="text-sm text-gray-600">/month</span></p>
          <ul className="space-y-2 mb-6">
            <li>10 video generations</li>
            <li>720p quality</li>
            <li>Basic templates</li>
          </ul>
          <button className="btn-primary w-full">Get Started</button>
        </div>
        <div className="card p-6 border-2 border-primary-500">
          <h3 className="text-xl font-bold mb-4">Pro</h3>
          <p className="text-3xl font-bold mb-4">$29<span className="text-sm text-gray-600">/month</span></p>
          <ul className="space-y-2 mb-6">
            <li>100 video generations</li>
            <li>1080p quality</li>
            <li>Premium templates</li>
            <li>Priority support</li>
          </ul>
          <button className="btn-primary w-full">Start Free Trial</button>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-4">Enterprise</h3>
          <p className="text-3xl font-bold mb-4">Custom</p>
          <ul className="space-y-2 mb-6">
            <li>Unlimited generations</li>
            <li>4K quality</li>
            <li>Custom branding</li>
            <li>Dedicated support</li>
          </ul>
          <button className="btn-secondary w-full">Contact Sales</button>
        </div>
      </div>
    </div>
  </div>
);

const Signup = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="card p-8 max-w-md w-full mx-4">
      <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Full Name" className="input-base" />
        <input type="email" placeholder="Email" className="input-base" />
        <input type="password" placeholder="Password" className="input-base" />
        <button type="submit" className="btn-primary w-full">Create Account</button>
      </form>
      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-primary-600">Sign in</Link>
      </p>
    </div>
  </div>
);

const Billing = () => (
  <div className="p-6 lg:p-8 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">Billing</h1>
    <div className="card p-8 text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Billing Management</h3>
      <p className="text-gray-600">Billing features will be available soon.</p>
    </div>
  </div>
);

// Create App Context
export const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [backendHealth, setBackendHealth] = useState({ isHealthy: false, checking: true });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check for existing auth
        const token = localStorage.getItem('influencore_token');
        const userData = localStorage.getItem('influencore_user');
        
        if (token && userData) {
          try {
            setUser(JSON.parse(userData));
          } catch (error) {
            console.error('Failed to parse user data:', error);
            localStorage.removeItem('influencore_token');
            localStorage.removeItem('influencore_user');
          }
        }

        // Initialize API connection
        const isHealthy = await initializeApi();
        setBackendHealth({ isHealthy, checking: false });
        
        if (!isHealthy) {
          console.warn('⚠️ Backend connection failed. Running in offline mode.');
        }
      } catch (error) {
        console.error('App initialization error:', error);
        setBackendHealth({ isHealthy: false, checking: false });
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Initializing Influencore...</p>
        </div>
      </div>
    );
  }

  const contextValue = {
    user,
    setUser,
    sidebarOpen,
    setSidebarOpen,
    backendHealth
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="bg-gray-900 text-white min-h-screen">
        <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-lg">
          <nav className="p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link 
                  to="/" 
                  className="text-xl font-bold hover:text-blue-400 transition-colors" 
                  aria-label="Go to homepage"
                >
                  🎯 Influencore
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                  <Link to="/generator" className="hover:text-blue-400 transition-colors" aria-label="Content Generator">
                    Generator
                  </Link>
                  <Link to="/clipper" className="hover:text-blue-400 transition-colors" aria-label="Video Clipper">
                    Video Clipper
                  </Link>
                  <Link to="/advanced-video" className="hover:text-blue-400 transition-colors" aria-label="Advanced Video Generator">
                    🎬 Veo 3 & Sora
                  </Link>
                  <Link to="/library" className="hover:text-blue-400 transition-colors" aria-label="Content Library">
                    Library
                  </Link>
                  <Link to="/social" className="hover:text-blue-400 transition-colors" aria-label="Social Media Connector">
                    Social
                  </Link>
                  {user && (
                    <Link to="/dashboard" className="hover:text-blue-400 transition-colors" aria-label="Dashboard">
                      Dashboard
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-4">
                  <Link to="/pricing" className="hover:text-blue-400 transition-colors" aria-label="Pricing">
                    Pricing
                  </Link>
                  {!user ? (
                    <>
                      <Link to="/login" className="hover:text-blue-400 transition-colors" aria-label="Sign In">
                        Sign In
                      </Link>
                      <Link 
                        to="/signup" 
                        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors" 
                        aria-label="Start Free Trial"
                      >
                        Start Free Trial
                      </Link>
                    </>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Welcome, {user.name || user.email}</span>
                      <Link to="/settings" className="hover:text-blue-400 transition-colors">
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem('influencore_token');
                          localStorage.removeItem('influencore_user');
                          setUser(null);
                        }}
                        className="text-sm hover:text-red-400 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Backend Status Indicator */}
                {import.meta.env.DEV && (
                  <div className="hidden md:flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      backendHealth.checking ? 'bg-yellow-500' :
                      backendHealth.isHealthy ? 'bg-green-500' : 'bg-red-500'
                    }`} aria-label={`Backend status: ${backendHealth.checking ? 'checking' : backendHealth.isHealthy ? 'connected' : 'disconnected'}`}></div>
                    <span className="text-xs text-gray-400">
                      {backendHealth.checking ? 'Checking...' : 
                       backendHealth.isHealthy ? 'Connected' : 'Offline'}
                    </span>
                  </div>
                )}

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
                <div className="flex flex-col space-y-4 pt-4">
                  <Link 
                    to="/generator" 
                    className="hover:text-blue-400 transition-colors" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Generator
                  </Link>
                  <Link 
                    to="/clipper" 
                    className="hover:text-blue-400 transition-colors" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Video Clipper
                  </Link>
                  <Link 
                    to="/advanced-video" 
                    className="hover:text-blue-400 transition-colors" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    🎬 Veo 3 & Sora
                  </Link>
                  <Link 
                    to="/library" 
                    className="hover:text-blue-400 transition-colors" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Library
                  </Link>
                  <Link 
                    to="/social" 
                    className="hover:text-blue-400 transition-colors" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Social
                  </Link>
                  {user && (
                    <Link 
                      to="/dashboard" 
                      className="hover:text-blue-400 transition-colors" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/pricing" 
                    className="hover:text-blue-400 transition-colors" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  {!user ? (
                    <>
                      <Link 
                        to="/login" 
                        className="hover:text-blue-400 transition-colors" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/signup" 
                        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-center" 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Start Free Trial
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        localStorage.removeItem('influencore_token');
                        localStorage.removeItem('influencore_user');
                        setUser(null);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left hover:text-red-400 transition-colors"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            )}
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/generate" element={<VideoGenerator />} />
            <Route path="/clipper" element={<VideoClipper />} />
            <Route path="/advanced-video" element={<AdvancedVideoGenerator />} />
            <Route path="/library" element={<Library />} />
            <Route path="/social" element={<SocialConnector />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
