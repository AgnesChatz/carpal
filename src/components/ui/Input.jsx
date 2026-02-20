'use client';

import { useId } from 'react';

export function Input({ 
  label, 
  error, 
  className = '', 
  id,
  required = false,
  ...props 
}) {
  // Use React's useId for consistent IDs between server and client
  const generatedId = useId();
  const inputId = id || generatedId;
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
          text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
          transition-all duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
