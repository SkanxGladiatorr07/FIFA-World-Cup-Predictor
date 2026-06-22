'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: '🏠',
  },
  {
    name: 'Match Predictor',
    href: '/dashboard/match-predictor',
    icon: '⚽',
  },
  {
    name: 'Golden Boot',
    href: '/dashboard/golden-boot',
    icon: '👟',
  },
  {
    name: 'Golden Glove',
    href: '/dashboard/golden-glove',
    icon: '🧤',
  },
  {
    name: 'Match Simulator',
    href: '/dashboard/match-simulator',
    icon: '🎮',
  },
  {
    name: 'Tournament Simulator',
    href: '/dashboard/tournament-simulator',
    icon: '🏆',
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  
  return (
    <aside className="w-64 bg-surface-container-low border-r border-outline-variant h-screen sticky top-0 overflow-y-auto custom-scrollbar">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-primary font-bold text-lg mb-1">{user?.username || 'User'}</h2>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium
                  ${isActive
                    ? 'bg-[#f59e0b] text-[#1a1d2e] shadow-lg font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant hover:scale-102'
                  }
                `}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
