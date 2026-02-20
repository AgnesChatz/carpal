'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Button, Card, Badge } from '@/components/ui';
import { useListings } from '@/hooks/useListings';
import { formatPrice, formatDate, formatDaysOfWeek } from '@/utils/helpers';
import { LISTING_TYPE, GENDER_PREFERENCE } from '@/utils/constants';
import { MapAddressPicker } from '@/components/maps';
import { SearchResultsSkeleton } from '@/components/Skeleton';
import { GenderPreferenceBadge, TimeFlexibilityBadge, SeatsBadge, NotifyMeButton, PeakHoursBadge, DistanceBadge } from '@/components/listings';
import { EmptyState } from '@/components/ui';
import { RouteMiniMap } from '@/components/maps';
import { NewDriverBadge, ExperiencedDriverBadge } from '@/components/driver';

// Icons
const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

function SearchResults() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    originLat: searchParams.get('originLat'),
    originLng: searchParams.get('originLng'),
    originLabel: searchParams.get('originLabel'),
    destLat: searchParams.get('destLat'),
    destLng: searchParams.get('destLng'),
    destLabel: searchParams.get('destLabel'),
    date: searchParams.get('date'),
    seats: parseInt(searchParams.get('seats')) || 1,
    genderPreference: searchParams.get('genderPreference') || GENDER_PREFERENCE.ANY,
    timeFlexibility: searchParams.get('timeFlexibility') ? parseInt(searchParams.get('timeFlexibility')) : null,
    maxPickupRadius: searchParams.get('maxPickupRadius') || null,
    instantBooking: searchParams.get('instantBooking') === 'true'
  });
  const [showFilters, setShowFilters] = useState(false);

  const { listings, isLoading, error } = useListings(filters);

  if (isLoading) {
    return (
      <div className="min-h-screen grain-bg pt-20">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Διαθέσιμες διαδρομές</h1>
            <p className="text-gray-600">Φόρτωση διαδρομών...</p>
          </div>
          <SearchResultsSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Search Summary Header */}
        <div className="mb-4 sm:mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Διαθέσιμες διαδρομές</h1>
              <p className="text-sm sm:text-base text-gray-600">
                <span className="font-semibold text-gray-900">{listings.length}</span> διαδρομές βρέθηκαν
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 py-2"
            >
              <FilterIcon />
              Φίλτρα
            </Button>
          </div>

          {/* Trip Summary Card with Edit */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              {/* Route - Editable */}
              <div className="w-full">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <div className="flex-1 w-full">
                    <MapAddressPicker
                      label="Από"
                      placeholder="Αφετηρία"
                      value={filters.originLabel || ''}
                      onLocationSelect={(loc) => {
                        if (loc) {
                          setFilters({ 
                            ...filters, 
                            originLat: loc.lat, 
                            originLng: loc.lng, 
                            originLabel: loc.label 
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="hidden sm:flex w-12 h-12 bg-blue-50 rounded-full items-center justify-center flex-shrink-0">
                    <ArrowRightIcon />
                  </div>
                  <div className="flex sm:hidden justify-center">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <MapAddressPicker
                      label="Προς"
                      placeholder="Προορισμός"
                      value={filters.destLabel || ''}
                      onLocationSelect={(loc) => {
                        if (loc) {
                          setFilters({ 
                            ...filters, 
                            destLat: loc.lat, 
                            destLng: loc.lng, 
                            destLabel: loc.label 
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Divider - hidden on mobile */}
              <div className="hidden md:block w-full h-px bg-gray-200" />

              {/* Date & Seats - Editable */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {filters.date && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ημερομηνία</p>
                    <div className="flex items-center gap-2 text-gray-900">
                      <CalendarIcon />
                      <span className="font-medium text-sm sm:text-base">{formatDate(filters.date)}</span>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Επιβάτες</p>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, seats: Math.max(1, filters.seats - 1) })}
                      disabled={filters.seats <= 1}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-semibold transition-all"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-1.5 px-2 sm:px-3">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-semibold text-gray-900 min-w-[16px] sm:min-w-[20px] text-center text-sm sm:text-base">{filters.seats}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, seats: Math.min(8, filters.seats + 1) })}
                      disabled={filters.seats >= 8}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-semibold transition-all"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Gender Preference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Προτίμηση</label>
                  <select
                    value={filters.genderPreference}
                    onChange={(e) => setFilters({ ...filters, genderPreference: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value={GENDER_PREFERENCE.ANY}>Όλοι</option>
                    <option value={GENDER_PREFERENCE.LADIES_ONLY}>Μόνο γυναίκες</option>
                    <option value={GENDER_PREFERENCE.MEN_ONLY}>Μόνο άνδρες</option>
                  </select>
                </div>

                {/* Time Flexibility */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ευελιξία ώρας</label>
                  <select
                    value={filters.timeFlexibility || ''}
                    onChange={(e) => setFilters({ ...filters, timeFlexibility: e.target.value ? parseInt(e.target.value) : null })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value="">Όλες</option>
                    <option value="15">±15 λεπτά</option>
                    <option value="30">±30 λεπτά</option>
                    <option value="60">±1 ώρα</option>
                  </select>
                </div>

                {/* Pickup Radius */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Απόσταση πεζής</label>
                  <select
                    value={filters.maxPickupRadius || ''}
                    onChange={(e) => setFilters({ ...filters, maxPickupRadius: e.target.value || null })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value="">Οποιαδήποτε</option>
                    <option value="250">Έως 250μ</option>
                    <option value="500">Έως 500μ</option>
                    <option value="1000">Έως 1χλμ</option>
                    <option value="2000">Έως 2χλμ</option>
                  </select>
                </div>

                {/* Instant Booking */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Κράτηση</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.instantBooking}
                      onChange={(e) => setFilters({ ...filters, instantBooking: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm text-gray-700">Άμεση επιβεβαίωση</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Μέγιστη τιμή: €{filters.maxPrice || 50}</label>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={filters.maxPrice || 50}
                  onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                  className="w-full accent-gray-900" 
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <svg className="animate-spin h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-gray-500">Αναζήτηση διαδρομών...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-500 text-lg">{error}</p>
            <Button variant="outline" className="mt-4">Δοκιμάστε ξανά</Button>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12 sm:py-20 bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <SearchIcon />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Δεν βρέθηκαν διαδρομές</h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto mb-4 sm:mb-6 px-4">
              Δοκιμάστε διαφορετικές ημερομηνίες ή τοποθεσίες. Μπορείτε επίσης να δημιουργήσετε μια νέα διαδρομή!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">Αλλαγή αναζήτησης</Button>
              </Link>
              <Link href="/main/listings/new" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">Δημιουργία διαδρομής</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-8">
            {listings.map((listing, index) => (
              <Link key={listing.$id} href={`/main/listings/detail?id=${listing.$id}`} className="block">
                <Card hover className="overflow-hidden transition-all duration-300 hover:shadow-xl my-1 sm:my-2">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                      {/* Mini Map - Hidden on mobile */}
                      <div className="hidden lg:block lg:w-48 h-32 lg:h-auto flex-shrink-0 rounded-xl overflow-hidden">
                        <RouteMiniMap 
                          origin={listing.originPin}
                          destination={listing.destinationPin}
                          height="100%"
                        />
                      </div>
                      {/* Left - Car Photo */}
                      {listing.carPhoto && (
                        <div className="w-full lg:w-64 h-48 sm:h-40 lg:h-auto flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                          <img 
                            src={listing.carPhoto} 
                            alt={`${listing.carMake} ${listing.carModel}`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      )}
                      
                      {/* Middle - Route Info */}
                      <div className="flex-1 min-w-0">
                        {/* Car Info */}
                        <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-gray-500">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          <span className="truncate">{listing.carMake} {listing.carModel}</span>
                        </div>
                        
                        {/* Badges */}
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 flex-wrap">
                          <Badge variant={listing.type === LISTING_TYPE.ONE_TIME ? 'info' : 'success'}>
                            {listing.type === LISTING_TYPE.ONE_TIME ? 'Μεμονωμένη' : 'Επαναλαμβανόμενη'}
                          </Badge>
                          {listing.type === LISTING_TYPE.RECURRING && listing.recurring?.daysOfWeek && (
                            <span className="text-xs text-gray-500">
                              {formatDaysOfWeek(listing.recurring.daysOfWeek)}
                            </span>
                          )}
                          <SeatsBadge seatsAvailable={listing.seatsAvailable} />
                          <DistanceBadge origin={listing.originPin} destination={listing.destinationPin} />
                          <PeakHoursBadge time={listing.departureTimeLocal} />
                          {listing.driverTripCount < 10 && <NewDriverBadge trips={listing.driverTripCount} />}
                          {listing.driverTripCount >= 100 && <ExperiencedDriverBadge trips={listing.driverTripCount} />}
                          {listing.genderPreference && listing.genderPreference !== GENDER_PREFERENCE.ANY && (
                            <GenderPreferenceBadge preference={listing.genderPreference} size="sm" />
                          )}
                          {listing.timeFlexibility > 0 && (
                            <TimeFlexibilityBadge minutes={listing.timeFlexibility} size="sm" />
                          )}
                          {listing.instantBooking && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              Άμεση
                            </span>
                          )}
                        </div>

                        {/* Route */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full flex-shrink-0" />
                              <span className="font-semibold text-sm sm:text-lg text-gray-900 truncate">
                                {listing.originPin?.label || listing.originPin?.address?.split(',')[0] || 'Αφετηρία'}
                              </span>
                            </div>
                            <div className="ml-[5px] sm:ml-1.5 w-0.5 h-6 sm:h-8 bg-gray-200 my-1" />
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full flex-shrink-0" />
                              <span className="font-semibold text-sm sm:text-lg text-gray-900 truncate">
                                {listing.destinationPin?.label || listing.destinationPin?.address?.split(',')[0] || 'Προορισμός'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <ClockIcon />
                            <span>
                              {listing.type === LISTING_TYPE.ONE_TIME 
                                ? formatDate(listing.oneTimeDepartureDateTime)
                                : listing.departureTimeLocal
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <UsersIcon />
                            <span>{listing.seatsAvailable} θέσεις</span>
                          </div>
                          {listing.meetingPointPin && (
                            <div className="flex items-center gap-1">
                              <LocationIcon />
                              <span className="truncate max-w-[150px] sm:max-w-[200px]">
                                {listing.meetingPointPin.label || listing.meetingPointPin.address?.split(',')[0]}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="hidden lg:block w-px h-24 bg-gray-200" />

                      {/* Right - Driver & Price */}
                      <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3 sm:gap-4 lg:w-48 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                        {/* Driver - Clickable to profile */}
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `/main/profile/${listing.driverId || 'unknown'}`;
                          }}
                          className="flex items-center gap-2 sm:gap-3 group text-left"
                        >
                          {listing.driverPhoto ? (
                            <img 
                              src={listing.driverPhoto} 
                              alt={listing.driverName}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-md group-hover:ring-2 group-hover:ring-blue-500 transition-all"
                            />
                          ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base group-hover:ring-2 group-hover:ring-blue-500 transition-all">
                              {listing.driverName?.charAt(0) || 'Ο'}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition-colors">{listing.driverName || 'Οδηγός'}</p>
                            {listing.driverRating > 0 && (
                              <div className="flex items-center gap-1">
                                <StarIcon />
                                <span className="text-xs sm:text-sm text-gray-600">{listing.driverRating.toFixed(1)}</span>
                              </div>
                            )}
                          </div>
                        </button>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{formatPrice(listing.pricePerSeat)}</p>
                          <p className="text-xs sm:text-sm text-gray-500">ανά θέση</p>
                        </div>
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

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen grain-bg flex items-center justify-center pt-20">
        <svg className="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
