import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  VideoIcon, 
  Sparkles, 
  Brain, 
  Wand2, 
  ArrowRight,
  Clock,
  Zap,
  Image
} from 'lucide-react';

const Generator = () => {
  const generatorTypes = [
    {
      id: 'text-to-video',
      title: 'Text to Video',
      description: 'Generate videos from text descriptions using AI',
      icon: Wand2,
      color: 'blue',
      features: ['Natural language prompts', 'Multiple styles', 'HD quality'],
      route: '/generate?mode=text'
    },
    {
      id: 'image-to-video',
      title: 'Image to Video',
      description: 'Animate static images into dynamic videos',
      icon: Image,
      color: 'green',
      features: ['Image animation', 'Smooth transitions', 'Custom duration'],
      route: '/generate?mode=image'
    },
    {
      id: 'ai-viral',
      title: 'Viral Content Generator',
      description: 'Create trending content optimized for social media',
      icon: Zap,
      color: 'purple',
      features: ['Trend analysis', 'Platform optimization', 'Auto captions'],
      route: '/generate?mode=viral'
    },
    {
      id: 'advanced',
      title: 'Advanced AI Models',
      description: 'Access to premium AI models like Veo 3 and Sora',
      icon: Brain,
      color: 'orange',
      features: ['Google Veo 3', 'OpenAI Sora', '4K quality'],
      route: '/advanced-video',
      premium: true
    }
  ];

  const recentGenerations = [
    {
      id: 1,
      title: 'Product Demo Video',
      thumbnail: '/api/placeholder/160/90',
      duration: '0:45',
      createdAt: '2 hours ago'
    },
    {
      id: 2,
      title: 'Social Media Promo',
      thumbnail: '/api/placeholder/160/90',
      duration: '0:30',
      createdAt: '1 day ago'
    },
    {
      id: 3,
      title: 'Tutorial Introduction',
      thumbnail: '/api/placeholder/160/90',
      duration: '1:20',
      createdAt: '2 days ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI Video Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create stunning videos in minutes with the power of artificial intelligence
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Generate in minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>No editing skills required</span>
              </div>
              <div className="flex items-center space-x-2">
                <VideoIcon className="w-4 h-4" />
                <span>HD quality output</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generator Options */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Generator</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {generatorTypes.map((generator, index) => (
                <motion.div
                  key={generator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    to={generator.route}
                    className={`block p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-${generator.color}-300 transition-all duration-200 hover:shadow-lg group`}
                  >
                    {generator.premium && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs px-2 py-1 rounded-full">
                        PRO
                      </div>
                    )}
                    
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 bg-${generator.color}-100 rounded-lg`}>
                        <generator.icon className={`w-6 h-6 text-${generator.color}-600`} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {generator.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {generator.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {generator.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-primary-600 font-medium">
                          <span>Get Started</span>
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Quick Start */}
            <div className="mt-12 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-8 border border-primary-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🚀 Quick Start Guide
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Choose Generator</h4>
                    <p className="text-gray-600">Select the type of video you want to create</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Describe Your Video</h4>
                    <p className="text-gray-600">Enter a detailed description or upload an image</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Generate & Download</h4>
                    <p className="text-gray-600">AI creates your video in minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Generations */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Generations</h3>
                <Link to="/library" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              
              {recentGenerations.length > 0 ? (
                <div className="space-y-3">
                  {recentGenerations.map((video) => (
                    <div key={video.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                      <div className="w-12 h-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded flex items-center justify-center">
                        <VideoIcon className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{video.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{video.duration}</span>
                          <span>•</span>
                          <span>{video.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <VideoIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No videos generated yet</p>
                  <Link to="/generate" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Create your first video
                  </Link>
                </div>
              )}
            </div>

            {/* Usage Stats */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Plan</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Videos this month</span>
                    <span className="font-medium">3 / 10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <Link to="/pricing" className="btn-primary w-full text-center">
                    Upgrade Plan
                  </Link>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Use specific, detailed prompts for better results</li>
                <li>• Try different aspect ratios for various platforms</li>
                <li>• Include emotions and actions in descriptions</li>
                <li>• Experiment with different styles and moods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};export default Generator;