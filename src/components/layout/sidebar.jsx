import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Sparkles,
  FolderOpen,
  BarChart3,
  Settings,
  VideoIcon,
  X
} from 'lucide-react';
import { AppContext } from '@/app';

const Sidebar = ({ mobile = false }) => {
  const { setSidebarOpen } = useContext(AppContext);
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Overview and analytics'
    },
    {
      name: 'Generate Videos',
      href: '/generate',
      icon: VideoIcon,
      description: 'AI video generation'
    },
    {
      name: 'Content Library',
      href: '/library',
      icon: FolderOpen,
      description: 'Your created content'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      description: 'Performance insights'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Account preferences'
    },
  ];

  const isActive = (href) => {
    if (href === '/dashboard') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    if (mobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside className={`bg-white border-r border-gray-200 ${mobile ? 'w-72' : 'w-64'} flex-shrink-0 flex flex-col h-full`}>
      {/* Mobile Header */}
      {mobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-primary-600" />
            <span className="text-lg font-bold text-primary-600 font-display">Influencore</span>
          </div>
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4" aria-label="Sidebar navigation">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleLinkClick}
                className={`group flex items-center space-x-3 px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  active
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${
                  active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                
                <div className="flex-1 min-w-0">
                  <div className="truncate">{item.name}</div>
                  <div className={`text-xs truncate ${
                    active ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-600'
                  }`}>
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border border-primary-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Usage This Month</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Videos Generated</span>
              <span className="text-sm font-medium text-gray-900">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Credits Used</span>
              <span className="text-sm font-medium text-gray-900">48</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="text-xs text-gray-500">60% of monthly limit</div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-sm font-semibold">Upgrade to Pro</h3>
          </div>
          <p className="text-xs text-primary-100 mb-3">
            Unlock unlimited generations and premium features
          </p>
          <Link
            to="/pricing"
            onClick={handleLinkClick}
            className="block w-full py-2 px-3 bg-white text-primary-700 text-center text-sm font-medium rounded-lg hover:bg-primary-50 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
          >
            View Plans
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;