import ForgotPasswordForm from '@/app/components/auth/ForgotPasswordForm';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border-2 border-[#f4f6fb] px-8 pb-8 rounded-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-[#f4f6fb]">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
