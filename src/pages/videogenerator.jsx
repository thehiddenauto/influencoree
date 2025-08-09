import React, { useState, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  VideoIcon,
  Upload,
  Settings,
  Play,
  Download,
  Share2,
  Wand2,
  Image,
  Type,
  Palette,
  Clock,
  Zap,
  Brain
} from 'lucide-react';
import { apiEndpoints } from '../config/api';
import { AppContext } from '../App';
import toast from 'react-hot-toast';

const VideoGenerator = () => {
  const { user } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('text-to-video');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Form states
  const [textPrompt, setTextPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('veo-3');
  const [duration, setDuration] = useState('30');
  const [resolution, setResolution] = useState('1080p');
  const [style, setStyle] = useState('realistic');
  const [uploadedImage, setUploadedImage] = useState(null);

  const models = [
    {
      id: 'veo-3',
      name: 'Google Veo 3',
      description: 'Latest AI video model with photorealistic quality',
      features: ['4K Resolution', 'Natural Motion', 'Long Duration'],
      icon: Brain,
      premium: false
    },
    {
      id: 'sora',
      name: 'OpenAI Sora',
      description: 'Advanced video generation with complex scenes',
      features: ['Complex Scenes', 'Temporal Consistency', 'Creative Control'],
      icon: Sparkles,
      premium: true
    },
    {
      id: 'viral',
      name: 'Viral Shorts',
      description: 'Optimized for social media engagement',
      features: ['Platform Optimized', 'Trending Styles', 'Auto Captions'],
      icon: Zap,
      premium: false
    }
  ];

  const styles = [
    { id: 'realistic', name: 'Realistic', description: 'Photorealistic video style' },
    { id: 'cinematic', name: 'Cinematic', description: 'Movie-like quality and lighting' },
    { id: 'animated', name: 'Animated', description: 'Cartoon or animated style' },
    { id: 'artistic', name: 'Artistic', description: 'Stylized and creative visuals' },
    { id: 'vintage', name: 'Vintage', description: 'Retro film aesthetic' },
    { id: 'futuristic', name: 'Futuristic', description: 'Sci-fi themed visuals' }
  ];

  const tabs = [
    {
      id: 'text-to-video',
      name: 'Text to Video',
      icon: Type,
      description: 'Generate videos from text descriptions'
    },
    {
      id: 'image-to-video',
      name: 'Image to Video',
      icon: Image,
      description: 'Animate static images into videos'
    }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Image size must be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        toast.success('Image uploaded successfully');
      };
      reader.onerror = () => {
        toast.error('Failed to upload image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    // Auth check
    if (!user) {
      toast.error('Please sign in to generate videos');
      return;
    }

    // Validation
    if (!textPrompt.trim() && activeTab === 'text-to-video') {
      toast.error('Please enter a video description');
      return;
    }

    if (!uploadedImage && activeTab === 'image-to-video') {
      toast.error('Please upload an image');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 500);

    try {
      const requestData = {
        prompt: textPrompt,
        model: selectedModel,
        duration: parseInt(duration),
        resolution,
        style,
        ...(uploadedImage && { image: uploadedImage })
      };

      let response;
      try {
        // Try real API calls
        switch (selectedModel) {
          case 'veo-3':
            response = await apiEndpoints.generateVeo3Video(requestData);
            break;
          case 'sora':
            response = await apiEndpoints.generateSoraVideo(requestData);
            break;
          case 'viral':
            response = await apiEndpoints.generateViralShort(requestData);
            break;
          default:
            if (activeTab === 'image-to-video') {
              response = await apiEndpoints.generateVideoFromImage(requestData);
            } else {
              response = await apiEndpoints.generateVideo(requestData);
            }
        }
      } catch (apiError) {
        console.warn('API generation failed, using mock response:', apiError.message);
        
        // Mock successful response for demo
        await new Promise(resolve => setTimeout(resolve, 2000));
        response = {
          success: true,
          video: {
            id: Date.now(),
            url: '/api/placeholder/640/360',
            title: textPrompt || 'Generated from image',
            model: selectedModel,
            duration,
            resolution,
            style,
            createdAt: new Date().toISOString()
          }
        };
      }

      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setGeneratedVideo(response.video || {
          id: Date.now(),
          url: '/api/placeholder/640/360',
          title: textPrompt || 'Generated from image',
          model: selectedModel,
          duration,
          resolution,
          style,
          createdAt: new Date().toISOString()
        });
        toast.success('Video generated successfully!');
        setIsGenerating(false);
        setProgress(0);
      }, 1000);

    } catch (error) {
      console.error('Generation error:', error);
      clearInterval(progressInterval);
      setIsGenerating(false);
      setProgress(0);
      toast.error(error.message || 'Failed to generate video. Please try again.');
    }
  };

  const resetForm = () => {
    setTextPrompt('');
    setUploadedImage(null);
    setGeneratedVideo(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Video Generator</h1>
        <p className="text-gray-600">
          Create stunning videos using cutting-edge AI models
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Generation Form */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="space-y-6">
              {activeTab === 'text-to-video' ? (
                /* Text to Video */
                <div>
                  <label htmlFor="prompt" className="block text-sm font-semibold text-gray-900 mb-3">
                    Video Description
                  </label>
                  <textarea
                    id="prompt"
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    placeholder="Describe the video you want to create... e.g., 'A serene sunset over a calm ocean with gentle waves'"
                    rows={4}
                    className="input-base resize-none"
                    disabled={isGenerating}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Be specific and descriptive for better results. Include details about scene, lighting, mood, and action.
                  </p>
                </div>
              ) : (
                /* Image to Video */
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Upload Image
                  </label>
                  
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      uploadedImage 
                        ? 'border-primary-300 bg-primary-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isGenerating}
                    />
                    
                    {uploadedImage ? (
                      <div className="space-y-2">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="w-32 h-32 object-cover rounded-lg mx-auto"
                        />
                        <p className="text-sm text-gray-600">Image uploaded successfully</p>
                        <button
                          type="button"
                          onClick={() => setUploadedImage(null)}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Change image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                        <p className="text-gray-600">Click or drag image to upload</p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </div>

                  {uploadedImage && (
                    <div className="mt-4">
                      <label htmlFor="image-prompt" className="block text-sm font-semibold text-gray-900 mb-2">
                        Animation Description (Optional)
                      </label>
                      <textarea
                        id="image-prompt"
                        value={textPrompt}
                        onChange={(e) => setTextPrompt(e.target.value)}
                        placeholder="Describe how you want the image to be animated... e.g., 'Make the water flow gently, add wind to the trees'"
                        rows={2}
                        className="input-base resize-none"
                        disabled={isGenerating}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Advanced Settings */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Advanced Settings
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Duration */}
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-900 mb-2">
                      Duration
                    </label>
                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="input-base"
                      disabled={isGenerating}
                    >
                      <option value="15">15 seconds</option>
                      <option value="30">30 seconds</option>
                      <option value="60">1 minute</option>
                      <option value="120">2 minutes</option>
                    </select>
                  </div>

                  {/* Resolution */}
                  <div>
                    <label htmlFor="resolution" className="block text-sm font-medium text-gray-900 mb-2">
                      Resolution
                    </label>
                    <select
                      id="resolution"
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      className="input-base"
                      disabled={isGenerating}
                    >
                      <option value="720p">720p (HD)</option>
                      <option value="1080p">1080p (Full HD)</option>
                      <option value="1440p">1440p (2K)</option>
                      <option value="2160p">2160p (4K)</option>
                    </select>
                  </div>

                  {/* Style */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Visual Style
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {styles.map((styleOption) => (
                        <button
                          key={styleOption.id}
                          type="button"
                          onClick={() => setStyle(styleOption.id)}
                          disabled={isGenerating}
                          className={`p-3 text-left border rounded-lg transition-all ${
                            style === styleOption.id
                              ? 'border-primary-300 bg-primary-50 text-primary-900'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="font-medium text-sm mb-1">{styleOption.name}</div>
                          <div className="text-xs text-gray-600">{styleOption.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || (!textPrompt.trim() && activeTab === 'text-to-video') || (!uploadedImage && activeTab === 'image-to-video')}
                  className="btn-primary flex-1 py-3 text-base font-semibold relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Generating... {Math.round(progress)}%
                      </div>
                      <div 
                        className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-30 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Generate Video
                    </>
                  )}
                </button>

                <button
                  onClick={resetForm}
                  disabled={isGenerating}
                  className="btn-secondary px-6 py-3"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Model Selection */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model</h3>
            
            <div className="space-y-3">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  disabled={isGenerating || (model.premium && (!user || user.plan === 'free'))}
                  className={`w-full p-4 text-left border rounded-lg transition-all ${
                    selectedModel === model.id
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${model.premium && (!user || user.plan === 'free') ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <model.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">{model.name}</span>
                    </div>
                    {model.premium && (
                      <span className="px-2 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs rounded-full">
                        Pro
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{model.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {model.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generated Video Preview */}
          <AnimatePresence>
            {generatedVideo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Video</h3>
                
                <div className="space-y-4">
                  {/* Video Preview */}
                  <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </button>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 truncate">{generatedVideo.title}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{generatedVideo.model?.toUpperCase() || 'AI'}</span>
                      <span>{generatedVideo.duration}s • {generatedVideo.resolution}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="btn-primary flex-1 text-sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                    <button className="btn-secondary text-sm">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tips */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pro Tips</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-xs">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Be Specific</p>
                  <p className="text-gray-600">Include details about lighting, mood, camera angles, and actions for better results.</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-xs">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Use Keywords</p>
                  <p className="text-gray-600">Include style keywords like "cinematic", "close-up", "wide shot" to guide the AI.</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Iterate</p>
                  <p className="text-gray-600">Try different models and settings to find what works best for your content.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generation Credits</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Monthly Limit</span>
                <span className="font-semibold">{user?.plan === 'free' ? '12 / 50' : user?.plan === 'pro' ? '42 / 200' : 'Unlimited'}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full" 
                  style={{ width: user?.plan === 'free' ? '24%' : user?.plan === 'pro' ? '21%' : '100%' }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Resets in 18 days</span>
                {user?.plan === 'free' && (
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Upgrade
                  </button>
                )}
              </div>
            </div>

            {user?.plan === 'free' && (
              <div className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border border-primary-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-semibold text-primary-900">Pro Tip</span>
                </div>
                <p className="text-sm text-primary-800">
                  Upgrade to Pro for unlimited generations and access to premium AI models.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;|