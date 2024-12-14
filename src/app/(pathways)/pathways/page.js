'use client';

import Link from 'next/link';

const pathways = [
  {
    id: 'low-level-programming',
    title: 'Low-Level Programming',
    description: 'Learn computer programming from the ground up, starting with C programming language and understanding how computers work at a lower level.',
    topics: ['C Programming', 'Memory Management', 'Computer Architecture', 'System Programming'],
    level: 'Beginner to Intermediate',
    duration: '8-12 weeks'
  },
  {
    id: 'high-level-programming',
    title: 'High-Level Programming',
    description: 'Master modern programming with Python and JavaScript, focusing on web development, automation, and application development.',
    topics: ['Python', 'JavaScript', 'Web Development', 'APIs'],
    level: 'Beginner to Intermediate',
    duration: '10-14 weeks'
  }
];

export default function Pathways() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
            Learning Pathways
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose your learning path and start your programming journey. Each pathway is carefully designed
            to take you from fundamentals to advanced concepts with hands-on projects and exercises.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {pathways.map((pathway) => (
            <Link
              key={pathway.id}
              href={`/pathways/${pathway.id}`}
              className="transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-lg">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {pathway.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {pathway.description}
                  </p>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Key Topics:
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {pathway.topics.map((topic, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-300"
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Level: {pathway.level}</span>
                    <span>Duration: {pathway.duration}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
