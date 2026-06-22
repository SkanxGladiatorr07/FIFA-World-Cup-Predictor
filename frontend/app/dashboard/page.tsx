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
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const statsPromise = apiClient.getUserStats();
      const data = await Promise.race([statsPromise, timeoutPromise]) as UserStats;
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default stats on error so UI still shows
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

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">
          Welcome back, {user?.username}! 👋
        </h1>
        <p className="text-gray-400">
          Track your predictions and explore AI-powered World Cup insights
        </p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gold/20 to-gold/5 border-gold/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Predictions</p>
                <p className="text-3xl font-bold text-white">{stats?.total_predictions || 0}</p>
              </div>
              <div className="text-3xl">🎯</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Match Predictions</p>
                <p className="text-3xl font-bold text-white">{stats?.match_predictions || 0}</p>
              </div>
              <div className="text-3xl">⚽</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Player Predictions</p>
                <p className="text-3xl font-bold text-white">{stats?.player_predictions || 0}</p>
              </div>
              <div className="text-3xl">👤</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border-purple-500/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Simulations Run</p>
                <p className="text-3xl font-bold text-white">{stats?.simulations_run || 0}</p>
              </div>
              <div className="text-3xl">🔮</div>
            </div>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard/match-predictor">
            <Card className="hover:border-gold/50 transition-all cursor-pointer group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚽</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                Match Predictor
              </h3>
              <p className="text-gray-400 text-sm">
                Predict match scores and see AI probability predictions
              </p>
            </Card>
          </Link>

          <Link href="/dashboard/tournament-simulator">
            <Card className="hover:border-gold/50 transition-all cursor-pointer group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                Tournament Simulator
              </h3>
              <p className="text-gray-400 text-sm">
                Run thousands of simulations to predict the winner
              </p>
            </Card>
          </Link>

          <Link href="/dashboard/match-simulator">
            <Card className="hover:border-gold/50 transition-all cursor-pointer group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎲</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                Match Simulator
              </h3>
              <p className="text-gray-400 text-sm">
                Simulate individual matches for detailed probabilities
              </p>
            </Card>
          </Link>

          <Link href="/dashboard/golden-boot">
            <Card className="hover:border-gold/50 transition-all cursor-pointer group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🥇</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                Golden Boot
              </h3>
              <p className="text-gray-400 text-sm">
                Predict the tournament's top goal scorer
              </p>
            </Card>
          </Link>

          <Link href="/dashboard/golden-glove">
            <Card className="hover:border-gold/50 transition-all cursor-pointer group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🧤</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                Golden Glove
              </h3>
              <p className="text-gray-400 text-sm">
                Predict the best goalkeeper of the tournament
              </p>
            </Card>
          </Link>

          <Card className="bg-gradient-to-br from-gold/10 to-dark-800 border-gold/30">
            <div className="text-4xl mb-3">✨</div>
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
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-semibold text-white mb-1">How to Get Started</h4>
            <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
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
