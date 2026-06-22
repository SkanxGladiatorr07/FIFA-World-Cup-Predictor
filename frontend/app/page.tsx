import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: '⚽',
      title: 'Match Predictor',
      description: 'Predict match scores with AI-powered win probabilities for all 104 World Cup matches',
    },
    {
      icon: '🥇',
      title: 'Golden Boot Predictor',
      description: 'Predict the top goal scorer using advanced xG-based player analysis',
    },
    {
      icon: '🧤',
      title: 'Golden Glove Predictor',
      description: 'Predict the best goalkeeper with save % and xGA performance metrics',
    },
    {
      icon: '🎮',
      title: 'Match Simulator',
      description: 'Simulate individual matches with detailed AI probability predictions',
    },
    {
      icon: '🏆',
      title: 'Tournament Simulator',
      description: 'Run Monte Carlo simulations to predict the tournament winner',
    },
    {
      icon: '📊',
      title: 'Leaderboard',
      description: 'Compete globally and track your prediction accuracy vs others',
    },
  ];

  const stats = [
    { label: 'Total Predictions', value: '10,000+', icon: '🎯' },
    { label: 'Active Users', value: '500+', icon: '👥' },
    { label: 'Matches Analyzed', value: '104', icon: '⚽' },
    { label: 'ML Models', value: '3', icon: '🤖' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-8">
            <span className="text-gold text-sm font-semibold">⚽ FIFA World Cup 2026</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            AI-Powered Predictions
            <span className="block text-gold mt-2">for World Cup 2026</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Predict matches, players, and tournament outcomes with advanced machine learning models
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-gold hover:brightness-110 active:brightness-90 text-dark-950 font-bold rounded-lg transition-all duration-200 shadow-gold text-lg min-w-[200px] inline-block"
            >
              Get Started Free
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 bg-transparent hover:bg-dark-800 text-gold font-semibold rounded-lg transition-all duration-200 border-2 border-gold hover:border-gold-light text-lg min-w-[200px] inline-block"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to make data-driven World Cup predictions
            </p>
          </div>
          
          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-dark-800 rounded-xl p-8 border border-dark-700 hover:border-gold transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02]"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-gold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-950 border-y border-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gold/10 via-dark-900 to-blue-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
            Ready to Make Your Predictions?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join hundreds of fans competing for the most accurate predictions
          </p>
          <Link
            href="/auth/register"
            className="inline-block px-10 py-5 bg-gold hover:brightness-110 text-dark-950 font-bold rounded-lg transition-all duration-200 shadow-gold text-lg"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">⚽</span>
                <span className="text-xl font-heading font-bold text-gold">World Cup 2026</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI-powered predictions platform for FIFA World Cup 2026
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/auth/login" className="block text-gray-400 hover:text-gold transition-colors text-sm">
                  Sign In
                </Link>
                <Link href="/auth/register" className="block text-gray-400 hover:text-gold transition-colors text-sm">
                  Register
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-gold transition-colors text-sm">
                  About
                </Link>
              </div>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="font-heading font-semibold text-white mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-gold transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-gold transition-colors text-sm">
                  Terms of Service
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-gold transition-colors text-sm">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-dark-800 text-center text-gray-500 text-sm">
            <p>&copy; 2026 FIFA World Cup Prediction Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
