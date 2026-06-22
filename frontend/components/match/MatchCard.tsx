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
    <div className="card bg-dark-800 border border-dark-700 hover:border-gold/50 transition-all duration-300">
      {/* Match Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-dark-700">
        <div className="flex items-center gap-2">
          <span className="badge badge-sm bg-dark-700 text-gray-400">
            {match.match_stage || 'Group'}
          </span>
          {match.group_letter && (
            <span className="badge badge-sm bg-gold/20 text-gold">
              Group {match.group_letter}
            </span>
          )}
          <span className="text-xs text-gray-500">Match #{match.match_number}</span>
        </div>
        
        {match.is_completed && (
          <span className="badge badge-sm bg-success/20 text-success">
            Final
          </span>
        )}
      </div>

      {/* Teams Display */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-4">
        {/* Home Team */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 text-3xl font-bold"
               style={{ backgroundColor: match.home_team.primary_color + '20' }}>
            {match.home_team.code}
          </div>
          <h3 className="font-semibold text-white">{match.home_team.name}</h3>
          {match.is_completed && match.home_score !== null && (
            <span className="text-2xl font-bold text-gold mt-1">{match.home_score}</span>
          )}
        </div>

        {/* VS Divider */}
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm font-semibold">VS</span>
          {!match.is_completed && !isTBD && (
            <span className="text-xs text-gray-500 mt-1">
              {format(matchDate, 'MMM d')}
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 text-3xl font-bold"
               style={{ backgroundColor: match.away_team.primary_color + '20' }}>
            {match.away_team.code}
          </div>
          <h3 className="font-semibold text-white">{match.away_team.name}</h3>
          {match.is_completed && match.away_score !== null && (
            <span className="text-2xl font-bold text-gold mt-1">{match.away_score}</span>
          )}
        </div>
      </div>

      {/* Match Details */}
      <div className="text-center mb-4 pb-4 border-b border-dark-700">
        <p className="text-sm text-gray-400">
          {format(matchDate, 'EEEE, MMMM d, yyyy • h:mm a')}
        </p>
        {match.venue && (
          <p className="text-xs text-gray-500 mt-1">{match.venue}</p>
        )}
      </div>

      {/* AI Probabilities */}
      {!isTBD && !match.is_completed && aiProbabilities && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-400 mb-2">AI Prediction</h4>
          <ProbabilityBar
            probabilities={aiProbabilities}
            homeTeamColor={match.home_team.primary_color}
            awayTeamColor={match.away_team.primary_color}
          />
        </div>
      )}

      {/* User Prediction Section */}
      {!isTBD && !match.is_completed && showPredictionForm && (
        <div>
          {userPrediction && !showForm ? (
            <div className="bg-dark-700 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-400">Your Prediction</span>
                <button
                  onClick={() => setShowForm(true)}
                  className="text-xs text-gold hover:text-gold-light"
                >
                  Edit
                </button>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl font-bold text-white">{userPrediction.predicted_home_score}</span>
                <span className="text-gray-500">-</span>
                <span className="text-2xl font-bold text-white">{userPrediction.predicted_away_score}</span>
              </div>
            </div>
          ) : (
            <div className="bg-dark-700 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Make Your Prediction</h4>
              
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">{match.home_team.code}</label>
                  <ScoreInput
                    value={homeScore}
                    onChange={setHomeScore}
                    min={0}
                    max={10}
                  />
                </div>
                
                <span className="text-gray-500 mt-5">-</span>
                
                <div>
                  <label className="text-xs text-gray-400 block mb-1">{match.away_team.code}</label>
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
                  className="flex-1"
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
        <div className="text-center py-3 bg-dark-700 rounded-lg">
          <p className="text-sm text-gray-400">Teams to be determined after group stage</p>
        </div>
      )}

      {/* Completed Match Message */}
      {match.is_completed && (
        <div className="text-center py-2 bg-success/10 rounded-lg">
          <p className="text-xs text-success font-semibold">Match Completed</p>
        </div>
      )}
    </div>
  );
};
