'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardContent } from '@/components/ui';
import useAuthStore from '@/store/authStore';

// Google Icon Component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Οι κωδικοί δεν ταιριάζουν');
      return;
    }

    if (formData.password.length < 8) {
      setError('Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες');
      return;
    }

    setIsLoading(true);

    const result = await register(
      formData.email,
      formData.password,
      formData.name,
      formData.phone
    );
    
    if (result.success) {
      router.push('/main/search');
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    setError('');
    // Don't set loading - the redirect happens immediately
    loginWithGoogle();
    // OAuth redirect happens automatically
  };

  return (
    <div className="min-h-screen grain-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">carpal</span>
            <span className="text-2xl font-bold text-gray-400">.gr</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Δημιουργία λογαριασμού</h1>
          <p className="mt-2 text-gray-600">Ξεκινήστε να μοιράζεστε διαδρομές</p>
        </div>

        <Card className="shadow-xl">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <Input
                type="text"
                label="Ονοματεπώνυμο"
                placeholder="Παύλος Παπαδόπουλος"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                type="email"
                label="Email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                type="tel"
                label="Τηλέφωνο"
                placeholder="69xxxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />

              <Input
                type="password"
                label="Κωδικός"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              <Input
                type="password"
                label="Επιβεβαίωση κωδικού"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />

              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={isLoading}
              >
                Εγγραφή
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ή</span>
                </div>
              </div>

              {/* Google Sign Up */}
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full flex items-center justify-center gap-3"
                onClick={handleGoogleLogin}
              >
                <GoogleIcon />
                Εγγραφή με Google
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Έχετε ήδη λογαριασμό;{' '}
                <Link href="/auth/login" className="text-gray-900 font-semibold hover:underline">
                  Σύνδεση
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
