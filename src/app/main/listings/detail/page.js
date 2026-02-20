'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Button, Card, Badge } from '@/components/ui';
import { getListingById, getUserPublic } from '@/lib/db';
import { RouteMap } from '@/components/maps/RouteMap';
import { formatPrice, formatDate, formatDaysOfWeek } from '@/utils/helpers';
import { LISTING_TYPE, GENDER_PREFERENCE } from '@/utils/constants';
import { GenderPreferenceBadge, TimeFlexibilityBadge, NotifyMeButton } from '@/components/listings';
import { FavoriteButton, VerificationStack, ResponseTimeBadge } from '@/components/driver';
import { GroupBooking } from '@/components/bookings';
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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

function ListingDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listingId = searchParams.get('id');
  const { user, isAuthenticated } = useAuthStore();
  
  const [listing, setListing] = useState(null);
  const [driver, setDriver] = useState(null);
  const [occurrences, setOccurrences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState([]);
  const [seats, setSeats] = useState(1);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (!listingId) return;
    
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        const listingData = await getListingById(listingId);
        if (listingData) {
          setListing(listingData);
          
          // Load driver info
          const driverData = await getUserPublic(listingData.driverId);
          setDriver(driverData);
          
          // Generate occurrences
          if (listingData.type === 'RECURRING') {
            const occs = [];
            for (let i = 0; i < 14; i++) {
              const date = new Date();
              date.setDate(date.getDate() + i);
              if (listingData.recurringDays?.includes(date.getDay())) {
                occs.push({
                  date: date.toISOString().split('T')[0],
                  seatsRemaining: listingData.seatsAvailable,
                  status: 'ACTIVE'
                });
              }
            }
            setOccurrences(occs);
          } else {
            setOccurrences([{
              date: listingData.departureDateTime?.split('T')[0],
              departureDateTime: listingData.departureDateTime,
              seatsRemaining: listingData.seatsAvailable,
              status: 'ACTIVE'
            }]);
          }
        }
      } catch (error) {
        console.error('Error loading listing:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [listingId]);

  const handleDateToggle = (date) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter(d => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleBook = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    if (listing.type === LISTING_TYPE.RECURRING && selectedDates.length === 0) {
      alert('Παρακαλώ επιλέξτε τουλάχιστον μία ημερομηνία');
      return;
    }
    
    const bookingDates = listing.type === LISTING_TYPE.ONE_TIME 
      ? [listing.departureDateTime?.split('T')[0]]
      : selectedDates;
    
    // Redirect to booking confirmation page
    const params = new URLSearchParams({
      listingId: listing.id,
      dates: bookingDates.join(','),
      seats: seats.toString()
    });
    
    router.push(`/main/bookings/new?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grain-bg flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500">Φόρτωση διαδρομής...</p>
        </div>
      </div>
    );
  }

  if (!listing || !driver) {
    return (
      <div className="min-h-screen grain-bg pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Η διαδρομή δεν βρέθηκε</h2>
          <p className="text-gray-500 mb-6">Η διαδρομή που αναζητάτε δεν υπάρχει ή έχει αφαιρεθεί.</p>
          <Link href="/main/search">
            <Button>Επιστροφή στην αναζήτηση</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = listing.pricePerSeat * seats * (selectedDates.length || 1);

  return (
    <div className="min-h-screen grain-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Επιστροφή
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Route Card */}
            <Card>
              <div className="p-6">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <Badge variant={listing.type === LISTING_TYPE.ONE_TIME ? 'info' : 'success'}>
                    {listing.type === LISTING_TYPE.ONE_TIME ? 'Μεμονωμένη' : 'Επαναλαμβανόμενη'}
                  </Badge>
                  {listing.type === LISTING_TYPE.RECURRING && (
                    <span className="text-sm text-gray-500">
                      {formatDaysOfWeek(listing.recurringDays)}
                    </span>
                  )}
                  {listing.genderPreference && listing.genderPreference !== GENDER_PREFERENCE.ANY && (
                    <GenderPreferenceBadge preference={listing.genderPreference} showTooltip />
                  )}
                  {listing.timeFlexibility > 0 && (
                    <TimeFlexibilityBadge minutes={listing.timeFlexibility} />
                  )}
                  {listing.instantBooking && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Άμεση κράτηση
                    </span>
                  )}

                </div>

                {/* Route Visualization */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                    <div className="w-0.5 h-16 bg-gray-200 my-1" />
                    <div className="w-4 h-4 bg-blue-500 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Αναχώρηση</p>
                      <h3 className="text-xl font-bold text-gray-900">{listing.origin.label}</h3>
                      <p className="text-sm text-gray-500">{listing.origin.address}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Προορισμός</p>
                      <h3 className="text-xl font-bold text-gray-900">{listing.destination.label}</h3>
                      <p className="text-sm text-gray-500">{listing.destination.address}</p>
                    </div>
                  </div>
                </div>

                {/* Time & Price */}
                <div className="flex items-center gap-6 pt-6 border-t border-gray-100 flex-wrap">
                  <div className="flex items-center gap-2">
                    <CalendarIcon />
                    <span className="text-gray-700">
                      {listing.type === LISTING_TYPE.ONE_TIME 
                        ? formatDate(listing.departureDateTime)
                        : listing.departureTime
                      }
                    </span>
                    {listing.timeFlexibility > 0 && (
                      <span className="text-sm text-green-600">
                        (±{listing.timeFlexibility} λεπτά)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon />
                    <span className="text-gray-700">{listing.seatsAvailable} θέσεις</span>
                  </div>
                  {listing.pickupRadius && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Έως {listing.pickupRadius < 1000 ? `${listing.pickupRadius}μ` : `${listing.pickupRadius / 1000}χλμ`} πεζή</span>
                    </div>
                  )}
                  <div className="ml-auto">
                    <span className="text-3xl font-bold text-gray-900">{formatPrice(listing.pricePerSeat)}</span>
                    <span className="text-gray-500 text-sm"> / θέση</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Driver Card */}
            <Card>
              <div className="p-6">
                <Link href={`/main/profile/${listing.driverId || driver.id}`} className="flex items-center gap-4 mb-6 group">
                  {driver.photo ? (
                    <img 
                      src={driver.photo} 
                      alt={driver.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-lg group-hover:ring-2 group-hover:ring-blue-500 transition-all"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:ring-2 group-hover:ring-blue-500 transition-all">
                      {driver.initials}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{driver.name}</h3>
                      <ShieldCheckIcon />
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <StarIcon />
                      <span className="font-semibold">{driver.rating}</span>
                      <span className="text-gray-500">({driver.reviews} κριτικές)</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{driver.trips} διαδρομές • Μέλος από {new Date(driver.joinedDate).getFullYear()}</p>
                  </div>
                  <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-gray-700 italic">"{driver.bio}"</p>
                </div>

                <div className="flex items-center gap-3">
                  <CarIcon />
                  <span className="text-gray-700">{driver.car.make} {driver.car.model} • {driver.car.color} • {driver.car.seats} θέσεις • {driver.car.year}</span>
                </div>
              </div>
            </Card>

            {/* Car Gallery */}
            {driver.car.gallery && driver.car.gallery.length > 0 && (
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CarIcon />
                    Gallery Αυτοκινήτου
                  </h3>
                  
                  {/* Main Image */}
                  <div className="relative mb-4 rounded-xl overflow-hidden bg-gray-100 aspect-video">
                    <img 
                      src={driver.car.gallery[selectedGalleryIndex]} 
                      alt={`${driver.car.make} ${driver.car.model}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedGalleryIndex + 1} / {driver.car.gallery.length}
                    </div>
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="grid grid-cols-4 gap-2">
                    {driver.car.gallery.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedGalleryIndex(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                          selectedGalleryIndex === index 
                            ? 'ring-2 ring-gray-900 ring-offset-2' 
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={photo} 
                          alt={`Φωτογραφία ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Meeting Point */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <LocationIcon />
                  Σημείο συνάντησης
                </h3>
                <p className="text-gray-700">{listing.meetingPoint.label}</p>
                <p className="text-sm text-gray-500 mb-4">{listing.meetingPoint.address}</p>
                
                {/* Map */}
                {listing.meetingPoint.lat && listing.meetingPoint.lng && (
                  <div className="rounded-xl overflow-hidden border border-gray-200">
                    <RouteMap 
                      meetingPoint={listing.meetingPoint}
                      origin={listing.origin}
                      destination={listing.destination}
                      height="250px"
                    />
                  </div>
                )}
                
                {listing.exactAddressFee > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">Διαθέσιμη παραλαβή από την πόρτα:</span> +{formatPrice(listing.exactAddressFee)}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Date Selection for Recurring */}
            {listing.type === LISTING_TYPE.RECURRING && occurrences.length > 0 && (
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CalendarIcon />
                    Επιλέξτε ημερομηνίες
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {occurrences.map((occ) => (
                      <button
                        key={occ.date}
                        onClick={() => handleDateToggle(occ.date)}
                        disabled={occ.seatsRemaining < seats}
                        className={`
                          p-3 rounded-xl border text-left transition-all
                          ${selectedDates.includes(occ.date)
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white border-gray-200 hover:border-gray-400'
                          }
                          ${occ.seatsRemaining < seats ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                      >
                        <div className="font-medium">{formatDate(occ.date, 'EEE d/MM')}</div>
                        <div className="text-sm opacity-70">{occ.seatsRemaining} θέσεις</div>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Group Booking */}
              <GroupBooking
                maxSeats={listing.seatsAvailable}
                pricePerSeat={listing.pricePerSeat}
                onBook={(seats, emails) => console.log('Book:', seats, emails)}
              />

              <Card className="shadow-xl">
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Κράτηση</h3>
                    <FavoriteButton driverId={listing.driverId} />
                  </div>

                  {/* Seats Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Θέσεις</label>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setSeats(Math.max(1, seats - 1))}
                        className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold w-8 text-center">{seats}</span>
                      <button 
                        onClick={() => setSeats(Math.min(listing.seatsAvailable, seats + 1))}
                        className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-gray-600">
                      <span>{formatPrice(listing.pricePerSeat)} × {seats} {seats === 1 ? 'θέση' : 'θέσεις'}</span>
                      <span>{formatPrice(listing.pricePerSeat * seats)}</span>
                    </div>
                    {selectedDates.length > 1 && (
                      <div className="flex justify-between text-gray-600">
                        <span>× {selectedDates.length} ημέρες</span>
                        <span></span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>Χρέωση πλατφόρμας (10%)</span>
                      <span>Συμπεριλαμβάνεται</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-100">
                      <span>Σύνολο</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={(listing.type === LISTING_TYPE.RECURRING && selectedDates.length === 0) || isBooking}
                    loading={isBooking}
                    onClick={handleBook}
                  >
                    {isAuthenticated ? 'Κράτηση τώρα' : 'Σύνδεση για κράτηση'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Ασφαλής πληρωμή μέσω Stripe. Ακύρωση δωρεάν έως 24h πριν.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ListingDetailPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen grain-bg flex items-center justify-center pt-20">
          <svg className="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      }>
        <ListingDetail />
      </Suspense>
    </>
  );
}
