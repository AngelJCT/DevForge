import CurriculumSection from '@/app/components/CurriculumSection';

const projects = {
  'airbnb-clone': {
    title: 'Build an Airbnb Clone',
    description: 'Create a full-featured property rental platform while learning modern web development concepts and best practices.',
    prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React', 'Understanding of HTML/CSS'],
    curriculum: [
      {
        title: 'Project Setup and Foundation',
        description: 'Set up your development environment and create the foundation for your Airbnb clone.',
        duration: '2-3 hours',
        lessons: [
          {
            title: 'Development Environment Setup',
            duration: '30 mins',
            description: 'Set up Next.js, TypeScript, and essential development tools.',
            concepts: ['Next.js', 'TypeScript', 'ESLint', 'Prettier']
          },
          {
            title: 'Project Structure and Architecture',
            duration: '1 hour',
            description: 'Create a scalable project structure and implement core configurations.',
            concepts: ['Project Organization', 'Configuration', 'Best Practices']
          },
          {
            title: 'Design System Setup',
            duration: '1 hour',
            description: 'Set up Tailwind CSS and create basic design components.',
            concepts: ['Tailwind CSS', 'Design Systems', 'Component Library']
          }
        ]
      },
      {
        title: 'Database and Authentication',
        description: 'Implement user authentication and set up the database schema.',
        duration: '4-5 hours',
        lessons: [
          {
            title: 'Database Setup with Prisma',
            duration: '1.5 hours',
            description: 'Set up Prisma ORM and create the initial database schema.',
            concepts: ['Prisma', 'Database Schema', 'Migrations']
          },
          {
            title: 'User Authentication',
            duration: '2 hours',
            description: 'Implement user authentication using NextAuth.js.',
            concepts: ['NextAuth.js', 'JWT', 'OAuth', 'Sessions']
          },
          {
            title: 'User Profile Management',
            duration: '1.5 hours',
            description: 'Create user profile management features.',
            concepts: ['CRUD Operations', 'File Upload', 'Form Handling']
          }
        ]
      },
      {
        title: 'Property Listings',
        description: 'Build the core property listing features.',
        duration: '5-6 hours',
        lessons: [
          {
            title: 'Property Model and API',
            duration: '2 hours',
            description: 'Create the property model and REST API endpoints.',
            concepts: ['API Routes', 'Data Modeling', 'REST API']
          },
          {
            title: 'Property Creation Flow',
            duration: '2 hours',
            description: 'Implement the multi-step property creation process.',
            concepts: ['Multi-step Forms', 'Image Upload', 'Form Validation']
          },
          {
            title: 'Property Search and Filters',
            duration: '2 hours',
            description: 'Build the search functionality with filters.',
            concepts: ['Search Algorithm', 'Filters', 'Query Parameters']
          }
        ]
      },
      {
        title: 'Bookings and Payments',
        description: 'Implement the booking system and payment processing.',
        duration: '4-5 hours',
        lessons: [
          {
            title: 'Booking System',
            duration: '2 hours',
            description: 'Create the booking model and reservation system.',
            concepts: ['Date Handling', 'Availability', 'Reservations']
          },
          {
            title: 'Payment Integration',
            duration: '2 hours',
            description: 'Integrate Stripe for payment processing.',
            concepts: ['Stripe', 'Payment Processing', 'Webhooks']
          },
          {
            title: 'Booking Management',
            duration: '1 hour',
            description: 'Build the booking management interface.',
            concepts: ['Status Management', 'Notifications', 'Calendar']
          }
        ]
      }
    ]
  },
  // Add other projects here
};

export default function ProjectPage({ params }) {
  const project = projects[params.projectId];
  
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
          {project.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          {project.description}
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Prerequisites
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            {project.prerequisites.map((prerequisite, index) => (
              <li key={index}>{prerequisite}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Curriculum
        </h2>
        {project.curriculum.map((section, index) => (
          <CurriculumSection
            key={index}
            section={section}
            projectId={params.projectId}
            sectionIndex={index}
          />
        ))}
      </div>
    </div>
  );
}
