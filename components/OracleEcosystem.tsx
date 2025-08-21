
'use client';

export default function OracleEcosystem() {
  const oracles = [
    {
      name: "Chainlink",
      description: "Real crypto price feeds",
      feeds: "ETH/USD, BTC/USD",
      icon: "ri-link-m",
      status: "Live",
      color: "blue"
    },
    {
      name: "OpenWeatherMap",
      description: "Global weather data",
      feeds: "Temperature, Conditions",
      icon: "ri-cloud-drizzle-line",
      status: "Live",
      color: "cyan"
    },
    {
      name: "NASA API",
      description: "Space/asteroid observation",
      feeds: "Near-Earth Objects",
      icon: "ri-rocket-2-line",
      status: "Live",
      color: "purple"
    },
    {
      name: "AI Consensus",
      description: "Multi-source validation",
      feeds: "Data verification",
      icon: "ri-brain-line",
      status: "Active",
      color: "green"
    }
  ];

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-indigo-900 mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Oracle Ecosystem
          </h2>
          <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
            Integrated data sources providing real-time information with AI-powered consensus validation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {oracles.map((oracle, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl p-6 hover:shadow-xl hover:shadow-purple-200/20 transition-all duration-500 transform hover:scale-105 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center transform hover:rotate-12 transition-all duration-500 shadow-lg shadow-purple-300/30">
                  <i className={`${oracle.icon} text-white text-xl animate-pulse`}></i>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-xs font-medium text-green-600">{oracle.status}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">{oracle.name}</h3>
              <p className="text-sm text-indigo-600 mb-3">{oracle.description}</p>
              <div className="text-xs font-medium text-indigo-500 bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100">
                {oracle.feeds}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl p-8 transform hover:scale-102 transition-all duration-500 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg transform hover:rotate-12 transition-all duration-500">
              <i className="ri-shield-check-line text-white text-xl animate-pulse"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-900">AI Consensus Engine</h3>
              <p className="text-indigo-600">Powered by 0G Compute Network</p>
            </div>
          </div>
          <p className="text-indigo-700 leading-relaxed">
            Our AI consensus mechanism validates data from multiple Oracle sources using Llama 3.1-8b-instant, 
            ensuring reliability and accuracy across all data feeds through intelligent cross-validation.
          </p>
        </div>
      </div>
    </section>
  );
}
