'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };
  
  return (
    <nav className="bg-surface-container-highest border-b border-outline-variant px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-on-primary-fixed" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary tracking-tight">
                World Cup 2026
              </h1>
              <p className="text-xs text-on-surface-variant font-medium">AI Predictor</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <div className="flex items-center space-x-3 bg-surface-container px-4 py-2 rounded-xl border border-outline-variant">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shadow-md">
                  <span className="text-on-primary-fixed font-bold text-base">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-on-surface font-bold block text-sm">{user.username}</span>
                  <span className="text-on-surface-variant text-xs">Premium Tier</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
