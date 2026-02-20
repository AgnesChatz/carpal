'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Button, Input, Card, CardContent, Badge } from '@/components/ui';
import useAuthStore from '@/store/authStore';

// Icons
const CarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5 text-green-500" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const SeatsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export default function DriverPage() {
  const router = useRouter();
  const { user, userPublic } = useAuthStore();
  const [vehicle, setVehicle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    color: '',
    plateNumber: '',
    seatsTotal: 5,
    year: 2020
  });

  useEffect(() => {
    // Simulate loading vehicle data
    const timer = setTimeout(() => {
      setVehicle({
        make: 'Toyota',
        model: 'Corolla',
        color: 'Ασημί',
        plateNumber: 'NAE-1234',
        seatsTotal: 5,
        year: 2021
      });
      setFormData({
        make: 'Toyota',
        model: 'Corolla',
        color: 'Ασημί',
        plateNumber: 'NAE-1234',
        seatsTotal: 5,
        year: 2021
      });
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setVehicle({ ...formData });
    setIsEditing(false);
    setIsSaving(false);
  };

  if (!userPublic?.roleFlags?.isDriver) {
    return (
      <div className="min-h-screen grain-bg pt-20">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertIcon />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Δεν έχετε ενεργοποιήσει τον λογαριασμό οδηγού</h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Για να διαχειριστείτε το όχημά σας, πρέπει πρώτα να ενεργοποιήσετε τον λογαριασμό οδηγού από το προφίλ σας.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/main/profile">
              <Button>Επιστροφή στο προφίλ</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Διαχείριση οχήματος</h1>
            <p className="text-gray-600 mt-1">Διαχειριστείτε τα στοιχεία του αυτοκινήτου σας</p>
          </div>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            loading={isSaving}
            className="flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <CheckIcon />
                Αποθήκευση
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Επεξεργασία
              </>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="flex flex-col items-center gap-4">
                      <svg className="animate-spin h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <p className="text-gray-500">Φόρτωση στοιχείων...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Vehicle Header */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center">
                        <CarIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {vehicle?.make} {vehicle?.model}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <span>{vehicle?.color}</span>
                          <span>•</span>
                          <span>{vehicle?.year}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <SeatsIcon />
                            {vehicle?.seatsTotal} θέσεις
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Μάρκα
                        </label>
                        <Input
                          value={formData.make}
                          onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                          disabled={!isEditing}
                          placeholder="π.χ. Toyota"
                          className={!isEditing ? 'bg-gray-50' : ''}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Μοντέλο
                        </label>
                        <Input
                          value={formData.model}
                          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                          disabled={!isEditing}
                          placeholder="π.χ. Corolla"
                          className={!isEditing ? 'bg-gray-50' : ''}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Χρώμα
                        </label>
                        <Input
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          disabled={!isEditing}
                          placeholder="π.χ. Ασημί"
                          className={!isEditing ? 'bg-gray-50' : ''}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Έτος
                        </label>
                        <Input
                          type="number"
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                          disabled={!isEditing}
                          min="1990"
                          max="2026"
                          className={!isEditing ? 'bg-gray-50' : ''}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Αριθμός πινακίδας
                        </label>
                        <Input
                          value={formData.plateNumber}
                          onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                          disabled={!isEditing}
                          placeholder="π.χ. NAE-1234"
                          className={!isEditing ? 'bg-gray-50' : ''}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Συνολικές θέσεις
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => isEditing && setFormData({ ...formData, seatsTotal: Math.max(2, formData.seatsTotal - 1) })}
                            disabled={!isEditing}
                            className={`w-10 h-10 rounded-lg border flex items-center justify-center text-lg font-medium ${
                              isEditing 
                                ? 'border-gray-300 hover:bg-gray-50 text-gray-700' 
                                : 'border-gray-200 text-gray-400 bg-gray-50'
                            }`}
                          >
                            -
                          </button>
                          <div className="flex-1">
                            <Input
                              type="number"
                              value={formData.seatsTotal}
                              onChange={(e) => setFormData({ ...formData, seatsTotal: parseInt(e.target.value) })}
                              disabled={!isEditing}
                              min="2"
                              max="9"
                              className="text-center"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => isEditing && setFormData({ ...formData, seatsTotal: Math.min(9, formData.seatsTotal + 1) })}
                            disabled={!isEditing}
                            className={`w-10 h-10 rounded-lg border flex items-center justify-center text-lg font-medium ${
                              isEditing 
                                ? 'border-gray-300 hover:bg-gray-50 text-gray-700' 
                                : 'border-gray-200 text-gray-400 bg-gray-50'
                            }`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Info Box */}
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                      <div className="flex items-start gap-3">
                        <InfoIcon />
                        <div>
                          <h3 className="font-medium text-blue-900 mb-1">Οδηγίες</h3>
                          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                            <li>Βεβαιωθείτε ότι τα στοιχεία του οχήματος είναι ακριβή</li>
                            <li>Ο αριθμός πινακίδας είναι προαιρετικός</li>
                            <li>Οι διαθέσιμες θέσεις για επιβάτες θα είναι {formData.seatsTotal - 1} (συνολικές θέσεις μείον 1 για τον οδηγό)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card className="border-green-200 bg-green-50/50">
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Ενεργός οδηγός</h3>
                    <p className="text-xs text-gray-500">Το προφίλ σας είναι πλήρες</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckIcon />
                    <span>Στοιχεία οχήματος</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckIcon />
                    <span>Επαληθευμένο προφίλ</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent>
                <h3 className="font-semibold text-gray-900 mb-4">Ενέργειες</h3>
                <div className="space-y-3">
                  <Link href="/main/listings/new">
                    <Button className="w-full">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Νέα διαδρομή
                    </Button>
                  </Link>
                  <Link href="/main/profile">
                    <Button variant="outline" className="w-full">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Το προφίλ μου
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardContent>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Συμβουλές
                </h3>
                <ul className="text-sm text-gray-600 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>Ανεβάστε καθαρές φωτογραφίες του αυτοκινήτου σας για να προσελκύσετε περισσότερους επιβάτες</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>Κρατήστε το όχημά σας καθαρό και συντηρημένο</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>Να είστε συνεπείς στις ώρες αναχώρησης</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
