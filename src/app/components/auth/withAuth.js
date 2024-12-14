'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isLoaded) return;
      
      if (!user) {
        router.push('/sign-in');
      }
    }, [user, isLoaded, router]);

    if (!isLoaded) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
}
