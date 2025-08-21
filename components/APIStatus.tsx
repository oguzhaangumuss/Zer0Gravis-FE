
'use client';

export default function APIStatus() {
  const apis = [
    { name: "Health Check API", status: "operational", endpoint: "/health", responseTime: "12ms" },
    { name: "Oracle Chainlink", status: "operational", endpoint: "/oracle/chainlink", responseTime: "45ms" },
    { name: "Oracle Weather", status: "operational", endpoint: "/oracle/weather", responseTime: "89ms" },
    { name: "Oracle NASA", status: "operational", endpoint: "/oracle/nasa", responseTime: "156ms" },
    { name: "0G Compute AI", status: "operational", endpoint: "/compute/ai", responseTime: "234ms" },
    { name: "Data Aggregation", status: "maintenance", endpoint: "/aggregate", responseTime: "---" },
    { name: "Consensus Engine", status: "maintenance", endpoint: "/consensus", responseTime: "---" },
    { name: "Storage Interface", status: "maintenance", endpoint: "/storage", responseTime: "---" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'green';
      case 'maintenance': return 'yellow';
      case 'error': return 'red';
      default: return 'gray';
    }
  };

  const operationalCount = apis.filter(api => api.status === 'operational').length;

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-indigo-900 mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            API Status Dashboard
          </h2>
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-lg font-medium text-indigo-700">
                {operationalCount}/8 APIs Operational
              </span>
            </div>
            <div className="text-sm text-indigo-600">
              System Uptime: 99.7%
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
                        <div className={`w-2 h-2 bg-${statusColor}-400 rounded-full animate-pulse`}></div>
                        <span className={`text-sm font-medium capitalize text-${statusColor}-600`}>
                          {api.status}
                        </span>
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
