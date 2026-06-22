'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/auth-store';
import { apiClient } from '@/lib/api-client';
import { Card } from '@/components/ui/Card';
import { UserStats } from '@/lib/types';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiClient.getUserStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  const statCards = [
    {
      title: 'Total Predictions',
      value: stats?.total_predictions || 0,
      icon: '🎯',
      color: 'text-gold',
    },
    {
      title: 'Match Predictions',
      value: stats?.match_predictions || 0,
      icon: '⚽',
      color: 'text-blue-400',
    },
    {
      title: 'Player Predictions',
      value: stats?.player_predictions || 0,
      icon: '⭐',
      color: 'text-green-400',
    },
    {
      title: 'Simulations Run',
      value: stats?.simulations_run || 0,
      icon: '🎮',
      color: 'text-purple-400',
    },
  ];
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">
          Welcome back, {user?.username}! 👋
        </h1>
        <p className="text-gray-400">
          Here's your prediction dashboard
        </p>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-heading font-bold text-white">
                  {loading ? '...' : stat.value}
                </p>
              </div>
              <div className={`text-5xl ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-heading font-semibold text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-dark-700 hover:bg-dark-600 rounded-lg transition-smooth text-left">
            <div className="text-2xl mb-2">⚽</div>
            <div className="font-semibold text-white">Predict Next Match</div>
            <div className="text-sm text-gray-400">Make match predictions</div>
          </button>
          <button className="p-4 bg-dark-700 hover:bg-dark-600 rounded-lg transition-smooth text-left">
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-semibold text-white">Run Simulation</div>
            <div className="text-sm text-gray-400">Simulate tournament</div>
          </button>
          <button className="p-4 bg-dark-700 hover:bg-dark-600 rounded-lg transition-smooth text-left">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold text-white">View Leaderboard</div>
            <div className="text-sm text-gray-400">Check rankings</div>
          </button>
        </div>
      </Card>
      
      {/* Recent Activity */}
      <Card>
        <h2 className="text-xl font-heading font-semibold text-white mb-4">
          Recent Activity
        </h2>
        <div className="text-center py-8 text-gray-400">
          <p>No recent activity yet</p>
          <p className="text-sm mt-2">Start making predictions to see your activity here</p>
        </div>
      </Card>
    </div>
  );
}
