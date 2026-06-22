'use client';

import { Card } from '@/components/ui/Card';

export default function MatchSimulatorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">
          Match Simulator 🎮
        </h1>
        <p className="text-gray-400">
          Simulate all group stage matches with AI predictions
        </p>
      </div>
      
      <Card>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Coming Soon
          </h3>
          <p className="text-gray-400">
            Match simulator will be available in the next phase
          </p>
        </div>
      </Card>
    </div>
  );
}
