'use client';

import { useRouter } from 'next/navigation';

export default function SectionContent({ section }) {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(`/pathways/low-level-programming/${path}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {section.title}
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            {section.description}
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Objective {section.currentObjective} of {section.totalObjectives}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left sidebar with objectives and references */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Learning Objectives
              </h2>
              <ul className="space-y-2">
                {section.objectives.map((objective, index) => (
                  <li
                    key={index}
                    className={`flex items-start ${
                      index + 1 === section.currentObjective
                        ? 'text-[#00a1c0] font-medium'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block w-5 h-5 ${
                        index + 1 === section.currentObjective
                          ? 'bg-[#00a1c0] text-[#f4f6fb]'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      } rounded-full text-sm flex items-center justify-center mr-2 mt-0.5`}
                    >
                      {index + 1}
                    </span>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Reference Materials
              </h2>
              <ul className="space-y-3">
                {section.references.map((reference, index) => (
                  <li key={index}>
                    <a
                      href={reference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00a1c0] hover:underline"
                    >
                      {reference.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {section.content.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {section.content.description}
                </p>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Key Points:
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                    {section.content.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              {section.previousSection && (
                <button
                  onClick={() => handleNavigation(section.previousSection)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#f4f6fb] bg-[#00a1c0] hover:bg-[#037993] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  ← Previous
                </button>
              )}
              {section.nextSection && (
                <button
                  onClick={() => handleNavigation(section.nextSection)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#f4f6fb] bg-[#00a1c0] hover:bg-[#037993] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-auto"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
