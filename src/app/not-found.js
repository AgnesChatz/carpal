'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car, Home, Search, MapPin } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen grain-bg flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Animated car */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                x: [0, 10, 0],
                rotate: [0, -2, 2, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Car className="w-32 h-32 text-blue-600 mx-auto" strokeWidth={1.5} />
            </motion.div>
            
            {/* Question mark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-yellow-900">?</span>
            </motion.div>
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-8xl font-bold text-gray-900 mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-semibold text-gray-800 mb-4"
        >
          Χαθήκατε στο δρόμο;
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 mb-8"
        >
          Η σελίδα που ψάχνετε δεν υπάρχει ή έχει μετακινηθεί. 
          Μην ανησυχείτε, θα σας βοηθήσουμε να βρείτε τον προορισμό σας!
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            Αρχική Σελίδα
          </Link>
          
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <Search className="w-5 h-5" />
            Αναζήτηση Διαδρομής
          </Link>
        </motion.div>

        {/* Popular destinations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">Δημοφιλείς προορισμοί</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Θεσσαλονίκη → Αθήνα', 'Θεσσαλονίκη → Βόλος', 'Θεσσαλονίκη → Ιωάννινα'].map((route) => (
              <Link
                key={route}
                href={`/search?route=${encodeURIComponent(route)}`}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full transition-colors"
              >
                <MapPin className="w-3 h-3" />
                {route}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Fun fact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-xs text-gray-400"
        >
          💡 Γνωρίζατε ότι η μέση απόσταση από το κέντρο της Θεσσαλονίκης 
          σε οποιοδήποτε σημείο είναι μόλις 15 λεπτά;
        </motion.p>
      </div>
    </div>
  );
}
