'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Button, Input, Card, CardContent, Badge } from '@/components/ui';
import useAuthStore from '@/store/authStore';
import { useRequireAuth } from '@/hooks/useAuth';

// Icons
const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function ProfilePage() {
  const { user, userPublic, userPrivate, updateProfile, becomeDriver, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    homeCity: ''
  });

  useEffect(() => {
    if (userPublic) {
      setFormData({
        displayName: userPublic.displayName || '',
        homeCity: userPublic.homeCity || ''
      });
    }
  }, [userPublic]);

  const handleSave = async () => {
    const result = await updateProfile(formData);
    if (result.success) {
      setIsEditing(false);
    }
  };

  if (!user || !userPublic) {
    return (
      <div className="min-h-screen grain-bg flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Προφίλ</h1>
            <p className="text-gray-600 mt-1">Διαχειριστείτε τα στοιχεία και τις ρυθμίσεις σας</p>
          </div>
          <Button
            variant="outline"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
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
          {/* Main Content - Left 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card className="overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" />
              <CardContent className="relative">
                <div className="flex flex-col sm:flex-row sm:items-end -mt-16 mb-6 gap-4">
                  <div className="w-32 h-32 bg-white rounded-2xl p-1 shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    {isEditing ? (
                      <Input
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        className="text-xl font-bold max-w-xs"
                        placeholder="Το όνομά σας"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-gray-900">{userPublic.displayName}</h2>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <MailIcon />
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MapPinIcon />
                      Πόλη
                    </label>
                    {isEditing ? (
                      <Input
                        value={formData.homeCity}
                        onChange={(e) => setFormData({ ...formData, homeCity: e.target.value })}
                        placeholder="π.χ. Θεσσαλονίκη"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{userPublic.homeCity || 'Δεν έχει οριστεί'}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <PhoneIcon />
                      Τηλέφωνο
                    </label>
                    <div className="flex items-center gap-3">
                      <p className="text-gray-900 font-medium">{userPrivate?.phone || '-'}</p>
                      {userPrivate?.phoneVerified ? (
                        <Badge variant="success" className="flex items-center gap-1">
                          <ShieldCheckIcon />
                          Επαληθευμένο
                        </Badge>
                      ) : (
                        <Badge variant="warning">Εκκρεμεί</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ratings */}
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <StarIcon />
                  Βαθμολογίες
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Driver Rating */}
                  <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                        <CarIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-sm text-gray-600">Ως οδηγός</div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {userPublic.ratingAvgDriver > 0 ? userPublic.ratingAvgDriver.toFixed(1) : '-'}
                      </span>
                      {userPublic.ratingAvgDriver > 0 && <StarIcon />}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {userPublic.ratingCountDriver} αξιολογήσεις
                    </p>
                  </div>

                  {/* Rider Rating */}
                  <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="text-sm text-gray-600">Ως επιβάτης</div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {userPublic.ratingAvgRider > 0 ? userPublic.ratingAvgRider.toFixed(1) : '-'}
                      </span>
                      {userPublic.ratingAvgRider > 0 && <StarIcon />}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {userPublic.ratingCountRider} αξιολογήσεις
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CalendarIcon />
                  Πρόσφατη δραστηριότητα
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Ολοκληρώθηκε διαδρομή</p>
                      <p className="text-sm text-gray-500">Καλαμαριά → Εύοσμος</p>
                    </div>
                    <span className="text-sm text-gray-400">2 ημέρες πριν</span>
                  </div>
                </div>
                <Link href="/main/bookings">
                  <Button variant="ghost" className="w-full mt-4">
                    Δείτε όλες τις κρατήσεις
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right column */}
          <div className="space-y-6">
            {/* Driver Status Card */}
            <Card className={userPublic.roleFlags?.isDriver ? 'border-green-200 bg-green-50/50' : ''}>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    userPublic.roleFlags?.isDriver ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <CarIcon className={`w-6 h-6 ${userPublic.roleFlags?.isDriver ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Οδηγός</h3>
                    <p className="text-xs text-gray-500">
                      {userPublic.roleFlags?.isDriver ? 'Ενεργός' : 'Μη ενεργός'}
                    </p>
                  </div>
                </div>

                {userPublic.roleFlags?.isDriver ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-white rounded-xl border border-green-200">
                      <div className="flex items-center gap-2 text-green-700 text-sm">
                        <ShieldCheckIcon />
                        <span className="font-medium">Επαληθευμένος οδηγός</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Μπορείτε να δημιουργείτε διαδρομές και να δέχεστε κρατήσεις.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Link href="/main/driver">
                        <Button variant="outline" className="w-full">
                          <CarIcon />
                          Διαχείριση οχήματος
                        </Button>
                      </Link>
                      <Link href="/main/listings/new">
                        <Button className="w-full">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Νέα διαδρομή
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Γίνετε οδηγός και μοιραστείτε τα έξοδα των διαδρομών σας.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-2">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Κερδίστε χρήματα από τις διαδρομές σας
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Βοηθήστε το περιβάλλον
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Γνωρίστε νέους ανθρώπους
                      </li>
                    </ul>
                    <Button 
                      className="w-full"
                      onClick={async () => {
                        await becomeDriver();
                      }}
                    >
                      Γίνετε οδηγός
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardContent>
                <h3 className="font-semibold text-gray-900 mb-4">Συντομεύσεις</h3>
                <div className="space-y-2">
                  <Link href="/main/bookings">
                    <Button variant="ghost" className="w-full justify-start">
                      <CalendarIcon />
                      Οι κρατήσεις μου
                    </Button>
                  </Link>
                  <Link href="/main/messages">
                    <Button variant="ghost" className="w-full justify-start">
                      <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Μηνύματα
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start">
                    <SettingsIcon />
                    Ρυθμίσεις
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Logout */}
            <Card>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  onClick={logout}
                >
                  <LogoutIcon />
                  Αποσύνδεση
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
