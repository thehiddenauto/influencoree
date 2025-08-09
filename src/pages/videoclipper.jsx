import React, { useState } from 'react';
import { Upload, Scissors, Download, Play } from 'lucide-react';
import toast from 'react-hot-toast';

const VideoClipper = () => {
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast.error('Video size must be less than 100MB');
        return;
      }
      
      const url = URL.createObjectURL(file);
      setUploadedVideo({
        file,
        url,
        name: file.name
      });
      toast.success('Video uploaded successfully');
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Clipper</h1>
        <p className="text-gray-600">
          Upload and clip your videos with precision
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Video</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            {uploadedVideo ? (
              <div className="space-y-2">
                <video
                  src={uploadedVideo.url}
                  className="w-full h-48 object-cover rounded-lg mx-auto"
                  controls
                />
                <p className="text-sm text-gray-600">{uploadedVideo.name}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-gray-600">Click or drag video to upload</p>
                <p className="text-sm text-gray-500">MP4, WebM up to 100MB</p>
              </div>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clipping Tools</h3>
          
          <div className="space-y-4">
            <button
              disabled={!uploadedVideo}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Scissors className="w# COMPLETE PRODUCTION DEPLOYMENT FIXES

## 🚨 CRITICAL ARCHITECTURE ISSUES

### Issue #1: Missing index.html File
**What's wrong:** Your `index.html` file is empty, which will cause blank page loads in production.
**Why it matters:** Vite needs a proper HTML entry point to build and serve your app.

**File:** `index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Influencore - AI Video Generation Platform</title>
    <meta name="description" content="Create viral videos with AI using Google Veo 3, OpenAI Sora, and other cutting-edge models. Transform your content creation workflow." />
    <meta name="keywords" content="AI video generation, content creation, viral videos, Google Veo 3, OpenAI Sora" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://influencore.co/" />
    <meta property="og:title" content="Influencore - AI Video Generation Platform" />
    <meta property="og:description" content="Create viral videos with AI using cutting-edge models" />
    <meta property="og:image" content="https://influencore.co/og-image.png" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://influencore.co/" />
    <meta property="twitter:title" content="Influencore - AI Video Generation Platform" />
    <meta property="twitter:description" content="Create viral videos with AI using cutting-edge models" />
    <meta property="twitter:image" content="https://influencore.co/og-image.png" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Loading Spinner Styles -->
    <style>
      #loading-spinner {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1f2937;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(59, 130, 246, 0.3);
        border-top: 4px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div id="loading-spinner">
      <div class="spinner"></div>
    </div>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>