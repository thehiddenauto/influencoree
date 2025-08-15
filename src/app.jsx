import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { initializeApi } from './config/api.js';

import home from './pages/home.jsx';
import dashboard from './pages/dashboard.jsx';
import generator from './pages/generator.jsx';
import videoclipper from './pages/videoclipper.jsx';
import profilesettings from './pages/profilesettings.jsx';
import socialconnector from './pages/socialconnector.jsx';
import pricing from './pages/pricing.jsx';
import login from './pages/login.jsx';
import signup from './pages/signup.jsx';
import billing from './pages/billing.jsx';
import analytics from './pages/analytics.jsx';
import settings from './pages/settings.jsx';
import notfound from './pages/notfound.jsx';


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
