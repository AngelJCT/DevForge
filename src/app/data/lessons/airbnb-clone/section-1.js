export const section1 = {
  id: 1,
  title: "Building the Home Page",
  description: "Learn to create a modern, responsive home page with property listings using Next.js and Tailwind CSS",
  lessons: [
    {
      id: 1,
      title: "Setting Up the Project",
      content: `
# Setting Up Your Airbnb Clone Project

Welcome to your first lesson! In this module, you'll learn how to set up a modern Next.js project and create the foundation for your Airbnb clone. We'll focus on best practices and industry-standard tools.

---

## Learning Objectives

After completing this lesson, you'll be able to:

* Create a new Next.js project with TypeScript
* Configure Tailwind CSS for styling
* Set up a scalable project structure
* Create reusable layout components

---

## Project Setup

Let's start by creating a new Next.js project with all the necessary configurations.

### Creating the Project

Open your terminal and run the following command:

\`\`\`bash
npx create-next-app@latest airbnb-clone --typescript --tailwind --app
\`\`\`

This command sets up:
* Next.js 13+ with App Router
* TypeScript for type safety
* Tailwind CSS for styling
* ESLint for code quality

### Installing Dependencies

Next, we'll add some essential packages that we'll need throughout the project:

\`\`\`bash
npm install @heroicons/react date-fns react-date-range
\`\`\`

These packages provide:
* **@heroicons/react**: Beautiful, hand-crafted SVG icons
* **date-fns**: Modern JavaScript date utility library
* **react-date-range**: Calendar and date range picker component

---

## Project Structure

A well-organized project structure is crucial for maintainability. Create the following folder structure:

\`\`\`
src/
  app/
    components/
      layout/         # Shared layout components
        Header.tsx
        Footer.tsx
      ui/            # Reusable UI components
        Button.tsx
        Input.tsx
    (site)/          # Main site routes
      page.tsx
      layout.tsx
    types/           # TypeScript type definitions
      index.ts
\`\`\`

> 💡 **Pro Tip**: Keeping your components organized in meaningful folders makes it easier to find and maintain them as your project grows.

---

## Coding Exercise

Let's create a basic header component with navigation. This will be the foundation of your Airbnb clone's navigation system.

### Task: Create the Header Component

Create a new file at \`components/layout/Header.tsx\` with the following code:

\`\`\`jsx
// components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-rose-500 text-2xl font-bold">
            airbnb
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/homes" className="text-gray-500 hover:text-gray-900">
              Places to stay
            </Link>
            <Link href="/experiences" className="text-gray-500 hover:text-gray-900">
              Experiences
            </Link>
            <Link href="/online" className="text-gray-500 hover:text-gray-900">
              Online Experiences
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-500 hover:text-gray-900">
              Become a Host
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Bars3Icon className="h-6 w-6 text-gray-500" />
            </button>
            <UserCircleIcon className="h-8 w-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              <Link href="/homes" className="py-2 text-gray-500 hover:text-gray-900">
                Places to stay
              </Link>
              <Link href="/experiences" className="py-2 text-gray-500 hover:text-gray-900">
                Experiences
              </Link>
              <Link href="/online" className="py-2 text-gray-500 hover:text-gray-900">
                Online Experiences
              </Link>
              <Link href="/host" className="py-2 text-gray-500 hover:text-gray-900">
                Become a Host
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
\`\`\`

### Practice Exercises

To reinforce your learning, try these exercises:

1. **Add a Search Bar**
   * Create a search input in the header
   * Style it to match Airbnb's design
   * Make it responsive

2. **Enhance the User Menu**
   * Add a dropdown menu for the user icon
   * Include sign in/sign up options
   * Add a profile section

3. **Improve Mobile Responsiveness**
   * Test on different screen sizes
   * Adjust spacing and typography
   * Enhance touch targets for mobile

---

## Key Concepts

### Next.js App Router

The App Router is Next.js 13+'s new paradigm for building applications:

* **Server Components**: Better performance and SEO
* **Improved Routing**: More intuitive file-based routing
* **Layouts**: Shared UI between routes

### Tailwind CSS

Tailwind provides a utility-first approach to styling:

* **Responsive Design**: Built-in breakpoint system
* **Dark Mode**: Easy theme switching
* **Performance**: Only includes used styles

### Component Architecture

Following best practices for component organization:

* **Reusability**: Create components that can be used across pages
* **Separation of Concerns**: Keep components focused and maintainable
* **Type Safety**: Use TypeScript for better development experience

---

## Additional Resources

📚 Dive deeper with these excellent resources:

* [Next.js Documentation](https://nextjs.org/docs)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [Airbnb Design System](https://airbnb.design/)

---

## Next Steps

In the next lesson, we'll create an engaging hero section with a search functionality that captures users' attention and encourages exploration.

> 🎯 **Remember**: The key to becoming a great developer is practice. Try to modify and enhance the code examples provided in this lesson.
`,
      codeExercise: {
        task: "Add a search bar component to the header with location and date inputs. The search bar should be responsive and match Airbnb's design aesthetic.",
        starterCode: `
// components/layout/SearchBar.tsx
'use client';

export default function SearchBar() {
  // Add your code here
}
`,
        solution: `
// components/layout/SearchBar.tsx
'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  
  return (
    <div className="flex-1 max-w-2xl mx-4">
      <div className="flex items-center border rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow">
        <input
          type="text"
          placeholder="Where are you going?"
          className="flex-grow bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="bg-rose-500 text-white p-2 rounded-full">
          <MagnifyingGlassIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
`
      }
    },
    {
      id: 2,
      title: "Creating the Hero Section",
      content: `
# Building an Engaging Hero Section

In this lesson, you'll learn how to create a stunning hero section that captures users' attention and encourages exploration...

[Content for lesson 2 will be added here...]
`
    },
    {
      id: 3,
      title: "Implementing Property Listings",
      content: `
# Property Listings Grid

Learn to create a responsive grid of property listings with filtering and sorting capabilities...

[Content for lesson 3 will be added here...]
`
    }
  ]
};
