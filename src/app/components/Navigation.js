'use client';

import { useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';
import { CgProfile } from "react-icons/cg";

export default function Navigation() {
  const { user, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link 
              href="/"
              className="flex items-center px-2 py-2 text-[#fafafa] font-semibold text-xl"
            >
              DevForge
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link 
              href="/pathways"
              className="px-3 py-2 rounded-md text-lg font-medium text-[#fafafa] hover:text-gray-400"
            >
              Pathways
            </Link>
            <Link 
              href="/projects"
              className="px-3 py-2 rounded-md text-lg font-medium text-[#fafafa] hover:text-gray-400"
            >
              Projects
            </Link>

            {isLoaded && user ? (
              <>
                <Link 
                  href="/profile"
                  className="px-3 py-2 rounded-md text-lg font-medium text-[#fafafa] hover:text-gray-400"
                >
                  <CgProfile className='h-7 w-7' />
                </Link>
              </>
            ) : (
              <>
                <SignInButton>
                  <button
                    className="px-3 py-[6px] text-lg font-medium text-[#fafafa] hover:text-gray-400"
                  >
                    Log in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button
                    className="px-4 py-[6px] text-lg border-2 rounded-full font-medium text-[#fafafa] hover:text-gray-400"
                  >
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#fafafa] hover:text-gray-400 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden bg-gray-900/50 backdrop-blur-sm`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/projects"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#fafafa] hover:text-gray-400"
          >
            Projects
          </Link>

          {isLoaded && user ? (
            <>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#fafafa] hover:text-gray-400"
              >
                <CgProfile className='h-7 w-7' />
              </Link>
            </>
          ) : (
            <>
              <SignInButton>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#fafafa] hover:text-gray-400"
                >
                  Sign In
                </button>
              </SignInButton>
              <Link
                href="/sign-up"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#fafafa] hover:text-gray-400"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
