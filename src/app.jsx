import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { checkBackendHealth } from './config/api';
import toast from 'react-hot-toast';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

// Page Components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import VideoGenerator from './pages/VideoGenerator';
import Library from './pages/Library';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

// Context for app-wide state
export const AppContext = React.createContext();

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendHealth, setBackendHealth] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if current route requires authentication
  const isAuthRoute = ['/login', '/signup'].includes(location.pathname);
  const isProtectedRoute = ['/dashboard', '/generate', '/library', '/analytics', '/settings'].some(
    route => location.pathname.startsWith(route)
  );
  
  // Check backend health on app load
  useEffect(() => {
    const healthCheck = async () => {
      try {
        const health = await checkBackendHealth();
        setBackendHealth(health);
        
        if (!health.isHealthy) {
          toast.error('Backend connection issues detected', {
            duration: 6000,
            id: 'backend-health'
          });
        }
      } catch (error) {
        console.error('Health check failed:', error);
        setBackendHealth({ isHealthy: false, error: error.message });
      }
    };

    healthCheck();
  }, []);

  // Initialize user authentication state
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('influencore_token');
        const userData = localStorage.getItem('influencore_user');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear corrupted data
        localStorage.removeItem('influencore_token');
        localStorage.removeItem('influencore_user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Context value
  const contextValue = {
    user,
    setUser,
    backendHealth,
    sidebarOpen,
    setSidebarOpen,
    isAuthenticated: !!user,
  };

  // Show loading spinner while initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Initializing Influencore...</p>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header - shown on all pages */}
        <Header />

        <div className="flex flex-1">
          {/* Sidebar - shown only on protected routes when authenticated */}
          {isProtectedRoute && user && (
            <>
              {/* Desktop Sidebar */}
              <div className="hidden lg:block">
                <Sidebar />
              </div>
              
              {/* Mobile Sidebar Overlay */}
              <AnimatePresence>
                {sidebarOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
                      onClick={() => setSidebarOpen(false)}
                    />
                    <motion.div
                      initial={{ x: -280 }}
                      animate={{ x: 0 }}
                      exit={{ x: -280 }}
                      transition={{ type: 'tween', duration: 0.3 }}
                      className="fixed inset-y-0 left-0 z-50 lg:hidden"
                    >
                      <Sidebar mobile />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </>
          )}

          {/* Main Content Area */}
          <main className="flex-1 min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Protected Routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute user={user}>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/generate" 
                    element={
                      <ProtectedRoute user={user}>
                        <VideoGenerator />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/library" 
                    element={
                      <ProtectedRoute user={user}>
                        <Library />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/analytics" 
                    element={
                      <ProtectedRoute user={user}>
                        <Analytics />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/settings" 
                    element={
                      <ProtectedRoute user={user}>
                        <Settings />
                      </ProtectedRoute>
                    } 
                  />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Footer - shown only on public pages */}
        {!isProtectedRoute && <Footer />}
      </div>
    </AppContext.Provider>
  );
}

// Protected Route Component
function ProtectedRoute({ children, user }) {
  const location = useLocation();

  if (!user) {
    return <Login redirectTo={location.pathname} />;
  }

  return children;
}

export default App;