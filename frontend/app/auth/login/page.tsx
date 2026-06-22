import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-5xl group-hover:scale-110 transition-transform">⚽</span>
              <h1 className="text-3xl font-heading font-bold text-[#f59e0b]">
                World Cup 2026
              </h1>
            </div>
          </Link>
          <h2 className="text-4xl font-heading font-bold text-white mb-3">
            Sign In
          </h2>
          <p className="text-gray-400 text-lg">
            Welcome back! Enter your credentials to continue
          </p>
        </div>
        
        {/* Login Card */}
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700 p-8 shadow-2xl">
          <LoginForm />
        </div>
        
        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-gold hover:text-gold-light font-semibold transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
