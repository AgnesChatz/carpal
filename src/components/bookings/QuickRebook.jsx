'use client';

import { useRouter } from 'next/navigation';
import { Card, Button } from '@/components/ui';
import { format, addDays } from 'date-fns';
import { el } from 'date-fns/locale';

export function QuickRebook({ booking }) {
  const router = useRouter();

  if (!booking || !booking.listing) return null;

  const tomorrow = addDays(new Date(), 1);
  const tomorrowStr = format(tomorrow, 'EEEE d MMM', { locale: el });

  const handleRebook = () => {
    // Navigate to booking page with same listing, for tomorrow
    const params = new URLSearchParams({
      listingId: booking.listingId,
      dates: format(tomorrow, 'yyyy-MM-dd'),
      seats: booking.seatsBooked?.toString() || '1'
    });
    router.push(`/main/bookings/new?${params.toString()}`);
  };

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Ίδια ώρα αύριο;</p>
            <p className="text-sm text-gray-600">
              {booking.listing?.origin?.label} → {booking.listing?.destination?.label}
            </p>
          </div>
          <Button size="sm" onClick={handleRebook} className="bg-green-600 hover:bg-green-700">
            Κλείσε τώρα
          </Button>
        </div>
        
        <div className="mt-3 pt-3 border-t border-green-200 flex items-center justify-between text-sm">
          <span className="text-green-700">{tomorrowStr}</span>
          <span className="text-green-600">
            {booking.listing?.departureTime} • {booking.seatsBooked} {booking.seatsBooked === 1 ? 'θέση' : 'θέσεις'}
          </span>
        </div>
      </div>
    </Card>
  );
}

export function QuickRebookButton({ listing, date, seats = 1 }) {
  const router = useRouter();

  const handleRebook = () => {
    const tomorrow = addDays(new Date(), 1);
    const params = new URLSearchParams({
      listingId: listing.id,
      dates: format(tomorrow, 'yyyy-MM-dd'),
      seats: seats.toString()
    });
    router.push(`/main/bookings/new?${params.toString()}`);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleRebook}
      className="flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Ίδια ώρα αύριο
    </Button>
  );
}

export default QuickRebook;
