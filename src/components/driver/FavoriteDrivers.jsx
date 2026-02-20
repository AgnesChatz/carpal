'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';

const mockFavorites = [
  {
    id: 'driver-1',
    name: 'Γιώργος Παπαδόπουλος',
    initials: 'ΓΠ',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    reviews: 24,
    trips: 156,
    route: 'Καλαμαριά → Εύοσμος',
    time: '08:00',
    price: 2.50,
    isRecurring: true
  },
  {
    id: 'driver-2',
    name: 'Μαρία Κωνσταντίνου',
    initials: 'ΜΚ',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    rating: 4.8,
    reviews: 18,
    trips: 89,
    route: 'Κέντρο → Αεροδρόμιο',
    time: '06:30',
    price: 4.00,
    isRecurring: true
  }
];

export function FavoriteDrivers({ userId }) {
  const [favorites, setFavorites] = useState(mockFavorites);

  const removeFavorite = (driverId) => {
    setFavorites(favorites.filter(f => f.id !== driverId));
  };

  if (favorites.length === 0) {
    return (
      <Card>
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Δεν έχετε αγαπημένους οδηγούς</h3>
          <p className="text-gray-500 mb-4">Αποθηκεύστε τους οδηγούς που σας αρέσουν για γρήγορη πρόσβαση</p>
          <Link href="/main/search">
            <Button>Αναζήτηση διαδρομών</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {favorites.map((driver) => (
        <Card key={driver.id} className="hover:shadow-lg transition-shadow">
          <div className="p-4">
            <div className="flex items-start gap-4">
              {/* Driver Photo */}
              {driver.photo ? (
                <img 
                  src={driver.photo} 
                  alt={driver.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  {driver.initials}
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{driver.name}</h3>
                  {driver.isRecurring && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                      Τακτικός
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{driver.rating}</span>
                  <span className="text-gray-400">({driver.reviews})</span>
                  <span className="text-gray-300">•</span>
                  <span>{driver.trips} διαδρομές</span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="truncate">{driver.route}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{driver.time}</span>
                  </div>
                  <div className="font-semibold text-gray-900">
                    €{driver.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Link href={`/main/profile/${driver.id}`}>
                  <Button variant="outline" size="sm">
                    Προφίλ
                  </Button>
                </Link>
                <button
                  onClick={() => removeFavorite(driver.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Αφαίρεση από αγαπημένα"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function FavoriteButton({ driverId, isFavorite: initialIsFavorite = false }) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: API call to save favorite
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-colors ${
        isFavorite 
          ? 'text-red-500 hover:bg-red-50' 
          : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
      }`}
      title={isFavorite ? 'Αφαίρεση από αγαπημένα' : 'Προσθήκη στα αγαπημένα'}
    >
      <svg className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}

export default FavoriteDrivers;
