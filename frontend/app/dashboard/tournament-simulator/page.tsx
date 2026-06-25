'use client';

import { useState, useEffect } from 'react';
import { SimulationResponse, SimulationCreate } from '@/lib/types';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function TournamentSimulatorPage() {
  const [simulations, setSimulations] = useState<SimulationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentSimulation, setCurrentSimulation] = useState<SimulationResponse | null>(null);
  
  // Simulation parameters
  const [numSimulations, setNumSimulations] = useState(1000);
  const [randomnessFactor, setRandomnessFactor] = useState(0.15);
  const [simulationName, setSimulationName] = useState('');

  useEffect(() => {
    fetchSimulations();
  }, []);

  const fetchSimulations = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.getMySimulations(10);
      setSimulations(data);
    } catch (error: any) {
      console.error('Error fetching simulations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunSimulation = async () => {
    try {
      setIsSimulating(true);
      const simulationData: SimulationCreate = {
        simulation_name: simulationName || `Simulation ${new Date().toLocaleString()}`,
        num_simulations: numSimulations,
        randomness_factor: randomnessFactor,
      };
      
      const result = await apiClient.simulateTournament(simulationData);
      setCurrentSimulation(result);
      setSimulations([result, ...simulations]);
      toast.success('Tournament simulation complete!');
      setSimulationName('');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Simulation failed');
    } finally {
      setIsSimulating(false);
    }
  };

  const renderSimulationResults = (sim: SimulationResponse) => {
    if (!sim.results_json) return null;

    const results = sim.results_json;
    const winnerProbs = results.winner_probabilities || {};
    const runnerUpProbs = results.runner_up_probabilities || {};
    const thirdPlaceProbs = results.third_place_probabilities || {};
    const finalistProbs = results.finalist_probabilities || {};

    return (
      <div className="space-y-8">
        {/* Podium - Winner, Runner-up, Third Place */}
        <div className="bg-gradient-to-br from-primary-container/20 to-secondary-container/20 border-2 border-primary/30 rounded-2xl p-8 shadow-2xl">
          <h4 className="text-2xl font-bold text-primary mb-6 text-center flex items-center justify-center gap-3">
            <span>🏆</span>
            Tournament Podium
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Winner - 1st Place */}
            <div className="bg-gradient-to-br from-[#f59e0b]/30 to-[#ffc174]/10 border-4 border-[#f59e0b] rounded-2xl p-6 shadow-2xl transform md:scale-110 md:mt-0">
              <div className="text-center">
                <div className="text-7xl mb-4">🥇</div>
                <h5 className="text-sm font-bold text-[#f59e0b] uppercase tracking-wider mb-2">Champion</h5>
                <p className="text-3xl font-bold text-white mb-2">{results.most_likely_winner || 'N/A'}</p>
                <p className="text-lg text-[#f59e0b] font-semibold">
                  {winnerProbs[results.most_likely_winner]?.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Runner-up - 2nd Place */}
            <div className="bg-gradient-to-br from-[#c0c0c0]/30 to-[#e8e8e8]/10 border-4 border-[#c0c0c0] rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <div className="text-6xl mb-4">🥈</div>
                <h5 className="text-sm font-bold text-[#c0c0c0] uppercase tracking-wider mb-2">Runner-up</h5>
                <p className="text-2xl font-bold text-white mb-2">{results.most_likely_runner_up || 'N/A'}</p>
                <p className="text-base text-[#c0c0c0] font-semibold">
                  {runnerUpProbs[results.most_likely_runner_up]?.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Third Place */}
            <div className="bg-gradient-to-br from-[#cd7f32]/30 to-[#e39b5f]/10 border-4 border-[#cd7f32] rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <div className="text-6xl mb-4">🥉</div>
                <h5 className="text-sm font-bold text-[#cd7f32] uppercase tracking-wider mb-2">Third Place</h5>
                <p className="text-2xl font-bold text-white mb-2">{results.most_likely_third_place || 'N/A'}</p>
                <p className="text-base text-[#cd7f32] font-semibold">
                  {thirdPlaceProbs[results.most_likely_third_place]?.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Winner Probabilities */}
        <div className="glass-panel rounded-2xl p-6 border-2 border-primary/20">
          <h4 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <span>🏆</span>
            Winner Probabilities (Top 10)
          </h4>
          <div className="space-y-3">
            {Object.entries(winnerProbs)
              .sort(([, a]: any, [, b]: any) => b - a)
              .slice(0, 10)
              .map(([team, prob]: any, index) => {
                // Color gradient for each position
                const colors = [
                  { bg: 'bg-[#f59e0b]', border: 'border-[#f59e0b]', gradient: 'from-[#f59e0b] to-[#ffc174]' }, // Gold
                  { bg: 'bg-[#c0c0c0]', border: 'border-[#c0c0c0]', gradient: 'from-[#c0c0c0] to-[#e8e8e8]' }, // Silver
                  { bg: 'bg-[#cd7f32]', border: 'border-[#cd7f32]', gradient: 'from-[#cd7f32] to-[#e39b5f]' }, // Bronze
                  { bg: 'bg-[#60a5fa]', border: 'border-[#60a5fa]', gradient: 'from-[#60a5fa] to-[#93c5fd]' }, // Blue
                  { bg: 'bg-[#34d399]', border: 'border-[#34d399]', gradient: 'from-[#34d399] to-[#6ee7b7]' }, // Green
                  { bg: 'bg-[#a78bfa]', border: 'border-[#a78bfa]', gradient: 'from-[#a78bfa] to-[#c4b5fd]' }, // Purple
                  { bg: 'bg-[#f472b6]', border: 'border-[#f472b6]', gradient: 'from-[#f472b6] to-[#f9a8d4]' }, // Pink
                  { bg: 'bg-[#fb923c]', border: 'border-[#fb923c]', gradient: 'from-[#fb923c] to-[#fdba74]' }, // Orange
                  { bg: 'bg-[#22d3ee]', border: 'border-[#22d3ee]', gradient: 'from-[#22d3ee] to-[#67e8f9]' }, // Cyan
                  { bg: 'bg-[#fbbf24]', border: 'border-[#fbbf24]', gradient: 'from-[#fbbf24] to-[#fcd34d]' }, // Yellow
                ];
                const color = colors[index] || colors[0];
                
                return (
                  <div key={team} className={`bg-surface-container-low rounded-xl p-4 border-2 ${color.border} hover:border-opacity-100 transition-all`}>
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`w-8 h-8 flex items-center justify-center ${color.bg} text-[#1a1d2e] text-sm font-bold rounded-lg shadow-md`}>
                        #{index + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold text-on-surface">{team}</span>
                          <span className={`text-lg font-bold text-white`}>{prob.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-3 bg-surface-variant rounded-full overflow-hidden border border-outline-variant">
                      <div
                        className={`h-full bg-gradient-to-r ${color.gradient} transition-all duration-500 rounded-full shadow-lg`}
                        style={{ width: `${prob}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Finalist Probabilities */}
        {Object.keys(finalistProbs).length > 0 && (
          <div className="glass-panel rounded-2xl p-6 border-2 border-secondary/20">
            <h4 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
              <span>🥈</span>
              Finalist Probabilities (Top 6)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(finalistProbs)
                .sort(([, a]: any, [, b]: any) => b - a)
                .slice(0, 6)
                .map(([team, prob]: any) => (
                  <div key={team} className="bg-surface-container-low rounded-xl p-5 border-2 border-secondary/30 hover:border-secondary transition-all">
                    <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Finalist</p>
                    <p className="text-xl font-bold text-on-surface mb-1">{team}</p>
                    <p className="text-2xl font-bold text-secondary">{prob.toFixed(1)}%</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Runner-up Probabilities */}
        {Object.keys(runnerUpProbs).length > 0 && (
          <div className="glass-panel rounded-2xl p-6 border-2 border-[#c0c0c0]/20">
            <h4 className="text-2xl font-bold text-[#c0c0c0] mb-6 flex items-center gap-2">
              <span>🥈</span>
              Runner-up Probabilities (Top 6)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(runnerUpProbs)
                .sort(([, a]: any, [, b]: any) => b - a)
                .slice(0, 6)
                .map(([team, prob]: any) => (
                  <div key={team} className="bg-surface-container-low rounded-xl p-5 border-2 border-[#c0c0c0]/30 hover:border-[#c0c0c0] transition-all">
                    <p className="text-sm font-semibold text-[#c0c0c0] uppercase tracking-wider mb-2">Runner-up</p>
                    <p className="text-xl font-bold text-on-surface mb-1">{team}</p>
                    <p className="text-2xl font-bold text-[#c0c0c0]">{prob.toFixed(1)}%</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Third Place Probabilities */}
        {Object.keys(thirdPlaceProbs).length > 0 && (
          <div className="glass-panel rounded-2xl p-6 border-2 border-[#cd7f32]/20">
            <h4 className="text-2xl font-bold text-[#cd7f32] mb-6 flex items-center gap-2">
              <span>🥉</span>
              Third Place Probabilities (Top 6)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(thirdPlaceProbs)
                .sort(([, a]: any, [, b]: any) => b - a)
                .slice(0, 6)
                .map(([team, prob]: any) => (
                  <div key={team} className="bg-surface-container-low rounded-xl p-5 border-2 border-[#cd7f32]/30 hover:border-[#cd7f32] transition-all">
                    <p className="text-sm font-semibold text-[#cd7f32] uppercase tracking-wider mb-2">Third Place</p>
                    <p className="text-xl font-bold text-on-surface mb-1">{team}</p>
                    <p className="text-2xl font-bold text-[#cd7f32]">{prob.toFixed(1)}%</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Simulation Info */}
        <div className="bg-surface-container-low rounded-xl p-5 border-2 border-primary/30">
          <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>📊</span>
            Simulation Details
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-surface-container rounded-lg border border-primary/20">
              <p className="text-on-surface-variant mb-1">Simulations run</p>
              <p className="text-lg font-bold text-primary">{results.simulations_run?.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-surface-container rounded-lg border border-tertiary/20">
              <p className="text-on-surface-variant mb-1">Randomness factor</p>
              <p className="text-lg font-bold text-tertiary">{results.randomness_factor?.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <header className="flex justify-between items-end flex-wrap gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3 tracking-tight">
            Tournament Simulator
          </h1>
          <p className="text-lg text-on-surface-variant font-medium">
            Simulate the entire World Cup tournament thousands of times to predict the winner
          </p>
        </div>
        {currentSimulation && (
          <div className="flex items-center gap-3 bg-primary-container px-5 py-3 rounded-xl shadow-lg">
            <svg className="w-8 h-8 text-on-primary-fixed" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <div>
              <span className="text-xs font-semibold text-on-primary-fixed/70 uppercase tracking-wider block">Latest Winner</span>
              <span className="text-sm font-bold text-on-primary-fixed">{currentSimulation.results_json?.most_likely_winner}</span>
            </div>
          </div>
        )}
      </header>

      {/* Simulation Controls */}
      <div className="glass-panel rounded-xl p-8 shadow-2xl border-2 border-primary/50">
        <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-primary/30">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">Configure Simulation</h3>
            <p className="text-sm text-on-surface-variant">Adjust parameters to customize your tournament simulation</p>
          </div>
          <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
          </svg>
        </div>
        
        <div className="space-y-6">
          {/* Simulation Name */}
          <div>
            <label className="text-sm font-bold text-primary uppercase tracking-wider mb-3 block">
              Simulation Name (Optional)
            </label>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
              <input
                type="text"
                placeholder="e.g., Conservative Prediction, Chaos Mode"
                value={simulationName}
                onChange={(e) => setSimulationName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-surface-variant border-2 border-primary/30 rounded-xl text-base
                         placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                         transition-all duration-200 hover:border-primary/50"
              />
            </div>
          </div>

          {/* Number of Simulations */}
          <div className="p-4 border-2 border-primary/30 rounded-xl bg-surface-container-low">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-primary uppercase tracking-wider">
                Number of Simulations
              </label>
              <span className="px-4 py-2 bg-primary text-on-primary-fixed font-bold text-lg rounded-lg shadow-lg">
                {numSimulations.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={numSimulations}
              onChange={(e) => setNumSimulations(parseInt(e.target.value))}
              className="w-full h-3 bg-surface-variant rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((numSimulations - 100) / (10000 - 100)) * 100}%, #2f344b ${((numSimulations - 100) / (10000 - 100)) * 100}%, #2f344b 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-on-surface-variant mt-2 font-semibold">
              <span>⚡ 100 (Fast)</span>
              <span>🎯 10,000 (Accurate)</span>
            </div>
          </div>

          {/* Randomness Factor */}
          <div className="p-4 border-2 border-primary/30 rounded-xl bg-surface-container-low">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-tertiary uppercase tracking-wider">
                Randomness Factor
              </label>
              <span className="px-4 py-2 bg-tertiary text-on-tertiary-container font-bold text-lg rounded-lg shadow-lg">
                {randomnessFactor.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={randomnessFactor}
              onChange={(e) => setRandomnessFactor(parseFloat(e.target.value))}
              className="w-full h-3 bg-surface-variant rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #56e5a9 0%, #56e5a9 ${(randomnessFactor / 0.5) * 100}%, #2f344b ${(randomnessFactor / 0.5) * 100}%, #2f344b 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-on-surface-variant mt-2 font-semibold">
              <span>🔒 0.0 (Predictable)</span>
              <span>🎲 0.5 (Chaotic)</span>
            </div>
            <div className="mt-3 p-3 bg-surface-container rounded-lg border border-tertiary/20">
              <p className="text-sm text-on-surface-variant">
                💡 Higher randomness makes upsets more likely, simulating real-world unpredictability and underdog victories
              </p>
            </div>
          </div>

          {/* Run Button */}
          <Button
            onClick={handleRunSimulation}
            variant="primary"
            size="lg"
            className="w-full text-base font-bold py-4 shadow-xl"
            isLoading={isSimulating}
            disabled={isSimulating}
          >
            {isSimulating ? (
              <span className="flex items-center gap-3 justify-center">
                <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Running {numSimulations.toLocaleString()} Simulations...
              </span>
            ) : (
              <span className="flex items-center gap-3 justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Run Tournament Simulation
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Current Simulation Results */}
      {currentSimulation && (
        <div className="glass-panel rounded-2xl p-8 shadow-2xl border-primary-container/50">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Latest Simulation Results</h3>
              <p className="text-sm text-on-surface-variant">{currentSimulation.simulation_name}</p>
            </div>
          </div>

          {renderSimulationResults(currentSimulation)}
        </div>
      )}

      {/* Previous Simulations */}
      {simulations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
            </svg>
            Simulation History
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulations.slice(0, 6).map((sim) => (
              <div
                key={sim.id}
                className="glass-panel rounded-xl p-6 cursor-pointer transition-all duration-300 border-2 border-primary/20
                         hover:border-primary hover:shadow-2xl hover:scale-105 hover:bg-surface-container"
                onClick={() => {
                  setCurrentSimulation(sim);
                }}
              >
                <div className="flex items-start justify-between mb-4 pb-4 border-b-2 border-primary/20">
                  <div className="flex-1">
                    <h4 className="font-bold text-on-surface text-lg mb-1">
                      {sim.simulation_name || `Simulation ${sim.id}`}
                    </h4>
                    <p className="text-xs text-on-surface-variant">
                      {new Date(sim.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-primary text-on-primary-fixed text-xs font-bold rounded-lg shadow-md">
                    {sim.num_simulations?.toLocaleString()}
                  </span>
                </div>
                
                {sim.results_json?.most_likely_winner && (
                  <div className="bg-surface-container-low rounded-lg p-4 border-2 border-primary/30">
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>🏆</span>
                      Predicted Winner
                    </p>
                    <p className="text-2xl font-bold text-primary">{sim.results_json.most_likely_winner}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="glass-panel rounded-xl p-8 shadow-lg bg-secondary-container/10 border-secondary-container/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-on-secondary-container" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-on-surface text-lg mb-3">How it works</h4>
            <p className="text-base text-on-surface-variant leading-relaxed">
              The simulator runs thousands of virtual tournaments using team rankings, recent form, 
              and statistical models. Higher simulation counts provide more accurate probability estimates. 
              The randomness factor controls how much unpredictability is added to each match, allowing 
              you to model everything from chalk predictions to wild underdog scenarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
