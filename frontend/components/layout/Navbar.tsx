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
    <nav className="bg-dark-900 border-b border-dark-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-heading font-bold text-gold">
            ⚽ World Cup 2026
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                  <span className="text-dark-950 font-semibold text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-white font-medium">{user.username}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
