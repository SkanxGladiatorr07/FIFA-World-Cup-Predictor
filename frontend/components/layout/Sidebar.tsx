'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
  },
  {
    name: 'Match Predictor',
    href: '/dashboard/match-predictor',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
    ),
  },
  {
    name: 'Golden Boot',
    href: '/dashboard/golden-boot',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    name: 'Golden Glove',
    href: '/dashboard/golden-glove',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.84 7.87l-7.65-1.11L10 .5 6.81 6.76-.84 7.87l5.33 5.2L3.22 20.5 10 16.76l6.78 3.74-1.27-7.43 5.33-5.2z"/>
      </svg>
    ),
  },
  {
    name: 'Match Simulator',
    href: '/dashboard/match-simulator',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
      </svg>
    ),
  },
  {
    name: 'Tournament Simulator',
    href: '/dashboard/tournament-simulator',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 bg-surface-container-low border-r border-outline-variant h-screen sticky top-0 overflow-y-auto custom-scrollbar">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-primary font-bold text-lg mb-1">Pro Analyst</h2>
          <p className="text-on-surface-variant text-sm">Premium Tier</p>
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
                    ? 'bg-primary-container text-on-primary-fixed shadow-lg scale-105 font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant hover:scale-102'
                  }
                `}
              >
                <span className={isActive ? 'text-on-primary-fixed' : ''}>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
