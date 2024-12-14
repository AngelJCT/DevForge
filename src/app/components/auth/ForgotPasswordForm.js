'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mt-8 space-y-6">
        <div className="bg-green-50 dark:bg-green-900/50 text-green-500 dark:text-green-200 p-4 rounded-md text-sm">
          If an account exists with that email, we&apos;ve sent password reset instructions.
        </div>
        <div className="text-sm text-center">
          <Link href="/auth/signin" className="font-medium text-[#f4f6fb]">
            Return to <span className="text-[#00a1c0] hover:text-[#037993]">Sign in</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 text-red-500 dark:text-red-200 p-4 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="block text-sm font-medium text-[#f4f6fb]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#f4f6fb] bg-[#00a1c0] hover:bg-[#037993] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#037993] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending...' : 'Send reset instructions'}
        </button>
      </div>

      <div className="text-sm text-center">
        <Link href="/auth/signin" className="font-medium text-[#f4f6fb]">
          Remember your password? <span className="text-[#00a1c0] hover:text-[#037993]">Sign in</span>
        </Link>
      </div>
    </form>
  );
}
