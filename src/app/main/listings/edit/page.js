'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button, Card, Badge } from '@/components/ui';
import { MapAddressPicker } from '@/components/maps';
import { updateListing } from '@/lib/db';
import useAuthStore from '@/store/authStore';

// Icons
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const PriceIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DAYS = [
  { id: 0, label: 'Κυρ', full: 'Κυριακή' },
  { id: 1, label: 'Δευ', full: 'Δευτέρα' },
  { id: 2, label: 'Τρι', full: 'Τρίτη' },
  { id: 3, label: 'Τετ', full: 'Τετάρτη' },
  { id: 4, label: 'Πεμ', full: 'Πέμπτη' },
  { id: 5, label: 'Παρ', full: 'Παρασκευή' },
  { id: 6, label: 'Σαβ', full: 'Σάββατο' },
];

function EditListingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listingId = searchParams.get('id');
  const { user } = useAuthStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    origin: null,
    destination: null,
    meetingPoint: null,
    departureTime: '08:00',
    recurringDays: [1, 2, 3, 4, 5],
    seatsAvailable: 3,
    pricePerSeat: 2.50,
    exactAddressFee: 0,
    exactAddressAvailable: false,
    status: 'ACTIVE'
  });

  useEffect(() => {
    // In real app, fetch listing data
    // For now, simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [listingId]);

  const handleDayToggle = (dayId) => {
    setFormData(prev => ({
      ...prev,
      recurringDays: prev.recurringDays.includes(dayId)
        ? prev.recurringDays.filter(d => d !== dayId)
        : [...prev.recurringDays, dayId].sort()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updateListing(listingId, formData);
      router.push('/main/listings');
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Σφάλμα κατά την αποθήκευση');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grain-bg pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500">Φόρτωση...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Επεξεργασία διαδρομής</h1>
            <p className="text-gray-500">Ενημερώστε τα στοιχεία της διαδρομής σας</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Route */}
          <Card>
            <div className="p-6 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Διαδρομή
              </h3>
              
              <MapAddressPicker
                label="Από"
                placeholder="π.χ. Καλαμαριά"
                value={formData.origin?.label || ''}
                onLocationSelect={(loc) => setFormData(prev => ({ ...prev, origin: loc }))}
                required
              />
              
              <MapAddressPicker
                label="Προς"
                placeholder="π.χ. Εύοσμος"
                value={formData.destination?.label || ''}
                onLocationSelect={(loc) => setFormData(prev => ({ ...prev, destination: loc }))}
                required
              />
              
              <MapAddressPicker
                label="Σημείο συνάντησης"
                placeholder="π.χ. Μετρό Καλαμαριάς"
                value={formData.meetingPoint?.label || ''}
                onLocationSelect={(loc) => setFormData(prev => ({ ...prev, meetingPoint: loc }))}
                required
              />
            </div>
          </Card>

          {/* Schedule */}
          <Card>
            <div className="p-6 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CalendarIcon />
                Πρόγραμμα
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ημέρες διαδρομής
                </label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((day) => (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => handleDayToggle(day.id)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        formData.recurringDays.includes(day.id)
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ώρα αναχώρησης
                </label>
                <div className="relative">
                  <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={formData.departureTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, departureTime: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Capacity & Price */}
          <Card>
            <div className="p-6 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <UsersIcon />
                Χωρητικότητα & Τιμή
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Διαθέσιμες θέσεις
                  </label>
                  <select
                    value={formData.seatsAvailable}
                    onChange={(e) => setFormData(prev => ({ ...prev, seatsAvailable: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'θέση' : 'θέσεις'}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Τιμή ανά θέση (€)
                  </label>
                  <div className="relative">
                    <PriceIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      min="0.50"
                      step="0.50"
                      value={formData.pricePerSeat}
                      onChange={(e) => setFormData(prev => ({ ...prev, pricePerSeat: parseFloat(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Door pickup option */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-medium text-gray-900">Παραλαβή από πόρτα</h4>
                  <p className="text-sm text-gray-500">Επιπλέον χρέωση για παραλαβή από την διεύθυνση του επιβάτη</p>
                </div>
                <div className="flex items-center gap-3">
                  {formData.exactAddressAvailable && (
                    <input
                      type="number"
                      min="0"
                      step="0.50"
                      value={formData.exactAddressFee}
                      onChange={(e) => setFormData(prev => ({ ...prev, exactAddressFee: parseFloat(e.target.value) }))}
                      placeholder="€"
                      className="w-20 px-2 py-1 border border-gray-200 rounded-lg text-right"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      exactAddressAvailable: !prev.exactAddressAvailable,
                      exactAddressFee: !prev.exactAddressAvailable ? 2.00 : 0
                    }))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      formData.exactAddressAvailable ? 'bg-gray-900' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      formData.exactAddressAvailable ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Status */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Κατάσταση</h3>
              <div className="flex gap-4">
                <label className="flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-50">
                  <input
                    type="radio"
                    name="status"
                    value="ACTIVE"
                    checked={formData.status === 'ACTIVE'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.status === 'ACTIVE' ? 'border-green-500' : 'border-gray-300'
                  }`}>
                    {formData.status === 'ACTIVE' && <div className="w-3 h-3 bg-green-500 rounded-full" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Ενεργή</p>
                    <p className="text-sm text-gray-500">Ορατή σε αναζητήσεις</p>
                  </div>
                </label>
                
                <label className="flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-50">
                  <input
                    type="radio"
                    name="status"
                    value="PAUSED"
                    checked={formData.status === 'PAUSED'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.status === 'PAUSED' ? 'border-amber-500' : 'border-gray-300'
                  }`}>
                    {formData.status === 'PAUSED' && <div className="w-3 h-3 bg-amber-500 rounded-full" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Παύση</p>
                    <p className="text-sm text-gray-500">Προσωρινά κρυφή</p>
                  </div>
                </label>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              Ακύρωση
            </Button>
            <Button
              type="submit"
              className="flex-1"
              loading={isSaving}
            >
              Αποθήκευση αλλαγών
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditListingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen grain-bg pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500">Φόρτωση...</p>
        </div>
      </div>
    }>
      <EditListingContent />
    </Suspense>
  );
}
