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
      // Fetch details for visible matches only (first 20 to avoid overload)
      const matchesToFetch = filteredMatches.slice(0, 20);
      const detailsPromises = matchesToFetch.map(match => 
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Match Predictor ⚽</h1>
        <p className="text-gray-400">
          Predict match outcomes and see AI-powered probability predictions
        </p>
      </div>

      {/* Filters */}
      <div className="card bg-dark-800 border border-dark-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Search Teams
            </label>
            <input
              type="text"
              placeholder="Search by team name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white
                       focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                       placeholder-gray-500"
            />
          </div>

          {/* Stage Filter */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Match Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white
                       focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="all">All Stages</option>
              {availableStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          {/* Group Filter */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Group
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white
                       focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
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

        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-dark-700 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Showing {filteredMatches.length} of {matches.length} matches
          </span>
          <button
            onClick={() => {
              setSelectedStage('all');
              setSelectedGroup('all');
              setSearchQuery('');
            }}
            className="text-sm text-gold hover:text-gold-light transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Matches Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="card bg-dark-800 border border-dark-700 text-center py-12">
          <div className="text-6xl mb-4">⚽</div>
          <h3 className="text-xl font-semibold text-white mb-2">No matches found</h3>
          <p className="text-gray-400">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
