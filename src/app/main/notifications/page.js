'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button, Card, Badge } from '@/components/ui';
import useAuthStore from '@/store/authStore';

// Icons
const BellIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const BookingIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// Mock notifications
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'booking',
    title: 'Νέα κράτηση!',
    message: 'Ο Γιάννης κάνει κράτηση για αύριο (08:00) Καλαμαριά → Εύοσμος',
    time: '5 λεπτά πριν',
    read: false,
    action: '/main/driver/bookings'
  },
  {
    id: '2',
    type: 'message',
    title: 'Νέο μήνυμα',
    message: 'Μαρία: "Θα είμαι στο σημείο συνάντησης 5 λεπτά νωρίτερα"',
    time: '30 λεπτά πριν',
    read: false,
    action: '/main/messages'
  },
  {
    id: '3',
    type: 'booking',
    title: 'Κράτηση επιβεβαιώθηκε',
    message: 'Η κράτησή σας για Παρασκευή 08:00 επιβεβαιώθηκε',
    time: '2 ώρες πριν',
    read: true,
    action: '/main/bookings'
  },
  {
    id: '4',
    type: 'system',
    title: 'Επίτευγμα!',
    message: 'Συμπληρώσατε 10 διαδρομές. Λάβετε το badge "Super Οδηγός"!',
    time: '1 μέρα πριν',
    read: true,
    action: '/main/profile'
  },
  {
    id: '5',
    type: 'booking',
    title: 'Αξιολόγηση',
    message: 'Πώς ήταν η διαδρομή με τον Γιώργο; Αφήστε κριτική',
    time: '2 μέρες πριν',
    read: true,
    action: '/main/bookings'
  }
];

export default function NotificationsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'booking':
        return <BookingIcon />;
      case 'message':
        return <MessageIcon />;
      default:
        return <BellIcon />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'booking':
        return 'bg-blue-100 text-blue-600';
      case 'message':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-purple-100 text-purple-600';
    }
  };

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ειδοποιήσεις</h1>
              <p className="text-gray-500">
                {unreadCount > 0 ? `${unreadCount} μη αναγνωσμένες` : 'Όλες οι ειδοποιήσεις'}
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <CheckIcon />
              <span className="ml-2">Όλες διαβασμένες</span>
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'all', label: 'Όλες', count: notifications.length },
            { id: 'unread', label: 'Μη αναγνωσμένες', count: unreadCount },
            { id: 'read', label: 'Διαβασμένες', count: notifications.length - unreadCount },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filter === f.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f.label}
              <span className="ml-2 text-xs opacity-70">({f.count})</span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BellIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Δεν υπάρχουν ειδοποιήσεις
            </h3>
            <p className="text-gray-500">
              {filter === 'unread' 
                ? 'Όλες οι ειδοποιήσεις έχουν διαβαστεί!' 
                : 'Θα λάβετε ειδοποιήσεις για κρατήσεις και μηνύματα.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`overflow-hidden transition-all ${
                  !notification.read ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="p-4 flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    getIconBg(notification.type)
                  }`}>
                    {getIcon(notification.type)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className={`font-semibold ${
                          !notification.read ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.time}
                        </p>
                      </div>
                      
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-3">
                      <Link href={notification.action}>
                        <Button size="sm" variant="outline">
                          Προβολή
                        </Button>
                      </Link>
                      
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckIcon />
                          <span className="ml-1">Σήμανση ως διαβασμένο</span>
                        </Button>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
