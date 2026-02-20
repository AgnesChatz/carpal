'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button, Card, Badge } from '@/components/ui';
import { formatPrice, formatDate } from '@/utils/helpers';
import { getBookings } from '@/lib/db';
import useAuthStore from '@/store/authStore';
import { EmptyState } from '@/components/ui';

// Icons
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const CarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const getStatusBadge = (status) => {
  const configs = {
    'CONFIRMED': { variant: 'success', label: 'Επιβεβαιωμένη' },
    'PENDING': { variant: 'warning', label: 'Εκκρεμεί' },
    'COMPLETED': { variant: 'primary', label: 'Ολοκληρώθηκε' },
    'CANCELLED': { variant: 'danger', label: 'Ακυρώθηκε' }
  };
  const config = configs[status] || { variant: 'default', label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

function BookingsContent() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCanceled, setShowCanceled] = useState(false);
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (searchParams.get('success')) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
    if (searchParams.get('canceled')) {
      setShowCanceled(true);
      const timer = setTimeout(() => setShowCanceled(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Get user's bookings
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  
  useEffect(() => {
    const loadBookings = async () => {
      if (!user) {
        setIsLoadingBookings(false);
        return;
      }
      
      setIsLoadingBookings(true);
      try {
        const userBookings = await getBookings(user.$id || user.id, 'rider');
        setBookings(userBookings);
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        setIsLoadingBookings(false);
      }
    };
    
    loadBookings();
  }, [user]);

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') return ['CONFIRMED', 'PENDING'].includes(booking.status);
    return ['COMPLETED', 'CANCELLED'].includes(booking.status);
  });

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Οι κρατήσεις μου</h1>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-fade-in">
            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-green-900">Η κράτηση ολοκληρώθηκε επιτυχώς!</p>
              <p className="text-sm text-green-700">Ο οδηγός θα ενημερωθεί και θα επικοινωνήσει μαζί σας.</p>
            </div>
          </div>
        )}

        {/* Canceled Message */}
        {showCanceled && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 animate-fade-in">
            <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-medium text-amber-900">Η πληρωμή ακυρώθηκε</p>
              <p className="text-sm text-amber-700">Μπορείτε να δοκιμάσετε ξανά όποτε θέλετε.</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'upcoming' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Επερχόμενες
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'past' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Ιστορικό
          </button>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm">
            <EmptyState type="bookings" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Link key={booking.id} href={`/main/bookings/${booking.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(booking.status)}
                          <span className="text-gray-500 text-sm">
                            {booking.dates.length} {booking.dates.length === 1 ? 'ημέρα' : 'ημέρες'}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.listing?.origin?.label} → {booking.listing?.destination?.label}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <CalendarIcon />
                            <span>{formatDate(booking.dates[0])}</span>
                            {booking.dates.length > 1 && (
                              <span className="text-gray-400">+{booking.dates.length - 1} ακόμα</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <UsersIcon />
                            <span>{booking.seatsBooked} {booking.seatsBooked === 1 ? 'θέση' : 'θέσεις'}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <LocationIcon />
                            <span>Σημείο συνάντησης</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{formatPrice(booking.totalPrice)}</p>
                        <p className="text-sm text-gray-500">σύνολο</p>
                      </div>
                    </div>

                    {/* Driver Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = `/main/profile/${booking.driverId}`;
                        }}
                        className="flex items-center gap-3 group flex-1 text-left"
                      >
                        {booking.driver?.photo ? (
                          <img 
                            src={booking.driver.photo} 
                            alt={booking.driver.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 group-hover:ring-2 group-hover:ring-blue-500 transition-all"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-sm group-hover:ring-2 group-hover:ring-blue-500 transition-all">
                            {booking.driver?.initials}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{booking.driver?.name}</p>
                          <p className="text-sm text-gray-500">Οδηγός</p>
                        </div>
                      </button>
                      
                      <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
                        <Link href={`/main/messages?user=${booking.driverId}`}>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <MessageIcon />
                            Μήνυμα
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Loading fallback for Suspense
function BookingsLoading() {
  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main export wrapped in Suspense
export default function BookingsPage() {
  return (
    <Suspense fallback={<BookingsLoading />}>
      <BookingsContent />
    </Suspense>
  );
}
