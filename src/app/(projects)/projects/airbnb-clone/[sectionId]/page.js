'use client';

import { useParams } from 'next/navigation';
import { section1 } from '@/app/data/lessons/airbnb-clone/section-1';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SectionPage() {
  const { sectionId } = useParams();
  const { data: session } = useSession();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/progress');
        const data = await response.json();
        
        // Convert array to object for easier lookup
        const progressMap = data.reduce((acc, curr) => {
          if (curr.projectId === 'airbnb-clone' && curr.sectionId === parseInt(sectionId)) {
            acc[curr.lessonId] = curr.completed;
          }
          return acc;
        }, {});
        
        setProgress(progressMap);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    if (session?.user) {
      fetchProgress();
    }
  }, [session, sectionId]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {section1.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {section1.description}
        </p>
      </div>

      <div className="space-y-4">
        {section1.lessons.map((lesson) => {
          const isCompleted = progress[lesson.id] || false;
          
          return (
            <Link
              key={lesson.id}
              href={`/projects/airbnb-clone/${sectionId}/${lesson.id}`}
              className="block"
            >
              <div className="border dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {lesson.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Lesson {lesson.id}
                    </p>
                  </div>
                  {isCompleted ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Completed
                    </span>
                  ) : (
                    <span className="text-blue-600 dark:text-blue-400">
                      Start →
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Your Progress
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{
                  width: `${
                    (Object.values(progress).filter(Boolean).length /
                      section1.lessons.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Object.values(progress).filter(Boolean).length} of{' '}
            {section1.lessons.length} completed
          </span>
        </div>
      </div>
    </div>
  );
}
