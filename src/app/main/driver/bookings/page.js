'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Button, Card, Badge } from '@/components/ui';
import { formatPrice, formatDate } from '@/utils/helpers';
import { getBookings, getDriverStats } from '@/lib/db';
import { mockDrivers } from '@/lib/mockData';
import useAuthStore from '@/store/authStore';

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
    'PAID': { variant: 'success', label: 'Πληρωμένη' },
    'PENDING': { variant: 'warning', label: 'Εκκρεμεί' },
    'PENDING_PAYMENT': { variant: 'warning', label: 'Αναμονή πληρωμής' },
    'COMPLETED': { variant: 'primary', label: 'Ολοκληρώθηκε' },
    'CANCELLED': { variant: 'danger', label: 'Ακυρώθηκε' }
  };
  const config = configs[status] || { variant: 'default', label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default function DriverBookingsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isLoading, setIsLoading] = useState(true);
  const [driverBookings, setDriverBookings] = useState([]);
  const { user } = useAuthStore();

  // For demo, use first driver
  const currentDriver = mockDrivers[0];

  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true);
      
      try {
        const bookings = await getBookings(currentDriver.id, 'driver');
        setDriverBookings(bookings);
      } catch (error) {
        console.error('Error loading driver bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBookings();
  }, []);

  const filteredBookings = driverBookings.filter(booking => {
    if (activeTab === 'upcoming') return ['CONFIRMED', 'PAID', 'PENDING'].includes(booking.status);
    return ['COMPLETED', 'CANCELLED'].includes(booking.status);
  });

  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
    earnings: 0
  });
  
  useEffect(() => {
    const loadStats = async () => {
      try {
        const driverStats = await getDriverStats(currentDriver.id);
        setStats(driverStats);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };
    
    loadStats();
  }, [currentDriver.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen grain-bg pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500">Φόρτωση κρατήσεων...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Κρατήσεις επιβατών</h1>
            <p className="text-gray-500 mt-1">Διαχειριστείτε τις κρατήσεις στις διαδρομές σας</p>
          </div>
          <Link href="/main/listings">
            <Button variant="outline">Οι διαδρομές μου</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="p-4">
              <p className="text-sm text-gray-500">Συνολικές κρατήσεις</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <p className="text-sm text-gray-500">Επερχόμενες</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcoming}</p>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <p className="text-sm text-gray-500">Ολοκληρωμένες</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <p className="text-sm text-gray-500">Κέρδη (εκτιμ.)</p>
              <p className="text-2xl font-bold text-green-600">{formatPrice(stats.earnings)}</p>
            </div>
          </Card>
        </div>

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
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarIcon />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === 'upcoming' ? 'Δεν έχετε επερχόμενες κρατήσεις' : 'Δεν έχετε προηγούμενες κρατήσεις'}
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === 'upcoming' 
                ? 'Οι επιβάτες θα εμφανιστούν εδώ όταν κάνουν κράτηση.' 
                : 'Οι ολοκληρωμένες κρατήσεις θα εμφανιστούν εδώ.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(booking.status)}
                        <span className="text-gray-500 text-sm">
                          Κωδικός: #{booking.id}
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
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{formatPrice(booking.totalPrice)}</p>
                      <p className="text-sm text-green-600">+{formatPrice(booking.totalPrice * 0.9)} σε εσάς</p>
                    </div>
                  </div>

                  {/* Passenger Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {booking.riderId?.charAt(0)?.toUpperCase() || 'Ε'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Επιβάτης</p>
                        <p className="text-sm text-gray-500">ID: {booking.riderId}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link href={`/main/messages?user=${booking.riderId}`}>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <MessageIcon />
                          Μήνυμα
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
