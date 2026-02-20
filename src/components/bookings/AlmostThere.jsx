'use client';

import { useState, useEffect } from 'react';

export function AlmostThereIndicator({ estimatedArrivalMinutes }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate progress based on arrival time (5 min = 100%)
    const maxTime = 5;
    const currentProgress = Math.max(0, Math.min(100, ((maxTime - estimatedArrivalMinutes) / maxTime) * 100));
    setProgress(currentProgress);
  }, [estimatedArrivalMinutes]);

  if (estimatedArrivalMinutes > 5) return null;

  const getMessage = () => {
    if (estimatedArrivalMinutes <= 1) return 'Έφτασε! 🎉';
    if (estimatedArrivalMinutes <= 2) return 'Σε 1-2 λεπτά';
    return `Σε ${Math.ceil(estimatedArrivalMinutes)} λεπτά`;
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 text-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-lg">Σχεδόν έφτασε!</p>
            <p className="text-white/80 text-sm">{getMessage()}</p>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Steps */}
      <div className="flex justify-between mt-2 text-xs text-white/70">
        <span>Σε κίνηση</span>
        <span>Κοντά</span>
        <span>Έφτασε</span>
      </div>
    </div>
  );
}

export function ArrivalCountdown({ minutes }) {
  if (minutes > 10) return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <span className="text-green-600 font-medium">
        {minutes <= 1 ? 'Φτάνει τώρα' : `Φτάνει σε ${Math.ceil(minutes)} λεπτά`}
      </span>
    </div>
  );
}

export default AlmostThereIndicator;
