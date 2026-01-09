'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const params = useSearchParams();
  const error = params.get('error');

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Sign in with your Google account to access the admin panel</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-6">
              Sign-in failed. Your account may not be allowed for admin access.
            </div>
          )}

          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/admin' })}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Continue with Google
          </button>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-amber-600 hover:text-amber-700 text-sm font-medium"
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 
