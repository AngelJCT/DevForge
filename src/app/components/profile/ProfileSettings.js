'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProfileSettings({ user }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Check for email verification success message
    const verified = searchParams.get('verified');
    if (verified === 'true') {
      setMessage({
        type: 'success',
        content: 'Email verified successfully!',
      });
      // Remove the query parameter
      router.replace('/profile');
    }
  }, [searchParams, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });

    // Validate passwords if trying to change password
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setMessage({
          type: 'error',
          content: 'New passwords do not match',
        });
        setIsLoading(false);
        return;
      }
      if (!formData.currentPassword) {
        setMessage({
          type: 'error',
          content: 'Current password is required to set a new password',
        });
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage({
        type: 'success',
        content: data.message,
      });
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));

      if (!data.emailPending) {
        router.refresh();
      }
    } catch (error) {
      setMessage({
        type: 'error',
        content: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {message.content && (
          <div
            className={`p-4 rounded-md ${
              message.type === 'error'
                ? 'bg-red-50 text-red-700 dark:bg-red-900/50 dark:text-red-200'
                : 'bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-200'
            }`}
          >
            {message.content}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 text-[#f4f6fb] sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 text-[#f4f6fb] sm:text-sm"
          />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Change Password
          </h3>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="mt-1 px-2 block w-full rounded-md border-gray-300 bg-gray-700 text-[#f4f6fb] sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 text-[#f4f6fb] sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 text-[#f4f6fb] sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
