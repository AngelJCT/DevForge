'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LearningProgress({ userId }) {
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/progress');
        if (!response.ok) {
          throw new Error('Failed to fetch progress');
        }
        const data = await response.json();
        
        // Group progress by project
        const groupedProgress = data.reduce((acc, curr) => {
          if (!acc[curr.projectId]) {
            acc[curr.projectId] = {
              projectId: curr.projectId,
              completedLessons: 0,
              totalLessons: 0,
              sections: {}
            };
          }
          
          if (!acc[curr.projectId].sections[curr.sectionId]) {
            acc[curr.projectId].sections[curr.sectionId] = {
              completedLessons: 0,
              totalLessons: 0
            };
          }
          
          acc[curr.projectId].totalLessons++;
          acc[curr.projectId].sections[curr.sectionId].totalLessons++;
          
          if (curr.completed) {
            acc[curr.projectId].completedLessons++;
            acc[curr.projectId].sections[curr.sectionId].completedLessons++;
          }
          
          return acc;
        }, {});

        setProgress(Object.values(groupedProgress));
      } catch (error) {
        setError('Failed to load progress data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 p-4">
        {error}
      </div>
    );
  }

  if (progress.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          No Progress Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You haven't started any projects yet. Begin your learning journey today!
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Browse Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {progress.map((projectProgress) => (
        <div
          key={projectProgress.projectId}
          className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {projectProgress.projectId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round((projectProgress.completedLessons / projectProgress.totalLessons) * 100)}% Complete
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${(projectProgress.completedLessons / projectProgress.totalLessons) * 100}%`,
              }}
            ></div>
          </div>

          <div className="mt-4">
            <Link
              href={`/projects/${projectProgress.projectId}`}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
              Continue Learning →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
