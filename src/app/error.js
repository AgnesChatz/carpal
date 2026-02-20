'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error);
    
    // Could send to Sentry, LogRocket, etc.
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }, [error]);

  return (
    <div className="min-h-screen grain-bg flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Error icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            
            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 w-24 h-24 bg-red-200 rounded-full -z-10"
            />
          </div>
        </motion.div>

        {/* Error title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Κάτι πήγε στραβά
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-8"
        >
          Λυπούμαστε, αλλά προέκυψε ένα απρόσμενο σφάλμα. 
          Η ομάδα μας έχει ενημερωθεί και εργάζεται για τη διόρθωσή του.
        </motion.p>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-4 bg-gray-100 rounded-xl text-left overflow-auto"
          >
            <p className="text-xs font-mono text-gray-600 mb-2">Error details (dev only):</p>
            <p className="text-xs font-mono text-red-600">{error.message}</p>
            {error.digest && (
              <p className="text-xs font-mono text-gray-500 mt-2">Digest: {error.digest}</p>
            )}
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Προσπάθεια Ξανά
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            Αρχική Σελίδα
          </Link>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">Χρειάζεστε βοήθεια;</p>
          <a
            href="mailto:support@carpal.gr"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <MessageCircle className="w-4 h-4" />
            Επικοινωνήστε με την υποστήριξη
          </a>
        </motion.div>

        {/* Error code for support */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-xs text-gray-400"
        >
          Error ID: {error.digest || 'unknown'} | 
          Ώρα: {new Date().toLocaleString('el-GR')}
        </motion.p>
      </div>
    </div>
  );
}
