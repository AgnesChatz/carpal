'use client';

import Link from 'next/link';
import { Button } from './Button';

const emptyStates = {
  search: {
    icon: SearchIcon,
    title: 'Κανείς δεν πάει εκεί αυτή τη στιγμή',
    message: 'Γίνε ο πρώτος οδηγός και κέρδισε από το δρομολόγιό σου!',
    action: { label: 'Δημιούργησε διαδρομή', href: '/main/listings/new' }
  },
  bookings: {
    icon: CalendarIcon,
    title: 'Καμία κράτηση ακόμα',
    message: 'Ώρα για νέες περιπέτειες! Βρες την επόμενη διαδρομή σου.',
    action: { label: 'Αναζήτηση διαδρομών', href: '/main/search' }
  },
  messages: {
    icon: MessageIcon,
    title: 'Τα εισερχόμενά σου είναι ήσυχα',
    message: 'Κάνε κράτηση για να ξεκινήσεις συζήτηση με οδηγούς.',
    action: { label: 'Βρες διαδρομή', href: '/main/search' }
  },
  favorites: {
    icon: HeartIcon,
    title: 'Κανένας αγαπημένος οδηγός',
    message: 'Όταν βρεις οδηγό που σου αρέσει, αποθήκευσέ τον εδώ για γρήγορη πρόσβαση.',
    action: { label: 'Αναζήτηση', href: '/main/search' }
  },
  notifications: {
    icon: BellIcon,
    title: 'Όλα ήσυχα εδώ!',
    message: 'Θα σε ενημερώσουμε όταν έχεις νέες κρατήσεις ή μηνύματα.',
    action: null
  },
  driverBookings: {
    icon: CarIcon,
    title: 'Κανείς δεν έχει κλείσει ακόμα',
    message: 'Μην ανησυχείς! Οι επιβάτες θα έρθουν σύντομα.',
    action: { label: 'Προώθησε τη διαδρομή σου', href: '/main/listings/edit' }
  },
  earnings: {
    icon: MoneyIcon,
    title: 'Ξεκίνα να κερδίζεις!',
    message: 'Δημιούργησε την πρώτη σου διαδρομή και άρχισε να εξοικονομείς στα καύσιμα.',
    action: { label: 'Δημιούργησε διαδρομή', href: '/main/listings/new' }
  }
};

export function EmptyState({ type = 'search', custom = null }) {
  const config = custom || emptyStates[type] || emptyStates.search;
  const Icon = config.icon;

  return (
    <div className="text-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{config.title}</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">{config.message}</p>
      {config.action && (
        <Link href={config.action.href}>
          <Button>{config.action.label}</Button>
        </Link>
      )}
    </div>
  );
}

function SearchIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function MessageIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function BellIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

function CarIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  );
}

function MoneyIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default EmptyState;
