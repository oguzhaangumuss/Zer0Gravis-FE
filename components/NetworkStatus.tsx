
'use client';

export default function NetworkStatus() {
  const networkComponents = [
    {
      name: "0G Chain",
      description: "Blockchain operations",
      status: "Active",
      details: "Testnet 16601",
      icon: "ri-links-line",
      color: "green"
    },
    {
      name: "0G Storage",
      description: "Distributed file storage",
      status: "Active",
      details: "Merkle verification enabled",
      icon: "ri-database-line",
      color: "green"
    },
    {
      name: "0G Data Availability",
      description: "Blob publishing/retrieval",
      status: "Active",
      details: "Layer optimized",
      icon: "ri-cloud-line",
      color: "green"
    },
    {
      name: "0G Compute",
      description: "AI inference engine",
      status: "Active",
      details: "Llama 3.1-8b-instant",
      icon: "ri-cpu-line",
      color: "green"
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
                <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200/50">
                  {component.status}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">{component.name}</h3>
              <p className="text-sm text-indigo-600 mb-3">{component.description}</p>
              <p className="text-xs text-indigo-500 font-medium bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100">{component.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
