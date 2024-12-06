import Link from 'next/link';

export default function CurriculumSection({ section, projectId, sectionIndex }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {section.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{section.description}</p>
        </div>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 px-3 py-1 rounded-full text-sm">
          {section.duration}
        </span>
      </div>

      <div className="space-y-4">
        {section.lessons.map((lesson, lessonIndex) => (
          <div 
            key={lessonIndex}
            className="border dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {lesson.title}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {lesson.duration}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              {lesson.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {lesson.concepts.map((concept, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {concept}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${projectId}/section/${sectionIndex}/lesson/${lessonIndex}`}
              className="mt-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
              Start Lesson →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
