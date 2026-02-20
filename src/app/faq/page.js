'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const faqCategories = [
  {
    id: 'general',
    title: 'Γενικές Ερωτήσεις',
    questions: [
      {
        q: 'Τι είναι το carpal;',
        a: 'Το carpal είναι μια πλατφόρμα διαμοιρασμού διαδρομών (carpooling) που συνδέει οδηγούς με επιβάτες για καθημερινές μετακινήσεις. Στόχος μας είναι να κάνουμε τις μετακινήσεις πιο οικονομικές, φιλικές προς το περιβάλλον και κοινωνικές.',
      },
      {
        q: 'Πώς λειτουργεί;',
        a: 'Οι οδηγοί δημοσιεύουν διαθέσιμες διαδρομές και οι επιβάτες αναζητούν διαδρομές που ταιριάζουν στις ανάγκες τους. Όταν βρεθεί match, ο επιβάτης κάνει κράτηση και πληρώνει μέσω της πλατφόρμας. Ο οδηγός λαμβάνει τα χρήματα μετά την ολοκλήρωση της διαδρομής.',
      },
      {
        q: 'Είναι ασφαλές;',
        a: 'Ναι! Έχουμε πολλαπλά επίπεδα ασφάλειας: επαλήθευση προφίλ μέσω email/τηλεφώνου, αξιολογήσεις χρηστών, κοινοποίηση διαδρομής σε οικείους, και δυνατότητα αναφοράς προβληματικής συμπεριφοράς.',
      },
      {
        q: 'Σε ποιες περιοχές λειτουργείτε;',
        a: 'Προς το παρόν λειτουργούμε κυρίως στη Θεσσαλονίκη και τις γύρω περιοχές. Σχεδιάζουμε επέκταση σε άλλες πόλεις της Ελλάδας σύντομα.',
      },
    ],
  },
  {
    id: 'passengers',
    title: 'Για Επιβάτες',
    questions: [
      {
        q: 'Πώς κλείνω θέση σε διαδρομή;',
        a: 'Αναζητήστε διαδρομή εισάγοντας το σημείο αναχώρησης και προορισμού. Επιλέξτε τη διαδρομή που σας ενδιαφέρει, ελέγξτε τις λεπτομέρειες και πατήστε "Κράτηση". Ολοκληρώστε την πληρωμή και θα λάβετε επιβεβαίωση.',
      },
      {
        q: 'Πόσο κοστίζει μια διαδρομή;',
        a: 'Οι τιμές καθορίζονται από τους οδηγούς και εξαρτώνται από την απόσταση. Συνήθως κυμαίνονται από €3 έως €15 ανάλογα με τη διαδρομή. Δεν υπάρχουν κρυφές χρεώσεις.',
      },
      {
        q: 'Μπορώ να ακυρώσω την κράτησή μου;',
        a: 'Ναι, μπορείτε να ακυρώσετε ανά πάσα στιγμή. Η πολιτική επιστροφών είναι: >24 ώρες πριν = πλήρης επιστροφή, 2-24 ώρες = 50% επιστροφή, <2 ώρες = καμία επιστροφή.',
      },
      {
        q: 'Τι γίνεται αν ο οδηγός δεν εμφανιστεί;',
        a: 'Επικοινωνήστε μαζί μας άμεσα μέσω της εφαρμογής ή στο support@carpal.gr. Θα ελέγξουμε το περιστατικό και θα σας επιστρέψουμε τα χρήματα πλήρως.',
      },
    ],
  },
  {
    id: 'drivers',
    title: 'Για Οδηγούς',
    questions: [
      {
        q: 'Πώς γίνομαι οδηγός;',
        a: 'Εγγραφείτε στο carpal, ολοκληρώστε το προφίλ σας με επαλήθευση email και τηλεφώνου, και προσθέστε στοιχεία οχήματος. Μετά μπορείτε να δημοσιεύσετε την πρώτη σας διαδρομή!',
      },
      {
        q: 'Πώς πληρώνομαι;',
        a: 'Τα χρήματα κατατίθενται στον τραπεζικό σας λογαριασμό 24-48 ώρες μετά την ολοκλήρωση της διαδρομής. Μπορείτε να δείτε τα έσοδά σας στο ταμπλό οδηγού.',
      },
      {
        q: 'Πόσα χρήματα μπορώ να βγάλω;',
        a: 'Εξαρτάται από τη συχνότητα των διαδρομών σας. Οι περισσότεροι οδηγοί εξοικονομούν €100-€500 τον μήνα καλύπτοντας τα έξοδα καυσίμων και συντήρησης.',
      },
      {
        q: 'Τι γίνεται αν ο επιβάτης δεν εμφανιστεί;',
        a: 'Αν ο επιβάτης δεν εμφανιστεί εντός 10 λεπτών από τον συμφωνημένο χρόνο, μπορείτε να αναφέρετε το περιστατικό και θα λάβετε το 50% της κράτησης ως αποζημίωση.',
      },
    ],
  },
  {
    id: 'payments',
    title: 'Πληρωμές',
    questions: [
      {
        q: 'Ποιοι τρόποι πληρωμής δέχεστε;',
        a: 'Δεχόμαστε πιστωτικές/χρεωστικές κάρτες (Visa, Mastercard), Apple Pay, Google Pay, και PayPal. Όλες οι πληρωμές είναι ασφαλείς και κρυπτογραφημένες.',
      },
      {
        q: 'Πότε χρεώνομαι;',
        a: 'Η χρέωση γίνεται τη στιγμή της κράτησης, αλλά τα χρήματα κρατούνται και αποδεσμεύονται στον οδηγό μόνο μετά την ολοκλήρωση της διαδρομής.',
      },
      {
        q: 'Πώς λαμβάνω απόδειξη;',
        a: 'Μετά από κάθε διαδρομή, λαμβάνετε αυτόματα απόδειξη στο email σας. Μπορείτε επίσης να κατεβάσετε όλες τις αποδείξεις από το προφίλ σας.',
      },
      {
        q: 'Υπάρχουν κρυφές χρεώσεις;',
        a: 'Όχι! Το carpal χρεώνει μια μικρή προμήθεια 15% σε κάθε κράτηση για τη λειτουργία της πλατφόρμας. Αυτό είναι ενσωματωμένο στην τιμή που βλέπετε - δεν υπάρχουν επιπλέον χρεώσεις.',
      },
    ],
  },
  {
    id: 'safety',
    title: 'Ασφάλεια',
    questions: [
      {
        q: 'Πώς επαληθεύετε τους χρήστες;',
        a: 'Όλοι οι χρήστες πρέπει να επαληθεύσουν το email και το τηλέφωνό τους. Οι οδηγοί πρέπει επίσης να επαληθεύσουν την άδεια οδήγησης και τα στοιχεία οχήματος.',
      },
      {
        q: 'Τι κάνω αν νιώσω άβολα κατά τη διαδρομή;',
        a: 'Μπορείτε να ζητήσετε από τον οδηγό να σταματήσει σε ασφαλές σημείο και να βγείτε. Επικοινωνήστε άμεσα με την υποστήριξή μας και αναφέρετε το περιστατικό.',
      },
      {
        q: 'Μπορώ να μοιραστώ τη διαδρομή μου;',
        a: 'Ναι! Μπορείτε να κοινοποιήσετε τα στοιχεία της διαδρομής (οδηγός, όχημα, διαδρομή) σε οικείους σας μέσω WhatsApp ή SMS για extra ασφάλεια.',
      },
      {
        q: 'Πώς αναφέρω προβληματική συμπεριφορά;',
        a: 'Μετά από κάθε διαδρομή, μπορείτε να αξιολογήσετε τον οδηγό/επιβάτη. Για σοβαρά περιστατικά, χρησιμοποιήστε το κουμπί "Αναφορά" στο προφίλ του χρήστη ή επικοινωνήστε μαζί μας.',
      },
    ],
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left hover:bg-gray-50 px-4 -mx-4 rounded-lg transition-colors"
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed px-4 -mx-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});
  const [activeCategory, setActiveCategory] = useState('general');

  const toggleItem = (categoryId, questionIndex) => {
    const key = `${categoryId}-${questionIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const activeCategoryData = faqCategories.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen grain-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            Συχνές Ερωτήσεις
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Έχετε <span className="text-blue-600">ερωτήσεις</span>;
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Βρείτε γρήγορες απαντήσεις στις πιο συχνές ερωτήσεις
          </motion.p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.title}
              </button>
            ))}
          </motion.div>

          {/* Questions */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {activeCategoryData?.title}
            </h2>
            <div className="divide-y divide-gray-100">
              {activeCategoryData?.questions.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.q}
                  answer={item.a}
                  isOpen={openItems[`${activeCategory}-${index}`]}
                  onClick={() => toggleItem(activeCategory, index)}
                />
              ))}
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-4">
              Δεν βρήκατε αυτό που ψάχνετε;
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Επικοινωνήστε μαζί μας
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
