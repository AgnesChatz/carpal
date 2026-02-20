'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';

export function CopyTripDetails({ booking, driver, origin, destination, date, time, meetingPoint }) {
  const [copied, setCopied] = useState(false);

  const tripText = `🚗 Διαδρομή carpal.gr
📍 ${origin?.label || 'Αφετηρία'} → ${destination?.label || 'Προορισμός'}
📅 ${date || ''} στις ${time || ''}
📍 Σημείο συνάντησης: ${meetingPoint?.label || ''}
👤 Οδηγός: ${driver?.name || ''}
💰 Τιμή: €${booking?.totalPrice || 0}

Κράτηση #${booking?.id || ''}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tripText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleCopy}
      className="flex items-center gap-2"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Αντιγράφηκε!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Αντιγραφή στοιχείων
        </>
      )}
    </Button>
  );
}

export default CopyTripDetails;
