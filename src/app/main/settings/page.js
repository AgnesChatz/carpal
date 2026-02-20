'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button, Card } from '@/components/ui';
import useAuthStore from '@/store/authStore';

// Icons
const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TrashIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    alert('Η διαγραφή λογαριασμού θα υλοποιηθεί σύντομα');
    setShowDeleteModal(false);
  };

  const settingsGroups = [
    {
      title: 'Λογαριασμός',
      items: [
        {
          icon: <BellIcon />,
          label: 'Ειδοποιήσεις',
          description: 'Διαχειριστείτε τις ειδοποιήσεις σας',
          href: '/main/settings/notifications',
          action: <ChevronRightIcon />
        },
        {
          icon: <LockIcon />,
          label: 'Ασφάλεια',
          description: 'Αλλαγή κωδικού, 2FA',
          href: '/main/settings/security',
          action: <ChevronRightIcon />
        },
        {
          icon: <GlobeIcon />,
          label: 'Γλώσσα & Περιοχή',
          description: 'Ελληνικά • Ελλάδα',
          href: '/main/settings/language',
          action: <ChevronRightIcon />
        },
      ]
    },
    {
      title: 'Απόρρητο',
      items: [
        {
          icon: <ShieldIcon />,
          label: 'Ρυθμίσεις απορρήτου',
          description: 'Ποιος μπορεί να δει το προφίλ σας',
          href: '/main/settings/privacy',
          action: <ChevronRightIcon />
        },
      ]
    }
  ];

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Ρυθμίσεις</h1>
        </div>

        {/* Settings Groups */}
        <div className="space-y-8">
          {settingsGroups.map((group, index) => (
            <div key={index}>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 px-2">
                {group.title}
              </h2>
              <Card>
                <div className="divide-y divide-gray-100">
                  {group.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => item.href && router.push(item.href)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.label}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      {item.action}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          ))}

          {/* Notifications Toggle Section */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 px-2">
              Ειδοποιήσεις
            </h2>
            <Card>
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Email ειδοποιήσεις</h3>
                    <p className="text-sm text-gray-500">Λάβετε ενημερώσεις μέσω email</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      notifications.email ? 'bg-gray-900' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.email ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Push ειδοποιήσεις</h3>
                    <p className="text-sm text-gray-500">Ειδοποιήσεις στον browser</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      notifications.push ? 'bg-gray-900' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.push ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium text-gray-900">SMS ειδοποιήσεις</h3>
                    <p className="text-sm text-gray-500">Μηνύματα στο κινητό</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      notifications.sms ? 'bg-gray-900' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.sms ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Marketing</h3>
                    <p className="text-sm text-gray-500">Προσφορές και νέα</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, marketing: !prev.marketing }))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      notifications.marketing ? 'bg-gray-900' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.marketing ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Danger Zone */}
          <div>
            <h2 className="text-sm font-semibold text-red-500 uppercase tracking-wide mb-4 px-2">
              Επικίνδυνη ζώνη
            </h2>
            <Card>
              <div className="divide-y divide-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Αποσύνδεση</h3>
                    <p className="text-sm text-gray-500">Έξοδος από τον λογαριασμό σας</p>
                  </div>
                  <ChevronRightIcon />
                </button>
                
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                    <TrashIcon />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-red-600">Διαγραφή λογαριασμού</h3>
                    <p className="text-sm text-gray-500">Μόνιμη διαγραφή όλων των δεδομένων</p>
                  </div>
                  <ChevronRightIcon />
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Version */}
        <p className="text-center text-sm text-gray-400 mt-12">
          carpal.gr v1.0.0
        </p>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrashIcon className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Διαγραφή λογαριασμού;
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Αυτή η ενέργεια είναι μόνιμη. Όλα τα δεδομένα σας θα διαγραφούν.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowDeleteModal(false)}
              >
                Ακύρωση
              </Button>
              <Button 
                variant="danger" 
                className="flex-1"
                onClick={handleDeleteAccount}
              >
                Διαγραφή
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
