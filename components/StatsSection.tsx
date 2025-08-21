
'use client';

import { useRealtimeStats, useNetworkStats } from '../lib/hooks/useZeroGravis';

export default function StatsSection() {
  const realtimeStats = useRealtimeStats();
  const networkStats = useNetworkStats();

  const stats = [
    {
      value: realtimeStats.isOnline ? "Online" : "Offline",
      label: "Network Status",
      icon: "ri-shield-check-line",
      color: "from-green-400 to-emerald-500"
    },
    {
      value: `${networkStats.oracleSourcesActive}/${networkStats.totalSources}`,
      label: "Oracle Sources",
      icon: "ri-rocket-line", 
      color: "from-indigo-400 to-blue-500"
    },
    {
      value: "4",
      label: "0G Components",
      icon: "ri-cpu-line",
      color: "from-purple-400 to-pink-500"
    },
    {
      value: realtimeStats.ethPrice ? `$${realtimeStats.ethPrice?.toLocaleString()}` : "Loading...",
      label: "ETH Price (Live)",
      icon: "ri-coin-line",
      color: "from-orange-400 to-yellow-500"
    }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 border border-purple-100/50 group"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:rotate-12 transition-all duration-500`}>
                <i className={`${stat.icon} text-white text-2xl`}></i>
              </div>
              <div className="text-4xl font-bold text-indigo-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-indigo-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
