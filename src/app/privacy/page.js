'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, Mail, FileText, Globe, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const privacySections = [
  {
    id: 'collect',
    icon: Database,
    title: 'Τι Δεδομένα Συλλέγουμε',
    color: 'bg-blue-100 text-blue-600',
    items: [
      'Προσωπικά στοιχεία (ονοματεπώνυμο, email, τηλέφωνο)',
      'Στοιχεία οχήματος (για οδηγούς)',
      'Δεδομένα τοποθεσίας (με τη συγκατάθεσή σας)',
      'Ιστορικό διαδρομών και κρατήσεων',
      'Μηνύματα με άλλους χρήστες',
      'Αξιολογήσεις και κριτικές',
    ],
  },
  {
    id: 'use',
    icon: Eye,
    title: 'Πώς Χρησιμοποιούμε τα Δεδομένα',
    color: 'bg-green-100 text-green-600',
    items: [
      'Σύνδεση οδηγών με επιβάτες',
      'Επεξεργασία πληρωμών',
      'Αποστολή ειδοποιήσεων και updates',
      'Βελτίωση της υπηρεσίας μας',
      'Πρόληψη απάτης και κατάχρησης',
      'Συμμόρφωση με νομικές υποχρεώσεις',
    ],
  },
  {
    id: 'share',
    icon: Globe,
    title: 'Με Ποιους Μοιραζόμαστε Δεδομένα',
    color: 'bg-purple-100 text-purple-600',
    items: [
      'Άλλοι χρήστες (μόνο όσα είναι απαραίτητα)',
      'Πάροχοι πληρωμών (Stripe)',
      'Υπηρεσίες hosting και analytics',
      'Αρχές (μόνο όταν απαιτείται από το νόμο)',
    ],
  },
  {
    id: 'rights',
    icon: UserCheck,
    title: 'Τα Δικαιώματά σας (GDPR)',
    color: 'bg-orange-100 text-orange-600',
    items: [
      'Δικαίωμα πρόσβασης στα δεδομένα σας',
      'Δικαίωμα διόρθωσης λαθών',
      'Δικαίωμα διαγραφής ("δικαίωμα στη λήθη")',
      'Δικαίωμα περιορισμού επεξεργασίας',
      'Δικαίωμα φορητότητας δεδομένων',
      'Δικαίωμα εναντίωσης στην επεξεργασία',
    ],
  },
];

const securityFeatures = [
  { icon: Lock, title: 'Κρυπτογράφηση SSL/TLS', desc: 'Όλες οι συνδέσεις είναι κρυπτογραφημένες' },
  { icon: Shield, title: 'Ασφαλής Αποθήκευση', desc: 'Τα δεδομένα σας φυλάσσονται σε ασφαλείς servers' },
  { icon: Clock, title: 'Περιορισμένη Διατήρηση', desc: 'Διατηρούμε δεδομένα μόνο όσο είναι απαραίτητο' },
  { icon: UserCheck, title: 'Έλεγχος Πρόσβασης', desc: 'Μόνο εξουσιοδοτημένο προσωπικό έχει πρόσβαση' },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen grain-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6"
          >
            <Shield className="w-4 h-4" />
            Προστασία Δεδομένων
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Πολιτική <span className="text-blue-600">Απορρήτου</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Τα δεδομένα σας είναι ασφαλή μαζί μας. Μάθετε πώς συλλέγουμε, 
            χρησιμοποιούμε και προστατεύουμε τις πληροφορίες σας.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-400 mt-4"
          >
            Τελευταία ενημέρωση: 19 Φεβρουαρίου 2026
          </motion.p>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <FileText className="w-7 h-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Συνοπτικά</h2>
            </div>
            <p className="text-blue-100 text-lg leading-relaxed mb-6">
              Το carpal.gr δεσμεύεται να προστατεύει το απόρρητό σας. Συλλέγουμε μόνο τα 
              απαραίτητα δεδομένα για τη λειτουργία της υπηρεσίας, τα διατηρούμε ασφαλή, 
              και δεν τα πωλούμε ποτέ σε τρίτους. Έχετε πλήρη έλεγχο των δεδομένων σας 
              σύμφωνα με τον GDPR.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#rights"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
              >
                Τα δικαιώματά σας
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Επικοινωνία DPO
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {privacySections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 ${section.color} rounded-2xl flex items-center justify-center`}>
                    <section.icon className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Μέτρα Ασφάλειας
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Λαμβάνουμε σοβαρά την ασφάλεια των δεδομένων σας
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-gray-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact DPO */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Υπεύθυνος Προστασίας Δεδομένων
                </h2>
                <p className="text-gray-400 mb-6">
                  Για οποιαδήποτε ερώτηση σχετικά με την προστασία των δεδομένων σας, 
                  επικοινωνήστε με τον DPO μας.
                </p>
                <div className="space-y-2 text-gray-300">
                  <p>Email: dpo@carpal.gr</p>
                  <p>Διεύθυνση: Θεσσαλονίκη, Ελλάδα</p>
                </div>
              </div>
              <Link
                href="mailto:dpo@carpal.gr"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5" />
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
