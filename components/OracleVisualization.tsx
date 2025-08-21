'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useRealtimeStats, useAllOracleData } from '../lib/hooks/useZeroGravis';

export default function OracleVisualization() {
  const realtimeStats = useRealtimeStats();
  const { data: allOracleData } = useAllOracleData();

  // Mock trend data for visualization (in real app, this would come from historical data)
  const trendData = [
    { time: '10:00', ethPrice: realtimeStats.ethPrice || 2400 },
    { time: '10:15', ethPrice: (realtimeStats.ethPrice || 2400) * 0.99 },
    { time: '10:30', ethPrice: (realtimeStats.ethPrice || 2400) * 1.01 },
    { time: '10:45', ethPrice: (realtimeStats.ethPrice || 2400) * 0.98 },
    { time: '11:00', ethPrice: realtimeStats.ethPrice || 2400 },
  ];

  const sourceHealthData = [
    { name: 'Chainlink', value: allOracleData?.eth?.success ? 1 : 0, color: '#10B981' },
    { name: 'Weather API', value: allOracleData?.weather?.success ? 1 : 0, color: '#3B82F6' },
    { name: 'NASA API', value: allOracleData?.space?.success ? 1 : 0, color: '#8B5CF6' },
  ];

  const successfulSources = sourceHealthData.filter(source => source.value === 1).length;
  const healthPercentage = Math.round((successfulSources / sourceHealthData.length) * 100);

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-indigo-900 mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            📊 Oracle Data Analytics
          </h2>
          <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
            Real-time visualization of Oracle data aggregation and source health monitoring
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* ETH Price Trend Chart */}
          <div className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl p-6 hover:shadow-xl hover:shadow-purple-200/20 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-indigo-900">ETH Price Trend</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600">Live Data</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="time" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px'
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'ETH Price']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ethPrice" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2, fill: '#ffffff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Oracle Source Health */}
          <div className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl p-6 hover:shadow-xl hover:shadow-purple-200/20 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-indigo-900">Oracle Source Health</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                healthPercentage === 100 ? 'bg-green-100 text-green-700' :
                healthPercentage >= 66 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {healthPercentage}% Healthy
              </div>
            </div>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceHealthData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => value === 1 ? `${name} ✓` : `${name} ✗`}
                  >
                    {sourceHealthData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.value === 1 ? entry.color : '#EF4444'} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value === 1 ? 'Healthy' : 'Offline', 'Status']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Real-time Metrics Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Data Confidence</h4>
              <i className="ri-shield-check-line text-2xl"></i>
            </div>
            <div className="text-3xl font-bold mb-2">{realtimeStats.oracleConfidence}%</div>
            <p className="text-green-100 text-sm">Consensus reliability</p>
          </div>

          <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Latest Block</h4>
              <i className="ri-database-line text-2xl"></i>
            </div>
            <div className="text-3xl font-bold mb-2">{realtimeStats.latestBlock?.toLocaleString() || 'N/A'}</div>
            <p className="text-blue-100 text-sm">0G Chain height</p>
          </div>

          <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Temperature</h4>
              <i className="ri-temp-hot-line text-2xl"></i>
            </div>
            <div className="text-3xl font-bold mb-2">{realtimeStats.temperature?.toFixed(1) || 'N/A'}°C</div>
            <p className="text-purple-100 text-sm">London weather</p>
          </div>
        </div>
      </div>
    </section>
  );
}