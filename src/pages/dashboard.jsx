import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  VideoIcon,
  TrendingUp,
  Clock,
  Users,
  Plus,
  Eye,
  Heart,
  Share,
  MoreHorizontal,
  Calendar,
  ArrowRight,
  Sparkles,
  PlayCircle
} from 'lucide-react';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with real API calls
  const stats = {
    '7d': {
      videosGenerated: 12,
      totalViews: 45600,
      engagement: 8.2,
      followers: 2340
    },
    '30d': {
      videosGenerated: 48,
      totalViews: 182400,
      engagement: 9.1,
      followers: 3210
    },
    '90d': {
      videosGenerated: 124,
      totalViews: 456800,
      engagement: 7.8,
      followers: 4580
    }
  };

  const recentVideos = [
    {
      id: 1,
      title: "5 AI Tools Every Creator Needs",
      thumbnail: "/api/placeholder/320/180",
      duration: "2:45",
      views: 12400,
      likes: 892,
      shares: 156,
      createdAt: "2 hours ago",
      status: "published"
    },
    {
      id: 2,
      title: "Future of Content Creation",
      thumbnail: "/api/placeholder/320/180",
      duration: "1:30",
      views: 8920,
      likes: 645,
      shares: 89,
      createdAt: "1 day ago",
      status: "published"
    },
    {
      id: 3,
      title: "Viral Video Strategies",
      thumbnail: "/api/placeholder/320/180",
      duration: "3:15",
      views: 15600,
      likes: 1200,
      shares: 234,
      createdAt: "3 days ago",
      status: "published"
    }
  ];

  const upcomingScheduled = [
    {
      title: "Weekly Tech Update",
      platform: "YouTube",
      scheduledFor: "Today, 2:00 PM",
      status: "scheduled"
    },
    {
      title: "Product Demo Series #3",
      platform: "Instagram",
      scheduledFor: "Tomorrow, 10:00 AM",
      status: "draft"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const currentStats = stats[timeRange];

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-96 bg-gray-200 rounded-lg"></div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your content.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          {/* Time Range Selector */}
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

          <Link
            to="/generate"
            className="btn-primary inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Video
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Videos Generated",
            value: currentStats.videosGenerated,
            change: "+12%",
            positive: true,
            icon: VideoIcon,
            color: "blue"
          },
          {
            label: "Total Views",
            value: currentStats.totalViews.toLocaleString(),
            change: "+8%",
            positive: true,
            icon: Eye,
            color: "green"
          },
          {
            label: "Engagement Rate",
            value: `${currentStats.engagement}%`,
            change: "+2.1%",
            positive: true,
            icon: Heart,
            color: "red"
          },
          {
            label: "Followers",
            value: currentStats.followers.toLocaleString(),
            change: "+15%",
            positive: true,
            icon: Users,
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
              <span className={`text-sm font-medium ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Videos */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Videos</h2>
                <Link
                  to="/library"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
                >
                  View all
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {recentVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                        <PlayCircle className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                        {video.title}
                      </h3>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {video.views.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {video.likes}
                        </span>
                        <span className="flex items-center">
                          <Share className="w-4 h-4 mr-1" />
                          {video.shares}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{video.createdAt}</span>
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {video.status}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {recentVideos.length === 0 && (
              <div className="p-12 text-center">
                <VideoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No videos yet</h3>
                <p className="text-gray-600 mb-4">Create your first AI-generated video to get started</p>
                <Link to="/generate" className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Video
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/generate"
                className="flex items-center p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors group"
              >
                <div className="p-2 bg-primary-100 rounded-lg mr-3 group-hover:bg-primary-200 transition-colors">
                  <Sparkles className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Generate Video</div>
                  <div className="text-sm text-gray-600">Create with AI</div>
                </div>
              </Link>

              <Link
                to="/library"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <div className="p-2 bg-gray-100 rounded-lg mr-3 group-hover:bg-gray-200 transition-colors">
                  <VideoIcon className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Content Library</div>
                  <div className="text-sm text-gray-600">Manage videos</div>
                </div>
              </Link>

              <Link
                to="/analytics"
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <div className="p-2 bg-gray-100 rounded-lg mr-3 group-hover:bg-gray-200 transition-colors">
                  <TrendingUp className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">View Analytics</div>
                  <div className="text-sm text-gray-600">Track performance</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Scheduled Content */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Scheduled</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>

            {upcomingScheduled.length > 0 ? (
              <div className="space-y-3">
                {upcomingScheduled.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{item.platform}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'scheduled' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{item.scheduledFor}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">No scheduled content</p>
              </div>
            )}
          </div>

          {/* Usage Stats */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Usage</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Video Generations</span>
                  <span className="text-sm font-medium">12 / 50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Storage Used</span>
                  <span className="text-sm font-medium">2.4 GB / 10 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">API Calls</span>
                  <span className="text-sm font-medium">145 / 1000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '14.5%' }}></div>
                </div>
              </div>
            </div>

            <Link
              to="/pricing"
              className="block w-full mt-4 py-2 px-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all"
            >
              Upgrade Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;