'use client';

import { useState, useEffect } from 'react';
import { PlayerStats, GoldenGlovePrediction } from '@/lib/types';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function GoldenGlovePage() {
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerStats[]>([]);
  const [myPrediction, setMyPrediction] = useState<GoldenGlovePrediction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter players based on search query
    if (searchQuery.trim() === '') {
      setFilteredPlayers(players);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = players.filter(
        (ps) =>
          ps.player.name.toLowerCase().includes(query) ||
          ps.player.team_code.toLowerCase().includes(query) ||
          ps.player.club.toLowerCase().includes(query)
      );
      setFilteredPlayers(filtered);
    }
  }, [searchQuery, players]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [playersData, predictionData] = await Promise.all([
        apiClient.getTopGoalkeepers(20),
        apiClient.getMyGoldenGlovePrediction(),
      ]);
      setPlayers(playersData);
      setFilteredPlayers(playersData);
      setMyPrediction(predictionData);
      if (predictionData) {
        setSelectedPlayerId(predictionData.player_id);
      }
    } catch (error: any) {
      toast.error('Failed to load data');
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPrediction = async () => {
    if (!selectedPlayerId) {
      toast.error('Please select a goalkeeper');
      return;
    }

    try {
      setIsSubmitting(true);
      const prediction = await apiClient.predictGoldenGlove(selectedPlayerId);
      setMyPrediction(prediction);
      toast.success('Golden Glove prediction saved!');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to save prediction');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Golden Glove Predictor 🧤</h1>
        <p className="text-gray-400">
          Predict which goalkeeper will have the best performance in the tournament
        </p>
      </div>

      {/* Current Prediction Card */}
      {myPrediction && (
        <div className="card bg-gradient-to-r from-blue-500/20 to-blue-500/5 border border-blue-500/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-1">Your Prediction</h3>
              <p className="text-2xl font-bold text-blue-400">{myPrediction.player_name}</p>
              <p className="text-sm text-gray-400 mt-1">{myPrediction.team_name}</p>
            </div>
            <div className="text-6xl">🧤</div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="card bg-dark-800 border border-dark-700">
        <h3 className="text-lg font-semibold text-white mb-2">How it works</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Review the list of top goalkeepers based on save percentage and clean sheets</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Select the goalkeeper you think will perform best</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>AI confidence scores show predicted save performance</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>You can update your prediction anytime before the tournament starts</span>
          </li>
        </ul>
      </div>

      {/* Players List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Top Goalkeepers</h2>
          <div className="w-64">
            <input
              type="text"
              placeholder="Search goalkeepers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       placeholder-gray-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlayers.map((playerStat) => {
            const player = playerStat.player;
            const isSelected = selectedPlayerId === player.id;
            const isMyPrediction = myPrediction?.player_id === player.id;

            return (
              <div
                key={player.id}
                onClick={() => setSelectedPlayerId(player.id)}
                className={`card cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-500/20 border-blue-500 shadow-lg scale-105'
                    : isMyPrediction
                    ? 'bg-blue-500/10 border-blue-500/50'
                    : 'bg-dark-800 border-dark-700 hover:border-blue-400/30 hover:bg-dark-700'
                }`}
              >
                {/* Player Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{player.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-400">{player.team_code}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-sm text-gray-400">{player.age} years</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{player.club}</p>
                  </div>
                  {isMyPrediction && (
                    <span className="badge badge-sm bg-blue-500 text-white font-semibold">
                      Your Pick
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-3 pb-3 border-b border-dark-600">
                  <div>
                    <p className="text-xs text-gray-500">Save %</p>
                    <p className="text-lg font-bold text-white">
                      {player.save_percentage?.toFixed(1) || 'N/A'}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Clean Sheets</p>
                    <p className="text-lg font-bold text-white">
                      {player.clean_sheet_percentage?.toFixed(1) || 'N/A'}%
                    </p>
                  </div>
                </div>

                {/* AI Prediction */}
                <div className="bg-dark-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-400">AI Prediction</span>
                    <span className="text-xs text-blue-400">
                      {playerStat.prediction_confidence?.toFixed(0)}% confidence
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-400">
                      {playerStat.predicted_saves?.toFixed(0)}
                    </span>
                    <span className="text-sm text-gray-400">saves predicted</span>
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-blue-500/30">
                    <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Selected</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="sticky bottom-0 bg-dark-900 border-t border-dark-700 p-4 -mx-6 -mb-6">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleSubmitPrediction}
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
            disabled={!selectedPlayerId || isSubmitting}
          >
            {myPrediction ? 'Update Prediction' : 'Submit Prediction'}
          </Button>
        </div>
      </div>
    </div>
  );
}
