'use client';

export function TimeIndicator({ departureTime, searchTime }) {
  if (!departureTime || !searchTime) return null;

  const dep = new Date(`2000-01-01T${departureTime}`);
  const search = new Date(`2000-01-01T${searchTime}`);
  const diffMinutes = (dep - search) / (1000 * 60);

  if (diffMinutes > 30) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Νωρίς (+{Math.round(diffMinutes)} λεπτά)
      </span>
    );
  }

  if (diffMinutes < -30) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Αργά ({Math.round(Math.abs(diffMinutes))} λεπτά)
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      Στην ώρα
    </span>
  );
}

export default TimeIndicator;
