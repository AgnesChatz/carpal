'use client';

import { useState, useEffect } from 'react';
import { Modal } from './Modal';

const SHORTCUTS = [
  { key: '?', description: 'Εμφάνιση συντομεύσεων' },
  { key: 'S', description: 'Αναζήτηση' },
  { key: 'B', description: 'Κρατήσεις μου' },
  { key: 'M', description: 'Μηνύματα' },
  { key: 'P', description: 'Προφίλ' },
  { key: 'N', description: 'Νέα διαδρομή' },
  { key: 'Esc', description: 'Κλείσιμο/Πίσω' },
  { key: '/', description: 'Εστίαση στην αναζήτηση' }
];

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();

      switch (key) {
        case '?':
          e.preventDefault();
          setIsOpen(true);
          break;
        case 's':
          e.preventDefault();
          window.location.href = '/main/search';
          break;
        case 'b':
          e.preventDefault();
          window.location.href = '/main/bookings';
          break;
        case 'm':
          e.preventDefault();
          window.location.href = '/main/messages';
          break;
        case 'p':
          e.preventDefault();
          window.location.href = '/main/profile';
          break;
        case 'n':
          e.preventDefault();
          window.location.href = '/main/listings/new';
          break;
        case 'escape':
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Help hint */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors z-40"
        title="Συντομεύσεις πληκτρολογίου (?)"
      >
        <span className="text-lg font-bold">?</span>
      </button>

      {/* Shortcuts modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Συντομεύσεις πληκτρολογίου
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {SHORTCUTS.map((shortcut) => (
                <div
                  key={shortcut.key}
                  className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <span className="text-gray-600 dark:text-gray-300">
                    {shortcut.description}
                  </span>
                  <kbd className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-gray-400 text-center">
              Πατήστε ? για να εμφανίσετε αυτό το παράθυρο οποιαδήποτε στιγμή
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default KeyboardShortcuts;
