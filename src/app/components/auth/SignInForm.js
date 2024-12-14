'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        remember: rememberMe, // Pass remember me value to the credentials provider
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      router.push('/projects');
      router.refresh();
    } catch (error) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

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
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="block text-sm font-medium text-[#f4f6fb]">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-[#00a1c0] focus:ring-[#037993] border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-[#f4f6fb] cursor-pointer">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link
            href="/auth/forgot-password"
            className="font-medium text-[#00a1c0] hover:text-[#037993]"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#f4f6fb] bg-[#00a1c0] hover:bg-[#037993] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#037993] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>

      <div className="text-sm text-center">
        <Link
          href="/auth/signup"
          className="font-medium text-[#f4f6fb]"
        >
          Don't have an account? <span className='text-[#00a1c0] hover:text-[#037993]'>Sign up</span>
        </Link>
      </div>
    </form>
  );
}
