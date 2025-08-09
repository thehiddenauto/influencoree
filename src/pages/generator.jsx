import React from 'react';
import VideoGenerator from './VideoGenerator';

// Re-export VideoGenerator as Generator for backward compatibility
const Generator = (props) => {
  return <VideoGenerator {...props} />;
};

export default Generator;