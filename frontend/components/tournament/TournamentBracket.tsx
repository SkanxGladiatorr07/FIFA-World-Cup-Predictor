'use client';

interface BracketMatch {
  team1: string;
  team2: string;
  winner?: string;
  score1?: number;
  score2?: number;
  probability1?: number;
  probability2?: number;
}

interface TournamentBracketProps {
  roundOf16?: BracketMatch[];
  quarterFinals?: BracketMatch[];
  semiFinals?: BracketMatch[];
  final?: BracketMatch;
  winner?: string;
}

export function TournamentBracket({
  roundOf16 = [],
  quarterFinals = [],
  semiFinals = [],
  final,
  winner,
}: TournamentBracketProps) {
  const renderMatch = (match: BracketMatch, showProbability = false) => {
    if (!match.team1 || !match.team2) {
      return (
        <div className="bg-surface-container-low rounded-lg p-3 border border-outline-variant min-w-[180px]">
          <div className="text-xs text-on-surface-variant text-center">TBD</div>
        </div>
      );
    }

    return (
      <div className="bg-surface-container-low rounded-lg border border-outline-variant hover:border-primary/50 transition-all min-w-[180px] overflow-hidden">
        {/* Team 1 */}
        <div className={`p-3 border-b border-outline-variant ${
          match.winner === match.team1 ? 'bg-primary-container/20 border-l-4 border-l-primary' : ''
        }`}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-on-surface truncate">{match.team1}</span>
            <div className="flex items-center gap-2">
              {showProbability && match.probability1 && (
                <span className="text-xs text-primary font-semibold">{match.probability1.toFixed(0)}%</span>
              )}
              {match.score1 !== undefined && (
                <span className="text-base font-bold text-on-surface">{match.score1}</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Team 2 */}
        <div className={`p-3 ${
          match.winner === match.team2 ? 'bg-primary-container/20 border-l-4 border-l-primary' : ''
        }`}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-on-surface truncate">{match.team2}</span>
            <div className="flex items-center gap-2">
              {showProbability && match.probability2 && (
                <span className="text-xs text-primary font-semibold">{match.probability2.toFixed(0)}%</span>
              )}
              {match.score2 !== undefined && (
                <span className="text-base font-bold text-on-surface">{match.score2}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConnector = (direction: 'right' | 'left', isLong = false) => {
    return (
      <div className="flex items-center">
        <div className={`h-[1px] ${isLong ? 'w-8' : 'w-4'} bg-outline-variant`}></div>
      </div>
    );
  };

  const renderVerticalConnector = (height: string) => {
    return (
      <div className="flex justify-center">
        <div className={`w-[1px] ${height} bg-outline-variant`}></div>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-8 p-8 min-w-full">
        {/* Round of 16 */}
        {roundOf16.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider text-center mb-4">
              Round of 16
            </h3>
            <div className="space-y-8">
              {roundOf16.map((match, i) => (
                <div key={i}>{renderMatch(match, true)}</div>
              ))}
            </div>
          </div>
        )}

        {/* Quarter Finals */}
        {quarterFinals.length > 0 && (
          <>
            <div className="flex flex-col justify-around py-12">
              {quarterFinals.map((_, i) => (
                <div key={i}>{renderConnector('right', true)}</div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider text-center mb-4">
                Quarter Finals
              </h3>
              <div className="space-y-20">
                {quarterFinals.map((match, i) => (
                  <div key={i}>{renderMatch(match, true)}</div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Semi Finals */}
        {semiFinals.length > 0 && (
          <>
            <div className="flex flex-col justify-around py-24">
              {semiFinals.map((_, i) => (
                <div key={i}>{renderConnector('right', true)}</div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider text-center mb-4">
                Semi Finals
              </h3>
              <div className="space-y-48">
                {semiFinals.map((match, i) => (
                  <div key={i}>{renderMatch(match, true)}</div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Final */}
        {final && (
          <>
            <div className="flex items-center py-48">
              {renderConnector('right', true)}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider text-center mb-4">
                Final
              </h3>
              <div className="py-48">
                {renderMatch(final, true)}
              </div>
            </div>
          </>
        )}

        {/* Winner */}
        {winner && (
          <>
            <div className="flex items-center py-48">
              {renderConnector('right')}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider text-center mb-4">
                Champion
              </h3>
              <div className="py-48">
                <div className="bg-gradient-to-br from-primary-container to-primary-container/50 rounded-xl p-6 border-2 border-primary shadow-2xl shadow-primary/20 min-w-[200px]">
                  <div className="text-center">
                    <div className="text-5xl mb-3">🏆</div>
                    <h4 className="text-2xl font-bold text-on-primary-fixed tracking-tight">{winner}</h4>
                    <p className="text-xs text-on-primary-fixed/70 mt-2 uppercase tracking-wider">World Cup Winner</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
