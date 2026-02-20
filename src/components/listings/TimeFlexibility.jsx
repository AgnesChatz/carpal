'use client';

import { TIME_FLEXIBILITY } from '@/utils/constants';

const flexibilityOptions = [
  { 
    value: TIME_FLEXIBILITY.NONE, 
    label: 'Ακριβώς στην ώρα',
    description: 'Καμία ευελιξία',
    icon: ClockIcon
  },
  { 
    value: TIME_FLEXIBILITY.FIFTEEN, 
    label: '±15 λεπτά',
    description: '15 λεπτά πριν ή μετά',
    icon: ClockFlexIcon
  },
  { 
    value: TIME_FLEXIBILITY.THIRTY, 
    label: '±30 λεπτά',
    description: '30 λεπτά πριν ή μετά',
    icon: ClockFlexIcon
  },
  { 
    value: TIME_FLEXIBILITY.SIXTY, 
    label: '±1 ώρα',
    description: 'Μία ώρα πριν ή μετά',
    icon: ClockFlexIcon
  }
];

function ClockIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ClockFlexIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m8-10h2M2 12h2" />
    </svg>
  );
}

export function TimeFlexibilityBadge({ 
  minutes = 0, 
  size = 'md',
  showLabel = true 
}) {
  const option = flexibilityOptions.find(o => o.value === minutes) || flexibilityOptions[0];
  const Icon = option.icon;
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2'
  };
  
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (minutes === 0) {
    return (
      <span className={`
        inline-flex items-center rounded-full font-medium
        bg-gray-100 text-gray-600 border border-gray-200
        ${sizeClasses[size]}
      `}>
        <Icon className={iconSizes[size]} />
        {showLabel && 'Σταθερή ώρα'}
      </span>
    );
  }

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      bg-green-100 text-green-700 border border-green-200
      ${sizeClasses[size]}
    `}>
      <Icon className={iconSizes[size]} />
      {showLabel && option.label}
    </span>
  );
}

export function TimeFlexibilitySelector({ 
  value, 
  onChange,
  label = "Ευελιξία ώρας",
  description = "Πόση ευελιξία έχετε στην ώρα αναχώρησης;"
}) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {flexibilityOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all
                ${isSelected 
                  ? 'bg-green-50 border-green-500 text-green-900' 
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Icon className={`w-6 h-6 ${isSelected ? 'text-green-600' : 'text-gray-400'}`} />
              <div>
                <div className="font-semibold text-sm">{option.label}</div>
                <div className={`text-xs mt-0.5 ${isSelected ? 'text-green-600' : 'text-gray-500'}`}>
                  {option.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TimeFlexibilityFilter({
  value,
  onChange,
  label = "Ευελιξία ώρας"
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange(null)}
          className={`
            px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all
            ${value === null || value === undefined
              ? 'bg-gray-900 border-gray-900 text-white' 
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
            }
          `}
        >
          Όλες
        </button>
        {flexibilityOptions.slice(1).map((option) => {
          const isSelected = value === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`
                px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all
                ${isSelected 
                  ? 'bg-green-50 border-green-500 text-green-700' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function formatFlexibility(minutes) {
  if (minutes === 0) return 'Σταθερή ώρα';
  if (minutes === 15) return '±15 λεπτά';
  if (minutes === 30) return '±30 λεπτά';
  if (minutes === 60) return '±1 ώρα';
  return `${minutes} λεπτά`;
}

export default TimeFlexibilityBadge;
