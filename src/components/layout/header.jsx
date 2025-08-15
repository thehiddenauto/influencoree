import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { AppContext } from '../../app';
import toast from 'react-hot-toast';

const Header = () => {
  const { user, setUser, setSidebarOpen, sidebarOpen, backendHealth } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthRoute = ['/login', '/signup'].includes(location.pathname);
  const isProtectedRoute = ['/dashboard', '/generate', '/library', '/analytics', '/settings'].some(
    route => location.pathname.startsWith(route)
  );

  const handleLogout = () => {
    localStorage.removeItem('influencore_token');
    localStorage.removeItem('influencore_user');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navigationLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/#about' },
  ];

  const userMenuItems = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Logout', onClick: handleLogout, icon: LogOut },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/95">
      <nav className="container-custom" aria-label="Global navigation">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button (Protected Routes) */}
          {isProtectedRoute && user && (
            <button
              type="button"
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg px-2 py-1"
              aria-label="Influencore homepage"
            >
              <Sparkles className="w-6 h-6" />
              <span className="font-display">Influencore</span>
            </Link>
            
            {/* Backend Status Indicator (Development) */}
            {import.meta.env.DEV && backendHealth && (
              <div className="ml-3 hidden sm:flex">
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                  backendHealth.isHealthy 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    backendHealth.isHealthy ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span>{backendHealth.isHealthy ? 'API Connected' : 'API Offline'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation (Public Routes) */}
          {!isProtectedRoute && !isAuthRoute && (
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg px-2 py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button (Public Routes) */}
            {!isProtectedRoute && !isAuthRoute && (
              <button
                type="button"
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            {/* User Authentication */}
            {user ? (
              /* User Menu */
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setUserMenuOpen(false)}
                      />
                      
                      {/* Menu */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.email || user.name || 'User'}
                          </p>
                        </div>
                        
                        {userMenuItems.map((item, index) => (
                          item.href ? (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <item.icon className="w-4 h-4" />
                              <span>{item.name}</span>
                            </Link>
                          ) : (
                            <button
                              key={item.name}
                              onClick={() => {
                                item.onClick();
                                setUserMenuOpen(false);
                              }}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                            >
                              <item.icon className="w-4 h-4" />
                              <span>{item.name}</span>
                            </button>
                          )
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : !isAuthRoute && (
              /* Login/Signup Buttons */
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="btn-ghost"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu (Public Routes) */}
        <AnimatePresence>
          {mobileMenuOpen && !isProtectedRoute && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-4 space-y-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block text-gray-600 hover:text-gray-900 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {!user && (
                  <div className="pt-3 border-t border-gray-200 space-y-2">
                    <Link
                      to="/login"
                      className="block w-full btn-ghost text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full btn-primary text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
