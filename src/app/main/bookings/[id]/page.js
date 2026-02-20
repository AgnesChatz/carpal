'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button, Card, Badge } from '@/components/ui';
import { formatPrice, formatDate } from '@/utils/helpers';
import { getBookingById, updateBooking } from '@/lib/db';
import useAuthStore from '@/store/authStore';
import { TripStatusTracker, TripShare, CopyTripDetails, PassengerPreferences, TripReminder, QuickRebook, AlmostThereIndicator } from '@/components/bookings';

// Icons
const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const MessageIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const getStatusConfig = (status) => {
  const configs = {
    'CONFIRMED': { variant: 'success', label: 'Επιβεβαιωμένη', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' },
    'PAID': { variant: 'success', label: 'Πληρωμένη', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' },
    'PENDING': { variant: 'warning', label: 'Εκκρεμεί', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
    'PENDING_PAYMENT': { variant: 'warning', label: 'Αναμονή πληρωμής', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
    'COMPLETED': { variant: 'primary', label: 'Ολοκληρώθηκε', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
    'CANCELLED': { variant: 'danger', label: 'Ακυρώθηκε', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800' }
  };
  return configs[status] || { variant: 'default', label: status, bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-800' };
};

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const bookingId = params.id;
  
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  
  // Review state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const loadBooking = async () => {
      setIsLoading(true);
      
      try {
        const found = await getBookingById(bookingId);
        setBooking(found);
      } catch (error) {
        console.error('Error loading booking:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBooking();
  }, [bookingId]);

  const handleCancel = async () => {
    setIsCancelling(true);
    
    try {
      const updated = await updateBooking(bookingId, { 
        status: 'CANCELLED', 
        cancelledAt: new Date().toISOString(),
        tripStatus: 'CANCELLED'
      });
      setBooking(updated);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Σφάλμα κατά την ακύρωση');
    } finally {
      setIsCancelling(false);
      setShowCancelModal(false);
    }
  };

  const handleTripStatusChange = async (newStatus) => {
    try {
      const updated = await updateBooking(bookingId, {
        tripStatus: newStatus,
        tripUpdates: [
          ...(booking.tripUpdates || []),
          {
            status: newStatus,
            timestamp: new Date().toISOString(),
            message: getTripStatusMessage(newStatus)
          }
        ]
      });
      setBooking(updated);
    } catch (error) {
      console.error('Error updating trip status:', error);
    }
  };

  const getTripStatusMessage = (status) => {
    const messages = {
      'DRIVER_ASSIGNED': 'Ο οδηγός είναι στο δρόμο',
      'DRIVER_ARRIVING': 'Ο οδηγός φτάνει σε 5 λεπτά',
      'DRIVER_ARRIVED': 'Ο οδηγός έφτασε στο σημείο',
      'PASSENGER_PICKED_UP': 'Ο επιβάτης επιβιβάστηκε',
      'IN_PROGRESS': 'Η διαδρομή ξεκίνησε',
      'ARRIVED': 'Φτάσαμε στον προορισμό',
      'COMPLETED': 'Η διαδρομή ολοκληρώθηκε'
    };
    return messages[status] || status;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grain-bg pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500">Φόρτωση κράτησης...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen grain-bg pt-20">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CalendarIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Η κράτηση δεν βρέθηκε</h1>
          <p className="text-gray-500 mb-6">Η κράτηση που αναζητάτε δεν υπάρχει.</p>
          <Link href="/main/bookings">
            <Button>Επιστροφή στις κρατήσεις</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(booking.status);
  const canCancel = ['CONFIRMED', 'PAID', 'PENDING'].includes(booking.status);
  const isPast = ['COMPLETED', 'CANCELLED'].includes(booking.status);
  const canReview = booking.status === 'COMPLETED' && !hasReviewed;
  const showTripTracker = ['CONFIRMED', 'PAID', 'DRIVER_ASSIGNED', 'DRIVER_ARRIVING', 'DRIVER_ARRIVED', 'IN_PROGRESS', 'ARRIVED'].includes(booking.tripStatus || booking.status);

  const handleSubmitReview = async () => {
    setIsSubmittingReview(true);
    await mockDelay(800);
    
    // In real app, save to database
    console.log('Review submitted:', { rating: reviewRating, comment: reviewComment });
    
    setHasReviewed(true);
    setIsSubmittingReview(false);
    setShowReviewModal(false);
  };

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Πίσω</span>
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Λεπτομέρειες κράτησης</h1>
            <p className="text-gray-500 mt-1">Κωδικός: #{booking.id}</p>
          </div>
          <Badge variant={statusConfig.variant} className="self-start sm:self-auto text-sm px-4 py-2">
            {statusConfig.label}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Almost There Indicator */}
            {booking.tripStatus === 'DRIVER_ARRIVING' && (
              <AlmostThereIndicator estimatedArrivalMinutes={3} />
            )}

            {/* Trip Status Tracker */}
            {showTripTracker && (
              <Card>
                <div className="p-6">
                  <TripStatusTracker
                    status={booking.tripStatus || 'SCHEDULED'}
                    updates={booking.tripUpdates || []}
                    isDriver={false}
                    onStatusChange={handleTripStatusChange}
                    driverPhone={booking.driver?.phone}
                    showActions={true}
                  />
                </div>
              </Card>
            )}

            {/* Trip Reminder */}
            <TripReminder
              booking={booking}
              date={booking.dates?.[0]}
              time={booking.listing?.departureTime}
            />

            {/* Quick Rebook */}
            {booking.status === 'COMPLETED' && (
              <QuickRebook booking={booking} />
            )}

            {/* Passenger Preferences */}
            <PassengerPreferences
              preferences={['quiet', 'ac']}
              onChange={(prefs) => console.log('Preferences:', prefs)}
              readOnly={false}
            />

            {/* Trip Details */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CarIcon />
                  Λεπτομέρειες διαδρομής
                </h3>
                
                {/* Route */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                    <div className="w-0.5 h-16 bg-gray-200 my-1" />
                    <div className="w-4 h-4 bg-blue-500 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Αναχώρηση</p>
                      <h4 className="font-semibold text-gray-900">{booking.listing?.origin?.label}</h4>
                      <p className="text-sm text-gray-500">{booking.listing?.origin?.address}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Προορισμός</p>
                      <h4 className="font-semibold text-gray-900">{booking.listing?.destination?.label}</h4>
                      <p className="text-sm text-gray-500">{booking.listing?.destination?.address}</p>
                    </div>
                  </div>
                </div>

                {/* Meeting Point */}
                <div className="p-4 bg-gray-50 rounded-xl mb-4">
                  <p className="text-sm text-gray-500 mb-1">Σημείο συνάντησης</p>
                  <p className="font-medium text-gray-900">{booking.listing?.meetingPoint?.label}</p>
                  <p className="text-sm text-gray-500">{booking.listing?.meetingPoint?.address}</p>
                </div>

                {/* Dates */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500 mb-2">Ημερομηνίες</p>
                  <div className="flex flex-wrap gap-2">
                    {booking.dates?.map((date, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-700">
                        {formatDate(date)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Trip Share */}
            {showTripTracker && (
              <TripShare
                booking={booking}
                driver={booking.driver}
                origin={booking.listing?.origin}
                destination={booking.listing?.destination}
                date={booking.dates?.[0]}
                time={booking.listing?.departureTime}
              />
            )}

            {/* Driver Info */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Οδηγός</h3>
                <div className="flex items-center gap-4">
                  {booking.driver?.photo ? (
                    <img 
                      src={booking.driver.photo} 
                      alt={booking.driver.name}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                      {booking.driver?.initials}
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{booking.driver?.name}</h4>
                    <p className="text-sm text-gray-500">{booking.driver?.car?.make} {booking.driver?.car?.model} • {booking.driver?.car?.color}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium">{booking.driver?.rating}</span>
                      <span className="text-sm text-gray-400">({booking.driver?.reviews} κριτικές)</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href={`/main/messages?user=${booking.driver?.id}`}>
                      <Button variant="outline" size="sm">
                        <MessageIcon />
                        <span className="ml-2">Μήνυμα</span>
                      </Button>
                    </Link>
                    <CopyTripDetails 
                      booking={booking}
                      driver={booking.driver}
                      origin={booking.listing?.origin}
                      destination={booking.listing?.destination}
                      date={booking.dates?.[0]}
                      time={booking.listing?.departureTime}
                      meetingPoint={booking.listing?.meetingPoint}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Σύνοψη χρέωσης</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Θέσεις × {booking.seatsBooked}</span>
                    <span>{formatPrice(booking.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Χρέωση πλατφόρμας</span>
                    <span>Συμπεριλαμβάνεται</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Σύνολο</span>
                      <span>{formatPrice(booking.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            {canCancel && (
              <Card>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Ενέργειες</h3>
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => setShowCancelModal(true)}
                  >
                    Ακύρωση κράτησης
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Δωρεάν ακύρωση έως 24h πριν
                  </p>
                </div>
              </Card>
            )}

            {/* Review Action */}
            {canReview && (
              <Card>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Πώς ήταν η διαδρομή;</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Βαθμολογήστε τον οδηγό και βοηθήστε άλλους επιβάτες.
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => setShowReviewModal(true)}
                  >
                    Γράψτε κριτική
                  </Button>
                </div>
              </Card>
            )}

            {/* Help */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-2">Χρειάζεστε βοήθεια;</h4>
              <p className="text-sm text-gray-600 mb-4">
                Επικοινωνήστε μαζί μας για οποιοδήποτε θέμα με την κράτησή σας.
              </p>
              <a 
                href="mailto:support@carpal.gr" 
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                support@carpal.gr
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ακύρωση κράτησης</h3>
            <p className="text-gray-600 mb-6">
              Είστε σίγουροι ότι θέλετε να ακυρώσετε αυτή την κράτηση; 
              Η επιστροφή χρημάτων θα γίνει εντός 5-10 εργάσιμων ημερών.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowCancelModal(false)}
                disabled={isCancelling}
              >
                Όχι, διατήρηση
              </Button>
              <Button 
                variant="danger" 
                className="flex-1"
                onClick={handleCancel}
                loading={isCancelling}
              >
                Ναι, ακύρωση
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Κριτική για τον οδηγό</h3>
            <p className="text-gray-600 mb-6">
              Πώς ήταν η εμπειρία σας με {booking.driver?.name};
            </p>
            
            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setReviewRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <svg 
                    className={`w-10 h-10 ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-200'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            
            {/* Comment */}
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Περιγράψτε την εμπειρία σας (προαιρετικό)"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
              rows={4}
            />
            
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowReviewModal(false)}
                disabled={isSubmittingReview}
              >
                Ακύρωση
              </Button>
              <Button 
                className="flex-1"
                onClick={handleSubmitReview}
                loading={isSubmittingReview}
                disabled={!reviewRating}
              >
                Υποβολή
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
