
'use client';

export default function FeatureShowcase() {
  const features = [
    {
      title: "Real-time Data Aggregation",
      description: "Instant access to live Oracle data from multiple sources with sub-second latency",
      icon: "ri-time-line",
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "AI Consensus Engine",
      description: "Advanced machine learning algorithms ensure data accuracy and prevent manipulation",
      icon: "ri-brain-line",
      color: "from-purple-400 to-indigo-500"
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade encryption and decentralized architecture for maximum data protection",
      icon: "ri-shield-star-line",
      color: "from-green-400 to-teal-500"
    },
    {
      title: "0G Network Integration",
      description: "Built on cutting-edge 0G infrastructure for unparalleled performance and scalability",
      icon: "ri-links-line",
      color: "from-orange-400 to-red-500"
    },
    {
      title: "Multi-Chain Support",
      description: "Seamlessly works across multiple blockchain networks and protocols",
      icon: "ri-git-branch-line",
      color: "from-pink-400 to-rose-500"
    },
    {
      title: "Developer APIs",
      description: "Comprehensive REST and GraphQL APIs with extensive documentation and SDKs",
      icon: "ri-code-s-slash-line",
      color: "from-violet-400 to-purple-500"
    }
  ];

  return (
    <section id="features" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-indigo-900 mb-6">
            Platform Features
          </h2>
          <p className="text-xl text-indigo-700 max-w-3xl mx-auto">
            Experience the next generation of Oracle technology with our comprehensive feature set
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 border border-purple-100/50"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                <i className={`${feature.icon} text-white text-2xl`}></i>
              </div>
              
              <h3 className="text-xl font-semibold text-indigo-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-indigo-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
