'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function RecentSearches() {
  const router = useRouter();
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('carpal_recent_searches');
    if (saved) {
      setSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (search) => {
    const params = new URLSearchParams();
    if (search.origin) params.set('originLabel', search.origin);
    if (search.destination) params.set('destLabel', search.destination);
    if (search.date) params.set('date', search.date);
    router.push(`/main/search?${params.toString()}`);
  };

  const clearSearches = () => {
    localStorage.removeItem('carpal_recent_searches');
    setSearches([]);
  };

  if (searches.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">Πρόσφατες αναζητήσεις</h3>
        <button
          onClick={clearSearches}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Καθαρισμός
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => handleSearch(search)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="truncate max-w-[150px]">
              {search.origin || 'Οπουδήποτε'} → {search.destination || 'Οπουδήποτε'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function saveSearch(search) {
  const saved = localStorage.getItem('carpal_recent_searches');
  let searches = saved ? JSON.parse(saved) : [];
  
  // Add new search to beginning, remove duplicates, keep last 3
  searches = [search, ...searches.filter(s => 
    s.origin !== search.origin || s.destination !== search.destination
  )].slice(0, 3);
  
  localStorage.setItem('carpal_recent_searches', JSON.stringify(searches));
}

export default RecentSearches;
