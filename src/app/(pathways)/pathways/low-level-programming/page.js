'use client';

import { useEffect, useState } from 'react';
import SectionCard from '@/app/components/SectionCard';
import Link from 'next/link';

const sections = [
  {
    id: 'introduction',
    title: 'Introduction to Programming',
    description: 'Learn the fundamentals of computer programs, compilation process, and basic computer architecture.',
    topics: [
      'What is a computer program?',
      'Compilation process',
      'Basic computer architecture',
      'Introduction to C language'
    ],
    estimatedTime: '2-3 hours',
    difficulty: 'Beginner'
  },
  {
    id: 'basic-syntax',
    title: 'Basic Syntax and Fundamentals',
    description: 'Master the basic syntax of C programming and fundamental programming concepts.',
    topics: [
      'Hello World program',
      'Variables and data types',
      'Basic input/output',
      'Arithmetic and logical operators',
      'Type casting'
    ],
    estimatedTime: '3-4 hours',
    difficulty: 'Beginner'
  },
  {
    id: 'control-flow',
    title: 'Control Flow',
    description: 'Learn how to control program execution with conditional statements and operators.',
    topics: [
      'Conditional statements (if, else, switch)',
      'Comparison operators',
      'Logical operators',
      'Ternary operators'
    ],
    estimatedTime: '3-4 hours',
    difficulty: 'Beginner to Intermediate'
  }
];

export default function LowLevelProgramming() {
  const [completedSections, setCompletedSections] = useState([]);

  useEffect(() => {
    // TODO: Fetch user's completed sections from the database
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
            Low-Level Programming
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Start your journey into low-level programming with C language. Learn how computers work from the ground up
            and master fundamental programming concepts.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Beginner to Intermediate
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              20-25 hours
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              isCompleted={completedSections.includes(section.id)}
              isLocked={index > 0 && !completedSections.includes(sections[index - 1].id)}
              pathwayId="low-level-programming"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
