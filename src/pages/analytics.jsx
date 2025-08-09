import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, Heart, Share, Download, Calendar, BarChart3 } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = {
    '7d': {
      totalViews: 12400,
      engagement: 8.2,
      shares: 156,
      growth: 12
    },
    '30d': {
      totalViews: 45600,
      engagement: 9.1,
      shares: 892,
      growth: 15
    },
    '90d': {
      totalViews: 128400,
      engagement: 7.8,
      shares: 2340,
      growth: 22
    }
  };

  const currentStats = stats[timeRange];

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Track your content performance and engagement</p>
        </div>

        <div className="mt-4 sm:mt-0">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { value: '7d', label: '7 days' },
              { value: '30d', label: '30 days' },
              { value: '90d', label: '90 days' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                  timeRange === option.value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { 
            label: "Total Views", 
            value: currentStats.totalViews.toLocaleString(), 
            change: "+12%", 
            icon: Eye, 
            color: "blue" 
          },
          { 
            label: "Engagement Rate", 
            value: `${currentStats.engagement}%`, 
            change: "+2.1%", 
            icon: Heart, 
            color: "red" 
          },
          { 
            label: "Total Shares", 
            value: currentStats.shares.toLocaleString(), 
            change: "+8%", 
            icon: Share, 
            color: "green" 
          },
          { 
            label: "Growth Rate", 
            value: `${currentStats.growth}%`, 
            change: "+3%", 
            icon: TrendingUp, 
            color: "purple" 
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-8 text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Analytics Coming Soon</h3>
          <p className="text-gray-600">
            We're working on comprehensive analytics dashboard with charts, insights, and detailed performance metrics.
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Export</h3>
          <div className="space-y-3">
            <button className="w-full btn-secondary text-left">
              <Download className="w-4 h-4 mr-2" />
              Export CSV Report
            </button>
            <button className="w-full btn-secondary text-left">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Weekly Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;