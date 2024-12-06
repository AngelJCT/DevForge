import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Add custom logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/projects/:path*',  // Protect all project routes
    '/profile/:path*',   // Protect profile routes
    '/api/progress/:path*', // Protect progress API routes
  ],
};
