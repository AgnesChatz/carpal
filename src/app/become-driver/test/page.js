'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Car, User, ArrowRight } from 'lucide-react';

export default function TestDriverSignupPage() {
  const [userType, setUserType] = useState('passenger'); // 'passenger' or 'driver'

  useEffect(() => {
    // Set a test session in localStorage
    if (userType === 'passenger') {
      localStorage.setItem('carpal_mock_session', JSON.stringify({
        user: {
          $id: 'user-test-123',
          name: 'Τέστο Χρήστης',
          email: 'testpassenger@carpal.gr',
          phone: '+30 690 999 9999'
        },
        userPublic: {
          userId: 'user-test-123',
          displayName: 'Τέστο Χρήστης',
          roleFlags: { isDriver: false }, // NOT a driver
          homeCity: 'Θεσσαλονίκη'
        },
        userPrivate: {
          userId: 'user-test-123',
          phoneVerified: true,
          idVerified: false,
          driverLicenseVerified: false,
        }
      }));
    } else {
      localStorage.setItem('carpal_mock_session', JSON.stringify({
        user: {
          $id: 'user-test-456',
          name: 'Τέστο Οδηγός',
          email: 'testdriver@carpal.gr',
          phone: '+30 690 888 8888'
        },
        userPublic: {
          userId: 'user-test-456',
          displayName: 'Τέστο Οδηγός',
          roleFlags: { isDriver: true }, // IS a driver
          homeCity: 'Θεσσαλονίκη'
        },
        userPrivate: {
          userId: 'user-test-456',
          phoneVerified: true,
          idVerified: true,
          driverLicenseVerified: true,
        }
      }));
    }
    
    // Reload to apply changes
    window.location.reload();
  }, [userType]);

  return (
    <div className="min-h-screen grain-bg">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Test Mode: Driver Registration
            </h1>
            <p className="text-gray-600">
              Επιλέξτε τον τύπο χρήστη για να δοκιμάσετε τη ροή εγγραφής οδηγού
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Passenger Option */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setUserType('passenger')}
              className="bg-white rounded-3xl shadow-lg border-2 border-blue-500 p-8 text-left hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Επιβάτης
              </h2>
              <p className="text-gray-600 mb-6">
                Δοκιμάστε τη ροή εγγραφής ως απλός χρήστης που θέλει να γίνει οδηγός. 
                Θα δείτε το κουμπί "Γίνε Οδηγός" στο Navbar.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                Δοκιμή εγγραφής οδηγού
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.button>

            {/* Driver Option */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setUserType('driver')}
              className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 p-8 text-left hover:shadow-xl transition-all hover:border-green-500 group"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Car className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Οδηγός
              </h2>
              <p className="text-gray-600 mb-6">
                Δοκιμάστε τη ροή ως εγγεγραμμένος οδηγός. Το κουμπί "Γίνε Οδηγός" 
                δεν θα εμφανίζεται.
              </p>
              <div className="flex items-center gap-2 text-green-600 font-medium">
                Δοκιμή ως οδηγός
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500 mb-4">
              Η σελίδα θα ανανεωθεί αυτόματα μετά την επιλογή
            </p>
            <Link
              href="/"
              className="text-blue-600 hover:underline"
            >
              Επιστροφή στην αρχική
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
