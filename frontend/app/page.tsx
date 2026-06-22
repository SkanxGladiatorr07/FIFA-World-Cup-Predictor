import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: '⚽',
      title: 'Match Predictor',
      description: 'Predict all 104 World Cup matches with ML-powered win probabilities',
    },
    {
      icon: '👟',
      title: 'Golden Boot Predictor',
      description: 'Predict the top goal scorer with xG-based analysis',
    },
    {
      icon: '🧤',
      title: 'Golden Glove Predictor',
      description: 'Predict the best goalkeeper with save % and xGA metrics',
    },
    {
      icon: '🎮',
      title: 'Match Simulator',
      description: 'Simulate all group stage matches with AI predictions',
    },
    {
      icon: '🏆',
      title: 'Tournament Simulator',
      description: 'Run Monte Carlo simulations for the entire tournament',
    },
    {
      icon: '📊',
      title: 'Leaderboard',
      description: 'Compete with other users and track prediction accuracy',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            FIFA World Cup 2026
            <span className="block text-gold mt-2">Prediction Platform</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            AI-Powered Predictions for Matches, Players, and Tournament Outcomes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-gold hover:bg-gold-light text-dark-950 font-semibold rounded-lg transition-smooth shadow-gold"
            >
              Get Started
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 bg-dark-800 hover:bg-dark-700 text-white font-semibold rounded-lg transition-smooth border border-dark-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center text-white mb-12">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-dark-800 rounded-xl p-6 border border-dark-700 hover:border-gold transition-smooth hover:shadow-gold"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-heading font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Total Predictions', value: '10,000+' },
              { label: 'Active Users', value: '500+' },
              { label: 'Matches Analyzed', value: '104' },
              { label: 'Models Trained', value: '3' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-heading font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 FIFA World Cup Prediction Platform. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <Link href="#" className="hover:text-gold transition-smooth">About</Link>
            <Link href="#" className="hover:text-gold transition-smooth">Privacy Policy</Link>
            <Link href="#" className="hover:text-gold transition-smooth">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
