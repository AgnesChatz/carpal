'use client';

import { useState, useEffect } from 'react';
import { Card, Button } from '@/components/ui';

export function TripReminder({ booking, date, time }) {
  const [reminderSet, setReminderSet] = useState(false);
  const [timeUntil, setTimeUntil] = useState('');

  useEffect(() => {
    if (!date || !time) return;

    const tripDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const diff = tripDateTime - now;

    if (diff > 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 24) {
        setTimeUntil(`σε ${Math.floor(hours / 24)} μέρες`);
      } else if (hours > 0) {
        setTimeUntil(`σε ${hours} ώρες`);
      } else {
        setTimeUntil(`σε ${minutes} λεπτά`);
      }
    }
  }, [date, time]);

  const handleSetReminder = () => {
    // In a real app, this would schedule a push notification
    // For now, we just toggle the state
    setReminderSet(!reminderSet);
  };

  if (!date || !time) return null;

  return (
    <Card className={reminderSet ? 'bg-blue-50 border-blue-200' : ''}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${reminderSet ? 'bg-blue-500' : 'bg-gray-100'}`}>
              <svg className={`w-5 h-5 ${reminderSet ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {reminderSet ? 'Υπενθύμιση ενεργή' : 'Υπενθύμιση'}
              </p>
              <p className="text-sm text-gray-500">
                {reminderSet 
                  ? 'Θα ειδοποιηθείς 30 λεπτά πριν' 
                  : `Η διαδρομή είναι ${timeUntil}`
                }
              </p>
            </div>
          </div>
          <Button
            variant={reminderSet ? 'outline' : 'default'}
            size="sm"
            onClick={handleSetReminder}
          >
            {reminderSet ? 'Ακύρωση' : 'Ενεργοποίηση'}
          </Button>
        </div>

        {reminderSet && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Θα λάβεις ειδοποίηση 30 λεπτά πριν την αναχώρηση
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default TripReminder;
