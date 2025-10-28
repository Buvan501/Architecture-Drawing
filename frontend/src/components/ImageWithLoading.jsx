import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ImageWithLoading = ({ 
  src, 
  alt, 
  className = '', 
  onError,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gray-100 flex items-center justify-center"
        >
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">📷</span>
            </div>
            <p className="text-sm text-gray-500">Image not available</p>
          </div>
        </motion.div>
      )}

      {/* Actual Image */}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default ImageWithLoading;
