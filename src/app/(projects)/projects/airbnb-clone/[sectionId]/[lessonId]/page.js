'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { section1 } from '@/app/data/lessons/airbnb-clone/section-1';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAuth } from '@clerk/nextjs';
import CodePlayground from '@/app/components/playground/CodePlayground';
import '@/app/styles/lesson.css';

export default function LessonPage() {
  const { sectionId, lessonId } = useParams();
  const { userId } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    // Find the lesson in the section data
    const currentLesson = section1.lessons.find(
      (l) => l.id === parseInt(lessonId)
    );
    setLesson(currentLesson);

    // Check if lesson is completed
    const checkProgress = async () => {
      try {
        const response = await fetch('/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectId: 'airbnb-clone',
            sectionId: parseInt(sectionId),
            lessonId: parseInt(lessonId),
          }),
        });
        const data = await response.json();
        setIsCompleted(data.completed);
      } catch (error) {
        console.error('Error checking progress:', error);
      }
    };

    if (userId) {
      checkProgress();
    }
  }, [sectionId, lessonId, userId]);

  const markLessonComplete = async () => {
    try {
      const response = await fetch('/api/progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: 'airbnb-clone',
          sectionId: parseInt(sectionId),
          lessonId: parseInt(lessonId),
          completed: true,
        }),
      });

      if (response.ok) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    }
  };

  if (!lesson) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {lesson.title}
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Section {sectionId}, Lesson {lessonId}
          </span>
          {isCompleted && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Completed
            </span>
          )}
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none lesson-content">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: '1.5rem 0',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {lesson.content}
        </ReactMarkdown>
      </div>

      {/* Code Exercise Section */}
      {lesson.codeExercise && (
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Practice Exercise
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {lesson.codeExercise.task}
          </p>
          <div className="mt-4">
            <CodePlayground
              starterCode={lesson.codeExercise.starterCode}
              solution={lesson.codeExercise.solution}
              dependencies={{
                "@heroicons/react": "^2.0.18",
                "date-fns": "^2.30.0",
                "react-date-range": "^1.4.0"
              }}
            />
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => markLessonComplete()}
          disabled={isCompleted}
          className={`px-4 py-2 rounded-md text-white ${
            isCompleted
              ? 'bg-green-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
        </button>

        {parseInt(lessonId) < section1.lessons.length && (
          <a
            href={`/projects/airbnb-clone/${sectionId}/${parseInt(lessonId) + 1}`}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Next Lesson →
          </a>
        )}
      </div>
    </div>
  );
}
