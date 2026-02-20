'use client';

import { useEffect, useRef, useCallback } from 'react';

export function InfiniteScroll({ 
  onLoadMore, 
  hasMore, 
  isLoading, 
  children,
  threshold = 100 
}) {
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, threshold]);

  return (
    <>
      {children}
      
      {/* Loading trigger */}
      <div ref={loadMoreRef} className="py-4">
        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm">Φόρτωση...</span>
          </div>
        )}
        {!hasMore && !isLoading && (
          <p className="text-center text-sm text-gray-400 py-4">
            Τέλος αποτελεσμάτων
          </p>
        )}
      </div>
    </>
  );
}

export default InfiniteScroll;
