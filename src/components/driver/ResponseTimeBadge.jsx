'use client';

export function ResponseTimeBadge({ minutes }) {
  let color = 'bg-gray-100 text-gray-600';
  let label = '';

  if (minutes <= 5) {
    color = 'bg-green-100 text-green-700';
    label = 'Απαντά άμεσα';
  } else if (minutes <= 15) {
    color = 'bg-blue-100 text-blue-700';
    label = `Απαντά σε ${minutes} λεπτά`;
  } else if (minutes <= 60) {
    color = 'bg-amber-100 text-amber-700';
    label = 'Απαντά σε < 1 ώρα';
  } else {
    color = 'bg-gray-100 text-gray-600';
    label = 'Απαντά σε μερικές ώρες';
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {label}
    </span>
  );
}

export function ResponseTimeIndicator({ avgMinutes }) {
  const getLevel = () => {
    if (avgMinutes <= 5) return { level: 'super', color: 'text-green-600', icon: '⚡' };
    if (avgMinutes <= 15) return { level: 'fast', color: 'text-blue-600', icon: '✓' };
    if (avgMinutes <= 60) return { level: 'normal', color: 'text-amber-600', icon: '○' };
    return { level: 'slow', color: 'text-gray-500', icon: '○' };
  };

  const { level, color, icon } = getLevel();

  const labels = {
    super: 'Άμεση απόκριση',
    fast: 'Γρήγορη απόκριση',
    normal: 'Κανονική απόκριση',
    slow: 'Αργή απόκριση'
  };

  return (
    <div className="flex items-center gap-2">
      <span className={color}>{icon}</span>
      <span className="text-sm text-gray-600">{labels[level]}</span>
      <span className="text-xs text-gray-400">({avgMinutes} λεπτά μέσος όρος)</span>
    </div>
  );
}

export default ResponseTimeBadge;
