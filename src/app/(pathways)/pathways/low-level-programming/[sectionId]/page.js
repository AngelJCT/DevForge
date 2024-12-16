'use client';

import { use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { introductionSections } from '../data/introductionSections';
import SectionContent from '../components/SectionContent';

export default function Section({ params }) {
  const searchParams = useSearchParams();
  const unwrappedParams = use(params);
  const { sectionId } = unwrappedParams;
  const objectiveIndex = searchParams.get('objective');
  const section = introductionSections[sectionId];

  if (!section) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Section not found
          </h1>
        </div>
      </div>
    );
  }

  // Update current objective based on the URL parameter
  const sectionWithObjective = {
    ...section,
    currentObjective: objectiveIndex ? parseInt(objectiveIndex) + 1 : 1
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/pathways/low-level-programming/topics"
          className="inline-flex items-center mb-6 text-custom-blue dark:text-custom-blue dark:hover:text-custom-hover"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Topics
        </Link>
        
        <SectionContent section={sectionWithObjective} />
      </div>
    </div>
  );
}