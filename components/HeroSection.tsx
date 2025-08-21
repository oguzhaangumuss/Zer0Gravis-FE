
'use client';

export default function HeroSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent leading-tight animate-pulse">
            ZeroGravis
          </h1>
          <p className="text-2xl text-indigo-800 mb-6 font-light">
            Next-Generation Oracle Data Platform
          </p>
          <p className="text-lg text-indigo-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Harness the power of 0G Network infrastructure to deliver real-time, decentralized Oracle data 
            with enterprise-grade reliability and AI-powered consensus mechanisms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:shadow-xl hover:shadow-purple-300/40 transition-all duration-300 transform hover:scale-105 font-semibold text-lg whitespace-nowrap cursor-pointer">
              Explore Live Data
            </button>
            <button className="px-10 py-4 bg-white/80 backdrop-blur-sm text-indigo-700 border-2 border-indigo-300 rounded-full hover:bg-indigo-50 hover:border-purple-400 transition-all duration-300 transform hover:scale-105 font-semibold text-lg whitespace-nowrap cursor-pointer">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
