'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui';

export function EarningsDashboard({ driverId }) {
  const [earnings, setEarnings] = useState({
    today: 12.50,
    thisWeek: 87.50,
    thisMonth: 342.00,
    total: 1256.50,
    tripsToday: 2,
    tripsThisWeek: 14,
    tripsThisMonth: 56,
    totalTrips: 203,
    pendingPayout: 45.00,
    lastPayout: 298.00,
    lastPayoutDate: '2026-02-15'
  });

  const [chartData, setChartData] = useState([
    { day: 'Δευ', amount: 45 },
    { day: 'Τρι', amount: 62 },
    { day: 'Τετ', amount: 38 },
    { day: 'Πεμ', amount: 55 },
    { day: 'Παρ', amount: 87 },
    { day: 'Σαβ', amount: 32 },
    { day: 'Κυρ', amount: 12 }
  ]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="p-4">
            <p className="text-sm text-green-700 mb-1">Σήμερα</p>
            <p className="text-2xl font-bold text-green-900">€{earnings.today.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-1">{earnings.tripsToday} διαδρομές</p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="p-4">
            <p className="text-sm text-blue-700 mb-1">Αυτή την εβδομάδα</p>
            <p className="text-2xl font-bold text-blue-900">€{earnings.thisWeek.toFixed(2)}</p>
            <p className="text-xs text-blue-600 mt-1">{earnings.tripsThisWeek} διαδρομές</p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="p-4">
            <p className="text-sm text-purple-700 mb-1">Αυτό τον μήνα</p>
            <p className="text-2xl font-bold text-purple-900">€{earnings.thisMonth.toFixed(2)}</p>
            <p className="text-xs text-purple-600 mt-1">{earnings.tripsThisMonth} διαδρομές</p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Σύνολο</p>
            <p className="text-2xl font-bold text-gray-900">€{earnings.total.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">{earnings.totalTrips} διαδρομές</p>
          </div>
        </Card>
      </div>

      {/* Weekly Chart */}
      <Card>
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Εβδομαδιαία απόδοση</h3>
          <div className="flex items-end gap-2 h-32">
            {chartData.map((item, index) => {
              const maxAmount = Math.max(...chartData.map(d => d.amount));
              const height = (item.amount / maxAmount) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gray-900 rounded-t-lg transition-all hover:bg-gray-700"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Payout Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-amber-50 border-amber-200">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-amber-700">Εκκρεμής πληρωμή</p>
                <p className="text-xl font-bold text-amber-900">€{earnings.pendingPayout.toFixed(2)}</p>
              </div>
            </div>
            <p className="text-xs text-amber-600">
              Θα καταβληθεί την επόμενη Δευτέρα
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Τελευταία πληρωμή</p>
                <p className="text-xl font-bold text-gray-900">€{earnings.lastPayout.toFixed(2)}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              {new Date(earnings.lastPayoutDate).toLocaleDateString('el-GR')}
            </p>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Στατιστικά</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">4.9</p>
              <p className="text-sm text-gray-500">Μέση βαθμολογία</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-500">Συνέπεια</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-gray-500">Επαναλαμβανόμενοι</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default EarningsDashboard;
