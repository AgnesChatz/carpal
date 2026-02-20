'use client';

import { useEffect, useState } from 'react';
import { OfflineIndicator, KeyboardShortcuts, BackToTop } from './ui';

export function ClientWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div 
        className="min-h-screen"
        style={{ opacity: 0 }}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <OfflineIndicator />
      {children}
      <KeyboardShortcuts />
      <BackToTop />
    </div>
  );
}
