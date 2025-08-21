
'use client';

import { useNetworkStats, useHealth, useChainStatus } from '../lib/hooks/useZeroGravis';

export default function NetworkStatus() {
  const { data: health, isLoading: healthLoading } = useHealth();
  const { data: chainStatus, isLoading: chainLoading } = useChainStatus();
  const networkStats = useNetworkStats();

  const getStatusColor = (isHealthy: boolean) => isHealthy ? "green" : "red";
  const getStatusText = (isHealthy: boolean, isLoading: boolean) => {
    if (isLoading) return "Loading...";
    return isHealthy ? "Active" : "Offline";
  };

  const networkComponents = [
    {
      name: "0G Chain",
      description: "Blockchain operations",
      status: getStatusText(!!chainStatus?.success, chainLoading),
      details: `${networkStats.networkName} (${networkStats.chainId})`,
      icon: "ri-links-line",
      color: getStatusColor(!!chainStatus?.success),
      extra: `Block: ${networkStats.latestBlock || 'N/A'}`
    },
    {
      name: "0G Storage",
      description: "Distributed file storage",
      status: getStatusText(health?.status === 'healthy', healthLoading),
      details: "Merkle verification enabled",
      icon: "ri-database-line",
      color: getStatusColor(health?.status === 'healthy'),
      extra: `Balance: ${parseFloat(networkStats.walletBalance).toFixed(4)} ETH`
    },
    {
      name: "0G Data Availability",
      description: "Blob publishing/retrieval",
      status: getStatusText(health?.status === 'healthy', healthLoading),
      details: "Oracle data recording active",
      icon: "ri-cloud-line",
      color: getStatusColor(health?.status === 'healthy'),
      extra: `Sources: ${networkStats.oracleSourcesActive}/${networkStats.totalSources}`
    },
    {
      name: "0G Compute",
      description: "AI inference engine", 
      status: getStatusText(health?.status === 'healthy', healthLoading),
      details: "Llama 3.1-8b-instant",
      icon: "ri-cpu-line",
      color: getStatusColor(health?.status === 'healthy'),
      extra: `Health: ${networkStats.healthPercentage}%`
    }
  ];

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-indigo-900 mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            🔗 Full 0G Network Integration
          </h2>
          <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
            Complete integration with all four major components of the 0G Network infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {networkComponents.map((component, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl p-6 hover:shadow-xl hover:shadow-purple-200/20 transition-all duration-500 transform hover:scale-105 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center transform hover:rotate-12 transition-all duration-500 shadow-lg shadow-purple-300/30">
                  <i className={`${component.icon} text-white text-xl animate-pulse`}></i>
                </div>
                <div className={`px-3 py-1 ${component.color === 'green' ? 'bg-green-100 text-green-700 border-green-200/50' : 'bg-red-100 text-red-700 border-red-200/50'} text-xs font-medium rounded-full border`}>
                  {component.status}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">{component.name}</h3>
              <p className="text-sm text-indigo-600 mb-3">{component.description}</p>
              <p className="text-xs text-indigo-500 font-medium bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100 mb-2">{component.details}</p>
              {component.extra && (
                <p className="text-xs text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-lg border border-purple-100">{component.extra}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
