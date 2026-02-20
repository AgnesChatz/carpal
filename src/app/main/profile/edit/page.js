'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button, Card, Input } from '@/components/ui';
import useAuthStore from '@/store/authStore';
import { updateUserPublic } from '@/lib/db';

// Icons
const CameraIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const CarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const InfoIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function EditProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    photo: null
  });
  
  // Car form (for drivers)
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    seats: 4,
    licensePlate: ''
  });
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        bio: user.bio || '',
        photo: user.photo || null
      });
      
      if (user.car) {
        setCarData({
          make: user.car.make || '',
          model: user.car.model || '',
          year: user.car.year || '',
          color: user.car.color || '',
          seats: user.car.seats || 4,
          licensePlate: user.car.licensePlate || ''
        });
      }
    }
  }, [user]);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Update profile
      await updateUserPublic(user.id || user.$id, {
        name: formData.name,
        phone: formData.phone,
        bio: formData.bio,
        photo: formData.photo
      });
      
      // Update local state
      updateUser({
        ...user,
        name: formData.name,
        phone: formData.phone,
        bio: formData.bio,
        photo: formData.photo
      });
      
      router.push('/main/profile');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Σφάλμα κατά την αποθήκευση');
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen grain-bg pt-20 flex items-center justify-center">
        <p className="text-gray-500">Παρακαλώ συνδεθείτε</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Επεξεργασία προφίλ</h1>
            <p className="text-gray-500">Ενημερώστε τα στοιχεία σας</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'profile' 
                ? 'bg-gray-900 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <UserIcon />
            Προφίλ
          </button>
          {user.isDriver && (
            <button
              onClick={() => setActiveTab('car')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'car' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CarIcon />
              Όχημα
            </button>
          )}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Φωτογραφία προφίλ</h3>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    {formData.photo ? (
                      <img 
                        src={formData.photo} 
                        alt="Profile"
                        className="w-24 h-24 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                        {formData.name?.charAt(0)}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={handlePhotoClick}
                      className="absolute -bottom-2 -right-2 w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
                    >
                      <CameraIcon />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Κάντε κλικ στην κάμερα για να αλλάξετε τη φωτογραφία
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Υποστηρίζονται JPG, PNG (max 5MB)
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Basic Info */}
            <Card>
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Βασικά στοιχεία</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ονοματεπώνυμο
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="π.χ. Γιώργος Παπαδόπουλος"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Τηλέφωνο
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+30 690 123 4567"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Σχετικά με εμένα
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Περιγράψτε τον εαυτό σας..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {formData.bio.length}/500 χαρακτήρες
                  </p>
                </div>
              </div>
            </Card>

            {/* Email (read-only) */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Email</h3>
                <Input value={user.email} disabled className="bg-gray-50" />
                <p className="text-xs text-gray-400 mt-2">
                  Το email δεν μπορεί να αλλάξει
                </p>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                Ακύρωση
              </Button>
              <Button
                type="submit"
                className="flex-1"
                loading={isSaving}
              >
                Αποθήκευση
              </Button>
            </div>
          </form>
        )}

        {/* Car Tab */}
        {activeTab === 'car' && user.isDriver && (
          <form className="space-y-6">
            <Card>
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Στοιχεία οχήματος</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Μάρκα
                    </label>
                    <Input
                      value={carData.make}
                      onChange={(e) => setCarData(prev => ({ ...prev, make: e.target.value }))}
                      placeholder="π.χ. Toyota"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Μοντέλο
                    </label>
                    <Input
                      value={carData.model}
                      onChange={(e) => setCarData(prev => ({ ...prev, model: e.target.value }))}
                      placeholder="π.χ. Corolla"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Έτος
                    </label>
                    <Input
                      type="number"
                      value={carData.year}
                      onChange={(e) => setCarData(prev => ({ ...prev, year: e.target.value }))}
                      placeholder="π.χ. 2021"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Χρώμα
                    </label>
                    <Input
                      value={carData.color}
                      onChange={(e) => setCarData(prev => ({ ...prev, color: e.target.value }))}
                      placeholder="π.χ. Ασημί"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Θέσεις
                    </label>
                    <select
                      value={carData.seats}
                      onChange={(e) => setCarData(prev => ({ ...prev, seats: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      <option value={2}>2 θέσεις</option>
                      <option value={3}>3 θέσεις</option>
                      <option value={4}>4 θέσεις</option>
                      <option value={5}>5 θέσεις</option>
                      <option value={6}>6 θέσεις</option>
                      <option value={7}>7 θέσεις</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Πινακίδα
                    </label>
                    <Input
                      value={carData.licensePlate}
                      onChange={(e) => setCarData(prev => ({ ...prev, licensePlate: e.target.value }))}
                      placeholder="π.χ. ΝΚΗ-1234"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                Ακύρωση
              </Button>
              <Button
                type="submit"
                className="flex-1"
                loading={isSaving}
              >
                Αποθήκευση
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
