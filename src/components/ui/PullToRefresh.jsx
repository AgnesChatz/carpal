'use client';

import { useState, useEffect, useCallback } from 'react';

export function PullToRefresh({ onRefresh, children }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = useCallback((e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (startY && window.scrollY === 0) {
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY;
      
      if (diff > 0 && diff < 150) {
        setPullDistance(diff);
        e.preventDefault();
      }
    }
  }, [startY]);

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance > 80) {
      setIsRefreshing(true);
      await onRefresh?.();
      setIsRefreshing(false);
    }
    setPullDistance(0);
    setStartY(0);
  }, [pullDistance, onRefresh]);

  useEffect(() => {
    const el = document.getElementById('pull-container');
    if (!el) return;

    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd);

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div id="pull-container" className="relative">
      {/* Pull indicator */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-transform"
        style={{ 
          transform: `translateY(${pullDistance > 0 ? Math.min(pullDistance - 60, 20) : -60}px)`,
          opacity: pullDistance > 20 ? 1 : 0
        }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
          {isRefreshing ? (
            <svg className="animate-spin w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg 
              className="w-5 h-5 text-gray-600 transition-transform"
              style={{ transform: `rotate(${Math.min(pullDistance * 2, 180)}deg)` }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
        </div>
      </div>
      
      {children}
    </div>
  );
}

export default PullToRefresh;
