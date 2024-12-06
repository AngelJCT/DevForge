'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { section1 } from '@/app/data/lessons/airbnb-clone/section-1';
import { useEffect, useState } from 'react';

const sections = [section1];

export default function AirbnbProject() {
  const { data: session } = useSession();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/progress');
        const data = await response.json();
        
        // Group progress by section
        const progressBySection = data.reduce((acc, curr) => {
          if (curr.projectId === 'airbnb-clone') {
            if (!acc[curr.sectionId]) {
              acc[curr.sectionId] = {
                completed: 0,
                total: 0
              };
            }
            acc[curr.sectionId].total++;
            if (curr.completed) {
              acc[curr.sectionId].completed++;
            }
          }
          return acc;
        }, {});
        
        setProgress(progressBySection);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    if (session?.user) {
      fetchProgress();
    }
  }, [session]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Build an Airbnb Clone
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Learn to build a full-featured Airbnb clone using Next.js, Tailwind CSS, and modern web technologies.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((section) => {
          const sectionProgress = progress[section.id] || { completed: 0, total: section.lessons.length };
          const progressPercentage = (sectionProgress.completed / sectionProgress.total) * 100;

          return (
            <Link
              key={section.id}
              href={`/projects/airbnb-clone/${section.id}`}
              className="block"
            >
              <div className="border dark:border-gray-700 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#fafafa] mb-2">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {section.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium dark:bg-blue-900 dark:text-[#fafafa]">
                    {section.lessons.length}
                  </span>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {section.lessons.slice(0, 3).map((lesson, i) => (
                        <div
                          key={lesson.id}
                          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center"
                        >
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            {lesson.id}
                          </span>
                        </div>
                      ))}
                      {section.lessons.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            +{section.lessons.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-blue-600 dark:text-blue-400">
                      View Section →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          What You'll Learn
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Modern Web Development</h3>
              <p className="text-gray-600 dark:text-gray-300">Learn Next.js, React, and Tailwind CSS by building real features</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Best Practices</h3>
              <p className="text-gray-600 dark:text-gray-300">Industry-standard patterns and modern development workflows</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
