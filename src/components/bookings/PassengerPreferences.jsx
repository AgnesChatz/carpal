'use client';

import { useState } from 'react';
import { Card, Button } from '@/components/ui';

const PREFERENCE_OPTIONS = [
  {
    id: 'quiet',
    label: 'Ήσυχη διαδρομή',
    description: 'Προτιμώ να μην μιλάω πολύ',
    icon: QuietIcon
  },
  {
    id: 'ac',
    label: 'Κλιματισμός',
    description: 'Θέλω AC ανοιχτό',
    icon: ACIcon
  },
  {
    id: 'no_smoking',
    label: 'Όχι κάπνισμα',
    description: 'Ευαίσθητος στον καπνό',
    icon: NoSmokingIcon
  },
  {
    id: 'music',
    label: 'Μουσική',
    description: 'Μου αρέσει η μουσική',
    icon: MusicIcon
  },
  {
    id: 'pets',
    label: 'Κατοικίδιο',
    description: 'Ταξιδεύω με κατοικίδιο',
    icon: PetIcon
  },
  {
    id: 'luggage',
    label: 'Αποσκευές',
    description: 'Έχω μεγάλες αποσκευές',
    icon: LuggageIcon
  }
];

export function PassengerPreferences({ preferences = [], onChange, readOnly = false }) {
  const [selected, setSelected] = useState(preferences);
  const [isEditing, setIsEditing] = useState(false);

  const togglePreference = (id) => {
    if (readOnly && !isEditing) return;
    
    const newSelected = selected.includes(id)
      ? selected.filter(p => p !== id)
      : [...selected, id];
    
    setSelected(newSelected);
    if (onChange) onChange(newSelected);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onChange) onChange(selected);
  };

  if (readOnly && selected.length === 0) return null;

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Προτιμήσεις επιβάτη
          </h3>
          {readOnly && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {isEditing ? 'Ακύρωση' : 'Επεξεργασία'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {PREFERENCE_OPTIONS.map((option) => {
            const isSelected = selected.includes(option.id);
            const Icon = option.icon;
            
            if (readOnly && !isEditing && !isSelected) return null;

            return (
              <button
                key={option.id}
                onClick={() => togglePreference(option.id)}
                disabled={readOnly && !isEditing}
                className={`
                  flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all
                  ${isSelected 
                    ? 'bg-gray-900 border-gray-900 text-white' 
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }
                  ${readOnly && !isEditing ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                <div>
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                    {option.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {isEditing && (
          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={handleSave} className="flex-1">
              Αποθήκευση
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

export function PassengerPreferencesBadge({ preferences = [] }) {
  if (preferences.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {preferences.slice(0, 3).map((prefId) => {
        const pref = PREFERENCE_OPTIONS.find(p => p.id === prefId);
        if (!pref) return null;
        const Icon = pref.icon;
        
        return (
          <span 
            key={prefId}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
            title={pref.description}
          >
            <Icon className="w-3 h-3" />
            {pref.label}
          </span>
        );
      })}
      {preferences.length > 3 && (
        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
          +{preferences.length - 3}
        </span>
      )}
    </div>
  );
}

function QuietIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
    </svg>
  );
}

function ACIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
    </svg>
  );
}

function NoSmokingIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  );
}

function MusicIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  );
}

function PetIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LuggageIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

export default PassengerPreferences;
