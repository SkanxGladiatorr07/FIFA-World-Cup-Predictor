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
      <div className="flex flex-col items-center justify-center py-32 gap-6">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-surface-variant border-t-secondary"></div>
          <svg className="absolute inset-0 m-auto w-10 h-10 text-secondary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" opacity="0.3"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <p className="text-on-surface-variant font-medium text-lg">Loading goalkeepers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <header className="flex justify-between items-end flex-wrap gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-3 tracking-tight">
            Golden Glove Predictor
          </h1>
          <p className="text-lg text-on-surface-variant font-medium">
            Predict which goalkeeper will have the best performance in the tournament
          </p>
        </div>
        {myPrediction && (
          <div className="flex items-center gap-3 bg-secondary-container px-5 py-3 rounded-xl shadow-lg">
            <svg className="w-8 h-8 text-on-secondary-container" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div>
              <span className="text-xs font-semibold text-on-secondary-container/70 uppercase tracking-wider block">Your Prediction</span>
              <span className="text-sm font-bold text-on-secondary-container">{myPrediction.player_name}</span>
            </div>
          </div>
        )}
      </header>

      {/* Current Prediction Card - Large Display */}
      {myPrediction && (
        <div className="glass-panel rounded-2xl p-8 shadow-2xl bg-gradient-to-br from-secondary-container/30 to-transparent border-secondary-container">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                Your Golden Glove Pick
              </h3>
              <p className="text-4xl font-bold text-secondary tracking-tight">{myPrediction.player_name}</p>
              <p className="text-base text-on-surface-variant font-medium">{myPrediction.team_name}</p>
            </div>
            <div className="text-8xl opacity-20">🧤</div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="glass-panel rounded-xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-3">
          <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          How it works
        </h3>
        <ul className="space-y-3 text-base text-on-surface-variant">
          <li className="flex items-start gap-3">
            <span className="text-secondary text-xl font-bold">1</span>
            <span>Review the list of top goalkeepers based on save percentage and clean sheets</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-secondary text-xl font-bold">2</span>
            <span>Select the goalkeeper you think will perform best</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-secondary text-xl font-bold">3</span>
            <span>AI confidence scores show predicted save performance</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-secondary text-xl font-bold">4</span>
            <span>You can update your prediction anytime before the tournament starts</span>
          </li>
        </ul>
      </div>

      {/* Players List */}
      <div>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-on-surface">Top Goalkeepers</h2>
          <div className="w-full md:w-80">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search goalkeepers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-variant border-none rounded-xl
                         placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary-container
                         transition-all duration-200 text-base"
              />
            </div>
          </div>
        </div>

        {/* Alternative: Dropdown Selection */}
        <div className="mb-6">
          <label className="text-sm font-bold text-on-surface uppercase tracking-wider mb-3 block">
            Or Select Goalkeeper from Dropdown
          </label>
          <select
            value={selectedPlayerId || ''}
            onChange={(e) => setSelectedPlayerId(e.target.value ? Number(e.target.value) : null)}
            className="w-full px-4 py-3 bg-surface-variant border-none rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-secondary-container cursor-pointer
                     transition-all duration-200 text-base font-medium"
          >
            <option value="">-- Select a Goalkeeper --</option>
            {filteredPlayers.map((playerStat) => (
              <option key={playerStat.player.id} value={playerStat.player.id}>
                {playerStat.player.name} ({playerStat.player.team_code}) - {playerStat.predicted_saves?.toFixed(0)} predicted saves
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((playerStat) => {
            const player = playerStat.player;
            const isSelected = selectedPlayerId === player.id;
            const isMyPrediction = myPrediction?.player_id === player.id;

            return (
              <div
                key={player.id}
                onClick={() => setSelectedPlayerId(player.id)}
                className={`glass-panel rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-secondary-container shadow-2xl shadow-secondary-container/20 scale-105 bg-secondary-container/10'
                    : isMyPrediction
                    ? 'border-secondary-container/50 bg-secondary-container/5'
                    : 'border-outline-variant hover:border-secondary/50 hover:shadow-xl hover:scale-102'
                }`}
              >
                {/* Player Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-on-surface mb-2">{player.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <span className="px-2 py-1 bg-surface-variant rounded font-semibold">{player.team_code}</span>
                      <span>•</span>
                      <span>{player.age} years</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-2">{player.club}</p>
                  </div>
                  {isMyPrediction && (
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-lg uppercase tracking-wider">
                      Your Pick
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-outline-variant">
                  <div className="bg-surface-container-high rounded-lg p-3">
                    <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Save %</p>
                    <p className="text-2xl font-bold text-secondary">
                      {player.save_percentage?.toFixed(1) || 'N/A'}%
                    </p>
                  </div>
                  <div className="bg-surface-container-high rounded-lg p-3">
                    <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Clean Sheets</p>
                    <p className="text-2xl font-bold text-secondary">
                      {player.clean_sheet_percentage?.toFixed(1) || 'N/A'}%
                    </p>
                  </div>
                </div>

                {/* AI Prediction */}
                <div className="bg-surface-container-low rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">AI Prediction</span>
                    <span className="text-xs font-semibold text-tertiary px-2 py-1 bg-tertiary-container/20 rounded">
                      {playerStat.prediction_confidence?.toFixed(0)}% confidence
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-secondary">
                      {playerStat.predicted_saves?.toFixed(0)}
                    </span>
                    <span className="text-sm text-on-surface-variant font-medium">saves predicted</span>
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-secondary-container/30">
                    <div className="flex items-center gap-2 text-secondary text-sm font-bold">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="uppercase tracking-wider">Selected</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-lg border-t border-outline-variant p-6 -mx-6 -mb-6 shadow-2xl">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleSubmitPrediction}
            variant="primary"
            size="lg"
            className="w-full text-base font-bold py-4"
            isLoading={isSubmitting}
            disabled={!selectedPlayerId || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-3 justify-center">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-3 justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {myPrediction ? 'Update Prediction' : 'Submit Prediction'}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
