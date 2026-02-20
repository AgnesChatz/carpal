'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import { Button } from './ui';
import { 
  User, 
  Calendar, 
  Heart, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Car,
  Bell,
  ChevronDown,
  Wallet
} from 'lucide-react';

// Mock notifications for dropdown
const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Νέα κράτηση!', message: 'Ο Γιάννης έκανε κράτηση', time: '5 λεπτά πριν', read: false },
  { id: 2, title: 'Νέο μήνυμα', message: 'Μαρία: Θα είμαι εκεί...', time: '30 λεπτά πριν', read: false },
  { id: 3, title: 'Κράτηση επιβεβαιώθηκε', message: 'Παρασκευή 08:00', time: '2 ώρες πριν', read: true },
];

export function Navbar() {
  const { user, userPublic, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  // Close panels when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifPanelOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;
  const isDriver = userPublic?.roleFlags?.isDriver;

  // Profile menu items
  const profileMenuItems = [
    { href: '/main/profile', label: 'Το Προφίλ μου', icon: User },
    { href: '/main/bookings', label: 'Οι Κρατήσεις μου', icon: Calendar },
    { href: '/main/favorites', label: 'Αγαπημένα', icon: Heart },
    { href: '/main/messages', label: 'Μηνύματα', icon: MessageSquare },
    ...(isDriver ? [{ href: '/main/driver/earnings', label: 'Έσοδα', icon: Wallet }] : []),
    { href: '/main/settings', label: 'Ρυθμίσεις', icon: Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">carpal</span>
            <span className="text-xl font-bold text-gray-400">.gr</span>
          </Link>

          {/* Desktop Navigation - Only main links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/main/search"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all text-sm font-medium"
            >
              Αναζήτηση
            </Link>
            {isAuthenticated && isDriver && (
              <Link
                href="/main/listings/new"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all text-sm font-medium"
              >
                Δημιουργία
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {/* Become Driver Button - Only show if not already a driver */}
                {!isDriver && (
                  <Link
                    href="/become-driver"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-sm hover:shadow-md"
                  >
                    <Car className="w-5 h-5" />
                    Γίνε Οδηγός
                  </Link>
                )}

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setNotifPanelOpen(!notifPanelOpen)}
                    className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <Bell className="w-6 h-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    )}
                  </button>

                  {/* Notification Panel */}
                  {notifPanelOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Ειδοποιήσεις</h3>
                        {unreadCount > 0 && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                            {unreadCount} νέες
                          </span>
                        )}
                      </div>
                      
                      <div className="max-h-80 overflow-y-auto">
                        {MOCK_NOTIFICATIONS.length === 0 ? (
                          <div className="p-8 text-center text-gray-500">
                            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>Καμία ειδοποίηση</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-100">
                            {MOCK_NOTIFICATIONS.map((notif) => (
                              <div
                                key={notif.id}
                                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                                  !notif.read ? 'bg-blue-50/50' : ''
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  {!notif.read && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-medium text-sm ${!notif.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                      {notif.title}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">{notif.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <Link
                        href="/main/notifications"
                        onClick={() => setNotifPanelOpen(false)}
                        className="block p-4 text-center text-sm font-medium text-gray-600 hover:bg-gray-50 border-t border-gray-100 transition-colors"
                      >
                        Όλες οι ειδοποιήσεις →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="max-w-[100px] truncate text-sm font-medium">{user?.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Menu */}
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      {/* User Info Header */}
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        {isDriver && (
                          <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            <Car className="w-3 h-3" />
                            Οδηγός
                          </span>
                        )}
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {profileMenuItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setProfileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <item.icon className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </Link>
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100"></div>

                      {/* Logout */}
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Αποσύνδεση</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">Σύνδεση</Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg px-4">Εγγραφή</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              <Link
                href="/main/search"
                className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Αναζήτηση
              </Link>
              {isAuthenticated && isDriver && (
                <Link
                  href="/main/listings/new"
                  className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Δημιουργία
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    href="/main/profile"
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Προφίλ
                  </Link>
                  <Link
                    href="/main/bookings"
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Κρατήσεις
                  </Link>
                  <Link
                    href="/main/favorites"
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Αγαπημένα
                  </Link>
                  <Link
                    href="/main/messages"
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Μηνύματα
                  </Link>
                  {isDriver && (
                    <Link
                      href="/main/driver/earnings"
                      className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Έσοδα
                    </Link>
                  )}
                  <Link
                    href="/main/settings"
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ρυθμίσεις
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="px-4 py-3 text-left text-red-600 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    Αποσύνδεση
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Σύνδεση
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-3 text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Εγγραφή
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
