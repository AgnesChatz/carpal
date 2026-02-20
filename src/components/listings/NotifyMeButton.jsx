'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';

export function NotifyMeButton({ listingId, isFull = false }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSubscribed(true);
    setIsLoading(false);
  };

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSubscribed(false);
    setIsLoading(false);
  };

  if (isSubscribed) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleUnsubscribe}
        loading={isLoading}
        className="text-green-600 border-green-200 bg-green-50"
      >
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Θα ειδοποιηθείς
      </Button>
    );
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleSubscribe}
      loading={isLoading}
      className={isFull ? 'text-amber-600 border-amber-200' : ''}
    >
      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {isFull ? 'Ειδοποίησέ με όταν αδειάσει' : 'Ειδοποίησέ με'}
    </Button>
  );
}

export default NotifyMeButton;
