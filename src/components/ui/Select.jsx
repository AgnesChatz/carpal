'use client';

export function Select({ 
  label, 
  error, 
  options = [], 
  className = '', 
  id,
  required = false,
  placeholder = 'Επιλέξτε...',
  ...props 
}) {
  const inputId = id || Math.random().toString(36).substr(2, 9);
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-300 mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={inputId}
        className={`
          w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg
          text-white
          focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent
          transition-all duration-200 appearance-none
          bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")] bg-[position:right_0.5rem_center] bg-no-repeat bg-[length:1.5em_1.5em] pr-10
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
