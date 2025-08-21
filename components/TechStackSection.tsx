
'use client';

export default function TechStackSection() {
  const techStack = [
    {
      category: "0G Network Components",
      items: [
        { name: "0G Chain", description: "High-performance blockchain infrastructure", icon: "ri-links-line" },
        { name: "0G Storage", description: "Decentralized data storage solution", icon: "ri-database-2-line" },
        { name: "0G DA", description: "Data availability layer for scaling", icon: "ri-cloud-line" },
        { name: "0G AI", description: "AI-powered consensus and validation", icon: "ri-brain-line" }
      ]
    },
    {
      category: "Oracle Integrations", 
      items: [
        { name: "Chainlink Feeds", description: "Premium price and market data", icon: "ri-line-chart-line" },
        { name: "Weather APIs", description: "Global meteorological data sources", icon: "ri-sun-line" },
        { name: "Financial Data", description: "Real-time market information", icon: "ri-money-dollar-circle-line" },
        { name: "IoT Sensors", description: "Hardware device data integration", icon: "ri-sensor-line" }
      ]
    }
  ];

  return (
    <section id="technology" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-indigo-900 mb-6">
            Technology Stack
          </h2>
          <p className="text-xl text-indigo-700 max-w-3xl mx-auto">
            Built on cutting-edge infrastructure for enterprise-grade performance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {techStack.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <h3 className="text-2xl font-semibold text-indigo-900 mb-8 text-center">
                {category.category}
              </h3>
              
              <div className="grid gap-6">
                {category.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="group p-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border border-purple-100/50 transform hover:scale-105"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                        <i className={`${item.icon} text-white text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-indigo-900 group-hover:text-purple-700 transition-colors duration-300">
                          {item.name}
                        </h4>
                        <p className="text-indigo-600 text-sm">
                          {item.description}
                        </p>
                      </div>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
