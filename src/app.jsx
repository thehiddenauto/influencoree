import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { initializeApi } from './config/api.js';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Generator from './pages/Generator.jsx';
import VideoClipper from './pages/VideoClipper.jsx';
import AdvancedVideoGenerator from './pages/AdvancedVideoGenerator.jsx';
import Library from './pages/Library.jsx';
import ProfileSettings from './pages/ProfileSettings.jsx';
import SocialConnector from './pages/SocialConnector.jsx';
import Pricing from './pages/Pricing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Billing from './pages/Billing.jsx';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    const initApi = async () => {
      try {
        const isHealthy = await initializeApi();
        setBackendStatus(isHealthy ? 'connected' : 'disconnected');
        console.log('Backend connected:', isHealthy);
      } catch (error) {
        console.error('Failed to initialize API:', error);
        setBackendStatus('disconnected');
      }
    };

    initApi();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-lg">
        <nav className="p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-xl font-bold hover:text-blue-400 transition-colors" aria-label="Go to homepage">
                🎯 Influencore
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/generator" className="hover:text-blue-400 transition-colors" aria-label="Content Generator">Generator</Link>
                <Link to="/clipper" className="hover:text-blue-400 transition-colors" aria-label="Video Clipper">Video Clipper</Link>
                <Link to="/advanced-video" className="hover:text-blue-400 transition-colors" aria-label="Advanced Video Generator">�� Veo 3 & Sora</Link>
                <Link to="/library" className="hover:text-blue-400 transition-colors" aria-label="Content Library">Library</Link>
                <Link to="/social" className="hover:text-blue-400 transition-colors" aria-label="Social Media Connector">Social</Link>
                <Link to="/dashboard" className="hover:text-blue-400 transition-colors" aria-label="Dashboard">Dashboard</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/pricing" className="hover:text-blue-400 transition-colors" aria-label="Pricing">Pricing</Link>
                <Link to="/login" className="hover:text-blue-400 transition-colors" aria-label="Sign In">Sign In</Link>
                <Link to="/signup" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors" aria-label="Start Free Trial">
                  Start Free Trial
                </Link>
              </div>
              
              {/* Backend Status Indicator */}
              <div className="hidden md:flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  backendStatus === 'connected' ? 'bg-green-500' : 
                  backendStatus === 'checking' ? 'bg-yellow-500' : 'bg-red-500'
                }`} aria-label={`Backend status: ${backendStatus}`}></div>
                <span className="text-xs text-gray-400">
                  {backendStatus === 'connected' ? 'Connected' : 
                   backendStatus === 'checking' ? 'Checking...' : 'Disconnected'}
                </span>
              </div>

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
                <Link to="/generator" className="hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Generator</Link>
                <Link to="/clipper" className="hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Video Clipper</Link>
                <Link to="/advanced-video" className="hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>�� Veo 3 & Sora</Link>
                <Link to="/library" className="hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Library</Link>
                <Link to="/social" className="hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Social</Link>
                <Link to="/dashboard" className="hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                <Link to="/pricing" className="hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                <Link to="/login" className="hover:text-blue-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                <Link to="/signup" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-center" onClick={() => setIsMobileMenuOpen(false)}>
                  Start Free Trial
                </Link>
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
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;