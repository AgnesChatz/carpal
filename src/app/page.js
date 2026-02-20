'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button, Input, QuickFilters, RecentSearches } from '@/components/ui';
import { MapAddressPicker } from '@/components/maps';
import { saveSearch } from '@/components/ui';
import './app.css';

// Icon components
const FireIcon = () => (
  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
  </svg>
);

const LeafIcon = () => (
  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

const CarIcon = () => (
  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const MoneyIcon = () => (
  <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.312-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.312.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" clipRule="evenodd" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-4 h-4 text-red-500 inline" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
);

export default function Home() {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    origin: null,
    destination: null,
    date: '',
    seats: 1
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.origin) {
      params.set('originLat', searchData.origin.lat);
      params.set('originLng', searchData.origin.lng);
      params.set('originLabel', searchData.origin.label);
    }
    if (searchData.destination) {
      params.set('destLat', searchData.destination.lat);
      params.set('destLng', searchData.destination.lng);
      params.set('destLabel', searchData.destination.label);
    }
    if (searchData.date) params.set('date', searchData.date);
    if (searchData.seats) params.set('seats', searchData.seats);
    
    // Save to recent searches
    saveSearch({
      origin: searchData.origin?.label,
      destination: searchData.destination?.label,
      date: searchData.date
    });
    
    router.push(`/main/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with All Filters */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-1/2 -left-20 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-600 flex items-center gap-1.5">
                  <FireIcon /> Δημοφιλές στη Θεσσαλονίκη
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Ταξιδέψτε
                <span className="gradient-text-blue"> έξυπνα.</span>
                <br />
                Μοιραστείτε το κόστος.
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
                Συνδεθείτε με οδηγούς και επιβάτες για καθημερινές διαδρομές. 
                Μειώστε τα έξοδα και το περιβαλλοντικό σας αποτύπωμα.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/main/search">
                  <Button size="lg" className="btn-shine bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-xl">
                    Βρείτε διαδρομή
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg rounded-xl border-2">
                    Γίνετε οδηγός
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-gray-900">€2.5</p>
                  <p className="text-sm text-gray-500">μέση τιμή/διαδρομή</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">40%</p>
                  <p className="text-sm text-gray-500">λιγότερα έξοδα</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">0kg</p>
                  <p className="text-sm text-gray-500">επιπλέον CO₂</p>
                </div>
              </div>
            </div>

            {/* Right - Search Card with ALL Filters */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Βρείτε διαδρομή</h2>
                    <p className="text-sm text-gray-500">Συμπληρώστε τα στοιχεία σας</p>
                  </div>
                </div>
                
                <form onSubmit={handleSearch} className="space-y-4">
                  {/* Origin */}
                  <MapAddressPicker
                    label="Από πού;"
                    placeholder="π.χ. Ολυμπιάδος 59, Εύοσμος"
                    onLocationSelect={(loc) => setSearchData({ ...searchData, origin: loc })}
                    required
                  />
                  
                  {/* Destination */}
                  <MapAddressPicker
                    label="Προς πού;"
                    placeholder="π.χ. Ολυμπιάδος 59, Εύοσμος"
                    onLocationSelect={(loc) => setSearchData({ ...searchData, destination: loc })}
                    required
                  />

                  {/* Date & Seats Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Ημερομηνία
                      </label>
                      <input
                        type="date"
                        value={searchData.date}
                        onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Επιβάτες
                      </label>
                      <select
                        value={searchData.seats}
                        onChange={(e) => setSearchData({ ...searchData, seats: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none pr-10"
                      >
                        {[1, 2, 3, 4, 5, 6].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'επιβάτης' : 'επιβάτες'}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-[38px] pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 8l4 4 4-4" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <Button 
                    type="submit"
                    size="lg" 
                    className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-xl py-4 text-lg font-semibold shadow-lg shadow-gray-900/20"
                    disabled={!searchData.origin || !searchData.destination}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Αναζήτηση διαδρομών
                  </Button>
                </form>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <CheckIcon />
                    Ασφαλείς πληρωμές
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <CheckIcon />
                    Επαληθευμένοι οδηγοί
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="mt-6">
                  <p className="text-xs text-gray-500 mb-3 text-center">Γρήγορη αναζήτηση:</p>
                  <QuickFilters />
                </div>

                {/* Recent Searches */}
                <RecentSearches />
              </div>

              {/* Popular routes pills */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-xs text-gray-500">Δημοφιλή:</span>
                {['Καλαμαριά → Εύοσμος', 'Κέντρο → Αεροδρόμιο', 'Σταυρούπολη → Θέρμη'].map((route) => (
                  <button
                    key={route}
                    onClick={() => {
                      const [from, to] = route.split(' → ');
                      setSearchData(prev => ({
                        ...prev,
                        origin: { label: from, lat: 40.64, lng: 22.94 },
                        destination: { label: to, lat: 40.65, lng: 22.95 }
                      }));
                    }}
                    className="px-3 py-1 text-xs bg-white/60 hover:bg-white border border-gray-200 rounded-full text-gray-600 transition-colors"
                  >
                    {route}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <LeafIcon /> Βιωσιμότητα
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
              Κάθε διαδρομή μετράει
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Το carpooling μειώνει τις εκπομπές CO₂ και την κυκλοφοριακή συμφόρηση.
              Μαζί κάνουμε τη διαφορά.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-lift bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-200">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">-30% CO₂</h3>
              <p className="text-gray-600">
                Κάθε κοινόχρηστη διαδρομή μειώνει τις εκπομπές διοξειδίου του άνθρακα 
                κατά μέσο όρο 30% ανά επιβάτη.
              </p>
            </div>

            <div className="card-lift bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Λιγότερη κίνηση</h3>
              <p className="text-gray-600">
                Λιγότερα αυτοκίνητα στον δρόμο σημαίνει λιγότερη κίνηση 
                και γρηγορότερες διαδρομές για όλους.
              </p>
            </div>

            <div className="card-lift bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
              <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-200">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Εξοικονόμηση</h3>
              <p className="text-gray-600">
                Οι οδηγοί εξοικονομούν έως και €200/μήνα σε έξοδα καυσίμων 
                μοιράζοντας το κόστος.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-30" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                <UsersIcon /> Κοινότητα
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
                Γνωρίστε ανθρώπους στην πορεία
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Το carpal.gr δεν είναι απλώς μεταφορά. Είναι ευκαιρία να γνωρίσετε 
                νέους ανθρώπους, να κάνετε networking και να μετατρέψετε τις καθημερινές 
                διαδρομές σε ευχάριστες στιγμές.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Επαληθευμένα προφίλ</h4>
                    <p className="text-gray-500">Κάθε χρήστης επαληθεύεται με τηλέφωνο και email</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Σύστημα αξιολογήσεων</h4>
                    <p className="text-gray-500">Βαθμολογήστε οδηγούς και επιβάτες μετά κάθε διαδρομή</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Εσωτερικό chat</h4>
                    <p className="text-gray-500">Επικοινωνήστε απευθείας μέσω της πλατφόρμας</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-40" />
              
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    ΓΠ
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Γιώργος Π.</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span className="text-yellow-500">★★★★★</span>
                      <span>4.9 (24 κριτικές)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CarIcon />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Καλαμαριά → Εύοσμος</p>
                        <p className="text-sm text-gray-500">Δευτέρα - Παρασκευή, 08:00</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-gray-900">€2.50</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CarIcon />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Κέντρο → Αεροδρόμιο</p>
                        <p className="text-sm text-gray-500">Καθημερινά, 06:30</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-gray-900">€4.00</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 italic">
                    "Κάνω το ίδιο δρομολόγιο κάθε μέρα. Γιατί να πηγαίνω μόνος μου;"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Costs Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
              <MoneyIcon /> Έξοδα
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Διαφανής τιμολόγηση
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Καμία έκπληξη. Ξέρετε ακριβώς τι πληρώνετε και πού πάνε τα χρήματα.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <UserIcon />
              </div>
              <h3 className="text-2xl font-bold mb-4">Ως Επιβάτης</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Κόστος διαδρομής</span>
                  <span className="font-semibold">€2.00 - €5.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Χρέωση πλατφόρμας</span>
                  <span className="font-semibold">10%</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between text-white font-bold">
                  <span>Σύνολο</span>
                  <span>€2.20 - €5.50</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 border border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                ΔΗΜΟΦΙΛΕΣ
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Ως Οδηγός</h3>
              <div className="space-y-3 text-blue-100">
                <div className="flex justify-between">
                  <span>Έσοδα από επιβάτες</span>
                  <span className="font-semibold">€100 - €200/μήνα</span>
                </div>
                <div className="flex justify-between">
                  <span>Προμήθεια πλατφόρμας</span>
                  <span className="font-semibold">10%</span>
                </div>
                <div className="pt-3 border-t border-white/20 flex justify-between text-white font-bold">
                  <span>Καθαρά έσοδα</span>
                  <span>€90 - €180/μήνα</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <GlobeIcon />
              </div>
              <h3 className="text-2xl font-bold mb-4">Περιβαλλοντικό Όφελος</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Μείωση CO₂/διαδρομή</span>
                  <span className="font-semibold">~1.5kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Λιγότερα αυτοκίνητα</span>
                  <span className="font-semibold">-30%</span>
                </div>
                <div className="pt-3 border-t border-white/10 text-white">
                  <p className="text-sm">
                    Με 100 διαδρομές/μήνα, η κοινότητα εξοικονομεί 
                    <span className="font-bold"> 150kg CO₂</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 items-center opacity-60">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="font-semibold">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              <span className="font-semibold">Verified Users</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
              </svg>
              <span className="font-semibold">Real Profiles</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
              Πώς λειτουργεί
            </h2>
            <p className="text-xl text-gray-600">
              Τρία απλά βήματα για να ξεκινήσετε
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-3xl text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Αναζητήστε</h3>
              <p className="text-gray-600">
                Εισάγετε το σημείο αναχώρησης και προορισμό. 
                Βρείτε διαθέσιμες διαδρομές σε δευτερόλεπτα.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-3xl text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Κλείστε θέση</h3>
              <p className="text-gray-600">
                Επιλέξτε ημερομηνία και θέσεις. Πληρώστε με ασφάλεια 
                μέσω Stripe. Λάβετε επιβεβαίωση άμεσα.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-3xl text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Ταξιδέψτε</h3>
              <p className="text-gray-600">
                Συναντήστε τον οδηγό στο σημείο συνάντησης. 
                Απολαύστε το ταξίδι και βαθμολογήστε μετά.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Έτοιμοι να ξεκινήσετε;
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Συνδεθείτε με χιλιάδες οδηγούς και επιβάτες στην Ελλάδα. 
            Εγγραφείτε δωρεάν σήμερα.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-5 text-lg rounded-xl font-semibold">
                Δωρεάν εγγραφή
              </Button>
            </Link>
            <Link href="/main/search">
              <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-5 text-lg rounded-xl">
                Αναζήτηση διαδρομών
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-6 flex items-center justify-center gap-1">
            <CheckIcon /> Δωρεάν εγγραφή <CheckIcon /> Καμία συνδρομή <CheckIcon /> Πληρώνετε μόνο όταν ταξιδεύετε
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
