'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { TRIP_STATUS } from '@/utils/constants';

const statusConfig = {
  [TRIP_STATUS.SCHEDULED]: {
    label: 'Προγραμματισμένη',
    description: 'Η κράτηση είναι επιβεβαιωμένη',
    color: 'bg-blue-500',
    icon: CalendarIcon,
    step: 1
  },
  [TRIP_STATUS.DRIVER_ASSIGNED]: {
    label: 'Ο οδηγός είναι στο δρόμο',
    description: 'Ο οδηγός ξεκίνησε για το σημείο συνάντησης',
    color: 'bg-blue-600',
    icon: CarIcon,
    step: 2
  },
  [TRIP_STATUS.DRIVER_ARRIVING]: {
    label: 'Άφιξη σε λίγα λεπτά',
    description: 'Ο οδηγός φτάνει στο σημείο συνάντησης',
    color: 'bg-yellow-500',
    icon: ClockIcon,
    step: 3
  },
  [TRIP_STATUS.DRIVER_ARRIVED]: {
    label: 'Ο οδηγός έφτασε',
    description: 'Ο οδηγός σας περιμένει',
    color: 'bg-green-500',
    icon: LocationIcon,
    step: 4
  },
  [TRIP_STATUS.PASSENGER_PICKED_UP]: {
    label: 'Επιβιβάστηκε',
    description: 'Ο επιβάτης επιβιβάστηκε στο όχημα',
    color: 'bg-green-600',
    icon: UserCheckIcon,
    step: 5
  },
  [TRIP_STATUS.IN_PROGRESS]: {
    label: 'Σε εξέλιξη',
    description: 'Η διαδρομή είναι σε εξέλιξη',
    color: 'bg-green-600',
    icon: NavigationIcon,
    step: 5
  },
  [TRIP_STATUS.ARRIVED]: {
    label: 'Φτάσατε',
    description: 'Φτάσατε στον προορισμό',
    color: 'bg-green-600',
    icon: FlagIcon,
    step: 6
  },
  [TRIP_STATUS.COMPLETED]: {
    label: 'Ολοκληρώθηκε',
    description: 'Η διαδρομή ολοκληρώθηκε',
    color: 'bg-gray-500',
    icon: CheckIcon,
    step: 7
  },
  [TRIP_STATUS.CANCELLED]: {
    label: 'Ακυρώθηκε',
    description: 'Η διαδρομή ακυρώθηκε',
    color: 'bg-red-500',
    icon: XIcon,
    step: 0
  }
};

// Icons
function CalendarIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function CarIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LocationIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function UserCheckIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function NavigationIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function FlagIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-8a2 2 0 012-2h10a2 2 0 012 2v8M9 10a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function TripStatusTracker({ 
  status, 
  updates = [], 
  isDriver = false,
  onStatusChange,
  driverPhone,
  showActions = true 
}) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const config = statusConfig[currentStatus] || statusConfig[TRIP_STATUS.SCHEDULED];
  const Icon = config.icon;

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const handleStatusUpdate = (newStatus) => {
    setCurrentStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  const getNextStatus = () => {
    const statusFlow = [
      TRIP_STATUS.SCHEDULED,
      TRIP_STATUS.DRIVER_ASSIGNED,
      TRIP_STATUS.DRIVER_ARRIVING,
      TRIP_STATUS.DRIVER_ARRIVED,
      TRIP_STATUS.PASSENGER_PICKED_UP,
      TRIP_STATUS.IN_PROGRESS,
      TRIP_STATUS.ARRIVED,
      TRIP_STATUS.COMPLETED
    ];
    const currentIndex = statusFlow.indexOf(currentStatus);
    return statusFlow[currentIndex + 1] || null;
  };

  const nextStatus = getNextStatus();

  // Progress bar calculation
  const totalSteps = 7;
  const currentStep = config.step;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-6">
      {/* Current Status Card */}
      <div className={`rounded-2xl p-6 ${config.color} text-white`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{config.label}</h3>
            <p className="text-white/80">{config.description}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gray-900 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Κράτηση</span>
          <span>Παραλαβή</span>
          <span>Ολοκλήρωση</span>
        </div>
      </div>

      {/* Status Timeline */}
      {updates.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Ενημερώσεις</h4>
          <div className="space-y-3">
            {updates.map((update, index) => {
              const updateConfig = statusConfig[update.status];
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${updateConfig?.color || 'bg-gray-400'}`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{update.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(update.timestamp).toLocaleTimeString('el-GR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {showActions && (
        <div className="space-y-3">
          {isDriver && nextStatus && (
            <Button 
              className="w-full"
              onClick={() => handleStatusUpdate(nextStatus)}
            >
              {getStatusButtonText(nextStatus)}
            </Button>
          )}
          
          {!isDriver && currentStatus === TRIP_STATUS.DRIVER_ARRIVING && (
            <div className="flex gap-3">
              {driverPhone && (
                <a 
                  href={`tel:${driverPhone}`}
                  className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl font-medium text-center hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Κλήση οδηγού
                </a>
              )}
            </div>
          )}

          {/* Emergency Button */}
          <button className="w-full py-3 text-red-600 text-sm font-medium hover:bg-red-50 rounded-xl transition-colors">
            Έκτακτη ανάγκη
          </button>
        </div>
      )}
    </div>
  );
}

function getStatusButtonText(status) {
  const texts = {
    [TRIP_STATUS.DRIVER_ASSIGNED]: 'Ξεκίνησα για παραλαβή',
    [TRIP_STATUS.DRIVER_ARRIVING]: 'Φτάνω σε λίγα λεπτά',
    [TRIP_STATUS.DRIVER_ARRIVED]: 'Έφτασα στο σημείο',
    [TRIP_STATUS.PASSENGER_PICKED_UP]: 'Επιβιβάστηκε ο επιβάτης',
    [TRIP_STATUS.IN_PROGRESS]: 'Ξεκινήσαμε',
    [TRIP_STATUS.ARRIVED]: 'Φτάσαμε στον προορισμό',
    [TRIP_STATUS.COMPLETED]: 'Ολοκλήρωση διαδρομής'
  };
  return texts[status] || 'Ενημέρωση κατάστασης';
}

export default TripStatusTracker;
