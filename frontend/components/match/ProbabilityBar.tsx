import React from 'react';
import { PredictionProbabilities } from '@/lib/types';

interface ProbabilityBarProps {
  probabilities: PredictionProbabilities;
  homeTeamColor?: string;
  awayTeamColor?: string;
  className?: string;
}

export const ProbabilityBar: React.FC<ProbabilityBarProps> = ({
  probabilities,
  homeTeamColor = '#1a5490',
  awayTeamColor = '#c41e3a',
  className = '',
}) => {
  const { home_win, draw, away_win } = probabilities;
  
  // Ensure probabilities sum to 100 (handle rounding)
  const total = home_win + draw + away_win;
  const normalizedHomeWin = (home_win / total) * 100;
  const normalizedDraw = (draw / total) * 100;
  const normalizedAwayWin = (away_win / total) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Labels Row */}
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>Home Win</span>
        <span>Draw</span>
        <span>Away Win</span>
      </div>
      
      {/* Probability Bar */}
      <div className="flex h-6 w-full rounded-lg overflow-hidden shadow-md">
        {/* Home Win Section */}
        <div
          className="flex items-center justify-center text-white text-xs font-bold transition-all duration-300 hover:opacity-90"
          style={{
            width: `${normalizedHomeWin}%`,
            backgroundColor: homeTeamColor,
            minWidth: home_win >= 5 ? 'auto' : '0',
          }}
        >
          {home_win >= 10 && <span>{home_win.toFixed(1)}%</span>}
        </div>
        
        {/* Draw Section */}
        <div
          className="flex items-center justify-center bg-gray-600 text-white text-xs font-bold transition-all duration-300 hover:opacity-90"
          style={{
            width: `${normalizedDraw}%`,
            minWidth: draw >= 5 ? 'auto' : '0',
          }}
        >
          {draw >= 10 && <span>{draw.toFixed(1)}%</span>}
        </div>
        
        {/* Away Win Section */}
        <div
          className="flex items-center justify-center text-white text-xs font-bold transition-all duration-300 hover:opacity-90"
          style={{
            width: `${normalizedAwayWin}%`,
            backgroundColor: awayTeamColor,
            minWidth: away_win >= 5 ? 'auto' : '0',
          }}
        >
          {away_win >= 10 && <span>{away_win.toFixed(1)}%</span>}
        </div>
      </div>
      
      {/* Percentage Values Row */}
      <div className="flex justify-between text-sm font-semibold mt-1">
        <span style={{ color: homeTeamColor }}>{home_win.toFixed(1)}%</span>
        <span className="text-gray-400">{draw.toFixed(1)}%</span>
        <span style={{ color: awayTeamColor }}>{away_win.toFixed(1)}%</span>
      </div>
    </div>
  );
};
