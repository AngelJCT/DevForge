import Link from 'next/link';

const projects = [
  {
    id: 'airbnb-clone',
    title: 'Airbnb Clone',
    description: 'Build a full-featured property rental platform',
    difficulty: 'Intermediate',
    topics: ['Next.js', 'Database', 'Authentication', 'API Integration'],
    duration: '20-25 hours',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    description: 'Create a modern online shopping experience',
    difficulty: 'Intermediate',
    topics: ['Next.js', 'Payment Integration', 'State Management', 'Shopping Cart'],
    duration: '15-20 hours',
  },
  {
    id: 'social-media',
    title: 'Social Media App',
    description: 'Develop a feature-rich social platform',
    difficulty: 'Advanced',
    topics: ['Real-time Features', 'WebSocket', 'User Interactions', 'Media Upload'],
    duration: '25-30 hours',
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
            Available Learning Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose a project to start your hands-on learning journey
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400 w-24">Difficulty:</span>
                    <span className="text-gray-900 dark:text-white">{project.difficulty}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400 w-24">Duration:</span>
                    <span className="text-gray-900 dark:text-white">{project.duration}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Topics covered:</div>
                  <div className="flex flex-wrap gap-2">
                    {project.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
