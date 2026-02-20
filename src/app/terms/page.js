'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Scale, FileText, Users, Shield, CreditCard, AlertTriangle, CheckCircle, Clock, ChevronRight, Gavel } from 'lucide-react';
import Link from 'next/link';

const termsSections = [
  {
    id: 'acceptance',
    icon: FileText,
    title: 'Αποδοχή Όρων',
    color: 'bg-blue-100 text-blue-600',
    content: `Χρησιμοποιώντας το carpal.gr, συμφωνείτε με τους παρόντες όρους χρήσης. 
    Αν δεν συμφωνείτε, παρακαλούμε μην χρησιμοποιείτε την πλατφόρμα μας. 
    Διατηρούμε το δικαίωμα να τροποποιούμε τους όρους ανά πάσα στιγμή.`,
  },
  {
    id: 'definitions',
    icon: Users,
    title: 'Ορισμοί',
    color: 'bg-green-100 text-green-600',
    items: [
      { term: 'Πλατφόρμα', def: 'Η ιστοσελίδα και εφαρμογή carpal.gr' },
      { term: 'Οδηγός', def: 'Χρήστης που προσφέρει διαθέσιμες θέσεις' },
      { term: 'Επιβάτης', def: 'Χρήστης που κλείνει θέση σε διαδρομή' },
      { term: 'Διαδρομή', def: 'Μετακίνηση από σημείο Α σε σημείο Β' },
      { term: 'Κράτηση', def: 'Η δέσμευση θέσης από επιβάτη' },
    ],
  },
  {
    id: 'eligibility',
    icon: CheckCircle,
    title: 'Προϋποθέσεις Χρήσης',
    color: 'bg-purple-100 text-purple-600',
    items: [
      'Ηλικία τουλάχιστον 18 ετών',
      'Έγκυρη άδεια οδήγησης (για οδηγούς)',
      'Ασφαλισμένο όχημα σε καλή κατάσταση',
      'Ακριβείς και πλήρεις πληροφορίες προφίλ',
      'Συμμόρφωση με τους κανόνες οδικής κυκλοφορίας',
    ],
  },
  {
    id: 'conduct',
    icon: Users,
    title: 'Κανόνες Συμπεριφοράς',
    color: 'bg-orange-100 text-orange-600',
    items: [
      'Σεβασμός προς όλους τους χρήστες',
      'Συνέπεια στις ώρες συνάντησης',
      'Καθαρό και ασφαλές όχημα',
      'Απαγορεύεται το κάπνισμα χωρίς συναίνεση',
      'Απαγορεύεται η κατανάλωση αλκοόλ',
      'Τήρηση των κανόνων οδικής ασφάλειας',
    ],
  },
];

const cancellationPolicy = [
  { time: '> 24 ώρες', refund: '100%', color: 'text-green-600 bg-green-50' },
  { time: '2-24 ώρες', refund: '50%', color: 'text-yellow-600 bg-yellow-50' },
  { time: '< 2 ώρες', refund: '0%', color: 'text-red-600 bg-red-50' },
];

const importantNotes = [
  {
    icon: Shield,
    title: 'Ασφάλεια',
    desc: 'Το carpal είναι πλατφόρμα σύνδεσης, όχι μεταφορέας. Οι οδηγοί είναι ανεξάρτητοι συνεργάτες.',
  },
  {
    icon: CreditCard,
    title: 'Πληρωμές',
    desc: 'Όλες οι πληρωμές γίνονται μέσω της πλατφόρμας. Απαγορεύεται η μετρητοίς συναλλαγή.',
  },
  {
    icon: AlertTriangle,
    title: 'Ακυρώσεις',
    desc: 'Συχνές ακυρώσεις μπορεί να οδηγήσουν σε προσωρινό ή μόνιμο αποκλεισμό.',
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen grain-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-6"
          >
            <Scale className="w-4 h-4" />
            Νομικά
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Όροι <span className="text-blue-600">Χρήσης</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Οι κανόνες που διέπουν τη χρήση της πλατφόρμας μας. 
            Διαβάστε τους προσεκτικά πριν ξεκινήσετε.
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
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <Gavel className="w-7 h-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Συνοπτικά</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <p className="leading-relaxed">
                Το carpal.gr είναι μια πλατφόρμα διαμοιρασμού διαδρομών. Δεν είμαστε 
                μεταφορική εταιρεία - απλώς συνδέουμε οδηγούς με επιβάτες. Όλοι οι 
                χρήστες πρέπει να είναι άνω των 18, να σέβονται τους άλλους και να 
                ακολουθούν τους κανόνες ασφάλειας.
              </p>
              <p className="leading-relaxed">
                Οι πληρωμές γίνονται μόνο μέσω της πλατφόρμας. Η ακύρωση κράτησης 
                είναι δυνατή με επιστροφή χρημάτων ανάλογα με το χρόνο. Συχνές 
                ακυρώσεις ή παραβάσεις οδηγούν σε αποκλεισμό.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {termsSections.map((section, index) => (
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
                
                {section.content && (
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                )}
                
                {section.items && (
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        {typeof item === 'string' ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            {item}
                          </>
                        ) : (
                          <div className="flex-1">
                            <span className="font-medium text-gray-900">{item.term}:</span>
                            <span className="text-gray-600 ml-1">{item.def}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Πολιτική Ακυρώσεων
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Η επιστροφή χρημάτων εξαρτάται από το χρόνο ακύρωσης
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {cancellationPolicy.map((policy, index) => (
              <motion.div
                key={policy.time}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{policy.time}</h3>
                <div className={`inline-block px-4 py-2 rounded-full text-2xl font-bold ${policy.color}`}>
                  {policy.refund}
                </div>
                <p className="text-gray-500 text-sm mt-2">επιστροφή</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Σημαντικές Σημειώσεις
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {importantNotes.map((note, index) => (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <note.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{note.title}</h3>
                <p className="text-gray-600 text-sm">{note.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Έχετε Ερωτήσεις;
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Αν χρειάζεστε διευκρινίσεις για τους όρους χρήσης, 
              η ομάδα μας είναι εδώ να βοηθήσει.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-medium hover:bg-blue-50 transition-colors"
              >
                Επικοινωνία
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/30 transition-colors"
              >
                Δείτε το FAQ
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
