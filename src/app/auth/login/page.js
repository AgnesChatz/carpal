'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardContent } from '@/components/ui';
import useAuthStore from '@/store/authStore';

// Demo credentials for testing
const DEMO_CREDENTIALS = {
  email: 'demo@carpal.gr',
  password: 'demo123'
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: DEMO_CREDENTIALS.email,
    password: DEMO_CREDENTIALS.password
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      router.push('/main/search');
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
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
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Καλώς ήρθατε πίσω</h1>
          <p className="mt-2 text-gray-600">Συνδεθείτε για να συνεχίσετε</p>
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
                type="email"
                label="Email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={isLoading}
              >
                Σύνδεση
              </Button>
            </form>

            {/* Demo Account Banner */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-sm font-medium text-blue-900 mb-1">Demo Λογαριασμός</p>
              <p className="text-xs text-blue-700">
                Email: <span className="font-mono bg-blue-100 px-1 rounded">{DEMO_CREDENTIALS.email}</span>
              </p>
              <p className="text-xs text-blue-700">
                Password: <span className="font-mono bg-blue-100 px-1 rounded">{DEMO_CREDENTIALS.password}</span>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Δεν έχετε λογαριασμό;{' '}
                <Link href="/auth/register" className="text-gray-900 font-semibold hover:underline">
                  Εγγραφή
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
