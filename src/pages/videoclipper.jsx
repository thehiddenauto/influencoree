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
              <Scissors className="
