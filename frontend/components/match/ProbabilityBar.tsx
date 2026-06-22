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
      <div className="flex justify-between text-xs text-on-surface-variant font-semibold mb-2 uppercase tracking-wider">
        <span>Home Win</span>
        <span>Draw</span>
        <span>Away Win</span>
      </div>
      
      {/* Probability Bar */}
      <div className="flex h-8 w-full rounded-xl overflow-hidden shadow-lg border border-outline-variant">
        {/* Home Win Section */}
        <div
          className="flex items-center justify-center text-white text-xs font-bold transition-all duration-500 hover:brightness-110"
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
          className="flex items-center justify-center bg-surface-variant text-on-surface-variant text-xs font-bold transition-all duration-500 hover:brightness-110"
          style={{
            width: `${normalizedDraw}%`,
            minWidth: draw >= 5 ? 'auto' : '0',
          }}
        >
          {draw >= 10 && <span>{draw.toFixed(1)}%</span>}
        </div>
        
        {/* Away Win Section */}
        <div
          className="flex items-center justify-center text-white text-xs font-bold transition-all duration-500 hover:brightness-110"
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
      <div className="flex justify-between text-sm font-bold mt-2">
        <span style={{ color: homeTeamColor }}>{home_win.toFixed(1)}%</span>
        <span className="text-on-surface-variant">{draw.toFixed(1)}%</span>
        <span style={{ color: awayTeamColor }}>{away_win.toFixed(1)}%</span>
      </div>
    </div>
  );
};
