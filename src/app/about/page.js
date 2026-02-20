'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Car, Users, Leaf, Heart, Target, Sparkles } from 'lucide-react';

const stats = [
  { number: '10,000+', label: 'Εγγεγραμμένοι χρήστες' },
  { number: '50,000+', label: 'Διαδρομές' },
  { number: '€2M+', label: 'Εξοικονόμηση χρημάτων' },
  { number: '500τ', label: 'Λιγότερο CO₂' },
];

const values = [
  {
    icon: Users,
    title: 'Κοινότητα',
    description: 'Πιστεύουμε στη δύναμη της κοινότητας και της συνεργασίας για καλύτερες μετακινήσεις.',
  },
  {
    icon: Leaf,
    title: 'Αειφορία',
    description: 'Μειώνουμε το περιβαλλοντικό αποτύπωμα κάθε διαδρομής μέσω του διαμοιρασμού.',
  },
  {
    icon: Heart,
    title: 'Εμπιστοσύνη',
    description: 'Ασφάλεια και διαφάνεια σε κάθε βήμα της εμπειρίας σας.',
  },
  {
    icon: Target,
    title: 'Αποτελεσματικότητα',
    description: 'Έξυπνες λύσεις που κάνουν τις καθημερινές μετακινήσεις πιο εύκολες.',
  },
];

const team = [
  { name: 'Γιάννης Παπαδόπουλος', role: 'Συνιδρυτής & CEO', initials: 'ΓΠ' },
  { name: 'Μαρία Κωνσταντίνου', role: 'Συνιδρυτής & CTO', initials: 'ΜΚ' },
  { name: 'Νίκος Ανδρέου', role: 'Head of Product', initials: 'ΝΑ' },
  { name: 'Ελένη Δημητρίου', role: 'Head of Operations', initials: 'ΕΔ' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen grain-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Η ιστορία μας
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Μετακινήσεις με <span className="text-blue-600">νόημα</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Το carpal γεννήθηκε από την ανάγκη για πιο έξυπνες, οικονομικές και 
            φιλικές προς το περιβάλλον μετακινήσεις στην πόλη. Από το 2024, 
            συνδέουμε οδηγούς με επιβάτες για να κάνουμε κάθε διαδρομή πιο ουσιαστική.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Η αποστολή μας
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Στο carpal, πιστεύουμε ότι οι μετακινήσεις δεν πρέπει να είναι απλώς 
                ένα μέσο για να φτάσεις από το Α στο Β. Πρέπει να είναι μια ευκαιρία 
                για να γνωρίσεις νέους ανθρώπους, να μοιραστείς ιστορίες και να 
                συμβάλεις σε ένα πιο βιώσιμο μέλλον.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Στόχος μας είναι να μειώσουμε τα άδεια αυτοκίνητα στους δρόμους, 
                να εξοικονομήσουμε χρήματα για τους χρήστες μας και να δημιουργήσουμε 
                μια κοινότητα που μοιράζεται τις ίδιες αξίες.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <blockquote className="text-xl text-gray-700 italic mb-6">
                  "Κάθε διαδρομή είναι μια ευκαιρία να γνωρίσεις κάποιον νέο 
                  και να κάνεις τον κόσμο λίγο πιο πράσινο."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-medium text-gray-700">
                    ΓΠ
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Γιάννης Παπαδόπουλος</div>
                    <div className="text-sm text-gray-500">Συνιδρυτής & CEO</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Οι αξίες μας</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Αυτά που μας καθοδηγούν σε κάθε απόφαση
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Η ομάδα μας
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Οι άνθρωποι πίσω από το carpal
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
