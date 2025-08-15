import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  Wand2, 
  Upload, 
  Settings, 
  Download, 
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { AppContext } from '../App.jsx';
import { apiCall } from '../config/api.js';

const VideoGenerator = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, backendHealth } = useContext(AppContext);
  
  const mode = searchParams.get('mode') || 'text';
  
  // Form state
  const [prompt, setPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [duration, setDuration] = useState('5');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [style, setStyle] = useState('realistic');
  const [quality, setQuality] = useState('hd');
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [generationId, setGenerationId] = useState(null);
  
  // UI state
  const [activeTab, setActiveTab] = useState('prompt');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const modes = {
    text: { title: 'Text to Video', icon: Wand2 },
    image: { title: 'Image to Video', icon: Upload },
    viral: { title: 'Viral Content', icon: Zap }
  };

  const styles = [
    { id: 'realistic', name: 'Realistic', description: 'Photorealistic video generation' },
    { id: 'cinematic', name: 'Cinematic', description: 'Movie-like quality with dramatic lighting' },
    { id: 'animated', name: 'Animated', description: '3D animated style' },
    { id: 'artistic', name: 'Artistic', description: 'Stylized and creative approach' }
  ];

  const aspectRatios = [
    { id: '16:9', name: 'Landscape (16:9)', description: 'YouTube, web' },
    { id: '9:16', name: 'Portrait (9:16)', description: 'TikTok, Instagram Stories' },
    { id: '1:1', name: 'Square (1:1)', description: 'Instagram posts' },
    { id: '4:3', name: 'Standard (4:3)', description: 'Traditional video' }
  ];

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Image file too large. Please choose a file under 10MB.');
        return;
      }
      
      setUploadedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate generation progress
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 90) {
        progress = 90;
        clearInterval(interval);
      }
      setGenerationProgress(progress);
    }, 1000);
    
    return interval;
  };

  // Handle video generation
  const handleGenerate = async () => {
    if (!user) {
      toast.error('Please sign in to generate videos');
      navigate('/login');
      return;
    }

    if (mode === 'text' && !prompt.trim()) {
      toast.error('Please enter a video description');
      return;
    }

    if (mode === 'image' && !uploadedImage) {
      toast.error('Please upload an image');
      return;
    }

    if (!backendHealth.isHealthy) {
      toast.error('Unable to connect to video generation service');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedVideo(null);

    const progressInterval = simulateProgress();

    try {
      const formData = new FormData();
      formData.append('mode', mode);
      formData.append('prompt', prompt);
      formData.append('duration', duration);
      formData.append('aspectRatio', aspectRatio);
      formData.append('style', style);
      formData.append('quality', quality);
      
      if (uploadedImage && mode === 'image') {
        formData.append('image', uploadedImage);
      }

      const response = await apiCall('/api/video/generate', {
        method: 'POST',
        body: formData
      });

      if (response.success) {
        clearInterval(progressInterval);
        setGenerationProgress(100);
        setGeneratedVideo(response.video);
        setGenerationId(response.generationId);
        toast.success('Video generated successfully!');
      } else {
        throw new Error(response.error || 'Generation failed');
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate video');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle video download
  const handleDownload = async () => {
    if (!generatedVideo) return;

    try {
      const response = await fetch(generatedVideo.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `video-${generationId}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Video downloaded!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download video');
    }
  };

  const currentMode = modes[mode];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="flex items-center space-x-3">
            <currentMode.icon className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentMode.title}</h1>
              <p className="text-gray-600 mt-1">
                {mode === 'text' && 'Describe your video and watch AI bring it to life'}
                {mode === 'image' && 'Upload an image to animate it into a video'}
                {mode === 'viral' && 'Create content optimized for social media virality'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6 py-4">
                  <button
                    onClick={() => setActiveTab('prompt')}
                    className={`pb-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'prompt'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {mode === 'text' ? 'Video Description' : mode === 'image' ? 'Image Upload' : 'Content Prompt'}
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`pb-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'settings'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Settings
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'prompt' && (
                    <motion.div
                      key="prompt"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {mode === 'text' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Video Description
                          </label>
                          <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the video you want to create. Be specific about actions, scenes, and visual elements..."
                            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                          />
                          <p className="mt-2 text-sm text-gray-500">
                            Example: "A golden retriever running through a sunny meadow, slow motion, cinematic lighting"
                          </p>
                        </div>
                      )}

                      {mode === 'image' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Image
                          </label>
                          
                          {!imagePreview ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Upload an image to animate
                              </h3>
                              <p className="text-gray-500 mb-4">
                                PNG, JPG, or WebP up to 10MB
                              </p>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                              />
                              <label
                                htmlFor="image-upload"
                                className="btn-primary cursor-pointer"
                              >
                                Choose Image
                              </label>
                            </div>
                          ) : (
                            <div className="relative">
                              <img
                                src={imagePreview}
                                alt="Upload preview"
                                className="w-full max-h-64 object-contain rounded-lg border border-gray-200"
                              />
                              <button
                                onClick={() => {
                                  setUploadedImage(null);
                                  setImagePreview(null);
                                }}
                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                            </div>
                          )}

                          {imagePreview && (
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Animation Description (Optional)
                              </label>
                              <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe how you want the image to be animated..."
                                className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {mode === 'viral' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Content Description
                            </label>
                            <textarea
                              value={prompt}
                              onChange={(e) => setPrompt(e.target.value)}
                              placeholder="Describe your viral content idea. What's the hook? What platform is this for?"
                              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            />
                          </div>
                          
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start">
                              <Sparkles className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                              <div>
                                <h4 className="text-sm font-medium text-yellow-800">Viral Content Tips</h4>
                                <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                                  <li>• Start with a strong hook in the first 3 seconds</li>
                                  <li>• Include trending sounds or music</li>
                                  <li>• Keep it short and engaging (15-30 seconds)</li>
                                  <li>• Add captions for better accessibility</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'settings' && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {/* Duration */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Duration
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                          {['3', '5', '10', '15'].map((dur) => (
                            <button
                              key={dur}
                              onClick={() => setDuration(dur)}
                              className={`p-3 text-center rounded-lg border-2 transition-colors ${
                                duration === dur
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-gray-200 hover:border-primary-300'
                              }`}
                            >
                              {dur}s
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Aspect Ratio */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Aspect Ratio
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {aspectRatios.map((ratio) => (
                            <button
                              key={ratio.id}
                              onClick={() => setAspectRatio(ratio.id)}
                              className={`p-4 text-left rounded-lg border-2 transition-colors ${
                                aspectRatio === ratio.id
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-gray-200 hover:border-primary-300'
                              }`}
                            >
                              <div className="font-medium text-gray-900">{ratio.name}</div>
                              <div className="text-sm text-gray-500">{ratio.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Style */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Style
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {styles.map((styleOption) => (
                            <button
                              key={styleOption.id}
                              onClick={() => setStyle(styleOption.id)}
                              className={`p-4 text-left rounded-lg border-
