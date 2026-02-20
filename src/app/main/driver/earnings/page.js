'use client';

import { Navbar } from '@/components/Navbar';
import { EarningsDashboard } from '@/components/driver';
import { EmptyState } from '@/components/ui';
import useAuthStore from '@/store/authStore';

export default function DriverEarningsPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Έσοδα</h1>
          <p className="text-gray-600 mt-1">Παρακολουθήστε τα έσοδα και τις πληρωμές σας</p>
        </div>

        <EarningsDashboard driverId={user?.id} />

        {/* Payout Schedule Info */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Πρόγραμμα πληρωμών
          </h3>
          <p className="text-sm text-blue-800 mb-2">
            Οι πληρωμές γίνονται αυτόματα κάθε Δευτέρα για τα έσοδα της προηγούμενης εβδομάδας.
          </p>
          <p className="text-sm text-blue-700">
            <strong>Επόμενη πληρωμή:</strong> Δευτέρα 24 Φεβρουαρίου 2026
          </p>
        </div>
      </div>
    </div>
  );
}
