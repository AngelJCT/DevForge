import SignInForm from '@/app/components/auth/SignInForm';

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border-2 border-[#f4f6fb] px-8 pb-8 rounded-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Log in to your account
          </h2>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
