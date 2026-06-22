'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  
  return (
    <aside className="w-64 bg-dark-900 border-r border-dark-800 min-h-screen sticky top-0">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth
                ${isActive
                  ? 'bg-gold text-dark-950 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
