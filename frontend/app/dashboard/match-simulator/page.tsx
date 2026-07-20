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
      <div className="flex flex-col items-center justify-center py-32 gap-6">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-surface-variant border-t-primary"></div>
          <svg className="absolute inset-0 m-auto w-10 h-10 text-primary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" opacity="0.3"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <p className="text-on-surface-variant font-medium text-lg">Loading matches...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <header>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3 tracking-tight">
          Match Simulator
        </h1>
        <p className="text-lg text-on-surface-variant font-medium">
          Simulate individual matches to see detailed score probabilities and outcomes
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Match Selection */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel rounded-xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-on-surface mb-4">Select Match</h3>
            
            {/* Stage Filter */}
            <div className="mb-6">
              <label className="text-sm font-bold text-on-surface uppercase tracking-wider mb-3 block">
                Filter by Stage
              </label>
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="w-full px-4 py-3 bg-surface-variant border-none rounded-xl text-on-surface
                         focus:outline-none focus:ring-2 focus:ring-primary-container cursor-pointer
                         transition-all duration-200 font-medium"
              >
                <option value="all">All Stages</option>
                {availableStages.map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            {/* Match List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredMatches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => {
                    setSelectedMatch(match);
                    setSimulationResult(null);
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedMatch?.id === match.id
                      ? 'bg-[#f59e0b] border-[#f59e0b] shadow-2xl scale-105 text-[#1a1d2e]'
                      : 'bg-[#1e2339] border-[#2d3349] hover:border-[#f59e0b] hover:shadow-lg text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      selectedMatch?.id === match.id ? 'text-[#1a1d2e]' : 'text-gray-400'
                    }`}>
                      Match #{match.match_number}
                    </span>
                    {match.group_letter && (
                      <span className={`text-xs px-2 py-1 rounded font-bold ${
                        selectedMatch?.id === match.id 
                          ? 'bg-[#1a1d2e] text-[#f59e0b]' 
                          : 'bg-[#2d3349] text-gray-400'
                      }`}>
                        Group {match.group_letter}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className={`font-bold ${
                      selectedMatch?.id === match.id ? 'text-[#1a1d2e]' : 'text-white'
                    }`}>{match.home_team.code}</span>
                    <span className={selectedMatch?.id === match.id ? 'text-[#1a1d2e]' : 'text-gray-400'}>vs</span>
                    <span className={`font-bold ${
                      selectedMatch?.id === match.id ? 'text-[#1a1d2e]' : 'text-white'
                    }`}>{match.away_team.code}</span>
                  </div>
                  <p className={`text-xs font-medium ${
                    selectedMatch?.id === match.id ? 'text-[#1a1d2e]/70' : 'text-gray-500'
                  }`}>
                    {format(new Date(match.match_date), 'MMM d, yyyy')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Simulation Panel */}
        <div className="lg:col-span-2 space-y-6">
          {!selectedMatch ? (
            <div className="glass-panel rounded-2xl text-center py-32 px-8 shadow-2xl">
              <div className="max-w-md mx-auto space-y-6">
                <div className="w-24 h-24 mx-auto bg-surface-container rounded-full flex items-center justify-center">
                  <svg className="w-14 h-14 text-on-surface-variant opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-on-surface mb-3">Select a Match to Simulate</h3>
                  <p className="text-on-surface-variant text-base leading-relaxed">
                    Choose a match from the list to run a detailed simulation with score probabilities and outcome predictions
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Selected Match Info */}
              <div className="glass-panel rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-on-surface mb-3">
                    {selectedMatch.home_team.name} vs {selectedMatch.away_team.name}
                  </h3>
                  <p className="text-base text-on-surface-variant font-medium">
                    {format(new Date(selectedMatch.match_date), 'EEEE, MMMM d, yyyy • h:mm a')}
                  </p>
                  {selectedMatch.venue && (
                    <p className="text-sm text-on-surface-variant/70 mt-2">📍 {selectedMatch.venue}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="text-center">
                    {selectedMatch.home_team.flag_url ? (
                      <div className="w-32 h-24 rounded-lg overflow-hidden mx-auto mb-4 shadow-lg border-4 border-[#f59e0b]">
                        <img 
                          src={selectedMatch.home_team.flag_url} 
                          alt={selectedMatch.home_team.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold shadow-lg border-4"
                           style={{ 
                             backgroundColor: selectedMatch.home_team.primary_color + '20',
                             borderColor: selectedMatch.home_team.primary_color + '40'
                           }}>
                        {selectedMatch.home_team.code}
                      </div>
                    )}
                    <h4 className="font-bold text-on-surface text-lg">{selectedMatch.home_team.name}</h4>
                  </div>
                  <div className="text-center">
                    {selectedMatch.away_team.flag_url ? (
                      <div className="w-32 h-24 rounded-lg overflow-hidden mx-auto mb-4 shadow-lg border-4 border-[#f59e0b]">
                        <img 
                          src={selectedMatch.away_team.flag_url} 
                          alt={selectedMatch.away_team.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold shadow-lg border-4"
                           style={{ 
                             backgroundColor: selectedMatch.away_team.primary_color + '20',
                             borderColor: selectedMatch.away_team.primary_color + '40'
                           }}>
                        {selectedMatch.away_team.code}
                      </div>
                    )}
                    <h4 className="font-bold text-on-surface text-lg">{selectedMatch.away_team.name}</h4>
                  </div>
                </div>

                {/* Simulation Controls */}
                <div className="border-t border-outline-variant pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-on-surface uppercase tracking-wider">
                      Number of Simulations
                    </label>
                    <span className="px-4 py-2 bg-primary-container text-on-primary-fixed font-bold text-lg rounded-lg">
                      {numSimulations.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="10000"
                    step="10"
                    value={numSimulations}
                    onChange={(e) => setNumSimulations(parseInt(e.target.value))}
                    className="w-full h-3 bg-surface-variant rounded-lg appearance-none cursor-pointer mb-6"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((numSimulations - 10) / (10000 - 10)) * 100}%, #2f344b ${((numSimulations - 10) / (10000 - 10)) * 100}%, #2f344b 100%)`
                    }}
                  />
                  
                  <Button
                    onClick={handleSimulateMatch}
                    variant="primary"
                    size="lg"
                    className="w-full text-base font-bold py-4"
                    isLoading={isSimulating}
                    disabled={isSimulating}
                  >
                    {isSimulating ? (
                      <span className="flex items-center gap-3 justify-center">
                        <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Simulating Match...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3 justify-center">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        Run Simulation
                      </span>
                    )}
                  </Button>
                </div>
              </div>

              {/* Simulation Results */}
              {simulationResult && (
                <div className="glass-panel rounded-xl p-8 shadow-2xl border-2 border-[#f59e0b]">
                  <h3 className="text-2xl font-bold text-on-surface mb-6">Simulation Results</h3>
                  
                  {/* Outcome Probabilities */}
                  <div className="mb-8">
                    <h4 className="text-base font-bold text-[#f59e0b] uppercase tracking-wider mb-4">Match Outcome</h4>
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
                  <div className="bg-gradient-to-br from-[#f59e0b]/30 to-[#f59e0b]/10 border-4 border-[#f59e0b] rounded-xl p-6 mb-8 shadow-lg">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-center">Most Likely Score</h4>
                    <div className="flex items-center justify-center gap-6">
                      <span className="text-6xl font-bold text-[#f59e0b]">
                        {simulationResult.most_likely_score.home}
                      </span>
                      <span className="text-3xl text-white">-</span>
                      <span className="text-6xl font-bold text-[#f59e0b]">
                        {simulationResult.most_likely_score.away}
                      </span>
                    </div>
                  </div>

                  {/* Score Probabilities */}
                  <div>
                    <h4 className="text-base font-bold text-[#f59e0b] uppercase tracking-wider mb-4">Top 10 Score Probabilities</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(simulationResult.score_probabilities)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 10)
                        .map(([score, prob]) => (
                          <div key={score} className="bg-[#1e2339] rounded-xl p-4 border-2 border-[#2d3349] hover:border-[#f59e0b] transition-all">
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-white">{score}</span>
                              <span className="text-base font-bold text-[#f59e0b]">{prob.toFixed(1)}%</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-outline-variant text-sm text-on-surface-variant">
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
