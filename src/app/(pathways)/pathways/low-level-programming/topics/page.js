'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const topics = {
  'introduction': {
    title: 'What is a Computer Program?',
    lessons: [
      {
        id: 'introduction',
        title: 'Basic Computing Concepts',
        objectives: [
          'Understand what a computer is',
          'Learn about basic computer components',
          'Understand binary and how computers process information'
        ]
      },
      {
        id: 'computer-components',
        title: 'Program Execution Flow',
        objectives: [
          'Understand how instructions are executed',
          'Learn about CPU, memory, and basic operations',
          'Understand program flow and sequential execution'
        ]
      },
      {
        id: 'understanding-binary',
        title: 'Programming Languages Overview',
        objectives: [
          'Understand different types of programming languages',
          'Learn about high-level vs low-level languages',
          'Understand interpreted vs compiled languages'
        ]
      }
    ]
  }
};

export default function Topics() {
  const [completedObjectives, setCompletedObjectives] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});
  const [expandedLessons, setExpandedLessons] = useState({});

  useEffect(() => {
    // TODO: Fetch user's completed objectives from the database
    // For now, only first objective of first lesson is unlocked
    setCompletedObjectives({
      'introduction': ['Understand what a computer is']
    });
  }, []);

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const toggleLesson = (lessonId) => {
    setExpandedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }));
  };

  const isLessonLocked = (topicId, lessonIndex) => {
    if (topicId === 'introduction' && lessonIndex === 0) return false;
    
    const topic = topics[topicId];
    if (lessonIndex > 0) {
      const prevLesson = topic.lessons[lessonIndex - 1];
      return !prevLesson.objectives.every(obj => 
        (completedObjectives[prevLesson.id] || []).includes(obj)
      );
    }
    
    return false;
  };

  const isObjectiveLocked = (lessonId, objectiveIndex, topicId, lessonIndex) => {
    if (lessonId === 'introduction' && objectiveIndex === 0) return false;
    
    const lessonObjectives = completedObjectives[lessonId] || [];
    if (objectiveIndex > 0) {
      return !lessonObjectives.includes(
        topics[topicId].lessons[lessonIndex].objectives[objectiveIndex - 1]
      );
    }
    
    return isLessonLocked(topicId, lessonIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/pathways/low-level-programming"
          className="inline-flex items-center mb-6 text-custom-blue hover:text-custom-hover transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Overview
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Introduction to Programming Topics
        </h1>

        <div className="space-y-8">
          {Object.entries(topics).map(([topicId, topic]) => (
            <div 
              key={topicId}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
            >
              <div 
                className="p-6 cursor-pointer hover:bg-gray-700"
                onClick={() => toggleTopic(topicId)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {topic.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {topic.lessons.length} lessons
                    </p>
                  </div>
                  <svg 
                    className={`w-6 h-6 transform transition-transform ${expandedTopics[topicId] ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {expandedTopics[topicId] && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  {topic.lessons.map((lesson, lessonIndex) => {
                    const isLocked = isLessonLocked(topicId, lessonIndex);
                    
                    return (
                      <div key={lesson.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <div 
                          className={`p-4 ${isLocked ? 'opacity-50' : 'hover:bg-gray-600'}`}
                        >
                          <div 
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => !isLocked && toggleLesson(lesson.id)}
                          >
                            <div className="flex items-center space-x-3">
                              {isLocked ? (
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              ) : (
                                <div className={`w-5 h-5 rounded-full border-2 
                                  ${lesson.objectives.every(obj => (completedObjectives[lesson.id] || []).includes(obj))
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-gray-300'
                                  }`}
                                />
                              )}
                              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                {lesson.title}
                              </h3>
                            </div>
                            <svg 
                              className={`w-5 h-5 transform transition-transform ${expandedLessons[lesson.id] ? 'rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>

                          {expandedLessons[lesson.id] && !isLocked && (
                            <div className="mt-4 pl-8 space-y-3">
                              {lesson.objectives.map((objective, objectiveIndex) => {
                                const isObjLocked = isObjectiveLocked(lesson.id, objectiveIndex, topicId, lessonIndex);
                                const isCompleted = (completedObjectives[lesson.id] || []).includes(objective);
                                
                                return (
                                  <div 
                                    key={objectiveIndex}
                                    className="flex items-center justify-between"
                                  >
                                    <div className="flex items-center space-x-3">
                                      {isCompleted ? (
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                      ) : isObjLocked ? (
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                      ) : (
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                                      )}
                                      <span className={`${isObjLocked ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {objective}
                                      </span>
                                    </div>
                                    {!isObjLocked && !isCompleted && (
                                      <Link
                                        href={`/pathways/low-level-programming/${lesson.id}?objective=${objectiveIndex}`}
                                        className="px-3 py-1 text-sm bg-custom-blue text-text-color rounded hover:bg-custom-hover transition-colors"
                                      >
                                        Start
                                      </Link>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
