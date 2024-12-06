import Link from 'next/link';

export default function LessonPage({ params }) {
  // In a real application, this would fetch lesson content from a database or CMS
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            {/* This is a placeholder for the lesson content */}
            <h1>Lesson Content</h1>
            <p className="text-gray-600 dark:text-gray-300">
              This page will display the detailed lesson content, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
              <li>Step-by-step instructions</li>
              <li>Code examples and explanations</li>
              <li>Interactive coding exercises</li>
              <li>Best practices and tips</li>
              <li>Common pitfalls to avoid</li>
            </ul>
            
            <div className="mt-8">
              <h2>Next Steps</h2>
              <p>
                To implement the full lesson content, we would need to:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Set up a content management system (CMS)</li>
                <li>Create detailed lesson content with markdown support</li>
                <li>Add code snippets with syntax highlighting</li>
                <li>Implement interactive coding exercises</li>
                <li>Add progress tracking</li>
              </ol>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Link
              href={`/projects/${params.projectId}`}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Back to Project
            </Link>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Mark as Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
