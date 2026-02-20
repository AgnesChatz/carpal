'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Cookie, Shield, Settings, Info, Check } from 'lucide-react';
import Link from 'next/link';

const cookieTypes = [
  {
    id: 'necessary',
    title: 'Απαραίτητα Cookies',
    description: 'Αυτά τα cookies είναι απαραίτητα για τη λειτουργία του website και δεν μπορούν να απενεργοποιηθούν.',
    examples: ['Σύνδεση χρήστη', 'Ασφάλεια', 'Προτιμήσεις συναίνεσης'],
    required: true,
  },
  {
    id: 'analytics',
    title: 'Analytics Cookies',
    description: 'Μας βοηθούν να κατανοήσουμε πώς χρησιμοποιείτε το website για να το βελτιώσουμε.',
    examples: ['Google Analytics', 'Στατιστικά επισκεψιμότητας', 'Επιδόσεις σελίδων'],
    required: false,
  },
  {
    id: 'marketing',
    title: 'Marketing Cookies',
    description: 'Χρησιμοποιούνται για να σας παρέχουμε προσωποποιημένες διαφημίσεις και προσφορές.',
    examples: ['Facebook Pixel', 'Google Ads', 'Εξατομικευμένο περιεχόμενο'],
    required: false,
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen grain-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6"
            >
              <Cookie className="w-4 h-4" />
              Πολιτική Cookies
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Τι είναι τα <span className="text-orange-600">Cookies</span>;
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Μάθετε πώς χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* What are Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Τι είναι τα Cookies;
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας 
                  όταν επισκέπτεστε ένα website. Χρησιμοποιούνται για να "θυμούνται" 
                  τις προτιμήσεις σας και να βελτιώνουν την εμπειρία περιήγησης.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Στο carpal.gr χρησιμοποιούμε cookies για να εξασφαλίσουμε τη σωστή 
                  λειτουργία του website, να αναλύσουμε την επισκεψιμότητα και να σας 
                  παρέχουμε εξατομικευμένο περιεχόμενο.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cookie Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Τύποι Cookies που Χρησιμοποιούμε
            </h2>
            <div className="space-y-4">
              {cookieTypes.map((type) => (
                <div
                  key={type.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        type.required ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {type.required ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Settings className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{type.title}</h3>
                        {type.required && (
                          <span className="text-xs text-green-600 font-medium">
                            Πάντα ενεργά
                          </span>
                        )}
                      </div>
                    </div>
                    {!type.required && (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example) => (
                      <span
                        key={example}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* How to Manage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Πώς να Διαχειριστείτε τα Cookies
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Μπορείτε να διαχειριστείτε τα cookies μέσω των ρυθμίσεων του browser σας. 
                  Συνήθως μπορείτε να:
                </p>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Διαγράψετε όλα τα cookies
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Αποκλείσετε συγκεκριμένα cookies
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Ρυθμίσετε να σας ειδοποιεί πριν αποθηκευτεί ένα cookie
                  </li>
                </ul>
                <p className="text-gray-600 text-sm">
                  Σημείωση: Η απενεργοποίηση ορισμένων cookies μπορεί να επηρεάσει 
                  τη λειτουργικότητα του website.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Third Party */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cookies Τρίτων
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Συνεργαζόμαστε με αξιόπιστους τρίτους παρόχους που μπορεί να τοποθετήσουν 
              cookies στη συσκευή σας. Αυτοί περιλαμβάνουν:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Google Analytics:</strong> Για ανάλυση επισκεψιμότητας</li>
              <li><strong>Stripe:</strong> Για ασφαλείς πληρωμές</li>
              <li><strong>Social Media:</strong> Για κοινοποίηση περιεχομένου</li>
            </ul>
          </motion.div>

          {/* More Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">
              Χρειάζεστε Περισσότερες Πληροφορίες;
            </h2>
            <p className="text-orange-100 mb-6">
              Για περισσότερες πληροφορίες σχετικά με τα cookies και την προστασία δεδομένων, 
              διαβάστε την Πολιτική Απορρήτου μας ή επικοινωνήστε μαζί μας.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-orange-50 transition-colors"
              >
                Πολιτική Απορρήτου
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors"
              >
                Επικοινωνία
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
