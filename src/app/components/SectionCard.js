'use client';

import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/24/solid';

export default function SectionCard({ section, isCompleted, isLocked, pathwayId }) {
  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden
      ${isLocked ? 'opacity-75' : 'transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg'}
    `}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {section.title}
          </h2>
          {isLocked && (
            <LockClosedIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {section.description}
        </p>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Topics covered:
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {section.topics.map((topic, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {section.estimatedTime}
          </div>
          {isCompleted ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Completed
            </span>
          ) : (
            <Link
              href={isLocked ? '#' : `/pathways/${pathwayId}/topics`}
              className={`
                inline-flex items-center px-4 py-2 rounded-md text-sm font-medium
                ${isLocked 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                  : 'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500'}
              `}
              onClick={(e) => {
                if (isLocked) {
                  e.preventDefault();
                }
              }}
            >
              Start Section
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
