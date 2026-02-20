'use client';

import { GENDER_PREFERENCE } from '@/utils/constants';

const config = {
  [GENDER_PREFERENCE.LADIES_ONLY]: {
    label: 'Μόνο γυναίκες',
    shortLabel: 'Γυναίκες',
    icon: LadiesIcon,
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-700',
    borderColor: 'border-pink-200',
    description: 'Αυτή η διαδρομή είναι διαθέσιμη μόνο για γυναίκες επιβάτες'
  },
  [GENDER_PREFERENCE.MEN_ONLY]: {
    label: 'Μόνο άνδρες',
    shortLabel: 'Άνδρες',
    icon: MenIcon,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    description: 'Αυτή η διαδρομή είναι διαθέσιμη μόνο για άνδρες επιβάτες'
  },
  [GENDER_PREFERENCE.ANY]: {
    label: 'Όλοι',
    shortLabel: 'Όλοι',
    icon: EveryoneIcon,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
    borderColor: 'border-gray-200',
    description: 'Αυτή η διαδρομή είναι διαθέσιμη για όλους'
  }
};

function LadiesIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4a4 4 0 100 8 4 4 0 000-8z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7m-3-3h6" />
    </svg>
  );
}

function MenIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4a4 4 0 100 8 4 4 0 000-8z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7m-3-3h6" />
    </svg>
  );
}

function EveryoneIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

export function GenderPreferenceBadge({ 
  preference = GENDER_PREFERENCE.ANY, 
  size = 'md',
  showTooltip = false,
  onClick 
}) {
  const prefs = config[preference] || config[GENDER_PREFERENCE.ANY];
  const Icon = prefs.icon;
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="relative group">
      <span 
        className={`
          inline-flex items-center gap-1.5 rounded-full font-medium
          ${prefs.bgColor} ${prefs.textColor} border ${prefs.borderColor}
          ${sizeClasses[size]}
          ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
        `}
        onClick={onClick}
      >
        <Icon className={iconSizes[size]} />
        {prefs.shortLabel}
      </span>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          {prefs.description}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
}

export function GenderPreferenceFilter({ 
  value, 
  onChange,
  showLabel = true 
}) {
  return (
    <div className="space-y-2">
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700">
          Προτίμηση επιβατών
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {Object.values(GENDER_PREFERENCE).map((pref) => {
          const prefs = config[pref];
          const Icon = prefs.icon;
          const isSelected = value === pref;
          
          return (
            <button
              key={pref}
              onClick={() => onChange(pref)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-medium text-sm transition-all
                ${isSelected 
                  ? `${prefs.bgColor} ${prefs.textColor} ${prefs.borderColor}` 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {prefs.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function GenderPreferenceSelector({
  value,
  onChange,
  label = "Προτίμηση επιβατών"
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="grid grid-cols-1 gap-3">
        {Object.values(GENDER_PREFERENCE).map((pref) => {
          const prefs = config[pref];
          const Icon = prefs.icon;
          const isSelected = value === pref;
          
          return (
            <button
              key={pref}
              onClick={() => onChange(pref)}
              className={`
                flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all
                ${isSelected 
                  ? `${prefs.bgColor} ${prefs.borderColor}` 
                  : 'bg-white border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${isSelected ? 'bg-white/50' : 'bg-gray-100'}
              `}>
                <Icon className={`w-6 h-6 ${prefs.textColor}`} />
              </div>
              <div className="flex-1">
                <div className={`font-semibold ${isSelected ? prefs.textColor : 'text-gray-900'}`}>
                  {prefs.label}
                </div>
                <div className={`text-sm ${isSelected ? prefs.textColor : 'text-gray-500'}`}>
                  {prefs.description}
                </div>
              </div>
              {isSelected && (
                <svg className={`w-6 h-6 ${prefs.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GenderPreferenceBadge;
