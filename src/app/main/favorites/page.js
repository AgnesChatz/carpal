'use client';

import { Navbar } from '@/components/Navbar';
import { FavoriteDrivers } from '@/components/driver';
import { EmptyState } from '@/components/ui';
import useAuthStore from '@/store/authStore';

export default function FavoritesPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Αγαπημένοι οδηγοί</h1>
          <p className="text-gray-600 mt-1">Οι οδηγοί που προτιμάτε για τις διαδρομές σας</p>
        </div>

        <FavoriteDrivers userId={user?.id} />
      </div>
    </div>
  );
}
