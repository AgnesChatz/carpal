'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button, Card } from '@/components/ui';
import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { ID } from 'appwrite';
import { formatPrice } from '@/utils/helpers';
import { getListingById, createBooking } from '@/lib/db';
import useAuthStore from '@/store/authStore';

function NewBooking() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  
  const listingId = searchParams.get('listingId');
  const datesParam = searchParams.get('dates');
  const seatsParam = searchParams.get('seats');
  
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [pickupType, setPickupType] = useState('MEETING_POINT');
  const [exactAddress, setExactAddress] = useState('');

  const selectedDates = datesParam ? datesParam.split(',') : [];
  const seats = parseInt(seatsParam) || 1;

  useEffect(() => {
    if (!listingId) return;
    
    const fetchListing = async () => {
      setIsLoading(true);
      
      try {
        const result = await getListingById(listingId);
        setListing(result);
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchListing();
  }, [listingId]);

  // Calculate price breakdown
  const calculatePrice = () => {
    if (!listing) return null;
    const subtotal = listing.pricePerSeat * seats * selectedDates.length;
    const platformFee = subtotal * 0.10;
    const total = subtotal + platformFee;
    return { subtotal, platformFee, total };
  };

  const priceBreakdown = calculatePrice();

  const handleCreateBooking = async () => {
    setIsCreating(true);
    
    try {
      const totalAmount = priceBreakdown.total + (pickupType === 'EXACT_ADDRESS' ? (listing.exactAddressFee || 0) : 0);
      
      // Create booking (mock or real)
      const booking = await createBooking({
        listingId: listing.id || listing.$id,
        driverId: listing.driverId,
        riderId: user?.$id || user?.id || 'guest',
        dates: selectedDates,
        seats,
        totalAmount,
        pickupType,
        exactAddress: pickupType === 'EXACT_ADDRESS' ? exactAddress : null,
        status: 'PENDING_PAYMENT'
      });

      // Skip Stripe for now - mark as confirmed directly
      // TODO: Re-enable Stripe when ready
      // const response = await fetch('/api/create-checkout-session', {...})
      
      // Mark booking as confirmed
      const { updateBooking } = await import('@/lib/db');
      await updateBooking(booking.id, { status: 'CONFIRMED' });
      
      // Redirect to success
      router.push('/main/bookings?success=true');
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('Σφάλμα κατά την κράτηση. Παρακαλώ δοκιμάστε ξανά.');
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grain-bg flex items-center justify-center pt-20">
        <svg className="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen grain-bg pt-20 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <p className="text-gray-500">Η διαδρομή δεν βρέθηκε</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grain-bg pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ολοκλήρωση κράτησης</h1>
        <p className="text-gray-600 mb-8">Επιβεβαιώστε τα στοιχεία της κράτησής σας</p>

        <Card>
          <div className="p-6 space-y-6">
            {/* Trip Summary */}
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {listing.origin?.label || listing.originPin?.label} → {listing.destination?.label || listing.destinationPin?.label}
              </h3>
              <div className="text-gray-600 space-y-1">
                <p>{selectedDates.length} {selectedDates.length === 1 ? 'ημέρα' : 'ημέρες'}</p>
                <p>{seats} {seats === 1 ? 'θέση' : 'θέσεις'}</p>
              </div>
            </div>

            {/* Pickup Options */}
            <div>
              <label className="block font-medium text-gray-900 mb-3">Τρόπος παραλαβής</label>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  pickupType === 'MEETING_POINT' 
                    ? 'bg-gray-900 text-white border-gray-900' 
                    : 'bg-white border-gray-200 hover:border-gray-400 text-gray-700'
                }`}>
                  <input
                    type="radio"
                    name="pickup"
                    value="MEETING_POINT"
                    checked={pickupType === 'MEETING_POINT'}
                    onChange={(e) => setPickupType(e.target.value)}
                    className="sr-only"
                  />
                  <div>
                    <div className="font-medium">Σημείο συνάντησης</div>
                    <div className="text-sm opacity-70">{listing.meetingPoint?.label || listing.meetingPointPin?.label}</div>
                  </div>
                </label>

                {(listing.exactAddressFee > 0 || listing.exactAddressAvailable) && (
                  <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                    pickupType === 'EXACT_ADDRESS' 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'bg-white border-gray-200 hover:border-gray-400 text-gray-700'
                  }`}>
                    <input
                      type="radio"
                      name="pickup"
                      value="EXACT_ADDRESS"
                      checked={pickupType === 'EXACT_ADDRESS'}
                      onChange={(e) => setPickupType(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Παραλαβή από την πόρτα</div>
                      <div className="text-sm opacity-70">+{formatPrice(listing.exactAddressFee)}</div>
                      {pickupType === 'EXACT_ADDRESS' && (
                        <input
                          type="text"
                          value={exactAddress}
                          onChange={(e) => setExactAddress(e.target.value)}
                          placeholder="Διεύθυνση παραλαβής"
                          className="mt-2 w-full px-3 py-2 bg-gray-100 text-gray-900 rounded border border-gray-200"
                          required
                        />
                      )}
                    </div>
                  </label>
                )}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Υποσύνολο</span>
                <span>{formatPrice(priceBreakdown.subtotal)}</span>
              </div>
              {pickupType === 'EXACT_ADDRESS' && listing.exactAddressFee > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Παραλαβή από πόρτα</span>
                  <span>{formatPrice(listing.exactAddressFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Χρέωση πλατφόρμας</span>
                <span>Συμπεριλαμβάνεται</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                <span>Σύνολο</span>
                <span>{formatPrice(priceBreakdown.total + (pickupType === 'EXACT_ADDRESS' ? listing.exactAddressFee : 0))}</span>
              </div>
            </div>

            {/* Submit */}
            <Button
              size="lg"
              className="w-full"
              loading={isCreating}
              disabled={pickupType === 'EXACT_ADDRESS' && !exactAddress}
              onClick={handleCreateBooking}
            >
              Προχωρήστε στην πληρωμή
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Θα μεταφερθείτε σε ασφαλή σελίδα πληρωμής της Stripe
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function NewBookingPage() {
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
        <NewBooking />
      </Suspense>
    </>
  );
}
