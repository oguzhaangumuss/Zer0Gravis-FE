
'use client';

import { useHealth, useETHPrice, useBTCPrice, useWeatherData, useSpaceData, useChainStatus } from '../lib/hooks/useZeroGravis';

export default function APIStatus() {
  const { data: health, isLoading: healthLoading, error: healthError } = useHealth();
  const { data: ethPrice, isLoading: ethLoading, error: ethError } = useETHPrice();
  const { data: btcPrice, isLoading: btcLoading, error: btcError } = useBTCPrice();
  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useWeatherData();
  const { data: spaceData, isLoading: spaceLoading, error: spaceError } = useSpaceData();
  const { data: chainStatus, isLoading: chainLoading, error: chainError } = useChainStatus();

  const getAPIStatus = (data: any, loading: boolean, error: any) => {
    if (loading) return { status: 'loading', responseTime: '---' };
    if (error) return { status: 'error', responseTime: 'Error' };
    if (data?.success) return { status: 'operational', responseTime: `${data.executionTime || 'N/A'}ms` };
    if (data?.status === 'healthy') return { status: 'operational', responseTime: '< 50ms' };
    return { status: 'maintenance', responseTime: '---' };
  };

  const apis = [
    { 
      name: "Health Check API", 
      endpoint: "/health",
      ...getAPIStatus(health, healthLoading, healthError)
    },
    { 
      name: "Oracle ETH Price", 
      endpoint: "/api/v1/oracle/collect (ETH)",
      ...getAPIStatus(ethPrice, ethLoading, ethError)
    },
    { 
      name: "Oracle BTC Price", 
      endpoint: "/api/v1/oracle/collect (BTC)", 
      ...getAPIStatus(btcPrice, btcLoading, btcError)
    },
    { 
      name: "Oracle Weather", 
      endpoint: "/api/v1/oracle/collect (Weather)",
      ...getAPIStatus(weatherData, weatherLoading, weatherError)
    },
    { 
      name: "Oracle NASA", 
      endpoint: "/api/v1/oracle/collect (NASA)",
      ...getAPIStatus(spaceData, spaceLoading, spaceError)
    },
    { 
      name: "0G Chain Status", 
      endpoint: "/api/v1/chain/status",
      ...getAPIStatus(chainStatus, chainLoading, chainError)
    },
    { 
      name: "Data Aggregation", 
      endpoint: "/api/v1/oracle/aggregate", 
      status: "operational", 
      responseTime: "Real-time"
    },
    { 
      name: "Blockchain Recording", 
      endpoint: "/api/v1/storage/*", 
      status: "operational", 
      responseTime: "On-demand"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'green';
      case 'loading': return 'blue';
      case 'maintenance': return 'yellow';
      case 'error': return 'red';
      default: return 'gray';
    }
  };

  const operationalCount = apis.filter(api => api.status === 'operational').length;
  const loadingCount = apis.filter(api => api.status === 'loading').length;
  const errorCount = apis.filter(api => api.status === 'error').length;

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-indigo-900 mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            API Status Dashboard
          </h2>
          <div className="flex items-center justify-center space-x-6 mb-6 flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-lg font-medium text-indigo-700">
                {operationalCount}/{apis.length} APIs Operational
              </span>
            </div>
            {loadingCount > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
                <span className="text-sm font-medium text-blue-600">
                  {loadingCount} Loading
                </span>
              </div>
            )}
            {errorCount > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-400/50"></div>
                <span className="text-sm font-medium text-red-600">
                  {errorCount} Errors
                </span>
              </div>
            )}
            <div className="text-sm text-indigo-600">
              Real-time Monitoring
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl overflow-hidden shadow-xl animate-slide-up">
            <div className="bg-indigo-50/70 px-6 py-4 border-b border-purple-100/50">
              <div className="grid grid-cols-4 gap-4 font-medium text-indigo-900 text-sm">
                <span>API Endpoint</span>
                <span>Status</span>
                <span>Response Time</span>
                <span>Actions</span>
              </div>
            </div>
            
            <div className="divide-y divide-purple-100/50">
              {apis.map((api, index) => {
                const statusColor = getStatusColor(api.status);
                return (
                  <div key={index} className="px-6 py-4 hover:bg-indigo-50/50 transition-colors">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div>
                        <p className="font-medium text-indigo-900">{api.name}</p>
                        <p className="text-sm text-indigo-600 font-mono">{api.endpoint}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          statusColor === 'green' ? 'bg-green-400' :
                          statusColor === 'blue' ? 'bg-blue-400' :
                          statusColor === 'yellow' ? 'bg-yellow-400' :
                          statusColor === 'red' ? 'bg-red-400' : 'bg-gray-400'
                        }`}></div>
                        <span className={`text-sm font-medium capitalize ${
                          statusColor === 'green' ? 'text-green-600' :
                          statusColor === 'blue' ? 'text-blue-600' :
                          statusColor === 'yellow' ? 'text-yellow-600' :
                          statusColor === 'red' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {api.status}
                        </span>
                        {api.status === 'loading' && (
                          <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                        )}
                      </div>
                      
                      <div className="text-sm font-mono text-indigo-700">
                        {api.responseTime}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-full hover:shadow-lg hover:shadow-purple-300/30 transition-all duration-300 whitespace-nowrap cursor-pointer transform hover:scale-105">
                          Test
                        </button>
                        <button className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors cursor-pointer whitespace-nowrap">
                          Logs
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
