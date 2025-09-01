
'use client';

import Link from 'next/link';
import { useRealtimeStats } from '../lib/hooks/useZeroGravis';

export default function HeroSection() {
  const realtimeStats = useRealtimeStats();
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
          <p className="text-lg text-indigo-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Harness the power of 0G Network infrastructure to deliver real-time, decentralized Oracle data 
            with enterprise-grade reliability and AI-powered consensus mechanisms.
          </p>
          
          {/* Real-time Stats Display */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-12 border border-purple-100/50 shadow-lg">
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full animate-pulse ${realtimeStats.isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-indigo-700 font-medium">
                  {realtimeStats.isOnline ? 'Network Online' : 'Network Offline'}
                </span>
              </div>
              <div className="text-indigo-600">
                ETH: {realtimeStats.ethPrice ? `$${realtimeStats.ethPrice.toLocaleString()}` : 'Loading...'}
              </div>
              <div className="text-indigo-600">
                Block: {realtimeStats.latestBlock?.toLocaleString() || 'N/A'}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/v1/dashboard">
              <button className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:shadow-xl hover:shadow-purple-300/40 transition-all duration-300 transform hover:scale-105 font-semibold text-lg whitespace-nowrap cursor-pointer">
                Explore Live Data
              </button>
            </Link>
            <button className="px-10 py-4 bg-white/80 backdrop-blur-sm text-indigo-700 border-2 border-indigo-300 rounded-full hover:bg-indigo-50 hover:border-purple-400 transition-all duration-300 transform hover:scale-105 font-semibold text-lg whitespace-nowrap cursor-pointer">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
