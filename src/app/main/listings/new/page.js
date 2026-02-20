'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button, Input, Card, CardContent } from '@/components/ui';
import { MapAddressPicker } from '@/components/maps';
import { mockDelay, mockListings } from '@/lib/mockData';
import { LISTING_TYPE, GENDER_PREFERENCE, TIME_FLEXIBILITY } from '@/utils/constants';
import { GenderPreferenceSelector, TimeFlexibilitySelector } from '@/components/listings';
import useAuthStore from '@/store/authStore';

// Icons
const CalendarIcon = () => (
  <svg width="32" height="32" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="32" height="32" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function CreateListingPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    type: LISTING_TYPE.ONE_TIME,
    originPin: null,
    destinationPin: null,
    meetingPointPin: null,
    departureTimeLocal: '08:00',
    oneTimeDepartureDateTime: '',
    recurring: {
      daysOfWeek: [],
      startDate: '',
      endDate: ''
    },
    seatsAvailable: 3,
    pricePerSeat: 2.50,
    exactAddressAvailable: false,
    exactAddressFee: 0,
    genderPreference: GENDER_PREFERENCE.ANY,
    timeFlexibility: TIME_FLEXIBILITY.NONE,
    pickupRadius: 500,
    instantBooking: true
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await mockDelay(800);
      
      // Create mock listing
      const newListing = {
        id: 'listing-' + Date.now(),
        driverId: user?.$id || user?.id,
        ...formData,
        status: 'ACTIVE',
        createdAt: new Date().toISOString()
      };
      
      mockListings.push(newListing);
      
      router.push('/main/search');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const toggleDay = (day) => {
    const days = formData.recurring.daysOfWeek;
    if (days.includes(day)) {
      setFormData({
        ...formData,
        recurring: {
          ...formData.recurring,
          daysOfWeek: days.filter(d => d !== day)
        }
      });
    } else {
      setFormData({
        ...formData,
        recurring: {
          ...formData.recurring,
          daysOfWeek: [...days, day].sort()
        }
      });
    }
  };

  const daysOfWeek = [
    { value: 1, label: 'Δευ' },
    { value: 2, label: 'Τρι' },
    { value: 3, label: 'Τετ' },
    { value: 4, label: 'Πεμ' },
    { value: 5, label: 'Παρ' },
    { value: 6, label: 'Σαβ' },
    { value: 0, label: 'Κυρ' }
  ];

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Δημιουργία διαδρομής</h1>
        <p className="text-gray-600 mb-8">Μοιραστείτε το ταξίδι σας και εξοικονομήστε χρήματα</p>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors
                ${step >= s ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'}
              `}>
                {step > s ? <CheckIcon /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 rounded-full transition-colors ${step > s ? 'bg-gray-900' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            {error}
          </div>
        )}

        <Card className="shadow-xl">
          <CardContent>
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-900">Τύπος διαδρομής</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, type: LISTING_TYPE.ONE_TIME })}
                    className={`
                      p-6 rounded-xl border-2 text-left transition-all
                      ${formData.type === LISTING_TYPE.ONE_TIME
                        ? 'bg-blue-50 border-blue-500 text-blue-900'
                        : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                      }
                    `}
                  >
                    <div className={`mb-3 ${formData.type === LISTING_TYPE.ONE_TIME ? 'text-blue-600' : 'text-gray-500'}`}>
                      <CalendarIcon />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Μεμονωμένη</h3>
                    <p className={`text-sm ${formData.type === LISTING_TYPE.ONE_TIME ? 'text-blue-700' : 'text-gray-500'}`}>Μία συγκεκριμένη ημερομηνία</p>
                  </button>
                  
                  <button
                    onClick={() => setFormData({ ...formData, type: LISTING_TYPE.RECURRING })}
                    className={`
                      p-6 rounded-xl border-2 text-left transition-all
                      ${formData.type === LISTING_TYPE.RECURRING
                        ? 'bg-green-50 border-green-500 text-green-900'
                        : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                      }
                    `}
                  >
                    <div className={`mb-3 ${formData.type === LISTING_TYPE.RECURRING ? 'text-green-600' : 'text-gray-500'}`}>
                      <RefreshIcon />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Επαναλαμβανόμενη</h3>
                    <p className={`text-sm ${formData.type === LISTING_TYPE.RECURRING ? 'text-green-700' : 'text-gray-500'}`}>Τακτική διαδρομή (π.χ. για δουλειά)</p>
                  </button>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setStep(2)}>Συνέχεια</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-900">Λεπτομέρειες διαδρομής</h2>
                
                <div className="space-y-4">
                  <MapAddressPicker
                    label="Αφετηρία"
                    placeholder="π.χ. Ολυμπιάδος 59, Εύοσμος"
                    onLocationSelect={(loc) => setFormData({ ...formData, originPin: loc })}
                    required
                  />
                  
                  <MapAddressPicker
                    label="Προορισμός"
                    placeholder="π.χ. Ολυμπιάδος 59, Εύοσμος"
                    onLocationSelect={(loc) => setFormData({ ...formData, destinationPin: loc })}
                    required
                  />

                  <MapAddressPicker
                    label="Σημείο συνάντησης"
                    placeholder="π.χ. Μετρό Καλαμαριάς"
                    onLocationSelect={(loc) => setFormData({ ...formData, meetingPointPin: loc })}
                    required
                  />
                </div>

                {formData.type === LISTING_TYPE.ONE_TIME ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      type="date"
                      label="Ημερομηνία"
                      value={formData.oneTimeDepartureDateTime.split('T')[0] || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        oneTimeDepartureDateTime: e.target.value + 'T' + formData.departureTimeLocal
                      })}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                    <Input
                      type="time"
                      label="Ώρα αναχώρησης"
                      value={formData.departureTimeLocal}
                      onChange={(e) => setFormData({ ...formData, departureTimeLocal: e.target.value })}
                      required
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ημέρες εβδομάδας
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {daysOfWeek.map((day) => (
                          <button
                            key={day.value}
                            onClick={() => toggleDay(day.value)}
                            className={`
                              px-4 py-2 rounded-lg border transition-all font-medium
                              ${formData.recurring.daysOfWeek.includes(day.value)
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white border-gray-200 hover:border-gray-400 text-gray-700'
                              }
                            `}
                          >
                            {day.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-4">
                      <Input
                        type="time"
                        label="Ώρα αναχώρησης"
                        value={formData.departureTimeLocal}
                        onChange={(e) => setFormData({ ...formData, departureTimeLocal: e.target.value })}
                        required
                      />
                      <Input
                        type="date"
                        label="Από"
                        value={formData.recurring.startDate}
                        onChange={(e) => setFormData({
                          ...formData,
                          recurring: { ...formData.recurring, startDate: e.target.value }
                        })}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                      <Input
                        type="date"
                        label="Έως (προαιρετικά)"
                        value={formData.recurring.endDate}
                        onChange={(e) => setFormData({
                          ...formData,
                          recurring: { ...formData.recurring, endDate: e.target.value }
                        })}
                        min={formData.recurring.startDate}
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)}>Πίσω</Button>
                  <Button 
                    onClick={() => setStep(3)}
                    disabled={!formData.originPin || !formData.destinationPin || !formData.meetingPointPin}
                  >
                    Συνέχεια
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-900">Τιμή και προτιμήσεις</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="number"
                    label="Διαθέσιμες θέσεις"
                    value={formData.seatsAvailable}
                    onChange={(e) => setFormData({ ...formData, seatsAvailable: parseInt(e.target.value) })}
                    min="1"
                    max="8"
                    required
                  />
                  <Input
                    type="number"
                    step="0.50"
                    label="Τιμή ανά θέση (€)"
                    value={formData.pricePerSeat}
                    onChange={(e) => setFormData({ ...formData, pricePerSeat: parseFloat(e.target.value) })}
                    min="0.50"
                    required
                  />
                </div>

                {/* Gender Preference */}
                <GenderPreferenceSelector
                  value={formData.genderPreference}
                  onChange={(value) => setFormData({ ...formData, genderPreference: value })}
                />

                {/* Time Flexibility */}
                <TimeFlexibilitySelector
                  value={formData.timeFlexibility}
                  onChange={(value) => setFormData({ ...formData, timeFlexibility: value })}
                />

                {/* Pickup Radius */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Απόσταση από σημείο συνάντησης
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Πόσο μακριά μπορεί να περπατήσει ο επιβάτης;
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[250, 500, 1000, 2000].map((radius) => (
                      <button
                        key={radius}
                        onClick={() => setFormData({ ...formData, pickupRadius: radius })}
                        className={`
                          px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all
                          ${formData.pickupRadius === radius
                            ? 'bg-gray-900 border-gray-900 text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                          }
                        `}
                      >
                        {radius < 1000 ? `${radius}μ` : `${radius / 1000}χλμ`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Instant Booking */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.instantBooking}
                      onChange={(e) => setFormData({ ...formData, instantBooking: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <div>
                      <span className="text-gray-700 font-medium block">Άμεση επιβεβαίωση κράτησης</span>
                      <span className="text-sm text-gray-500">Οι επιβάτες κλείνουν αμέσως χωρίς έγκριση</span>
                    </div>
                  </label>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.exactAddressAvailable}
                      onChange={(e) => setFormData({ ...formData, exactAddressAvailable: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-gray-700 font-medium">Προσφορά παραλαβής από την πόρτα</span>
                  </label>
                  {formData.exactAddressAvailable && (
                    <Input
                      type="number"
                      step="0.50"
                      label="Επιπλέον χρέωση για παραλαβή (€)"
                      value={formData.exactAddressFee}
                      onChange={(e) => setFormData({ ...formData, exactAddressFee: parseFloat(e.target.value) })}
                      className="mt-3"
                    />
                  )}
                </div>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <h3 className="font-semibold text-blue-900 mb-2">Σύνολο εσόδων (ανά ημέρα)</h3>
                  <p className="text-2xl font-bold text-blue-900">
                    €{(formData.pricePerSeat * formData.seatsAvailable).toFixed(2)}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Μετά την προμήθεια της πλατφόρμας (10%): €{((formData.pricePerSeat * formData.seatsAvailable) * 0.9).toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(2)}>Πίσω</Button>
                  <Button 
                    onClick={handleSubmit}
                    loading={isLoading}
                  >
                    Δημιουργία διαδρομής
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
