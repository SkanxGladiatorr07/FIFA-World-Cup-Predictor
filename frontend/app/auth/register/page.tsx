import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-heading font-bold text-gold">
              ⚽ World Cup 2026
            </h1>
          </Link>
          <h2 className="mt-6 text-3xl font-heading font-bold text-white">
            Create Account
          </h2>
          <p className="mt-2 text-gray-400">
            Join the prediction platform today
          </p>
        </div>
        
        {/* Register Form */}
        <div className="bg-dark-800 rounded-xl border border-dark-700 p-8 shadow-xl">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
