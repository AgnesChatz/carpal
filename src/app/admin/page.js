'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, Badge, Button } from '@/components/ui';
import { mockDrivers, mockListings, mockBookings } from '@/lib/mockData';

// Icons
const UsersIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const CarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const MoneyIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const stats = {
    users: mockDrivers.length,
    listings: mockListings.length,
    bookings: mockBookings.length,
    revenue: 1250.50
  };

  const getTabData = () => {
    switch (activeTab) {
      case 'users':
        return mockDrivers.map(d => ({
          id: d.id,
          name: d.name,
          email: `${d.name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
          status: d.verified ? 'VERIFIED' : 'PENDING',
          date: d.joinedDate,
          role: 'driver'
        }));
      case 'listings':
        return mockListings.map(l => ({
          id: l.id,
          route: `${l.origin.label} → ${l.destination.label}`,
          type: l.type,
          status: l.status,
          date: l.createdAt,
          price: l.pricePerSeat
        }));
      case 'bookings':
        return mockBookings.map(b => ({
          id: b.id,
          listing: `Booking #${b.listingId.slice(-4)}`,
          status: b.status,
          date: b.createdAt,
          total: b.totalPrice
        }));
      default:
        return [];
    }
  };

  const data = getTabData();

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Διαχείριση πλατφόρμας carpal.gr</p>
          </div>
          <Badge variant="primary" className="text-sm">v1.0.0</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-blue-700 font-medium">Χρήστες</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.users}</div>
              <div className="text-xs text-blue-600 mt-1">+2 αυτή την εβδομάδα</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <CarIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-green-700 font-medium">Διαδρομές</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.listings}</div>
              <div className="text-xs text-green-600 mt-1">Ενεργές</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-purple-700 font-medium">Κρατήσεις</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.bookings}</div>
              <div className="text-xs text-purple-600 mt-1">Σήμερα</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                  <MoneyIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-amber-700 font-medium">Έσοδα</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">€{stats.revenue.toFixed(2)}</div>
              <div className="text-xs text-amber-600 mt-1">30 ημέρες</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {[
            { id: 'users', label: 'Χρήστες', count: stats.users },
            { id: 'listings', label: 'Διαδρομές', count: stats.listings },
            { id: 'bookings', label: 'Κρατήσεις', count: stats.bookings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-4 font-medium transition-colors flex items-center gap-2 ${
                activeTab === tab.id 
                  ? 'text-gray-900 border-b-2 border-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Data Table */}
        <Card className="shadow-lg">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <svg className="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            ) : data.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                Δεν υπάρχουν δεδομένα
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left p-4 font-medium text-gray-700">ID</th>
                    <th className="text-left p-4 font-medium text-gray-700">Στοιχεία</th>
                    <th className="text-left p-4 font-medium text-gray-700">Status</th>
                    <th className="text-left p-4 font-medium text-gray-700">Ημερομηνία</th>
                    <th className="text-left p-4 font-medium text-gray-700">Ενέργειες</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-mono text-sm text-gray-500">
                        #{item.id.slice(-6)}
                      </td>
                      <td className="p-4">
                        {activeTab === 'users' && (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-500">{item.email}</div>
                            </div>
                          </div>
                        )}
                        {activeTab === 'listings' && (
                          <div>
                            <div className="font-medium text-gray-900">{item.route}</div>
                            <div className="text-sm text-gray-500">{item.type === 'ONE_TIME' ? 'Μεμονωμένη' : 'Επαναλαμβανόμενη'}</div>
                          </div>
                        )}
                        {activeTab === 'bookings' && (
                          <div>
                            <div className="font-medium text-gray-900">{item.listing}</div>
                            <div className="text-sm text-gray-500">€{item.total}</div>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge variant={item.status === 'ACTIVE' || item.status === 'VERIFIED' || item.status === 'CONFIRMED' ? 'success' : 'default'}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-500">
                        {new Date(item.date).toLocaleDateString('el-GR')}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Προβολή</Button>
                          {activeTab === 'users' && (
                            <Button variant="outline" size="sm">Επαλήθευση</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
