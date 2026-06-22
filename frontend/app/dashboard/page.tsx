'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/lib/auth-store';
import { apiClient } from '@/lib/api-client';
import { UserStats } from '@/lib/types';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const statsPromise = apiClient.getUserStats();
      const data = await Promise.race([statsPromise, timeoutPromise]) as UserStats;
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        total_predictions: 0,
        match_predictions: 0,
        player_predictions: 0,
        simulations_run: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { href: '/dashboard/match-predictor', icon: '⚽', title: 'Match Predictor', desc: 'Predict match scores and see AI predictions', color: 'from-gold/20 to-gold/5' },
    { href: '/dashboard/tournament-simulator', icon: '🏆', title: 'Tournament Simulator', desc: 'Run simulations to predict the winner', color: 'from-purple-500/20 to-purple-500/5' },
    { href: '/dashboard/match-simulator', icon: '🎲', title: 'Match Simulator', desc: 'Simulate individual match outcomes', color: 'from-blue-500/20 to-blue-500/5' },
    { href: '/dashboard/golden-boot', icon: '🥇', title: 'Golden Boot', desc: 'Predict the top goal scorer', color: 'from-yellow-500/20 to-yellow-500/5' },
    { href: '/dashboard/golden-glove', icon: '🧤', title: 'Golden Glove', desc: 'Predict the best goalkeeper', color: 'from-green-500/20 to-green-500/5' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">
          Welcome back, {user?.username}! 👋
        </h1>
        <p className="text-gray-400 text-lg">
          Track your predictions and explore AI-powered World Cup insights
        </p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gold/20 to-gold/5 border-gold/50 hover:scale-105">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2 font-medium">Total Predictions</p>
                <p className="text-4xl font-bold text-white">{stats?.total_predictions || 0}</p>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/50 hover:scale-105">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2 font-medium">Match Predictions</p>
                <p className="text-4xl font-bold text-white">{stats?.match_predictions || 0}</p>
              </div>
              <div className="text-4xl">⚽</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/50 hover:scale-105">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2 font-medium">Player Predictions</p>
                <p className="text-4xl font-bold text-white">{stats?.player_predictions || 0}</p>
              </div>
              <div className="text-4xl">👤</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border-purple-500/50 hover:scale-105">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2 font-medium">Simulations Run</p>
                <p className="text-4xl font-bold text-white">{stats?.simulations_run || 0}</p>
              </div>
              <div className="text-4xl">🔮</div>
            </div>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-3xl font-heading font-bold text-white mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className={`h-full bg-gradient-to-br ${action.color} hover:scale-[1.03] hover:shadow-card-hover cursor-pointer group`}>
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{action.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {action.desc}
                </p>
              </Card>
            </Link>
          ))}

          <Card className="bg-gradient-to-br from-gold/10 to-dark-800 border-gold/30 h-full">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-gold mb-2">
              More Coming Soon
            </h3>
            <p className="text-gray-400 text-sm">
              Additional features and predictions in development
            </p>
          </Card>
        </div>
      </div>

      {/* Info Box */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <div className="flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div className="flex-1">
            <h4 className="font-semibold text-white text-lg mb-3">How to Get Started</h4>
            <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Start with the Match Predictor to predict individual match scores</li>
              <li>Run Tournament Simulations to see which team is most likely to win</li>
              <li>Make your Golden Boot and Golden Glove predictions</li>
              <li>Use the Match Simulator for detailed score probability analysis</li>
              <li>Track all your predictions from this dashboard</li>
            </ol>
          </div>
        </div>
      </Card>
    </div>
  );
}
