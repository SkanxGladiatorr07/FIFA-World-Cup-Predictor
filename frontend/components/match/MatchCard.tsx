'use client';

import React, { useState } from 'react';
import { MatchWithTeams, MatchPredictionCreate, PredictionProbabilities } from '@/lib/types';
import { ProbabilityBar } from './ProbabilityBar';
import { ScoreInput } from './ScoreInput';
import { Button } from '../ui/Button';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface MatchCardProps {
  match: MatchWithTeams;
  aiProbabilities?: PredictionProbabilities | null;
  userPrediction?: { predicted_home_score: number; predicted_away_score: number } | null;
  onPredictSubmit?: (matchId: number, prediction: MatchPredictionCreate) => Promise<void>;
  showPredictionForm?: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  aiProbabilities,
  userPrediction,
  onPredictSubmit,
  showPredictionForm = true,
}) => {
  const [homeScore, setHomeScore] = useState<number>(userPrediction?.predicted_home_score ?? 0);
  const [awayScore, setAwayScore] = useState<number>(userPrediction?.predicted_away_score ?? 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async () => {
    if (!onPredictSubmit) return;

    try {
      setIsSubmitting(true);
      await onPredictSubmit(match.id, {
        predicted_home_score: homeScore,
        predicted_away_score: awayScore,
      });
      toast.success('Prediction saved successfully!');
      setShowForm(false);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to save prediction');
    } finally {
      setIsSubmitting(false);
    }
  };

  const matchDate = new Date(match.match_date);
  // Allow predictions for all matches regardless of date
  // const isInPast = matchDate < new Date();
  const isTBD = match.home_team.name === 'TBD' || match.away_team.name === 'TBD';

  return (
    <div className="bg-[#1e2339] rounded-xl shadow-2xl border-2 border-[#f59e0b] hover:border-[#ffc174] transition-all duration-300">
      {/* Match Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b-2 border-[#f59e0b] px-6 pt-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 bg-[#f59e0b] text-[#1a1d2e] text-xs font-bold rounded-lg uppercase tracking-wider">
            {match.match_stage || 'Group'}
          </span>
          {match.group_letter && (
            <span className="px-3 py-1 bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-bold rounded-lg border border-[#f59e0b]">
              Group {match.group_letter}
            </span>
          )}
          <span className="text-xs text-[#f59e0b] font-semibold">Match #{match.match_number}</span>
        </div>
      </div>

      {/* Teams Display */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center mb-5 px-6">
        {/* Home Team */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3 text-3xl font-bold shadow-lg border-4 border-[#f59e0b]"
               style={{ 
                 backgroundColor: match.home_team.primary_color + '20',
               }}>
            {match.home_team.code}
          </div>
          <h3 className="font-bold text-white text-base">{match.home_team.name}</h3>
        </div>

        {/* VS Divider */}
        <div className="flex flex-col items-center">
          <span className="text-[#f59e0b] text-base font-bold">VS</span>
          {!isTBD && (
            <span className="text-xs text-gray-500 mt-1 font-semibold">
              {format(matchDate, 'MMM d')}
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3 text-3xl font-bold shadow-lg border-4 border-[#f59e0b]"
               style={{ 
                 backgroundColor: match.away_team.primary_color + '20',
               }}>
            {match.away_team.code}
          </div>
          <h3 className="font-bold text-white text-base">{match.away_team.name}</h3>
        </div>
      </div>

      {/* Match Details */}
      <div className="text-center mb-5 pb-4 border-b border-[#2d3349] px-6">
        <p className="text-sm text-gray-400 font-medium">
          {format(matchDate, 'EEEE, MMMM d, yyyy • h:mm a')}
        </p>
        {match.venue && (
          <p className="text-xs text-gray-500 mt-1">📍 {match.venue}</p>
        )}
      </div>

      {/* AI Probabilities - Show for all matches except TBD */}
      {!isTBD && aiProbabilities && (
        <div className="mb-5 px-6">
          <h4 className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider mb-3">AI Prediction</h4>
          <ProbabilityBar
            probabilities={aiProbabilities}
            homeTeamColor={match.home_team.primary_color}
            awayTeamColor={match.away_team.primary_color}
          />
        </div>
      )}

      {/* User Prediction Section - Allow for all matches except TBD */}
      {!isTBD && showPredictionForm && (
        <div className="px-6 pb-6">
          {userPrediction && !showForm ? (
            <div className="bg-[#2d3349] rounded-xl p-4 border-2 border-[#f59e0b]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider">Your Prediction</span>
                <button
                  onClick={() => setShowForm(true)}
                  className="text-xs text-[#f59e0b] hover:text-[#ffc174] font-bold transition-colors"
                >
                  Edit
                </button>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-3xl font-bold text-[#f59e0b]">{userPrediction.predicted_home_score}</span>
                <span className="text-gray-500 text-xl">-</span>
                <span className="text-3xl font-bold text-[#f59e0b]">{userPrediction.predicted_away_score}</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#2d3349] rounded-xl p-5 border-2 border-[#f59e0b]">
              <h4 className="text-sm font-bold text-white mb-4">Make Your Prediction</h4>
              
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="flex flex-col items-center">
                  <label className="text-xs text-gray-400 block mb-2 font-semibold">{match.home_team.code}</label>
                  <ScoreInput
                    value={homeScore}
                    onChange={setHomeScore}
                    min={0}
                    max={10}
                  />
                </div>
                
                <span className="text-gray-400 mt-6 text-2xl font-bold">-</span>
                
                <div className="flex flex-col items-center">
                  <label className="text-xs text-gray-400 block mb-2 font-semibold">{match.away_team.code}</label>
                  <ScoreInput
                    value={awayScore}
                    onChange={setAwayScore}
                    min={0}
                    max={10}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  size="sm"
                  className="flex-1 font-bold"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {userPrediction ? 'Update' : 'Submit'} Prediction
                </Button>
                {showForm && userPrediction && (
                  <Button
                    onClick={() => {
                      setShowForm(false);
                      setHomeScore(userPrediction.predicted_home_score);
                      setAwayScore(userPrediction.predicted_away_score);
                    }}
                    variant="ghost"
                    size="sm"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TBD Message */}
      {isTBD && (
        <div className="text-center py-4 bg-[#2d3349] rounded-xl border border-[#3d4359] mx-6 mb-6">
          <p className="text-sm text-gray-400 font-medium">Teams to be determined after group stage</p>
        </div>
      )}
    </div>
  );
};
