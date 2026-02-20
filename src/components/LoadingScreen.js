'use client';

import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

export function LoadingScreen({ message = 'Φόρτωση...' }) {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      {/* Logo animation */}
      <div className="relative mb-8">
        {/* Car icon with bounce */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Car className="w-16 h-16 text-blue-600" strokeWidth={1.5} />
        </motion.div>

        {/* Road lines */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.2, 1, 0.2],
                x: [-10, 10, -10]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-3 h-1 bg-gray-300 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Brand name */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-gray-900 mb-2"
      >
        carpal
      </motion.h1>

      {/* Loading message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 text-sm"
      >
        {message}
      </motion.p>

      {/* Progress bar */}
      <div className="mt-8 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          animate={{ 
            x: ['-100%', '100%'],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-1/2 h-full bg-blue-600 rounded-full"
        />
      </div>
    </div>
  );
}

// Full page loading state with skeleton
export function PageLoader() {
  return (
    <div className="min-h-screen grain-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-8 animate-pulse" />
        
        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-1/2 mb-2 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Button loading spinner
export function ButtonLoader({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} border-2 border-current border-t-transparent rounded-full`}
    />
  );
}
