'use client';

export function LastSeatBadge({ seatsAvailable }) {
  if (seatsAvailable > 1) return null;
  
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full border border-red-200 animate-pulse">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      Τελευταία θέση!
    </span>
  );
}

export function SeatsBadge({ seatsAvailable }) {
  if (seatsAvailable === 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
        Πλήρες
      </span>
    );
  }
  
  if (seatsAvailable === 1) {
    return <LastSeatBadge seatsAvailable={1} />;
  }
  
  if (seatsAvailable <= 2) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
        Μόνο {seatsAvailable} θέσεις
      </span>
    );
  }
  
  return null;
}

export default LastSeatBadge;
