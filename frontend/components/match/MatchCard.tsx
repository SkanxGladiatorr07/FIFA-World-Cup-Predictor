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
    <div className="glass-panel rounded-xl shadow-2xl hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
      {/* Match Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-outline-variant">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-xs font-bold rounded-lg uppercase tracking-wider">
            {match.match_stage || 'Group'}
          </span>
          {match.group_letter && (
            <span className="px-3 py-1 bg-primary-container/20 text-primary text-xs font-bold rounded-lg">
              Group {match.group_letter}
            </span>
          )}
          <span className="text-xs text-on-surface-variant font-semibold">Match #{match.match_number}</span>
        </div>
        
        {match.is_completed && (
          <span className="px-3 py-1 bg-tertiary-container/20 text-tertiary text-xs font-bold rounded-lg">
            FINAL
          </span>
        )}
      </div>

      {/* Teams Display */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center mb-5">
        {/* Home Team */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3 text-3xl font-bold shadow-lg border-2"
               style={{ 
                 backgroundColor: match.home_team.primary_color + '20',
                 borderColor: match.home_team.primary_color + '40'
               }}>
            {match.home_team.code}
          </div>
          <h3 className="font-bold text-on-surface text-base">{match.home_team.name}</h3>
          {match.is_completed && match.home_score !== null && (
            <span className="text-3xl font-bold text-primary mt-2">{match.home_score}</span>
          )}
        </div>

        {/* VS Divider */}
        <div className="flex flex-col items-center">
          <span className="text-on-surface-variant text-base font-bold">VS</span>
          {!match.is_completed && !isTBD && (
            <span className="text-xs text-on-surface-variant/70 mt-1 font-semibold">
              {format(matchDate, 'MMM d')}
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3 text-3xl font-bold shadow-lg border-2"
               style={{ 
                 backgroundColor: match.away_team.primary_color + '20',
                 borderColor: match.away_team.primary_color + '40'
               }}>
            {match.away_team.code}
          </div>
          <h3 className="font-bold text-on-surface text-base">{match.away_team.name}</h3>
          {match.is_completed && match.away_score !== null && (
            <span className="text-3xl font-bold text-primary mt-2">{match.away_score}</span>
          )}
        </div>
      </div>

      {/* Match Details */}
      <div className="text-center mb-5 pb-4 border-b border-outline-variant">
        <p className="text-sm text-on-surface-variant font-medium">
          {format(matchDate, 'EEEE, MMMM d, yyyy • h:mm a')}
        </p>
        {match.venue && (
          <p className="text-xs text-on-surface-variant/70 mt-1">📍 {match.venue}</p>
        )}
      </div>

      {/* AI Probabilities - Show for all matches except TBD */}
      {!isTBD && aiProbabilities && (
        <div className="mb-5">
          <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">AI Prediction</h4>
          <ProbabilityBar
            probabilities={aiProbabilities}
            homeTeamColor={match.home_team.primary_color}
            awayTeamColor={match.away_team.primary_color}
          />
        </div>
      )}

      {/* User Prediction Section - Allow for all matches except TBD */}
      {!isTBD && showPredictionForm && (
        <div>
          {userPrediction && !showForm ? (
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Your Prediction</span>
                <button
                  onClick={() => setShowForm(true)}
                  className="text-xs text-primary hover:text-primary-fixed-dim font-bold transition-colors"
                >
                  Edit
                </button>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-3xl font-bold text-primary">{userPrediction.predicted_home_score}</span>
                <span className="text-on-surface-variant text-xl">-</span>
                <span className="text-3xl font-bold text-primary">{userPrediction.predicted_away_score}</span>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant">
              <h4 className="text-sm font-bold text-on-surface mb-4">Make Your Prediction</h4>
              
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-5">
                <div>
                  <label className="text-xs text-on-surface-variant block mb-2 font-semibold">{match.home_team.code}</label>
                  <ScoreInput
                    value={homeScore}
                    onChange={setHomeScore}
                    min={0}
                    max={10}
                  />
                </div>
                
                <span className="text-on-surface-variant mt-5 text-xl">-</span>
                
                <div>
                  <label className="text-xs text-on-surface-variant block mb-2 font-semibold">{match.away_team.code}</label>
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
        <div className="text-center py-4 bg-surface-container-low rounded-xl border border-outline-variant">
          <p className="text-sm text-on-surface-variant font-medium">Teams to be determined after group stage</p>
        </div>
      )}

      {/* Completed Match Message */}
      {match.is_completed && (
        <div className="text-center py-3 bg-tertiary-container/20 rounded-xl border border-tertiary-container/30 mt-4">
          <p className="text-xs text-tertiary font-bold uppercase tracking-wider">Match Completed</p>
        </div>
      )}
    </div>
  );
};
