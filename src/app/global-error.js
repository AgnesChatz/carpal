'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

// Global error boundary - catches errors in the root layout
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Κρίσιμο Σφάλμα
            </h1>

            <p className="text-gray-600 mb-8">
              Η εφαρμογή αντιμετώπισε ένα σοβαρό πρόβλημα. 
              Παρακαλούμε ανανεώστε τη σελίδα.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Ανανέωση
              </button>
              
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                <Home className="w-5 h-5" />
                Αρχική
              </Link>
            </div>

            <p className="mt-8 text-xs text-gray-400">
              {error.digest && `Error ID: ${error.digest}`}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
