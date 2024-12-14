import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-[#f4f6fb]">
            Learn Programming by Building
            <span className="text-[#00a1c0]"> Real Projects</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
            Master programming fundamentals through hands-on experience building real-world applications
          </p>
          <div className="mt-8">
            <Link 
              href="/projects"
              className="bg-[#00a1c0] px-8 py-3 rounded-full font-medium hover:bg-[#037993] transition-colors"
            >
              Start Learning
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-lg bg-gray-600">
            <h3 className="text-xl font-semibold mb-2">Project-Based Learning</h3>
            <p className="text-gray-300 font-medium">Learn by building real applications like Airbnb, Twitter, and more</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-600">
            <h3 className="text-xl font-semibold mb-2">Step-by-Step Guidance</h3>
            <p className="text-gray-300 font-medium">Clear instructions and explanations for every part of the development process</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-600">
            <h3 className="text-xl font-semibold mb-2">Practical Skills</h3>
            <p className="text-gray-300 font-medium">Build a portfolio of real projects while learning fundamental concepts</p>
          </div>
        </div>

        {/* Featured Projects Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Featured Learning Projects</h2>
          <p className="text-gray-300 font-medium mb-8">Start your journey with these popular projects</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Airbnb Clone</h3>
                <p className="text-gray-300 mb-4 font-medium">Build a property rental platform while learning databases, authentication, and more</p>
                <Link 
                  href="/projects/airbnb-clone"
                  className="text-[#00a1c0] hover:text-[#037993] font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">E-Commerce Platform</h3>
                <p className="text-gray-300 mb-4 font-medium">Create an online store while mastering payment integration and state management</p>
                <Link 
                  href="/projects/ecommerce"
                  className="text-[#00a1c0] hover:text-[#037993] font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Social Media App</h3>
                <p className="text-gray-300 mb-4 font-medium">Develop a social platform while learning real-time features and API integration</p>
                <Link 
                  href="/projects/social-media"
                  className="text-[#00a1c0] hover:text-[#037993] font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
