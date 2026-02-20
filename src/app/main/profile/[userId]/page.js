'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button, Card, Badge } from '@/components/ui';
import { mockDrivers, getDriver } from '@/lib/mockData';

// Icons
const StarIcon = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AwardIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const LeafIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const ThumbsUpIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
);

// Star rating display
const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} filled={star <= Math.round(rating)} />
      ))}
    </div>
    <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
    <span className="text-gray-500 text-sm">({reviews})</span>
  </div>
);

// Badge component
const UserBadge = ({ icon, label, color, bgColor }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${bgColor} ${color}`}>
    {icon}
    {label}
  </div>
);

// Stat card
const StatCard = ({ icon, value, label }) => (
  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

// Review card
const ReviewCard = ({ review }) => (
  <div className="p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
        {review.reviewerName?.charAt(0) || 'U'}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-gray-900">{review.reviewerName}</h4>
          <span className="text-sm text-gray-400">{review.date}</span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {review.route}
        </div>
      </div>
    </div>
  </div>
);

export default function PublicProfilePage() {
  const params = useParams();
  const userId = params.userId;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userData = getDriver(userId) || {
        id: userId,
        name: 'Γιώργος Παπαδόπουλος',
        initials: 'ΓΠ',
        rating: 4.8,
        reviews: 24,
        trips: 156,
        joinedDate: '2024-01-15',
        bio: 'Επαγγελματίας οδηγός με 10+ χρόνια εμπειρίας. Αγαπώ να γνωρίζω νέους ανθρώπους και να τους βοηθάω να φτάνουν στον προορισμό τους με ασφάλεια και άνεση.',
        verified: true,
        isDriver: true,
        car: {
          make: 'Toyota',
          model: 'Corolla',
          color: 'Ασημί',
          year: 2021,
          seats: 5
        },
        badges: ['verified', 'super_driver', 'eco_friendly'],
        recentReviews: [
          {
            reviewerName: 'Μαρία Κωνσταντίνου',
            rating: 5,
            date: '2 ημέρες πριν',
            comment: 'Εξαιρετικός οδηγός! Πολύ ευγενικός, συνεπής και το αυτοκίνητο ήταν πεντακάθαρο. Τον συνιστώ ανεπιφύλακτα!',
            route: 'Καλαμαριά → Εύοσμος'
          },
          {
            reviewerName: 'Νίκος Αθανασίου',
            rating: 5,
            date: '5 ημέρες πριν',
            comment: 'Τέλεια εμπειρία! Έφτασα στη δουλειά μου στην ώρα μου και η κουβέντα ήταν πολύ ευχάριστη.',
            route: 'Κέντρο → Αεροδρόμιο'
          },
          {
            reviewerName: 'Ελένη Μακρή',
            rating: 4,
            date: '1 εβδομάδα πριν',
            comment: 'Πολύ καλός οδηγός. Λίγο καθυστέρηση λόγω κίνησης αλλά ενημέρωσε έγκαιρα.',
            route: 'Σταυρούπολη → Θέρμη'
          }
        ]
      };
      
      setUser(userData);
      setIsLoading(false);
    };
    
    loadUser();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="min-h-screen grain-bg pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500">Φόρτωση προφίλ...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen grain-bg pt-20">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ο χρήστης δεν βρέθηκε</h1>
          <p className="text-gray-500 mb-6">Ο χρήστης που αναζητάτε δεν υπάρχει.</p>
          <Link href="/main/search">
            <Button>Επιστροφή στην αναζήτηση</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Πίσω</span>
        </button>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          {/* Cover Photo - Car Image */}
          <div className="h-48 sm:h-56 bg-gray-100 relative overflow-hidden">
            {user.car ? (
              <img 
                src={`https://www.carimagery.com/img/v1/${user.car.make.toLowerCase().replace(/\s+/g, '')}_${user.car.model.toLowerCase().replace(/\s+/g, '')}_${user.car.year}.jpg`}
                alt={`${user.car.make} ${user.car.model}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop';
                }}
              />
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop"
                alt="Car cover"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
          
          <div className="px-6 sm:px-8 pb-8 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-12 mb-6 gap-4">
              {/* Profile Photo */}
              <div className="relative self-center sm:self-auto">
                <div className="w-32 h-32 bg-white rounded-full p-1 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                    {user.photoUrl ? (
                      <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.initials || user.name?.charAt(0)
                    )}
                  </div>
                </div>
                {user.verified && (
                  <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Name & Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                  <StarRating rating={user.rating} reviews={user.reviews} />
                  {user.verified && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Επαληθευμένος</span>
                  )}
                </div>
              </div>
              
              {/* Action Button */}
              <div className="flex justify-center sm:justify-end">
                <Link href={`/main/messages?user=${user.id}`}>
                  <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg shadow-gray-900/20">
                    <MessageIcon />
                    <span className="ml-2">Μήνυμα</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard 
                icon={<CarIcon className="w-6 h-6 text-blue-600" />}
                value={user.trips}
                label="διαδρομές"
              />
              <StatCard 
                icon={<svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>}
                value={new Date(user.joinedDate).getFullYear()}
                label="μέλος από"
              />
              {user.isDriver && user.car && (
                <>
                  <StatCard 
                    icon={<CarIcon className="w-6 h-6 text-purple-600" />}
                    value={user.car.seats}
                    label="θέσεις"
                  />
                  <StatCard 
                    icon={<svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>}
                    value={user.car.year}
                    label="έτος αυτοκινήτου"
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 inline-flex">
              {[
                { id: 'about', label: 'Σχετικά' },
                { id: 'reviews', label: `Κριτικές (${user.reviews})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    activeTab === tab.id 
                      ? 'bg-gray-900 text-white shadow-md' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                {/* Bio */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Σχετικά με εμένα</h3>
                  <p className="text-gray-600 leading-relaxed">{user.bio || 'Δεν υπάρχει περιγραφή.'}</p>
                </div>

                {/* Reviews Preview */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Πρόσφατες κριτικές</h3>
                    <button 
                      onClick={() => setActiveTab('reviews')}
                      className="text-blue-600 font-medium text-sm hover:underline"
                    >
                      Προβολή όλων
                    </button>
                  </div>
                  <div className="space-y-4">
                    {user.recentReviews?.slice(0, 2).map((review, index) => (
                      <ReviewCard key={index} review={review} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Όλες οι κριτικές</h3>
                  <StarRating rating={user.rating} reviews={user.reviews} />
                </div>
                <div className="space-y-4">
                  {user.recentReviews?.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Επιτεύγματα</h3>
              <div className="space-y-3">
                {user.badges?.includes('verified') && (
                  <UserBadge 
                    icon={<ShieldCheckIcon />}
                    label="Επαληθευμένος"
                    color="text-green-700"
                    bgColor="bg-green-50"
                  />
                )}
                {user.badges?.includes('super_driver') && (
                  <UserBadge 
                    icon={<AwardIcon />}
                    label="Super Οδηγός"
                    color="text-amber-700"
                    bgColor="bg-amber-50"
                  />
                )}
                {user.badges?.includes('eco_friendly') && (
                  <UserBadge 
                    icon={<LeafIcon />}
                    label="Eco Friendly"
                    color="text-emerald-700"
                    bgColor="bg-emerald-50"
                  />
                )}
                {!user.badges?.length && (
                  <p className="text-gray-500 text-sm">Δεν υπάρχουν επιτεύγματα ακόμα.</p>
                )}
              </div>
            </div>

            {/* Car Info */}
            {user.isDriver && user.car && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CarIcon />
                  Όχημα
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <p className="text-sm text-gray-500 mb-1">Μάρκα / Μοντέλο</p>
                    <p className="font-semibold text-gray-900 text-lg">{user.car.make} {user.car.model}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-sm text-gray-500 mb-1">Χρώμα</p>
                      <p className="font-semibold text-gray-900">{user.car.color}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-sm text-gray-500 mb-1">Έτος</p>
                      <p className="font-semibold text-gray-900">{user.car.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Trust Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">Ασφάλεια</h3>
              </div>
              <p className="text-sm text-gray-600">
                Ο χρήστης έχει επαληθευτεί με email και τηλέφωνο. Όλες οι διαδρομές είναι ασφαλισμένες.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
