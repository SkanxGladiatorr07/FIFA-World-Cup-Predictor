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
    const finalistProbs = results.finalist_probabilities || {};

    return (
      <div className="space-y-4">
        {/* Most Likely Winner */}
        <div className="bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Most Likely Winner</h4>
          <p className="text-3xl font-bold text-gold">{results.most_likely_winner || 'N/A'}</p>
          <p className="text-sm text-gray-400 mt-1">
            {winnerProbs[results.most_likely_winner]?.toFixed(1)}% probability
          </p>
        </div>

        {/* Winner Probabilities */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Winner Probabilities</h4>
          <div className="space-y-2">
            {Object.entries(winnerProbs)
              .sort(([, a]: any, [, b]: any) => b - a)
              .slice(0, 10)
              .map(([team, prob]: any, index) => (
                <div key={team} className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-400 w-6">#{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{team}</span>
                      <span className="text-sm font-semibold text-gold">{prob.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-300"
                        style={{ width: `${prob}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Finalist Probabilities */}
        {Object.keys(finalistProbs).length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Finalist Probabilities (Top 6)</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(finalistProbs)
                .sort(([, a]: any, [, b]: any) => b - a)
                .slice(0, 6)
                .map(([team, prob]: any) => (
                  <div key={team} className="bg-dark-700 rounded-lg p-3">
                    <p className="text-sm font-medium text-white">{team}</p>
                    <p className="text-lg font-bold text-blue-400">{prob.toFixed(1)}%</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Simulation Info */}
        <div className="bg-dark-700 rounded-lg p-3 text-xs text-gray-400">
          <p>Simulations run: {results.simulations_run?.toLocaleString()}</p>
          <p>Randomness factor: {results.randomness_factor?.toFixed(2)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Tournament Simulator 🏆</h1>
        <p className="text-gray-400">
          Simulate the entire World Cup tournament thousands of times to predict the winner
        </p>
      </div>

      {/* Simulation Controls */}
      <div className="card bg-dark-800 border border-dark-700">
        <h3 className="text-lg font-semibold text-white mb-4">Configure Simulation</h3>
        
        <div className="space-y-4">
          {/* Simulation Name */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Simulation Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Conservative Prediction"
              value={simulationName}
              onChange={(e) => setSimulationName(e.target.value)}
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white
                       focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                       placeholder-gray-500"
            />
          </div>

          {/* Number of Simulations */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Number of Simulations: {numSimulations.toLocaleString()}
            </label>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={numSimulations}
              onChange={(e) => setNumSimulations(parseInt(e.target.value))}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>100 (Fast)</span>
              <span>10,000 (Accurate)</span>
            </div>
          </div>

          {/* Randomness Factor */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Randomness Factor: {randomnessFactor.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={randomnessFactor}
              onChange={(e) => setRandomnessFactor(parseFloat(e.target.value))}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0.0 (Predictable)</span>
              <span>0.5 (Chaotic)</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Higher randomness makes upsets more likely, simulating real-world unpredictability
            </p>
          </div>

          {/* Run Button */}
          <Button
            onClick={handleRunSimulation}
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSimulating}
            disabled={isSimulating}
          >
            {isSimulating ? 'Running Simulation...' : 'Run Tournament Simulation'}
          </Button>
        </div>
      </div>

      {/* Current Simulation Results */}
      {currentSimulation && (
        <div className="card bg-dark-800 border border-gold/50">
          <h3 className="text-lg font-semibold text-white mb-4">Latest Simulation Results</h3>
          {renderSimulationResults(currentSimulation)}
        </div>
      )}

      {/* Previous Simulations */}
      {simulations.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Simulation History</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {simulations.slice(0, 6).map((sim) => (
              <div
                key={sim.id}
                className="card bg-dark-800 border border-dark-700 hover:border-gold/30 transition-colors cursor-pointer"
                onClick={() => setCurrentSimulation(sim)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">
                      {sim.simulation_name || `Simulation ${sim.id}`}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(sim.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className="badge badge-sm bg-gold/20 text-gold">
                    {sim.num_simulations?.toLocaleString()}
                  </span>
                </div>
                
                {sim.results_json?.most_likely_winner && (
                  <div className="bg-dark-700 rounded-lg p-3">
                    <p className="text-xs text-gray-400">Predicted Winner</p>
                    <p className="text-lg font-bold text-gold">{sim.results_json.most_likely_winner}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="card bg-blue-500/10 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <div className="text-2xl">ℹ️</div>
          <div>
            <h4 className="font-semibold text-white mb-1">How it works</h4>
            <p className="text-sm text-gray-400">
              The simulator runs thousands of virtual tournaments using team rankings, recent form, 
              and statistical models. Higher simulation counts provide more accurate probability estimates. 
              The randomness factor controls how much unpredictability is added to each match.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
