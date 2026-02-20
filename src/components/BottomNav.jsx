'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useAuthStore from '@/store/authStore';

// Icons
const HomeIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-gray-900' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const SearchIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-gray-900' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const AddIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-gray-900' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M12 4v16m8-8H4" />
  </svg>
);

const BookingsIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-gray-900' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ProfileIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-gray-900' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  // Don't show bottom nav on auth pages
  if (pathname.startsWith('/auth/')) {
    return null;
  }

  const isHome = pathname === '/';
  
  const navItems = [
    { href: '/', label: 'Αρχική', icon: HomeIcon },
    { href: '/main/search', label: 'Αναζήτηση', icon: SearchIcon },
    { href: '/main/listings/new', label: 'Δημοσίευση', icon: AddIcon, highlight: true },
    { href: '/main/bookings', label: 'Κρατήσεις', icon: BookingsIcon },
    { href: '/main/profile', label: 'Προφίλ', icon: ProfileIcon },
  ];

  return (
    <>
      {/* Spacer for content */}
      <div className="h-16 lg:hidden" />
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden safe-area-pb">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                } ${item.highlight ? 'relative' : ''}`}
              >
                {item.highlight ? (
                  <div className="flex items-center justify-center w-12 h-12 -mt-4 bg-gray-900 rounded-full shadow-lg">
                    <Icon active={isActive} />
                  </div>
                ) : (
                  <Icon active={isActive} />
                )}
                <span className={`text-[10px] mt-0.5 ${item.highlight ? 'mt-1' : ''} ${isActive ? 'font-medium' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
