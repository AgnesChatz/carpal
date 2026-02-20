'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  CheckCircle, 
  Upload, 
  User, 
  CreditCard, 
  FileText, 
  Shield, 
  ChevronRight, 
  ChevronLeft,
  Camera,
  AlertCircle,
  Info
} from 'lucide-react';
import Link from 'next/link';

const steps = [
  { id: 'welcome', title: 'Καλώς ήρθατε', icon: Car },
  { id: 'personal', title: 'Προσωπικά Στοιχεία', icon: User },
  { id: 'documents', title: 'Έγγραφα', icon: FileText },
  { id: 'vehicle', title: 'Όχημα', icon: Car },
  { id: 'gdpr', title: 'Συναίνεση GDPR', icon: Shield },
  { id: 'review', title: 'Έλεγχος', icon: CheckCircle },
];

const requirements = [
  { icon: User, title: 'Ηλικία 18+', desc: 'Πρέπει να είστε ενήλικας' },
  { icon: CreditCard, title: 'Άδεια Οδήγησης', desc: 'Έγκυρη άδεια κατηγορίας Β' },
  { icon: Car, title: 'Ασφαλισμένο Όχημα', desc: 'Ιδιοκτησία ή εξουσιοδότηση' },
  { icon: Shield, title: 'Καθαρό Ποινικό Μητρώο', desc: 'Χωρίς σοβαρά αδικήματα' },
];

export default function BecomeDriverPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    idCard: null,
    license: null,
    selfie: null,
    vehicleReg: null,
    insurance: null,
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    licensePlate: '',
    gdprConsent: false,
    dataProcessingConsent: false,
    marketingConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Γίνετε Οδηγός στο Carpal
              </h2>
              <p className="text-gray-600 max-w-lg mx-auto">
                Μοιραστείτε τις διαδρομές σας, εξοικονομήστε χρήματα και γνωρίστε 
                νέους ανθρώπους. Η διαδικασία εγγραφής είναι απλή και γρήγορη.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {requirements.map((req, index) => (
                <motion.div
                  key={req.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <req.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{req.title}</h3>
                    <p className="text-sm text-gray-500">{req.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                <strong>Σημείωση:</strong> Το carpal είναι πλατφόρμα διαμοιρασμού διαδρομών 
                (carpooling), όχι υπηρεσία ταξί. Μοιράζεστε το κόστος των διαδρομών που 
                ήδη κάνετε, δεν παρέχετε εμπορικές μεταφορές.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Προσωπικά Στοιχεία</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Όνομα
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Όνομα"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Επώνυμο
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Επώνυμο"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Τηλέφωνο
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+30 690 000 0000"
              />
              <p className="text-sm text-gray-500 mt-2">
                Θα σας στείλουμε κωδικό επαλήθευσης SMS
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Έγγραφα Ταυτοποίησης (KYC)</h2>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Αστυνομική Ταυτότητα ή Διαβατήριο</h3>
                    <p className="text-sm text-gray-500">Σαφής φωτογραφία εμπρός και πίσω</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Ανέβασμα
                  </button>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Άδεια Οδήγησης</h3>
                    <p className="text-sm text-gray-500">Έγκυρη άδεια κατηγορίας Β</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Ανέβασμα
                  </button>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Camera className="w-7 h-7 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Selfie με Έγγραφο</h3>
                    <p className="text-sm text-gray-500">Κρατήστε την ταυτότητά σας δίπλα στο πρόσωπό σας</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Φωτογραφία
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <strong>Απαιτήσεις φωτογραφιών:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Καλός φωτισμός, χωρίς αντανακλάσεις</li>
                  <li>Όλα τα στοιχεία διακριτά</li>
                  <li>Μη ληγμένα έγγραφα</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Στοιχεία Οχήματος</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Μάρκα
                </label>
                <input
                  type="text"
                  value={formData.vehicleMake}
                  onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="π.χ. Toyota"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Μοντέλο
                </label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="π.χ. Corolla"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Χρονολογία
                </label>
                <input
                  type="number"
                  value={formData.vehicleYear}
                  onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="π.χ. 2020"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Χρώμα
                </label>
                <input
                  type="text"
                  value={formData.vehicleColor}
                  onChange={(e) => setFormData({ ...formData, vehicleColor: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="π.χ. Ασημί"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Αριθμός Κυκλοφορίας
              </label>
              <input
                type="text"
                value={formData.licensePlate}
                onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                placeholder="π.χ. NIE-1234"
              />
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-7 h-7 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Άδεια Κυκλοφορίας</h3>
                    <p className="text-sm text-gray-500">Έγκυρη άδεια οχήματος</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Ανέβασμα
                  </button>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-7 h-7 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Ασφάλεια Οχήματος</h3>
                    <p className="text-sm text-gray-500">Έγκυρο ασφαλιστήριο συμβόλαιο</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Ανέβασμα
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Συναίνεση GDPR</h2>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Προστασία Προσωπικών Δεδομένων
                  </h3>
                  <p className="text-sm text-gray-600">
                    Σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR), 
                    χρειαζόμαστε τη συγκατάθεσή σας για την επεξεργασία των δεδομένων σας.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.gdprConsent}
                  onChange={(e) => setFormData({ ...formData, gdprConsent: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded mt-0.5"
                  required
                />
                <div>
                  <p className="font-medium text-gray-900">
                    Συναίνεση για επεξεργασία δεδομένων *
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Συναινώ στην επεξεργασία των προσωπικών μου δεδομένων για τη 
                    λειτουργία της πλατφόρμας carpooling. Έχω διαβάσει την{' '}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Πολιτική Απορρήτου
                    </Link>.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.dataProcessingConsent}
                  onChange={(e) => setFormData({ ...formData, dataProcessingConsent: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded mt-0.5"
                  required
                />
                <div>
                  <p className="font-medium text-gray-900">
                    Κοινοποίηση στοιχείων σε επιβάτες *
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Συναινώ στην κοινοποίηση του ονόματός μου, φωτογραφίας, και 
                    στοιχείων οχήματος σε επιβάτες που κλείνουν διαδρομή μαζί μου.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.marketingConsent}
                  onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded mt-0.5"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    Ενημερώσεις και προσφορές (προαιρετικό)
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Θέλω να λαμβάνω ενημερώσεις για νέα χαρακτηριστικά, προσφορές 
                    και tips για οδηγούς.
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-gray-100 rounded-xl p-4">
              <p className="text-sm text-gray-600">
                <strong>Τα δικαιώματά σας:</strong> Μπορείτε να αποσύρετε τη 
                συναίνεσή σας ανά πάσα στιγμή, να ζητήσετε πρόσβαση, διόρθωση 
                ή διαγραφή των δεδομένων σας. Επικοινωνήστε μαζί μας στο{' '}
                <a href="mailto:dpo@carpal.gr" className="text-blue-600 hover:underline">
                  dpo@carpal.gr
                </a>.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Έλεγχος Στοιχείων</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Προσωπικά Στοιχεία</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Όνομα:</span>
                    <p className="font-medium">{formData.firstName || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Επώνυμο:</span>
                    <p className="font-medium">{formData.lastName || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Τηλέφωνο:</span>
                    <p className="font-medium">{formData.phone || '-'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Όχημα</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Μάρκα/Μοντέλο:</span>
                    <p className="font-medium">{formData.vehicleMake} {formData.vehicleModel}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Πινακίδα:</span>
                    <p className="font-medium">{formData.licensePlate || '-'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Έγγραφα</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Ταυτότητα/Διαβατήριο</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Άδεια Οδήγησης</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Άδεια Κυκλοφορίας</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Ασφάλεια Οχήματος</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Συναίνεση GDPR</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    {formData.gdprConsent ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span>Επεξεργασία δεδομένων</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {formData.dataProcessingConsent ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span>Κοινοποίηση σε επιβάτες</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">
                Μετά την υποβολή, η αίτησή σας θα ελεγχθεί από την ομάδα μας 
                εντός 24-48 ωρών. Θα λάβετε ενημέρωση μέσω email.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen grain-bg">
        <Navbar />
        <div className="pt-32 pb-24 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Η αίτηση υποβλήθηκε!
            </h1>
            <p className="text-gray-600 mb-8">
              Ευχαριστούμε για την εγγραφή σας. Η αίτησή σας βρίσκεται υπό έλεγχο. 
              Θα λάβετε email επιβεβαίωσης εντός 24-48 ωρών.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Επιστροφή στην Αρχική
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen grain-bg">
      <Navbar />
      
      <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      index <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${
                        index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <span
                  key={step.id}
                  className={`text-xs ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </span>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8"
          >
            {renderStep()}
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Πίσω
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Συνέχεια
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.gdprConsent || !formData.dataProcessingConsent}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Υποβολή...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Υποβολή Αίτησης
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
