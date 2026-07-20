'use client';

import { useState, useEffect } from 'react';
import { MatchCard } from '@/components/match/MatchCard';
import { MatchWithTeams, MatchPredictionCreate, MatchWithPrediction } from '@/lib/types';
import { apiClient } from '@/lib/api-client';
import toast from 'react-hot-toast';

export default function MatchPredictorPage() {
  const [matches, setMatches] = useState<MatchWithTeams[]>([]);
  const [matchDetails, setMatchDetails] = useState<Map<number, MatchWithPrediction>>(new Map());
  const [filteredMatches, setFilteredMatches] = useState<MatchWithTeams[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableStages, setAvailableStages] = useState<string[]>([]);
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  
  // Filters
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMatches();
    fetchFilters();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [matches, selectedStage, selectedGroup, searchQuery]);

  // Fetch match details (with AI probabilities and user predictions) when matches change
  useEffect(() => {
    if (filteredMatches.length > 0) {
      fetchMatchDetails();
    }
  }, [filteredMatches]);

  const fetchMatches = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.getMatches({ limit: 100 });
      setMatches(data);
    } catch (error: any) {
      toast.error('Failed to load matches');
      console.error('Error fetching matches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMatchDetails = async () => {
    try {
      // Fetch details for ALL filtered matches
      const detailsPromises = filteredMatches.map(match => 
        apiClient.getMatch(match.id).catch(err => {
          console.error(`Failed to fetch details for match ${match.id}:`, err);
          return null;
        })
      );
      
      const details = await Promise.all(detailsPromises);
      const detailsMap = new Map<number, MatchWithPrediction>();
      
      details.forEach((detail) => {
        if (detail) {
          detailsMap.set(detail.id, detail);
        }
      });
      
      setMatchDetails(detailsMap);
    } catch (error) {
      console.error('Error fetching match details:', error);
    }
  };

  const fetchFilters = async () => {
    try {
      const [stages, groups] = await Promise.all([
        apiClient.getAvailableStages(),
        apiClient.getAvailableGroups(),
      ]);
      setAvailableStages(stages);
      setAvailableGroups(groups);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...matches];

    // Filter by stage
    if (selectedStage !== 'all') {
      filtered = filtered.filter((m) => m.match_stage === selectedStage);
    }

    // Filter by group
    if (selectedGroup !== 'all') {
      filtered = filtered.filter((m) => m.group_letter === selectedGroup);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.home_team.name.toLowerCase().includes(query) ||
          m.away_team.name.toLowerCase().includes(query) ||
          m.home_team.code.toLowerCase().includes(query) ||
          m.away_team.code.toLowerCase().includes(query)
      );
    }

    setFilteredMatches(filtered);
  };

  const handlePredictionSubmit = async (matchId: number, prediction: MatchPredictionCreate) => {
    await apiClient.createOrUpdatePrediction(matchId, prediction);
    // Refetch the specific match details to update the prediction display
    try {
      const updatedMatch = await apiClient.getMatch(matchId);
      setMatchDetails(prev => new Map(prev).set(matchId, updatedMatch));
    } catch (error) {
      console.error('Failed to refetch match details:', error);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <header className="flex justify-between items-end flex-wrap gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3 tracking-tight">
            Match Predictor
          </h1>
          <p className="text-lg text-on-surface-variant font-medium">
            Leverage AI analytics to submit your tournament predictions
          </p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-high px-5 py-3 rounded-xl border border-outline-variant shadow-lg">
          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/>
          </svg>
          <span className="text-sm font-semibold tracking-wide">Top 2% Predictor Rank</span>
        </div>
      </header>

      {/* Filter Section */}
      <section>
        <div className="glass-panel rounded-xl p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* Search */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Search Teams
              </label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="e.g. Mexico, Brazil..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface-variant border-none rounded-xl text-on-surface
                           placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container
                           transition-all duration-200 text-base"
                />
              </div>
            </div>

            {/* Stage Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Stage
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full px-4 py-3 bg-surface-variant border-none rounded-xl text-on-surface
                         focus:outline-none focus:ring-2 focus:ring-primary-container cursor-pointer
                         transition-all duration-200 text-base font-medium"
              >
                <option value="all">🌍 All Stages</option>
                <option value="GROUP">⚽ Group Stage</option>
                <option value="ROUND_OF_32">🏆 Round of 32</option>
                <option value="ROUND_OF_16">🔥 Round of 16</option>
                <option value="QUARTER_FINAL">💎 Quarter-Finals</option>
                <option value="SEMI_FINAL">⭐ Semi-Finals</option>
                <option value="THIRD_PLACE">🥉 Third Place</option>
                <option value="FINAL">👑 Final</option>
              </select>
            </div>

            {/* Group Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Group
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-4 py-3 bg-surface-variant border-none rounded-xl text-on-surface
                         focus:outline-none focus:ring-2 focus:ring-primary-container cursor-pointer
                         transition-all duration-200 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedStage !== 'all' && selectedStage !== 'Group'}
              >
                <option value="all">All Groups</option>
                {availableGroups.map((group) => (
                  <option key={group} value={group}>
                    Group {group}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-6 pt-6 border-t border-outline-variant flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="px-5 py-2 bg-surface-container-high rounded-xl border border-outline-variant">
                <span className="text-on-surface-variant text-sm font-medium">Total Matches: </span>
                <span className="text-primary text-lg font-bold">{filteredMatches.length}</span>
                <span className="text-on-surface-variant text-sm"> / {matches.length}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedStage('all');
                setSelectedGroup('all');
                setSearchQuery('');
              }}
              className="text-sm text-primary hover:text-primary-fixed-dim font-semibold transition-colors
                       flex items-center gap-2 hover:underline underline-offset-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Matches Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-surface-variant border-t-primary"></div>
            <svg className="absolute inset-0 m-auto w-10 h-10 text-primary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <p className="text-on-surface-variant font-medium text-lg">Loading matches...</p>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="glass-panel rounded-2xl text-center py-20 px-8 shadow-2xl">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-24 h-24 mx-auto bg-surface-container rounded-full flex items-center justify-center">
              <svg className="w-14 h-14 text-on-surface-variant opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-on-surface mb-3">No matches found</h3>
              <p className="text-on-surface-variant text-base leading-relaxed">
                Try adjusting your filters or search query to find matches. You can clear all filters to see the complete match list.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedStage('all');
                setSelectedGroup('all');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-primary-container text-on-primary-fixed font-semibold rounded-xl
                       hover:brightness-110 active:scale-95 transition-all shadow-lg inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredMatches.map((match) => {
            const details = matchDetails.get(match.id);
            return (
              <MatchCard
                key={match.id}
                match={match}
                aiProbabilities={details?.ai_probabilities}
                userPrediction={details?.user_prediction}
                onPredictSubmit={handlePredictionSubmit}
                showPredictionForm={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
