'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button, Card } from '@/components/ui';

// Icons
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MessageIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const ChevronDownIcon = ({ open }) => (
  <svg 
    className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

export default function HelpPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      category: 'Γενικά',
      question: 'Τι είναι το carpal.gr;',
      answer: 'Το carpal.gr είναι μια πλατφόρμα carpooling που σας επιτρέπει να μοιράζεστε διαδρομές με άλλους επιβάτες και να μειώνετε τα έξοδα καυσίμων.'
    },
    {
      id: 2,
      category: 'Κρατήσεις',
      question: 'Πώς κάνω κράτηση;',
      answer: 'Αναζητήστε τη διαδρομή σας, επιλέξτε ημερομηνία και θέσεις, και πατήστε "Κράτηση τώρα". Θα μεταφερθείτε στην πληρωμή για να ολοκληρώσετε την κράτηση.'
    },
    {
      id: 3,
      category: 'Πληρωμές',
      question: 'Πώς γίνονται οι πληρωμές;',
      answer: 'Οι πληρωμές γίνονται μέσω Stripe με ασφάλεια. Δεχόμαστε κάρτες Visa, Mastercard και άλλες.'
    },
    {
      id: 4,
      category: 'Ασφάλεια',
      question: 'Είναι ασφαλές;',
      answer: 'Ναι! Όλοι οι οδηγοί επαληθεύονται, οι διαδρομές είναι ασφαλισμένες, και μπορείτε να δείτε κριτικές πριν κάνετε κράτηση.'
    },
    {
      id: 5,
      category: 'Ακυρώσεις',
      question: 'Πώς ακυρώνω κράτηση;',
      answer: 'Μπορείτε να ακυρώσετε δωρεάν έως 24 ώρες πριν τη διαδρομή. Μετά εφαρμόζονται χρεώσεις ακύρωσης.'
    },
    {
      id: 6,
      category: 'Οδηγοί',
      question: 'Πώς γίνομαι οδηγός;',
      answer: 'Εγγραφείτε, πηγαίνετε στο προφίλ σας, επιλέξτε "Γίνετε οδηγός" και συμπληρώστε τα στοιχεία του οχήματός σας.'
    }
  ];

  const categories = [
    {
      icon: <UserIcon />,
      title: 'Λογαριασμός',
      description: 'Εγγραφή, σύνδεση, προφίλ',
      articles: 12
    },
    {
      icon: <CarIcon />,
      title: 'Διαδρομές',
      description: 'Αναζήτηση, κράτηση, ακύρωση',
      articles: 8
    },
    {
      icon: <CreditCardIcon />,
      title: 'Πληρωμές',
      description: 'Τρόποι πληρωμής, τιμολόγια',
      articles: 6
    },
    {
      icon: <ShieldIcon />,
      title: 'Ασφάλεια',
      description: 'Πολιτικές, ασφάλεια',
      articles: 5
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Πώς μπορούμε να βοηθήσουμε;
          </h1>
          <p className="text-gray-600 text-lg">
            Αναζητήστε απαντήσεις ή επικοινωνήστε μαζί μας
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Αναζήτηση βοήθειας..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        {/* Categories */}
        {!searchQuery && (
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {categories.map((cat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700">
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                    <p className="text-sm text-gray-500">{cat.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{cat.articles} άρθρα</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchQuery ? 'Αποτελέσματα αναζήτησης' : 'Συχνές ερωτήσεις'}
          </h2>
          
          <div className="space-y-3">
            {filteredFaqs.map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {faq.category}
                    </span>
                    <h3 className="font-medium text-gray-900 mt-2">{faq.question}</h3>
                  </div>
                  <ChevronDownIcon open={openFaq === faq.id} />
                </button>
                
                {openFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
            
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Δεν βρέθηκαν αποτελέσματα για "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageIcon className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Chat</h3>
            <p className="text-sm text-gray-500 mb-4">Συνομιλήστε με την υποστήριξη</p>
            <Button variant="outline" size="sm" className="w-full">
              Έναρξη chat
            </Button>
          </Card>
          
          <Card className="text-center p-6">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-sm text-gray-500 mb-4">support@carpal.gr</p>
            <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.href = 'mailto:support@carpal.gr'}>
              Αποστολή email
            </Button>
          </Card>
          
          <Card className="text-center p-6">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <PhoneIcon className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Τηλέφωνο</h3>
            <p className="text-sm text-gray-500 mb-4">+30 210 123 4567</p>
            <p className="text-xs text-gray-400">Δευ-Παρ 9:00-18:00</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
