
'use client';

export default function DataSourcesSection() {
  const dataSources = [
    {
      name: "Chainlink",
      description: "Decentralized oracle network providing secure price feeds and external data",
      icon: "ri-link",
      status: "Active",
      uptime: "99.9%"
    },
    {
      name: "OpenWeatherMap",
      description: "Global weather data and forecasting with real-time meteorological information",
      icon: "ri-cloud-line",
      status: "Active", 
      uptime: "99.7%"
    },
    {
      name: "NASA APIs",
      description: "Space data including satellite imagery, astronomical events, and research data",
      icon: "ri-rocket-line",
      status: "Active",
      uptime: "99.5%"
    },
    {
      name: "0G AI Network",
      description: "Next-generation AI-powered data processing and consensus mechanisms",
      icon: "ri-brain-line",
      status: "Beta",
      uptime: "98.2%"
    }
  ];

  return (
    <section id="data-sources" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-indigo-900 mb-6">
            Trusted Data Sources
          </h2>
          <p className="text-xl text-indigo-700 max-w-3xl mx-auto">
            Connect to premium data providers through our unified Oracle platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {dataSources.map((source, index) => (
            <div 
              key={index}
              className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border border-purple-100/50"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    <i className={`${source.icon} text-white text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-900 group-hover:text-purple-700 transition-colors duration-300">
                      {source.name}
                    </h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        source.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {source.status}
                      </span>
                      <span className="text-indigo-600 text-sm font-medium">
                        {source.uptime} uptime
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-indigo-600 leading-relaxed">
                {source.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
