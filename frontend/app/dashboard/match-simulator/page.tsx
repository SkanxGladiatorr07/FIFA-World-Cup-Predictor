'use client';

import { useState, useEffect } from 'react';
import { MatchWithTeams, MatchSimulationResult } from '@/lib/types';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { ProbabilityBar } from '@/components/match/ProbabilityBar';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function MatchSimulatorPage() {
  const [matches, setMatches] = useState<MatchWithTeams[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<MatchWithTeams | null>(null);
  const [simulationResult, setSimulationResult] = useState<MatchSimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [numSimulations, setNumSimulations] = useState(1000);
  const [filterStage, setFilterStage] = useState<string>('all');
  const [availableStages, setAvailableStages] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [matchesData, stagesData] = await Promise.all([
        apiClient.getMatches({ limit: 100 }),
        apiClient.getAvailableStages(),
      ]);
      // Filter out TBD matches
      const validMatches = matchesData.filter(
        (m) => m.home_team.name !== 'TBD' && m.away_team.name !== 'TBD'
      );
      setMatches(validMatches);
      setAvailableStages(stagesData);
    } catch (error: any) {
      toast.error('Failed to load matches');
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulateMatch = async () => {
    if (!selectedMatch) return;

    try {
      setIsSimulating(true);
      const result = await apiClient.simulateMatch({
        match_id: selectedMatch.id,
        num_simulations: numSimulations,
      });
      setSimulationResult(result);
      toast.success('Match simulation complete!');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Simulation failed');
    } finally {
      setIsSimulating(false);
    }
  };

  const filteredMatches = filterStage === 'all' 
    ? matches 
    : matches.filter(m => m.match_stage === filterStage);

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
        <h1 className="text-3xl font-bold text-white mb-2">Match Simulator ⚽</h1>
        <p className="text-gray-400">
          Simulate individual matches to see detailed score probabilities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Match Selection */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card bg-dark-800 border border-dark-700">
            <h3 className="text-lg font-semibold text-white mb-4">Select Match</h3>
            
            {/* Stage Filter */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Filter by Stage
              </label>
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm
                         focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                <option value="all">All Stages</option>
                {availableStages.map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            {/* Match List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredMatches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => {
                    setSelectedMatch(match);
                    setSimulationResult(null);
                  }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedMatch?.id === match.id
                      ? 'bg-gold/20 border-gold'
                      : 'bg-dark-700 border-dark-600 hover:border-gold/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Match #{match.match_number}</span>
                    {match.group_letter && (
                      <span className="text-xs badge badge-sm bg-dark-600 text-gray-400">
                        Group {match.group_letter}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-white">{match.home_team.code}</span>
                    <span className="text-gray-500">vs</span>
                    <span className="font-medium text-white">{match.away_team.code}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(match.match_date), 'MMM d, yyyy')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Simulation Panel */}
        <div className="lg:col-span-2 space-y-4">
          {!selectedMatch ? (
            <div className="card bg-dark-800 border border-dark-700 text-center py-20">
              <div className="text-6xl mb-4">⚽</div>
              <h3 className="text-xl font-semibold text-white mb-2">Select a Match</h3>
              <p className="text-gray-400">
                Choose a match from the list to run a simulation
              </p>
            </div>
          ) : (
            <>
              {/* Selected Match Info */}
              <div className="card bg-dark-800 border border-dark-700">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedMatch.home_team.name} vs {selectedMatch.away_team.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {format(new Date(selectedMatch.match_date), 'EEEE, MMMM d, yyyy • h:mm a')}
                  </p>
                  {selectedMatch.venue && (
                    <p className="text-xs text-gray-500 mt-1">{selectedMatch.venue}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl font-bold"
                         style={{ backgroundColor: selectedMatch.home_team.primary_color + '20' }}>
                      {selectedMatch.home_team.code}
                    </div>
                    <h4 className="font-semibold text-white">{selectedMatch.home_team.name}</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl font-bold"
                         style={{ backgroundColor: selectedMatch.away_team.primary_color + '20' }}>
                      {selectedMatch.away_team.code}
                    </div>
                    <h4 className="font-semibold text-white">{selectedMatch.away_team.name}</h4>
                  </div>
                </div>

                {/* Simulation Controls */}
                <div className="border-t border-dark-700 pt-4">
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Number of Simulations: {numSimulations.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="10000"
                    step="10"
                    value={numSimulations}
                    onChange={(e) => setNumSimulations(parseInt(e.target.value))}
                    className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-gold mb-4"
                  />
                  
                  <Button
                    onClick={handleSimulateMatch}
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isSimulating}
                    disabled={isSimulating}
                  >
                    {isSimulating ? 'Simulating...' : 'Run Simulation'}
                  </Button>
                </div>
              </div>

              {/* Simulation Results */}
              {simulationResult && (
                <div className="card bg-dark-800 border border-gold/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Simulation Results</h3>
                  
                  {/* Outcome Probabilities */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Match Outcome</h4>
                    <ProbabilityBar
                      probabilities={{
                        home_win: simulationResult.home_win_probability,
                        draw: simulationResult.draw_probability,
                        away_win: simulationResult.away_win_probability,
                      }}
                      homeTeamColor={selectedMatch.home_team.primary_color}
                      awayTeamColor={selectedMatch.away_team.primary_color}
                    />
                  </div>

                  {/* Most Likely Score */}
                  <div className="bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/50 rounded-lg p-4 mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Most Likely Score</h4>
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-4xl font-bold text-white">
                        {simulationResult.most_likely_score.home}
                      </span>
                      <span className="text-2xl text-gray-500">-</span>
                      <span className="text-4xl font-bold text-white">
                        {simulationResult.most_likely_score.away}
                      </span>
                    </div>
                  </div>

                  {/* Score Probabilities */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Top 10 Score Probabilities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(simulationResult.score_probabilities)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 10)
                        .map(([score, prob]) => (
                          <div key={score} className="bg-dark-700 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-white">{score}</span>
                              <span className="text-sm font-semibold text-gold">{prob.toFixed(1)}%</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-dark-700 text-xs text-gray-400">
                    Based on {numSimulations.toLocaleString()} simulations
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
