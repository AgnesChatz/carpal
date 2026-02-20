'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Search, Book, MessageCircle, Phone, FileText, Shield, CreditCard, Car, Users } from 'lucide-react';
import Link from 'next/link';

const helpCategories = [
  {
    icon: Car,
    title: 'Για Οδηγούς',
    description: 'Πώς να δημοσιεύσετε διαδρομές και να διαχειριστείτε κρατήσεις',
    links: [
      { label: 'Πώς να δημιουργήσετε διαδρομή', href: '/help/create-listing' },
      { label: 'Διαχείριση κρατήσεων', href: '/help/manage-bookings' },
      { label: 'Πληρωμές και έσοδα', href: '/help/payments' },
      { label: 'Αξιολογήσεις οδηγών', href: '/help/driver-ratings' },
    ],
  },
  {
    icon: Users,
    title: 'Για Επιβάτες',
    description: 'Πώς να βρείτε και να κλείσετε διαδρομές',
    links: [
      { label: 'Αναζήτηση διαδρομών', href: '/help/search' },
      { label: 'Κράτηση θέσης', href: '/help/booking' },
      { label: 'Ακύρωση κράτησης', href: '/help/cancellation' },
      { label: 'Ασφάλεια επιβατών', href: '/help/passenger-safety' },
    ],
  },
  {
    icon: Shield,
    title: 'Ασφάλεια',
    description: 'Όλα όσα πρέπει να ξέρετε για την ασφάλειά σας',
    links: [
      { label: 'Επαλήθευση προφίλ', href: '/help/verification' },
      { label: 'Ασφάλεια διαδρομής', href: '/help/trip-safety' },
      { label: 'Αναφορά προβλήματος', href: '/help/report' },
      { label: 'Αποκλεισμός χρηστών', href: '/help/block' },
    ],
  },
  {
    icon: CreditCard,
    title: 'Πληρωμές',
    description: 'Πληροφορίες για πληρωμές και επιστροφές χρημάτων',
    links: [
      { label: 'Τρόποι πληρωμής', href: '/help/payment-methods' },
      { label: 'Επιστροφές χρημάτων', href: '/help/refunds' },
      { label: 'Τιμολόγια', href: '/help/invoices' },
      { label: 'Προβλήματα πληρωμής', href: '/help/payment-issues' },
    ],
  },
];

const quickGuides = [
  {
    icon: Book,
    title: 'Οδηγός Έναρξης',
    description: 'Μάθετε τα βασικά σε 5 λεπτά',
    href: '/help/getting-started',
  },
  {
    icon: FileText,
    title: 'Όροι Χρήσης',
    description: 'Διαβάστε τους όρους της υπηρεσίας',
    href: '/terms',
  },
  {
    icon: MessageCircle,
    title: 'Κοινότητα',
    description: 'Συζητήστε με άλλους χρήστες',
    href: '/community',
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen grain-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Πώς μπορούμε να <span className="text-blue-600">βοηθήσουμε</span>;
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            >
              Βρείτε απαντήσεις σε όλες τις ερωτήσεις σας
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Αναζητήστε βοήθεια..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </motion.div>
          </div>

          {/* Quick Guides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {quickGuides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <guide.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                  <p className="text-gray-500 text-sm">{guide.description}</p>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Help Categories */}
          <div className="grid md:grid-cols-2 gap-8">
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                    <p className="text-gray-500 text-sm">{category.description}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {category.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Δεν βρήκατε αυτό που ψάχνετε;
              </h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                Η ομάδα υποστήριξής μας είναι διαθέσιμη για να σας βοηθήσει με οποιαδήποτε ερώτηση.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Επικοινωνία
                </Link>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-8 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Δείτε το FAQ
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
