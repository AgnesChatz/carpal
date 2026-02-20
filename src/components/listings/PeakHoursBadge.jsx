'use client';

export function PeakHoursBadge({ time }) {
  if (!time) return null;

  const hour = parseInt(time.split(':')[0]);
  
  // Peak hours: 7-9 AM and 5-7 PM
  const isPeak = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
  
  if (!isPeak) return null;

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      Αιχμή
    </span>
  );
}

export default PeakHoursBadge;
