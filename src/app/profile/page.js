'use client';

import { useSession } from 'next-auth/react';
import withAuth from '@/app/components/auth/withAuth';
import { useState } from 'react';
import ProfileSettings from '@/app/components/profile/ProfileSettings';
import LearningProgress from '@/app/components/profile/LearningProgress';

function ProfilePage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('settings');

  const tabs = [
    { id: 'settings', label: 'Settings' },
    { id: 'progress', label: 'Learning Progress' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {/* Profile Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                  {session?.user?.name?.[0]?.toUpperCase() || '?'}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {session?.user?.name || 'User'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'settings' ? (
              <ProfileSettings user={session?.user} />
            ) : (
              <LearningProgress userId={session?.user?.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfilePage);
