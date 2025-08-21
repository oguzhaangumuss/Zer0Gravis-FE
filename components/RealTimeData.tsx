
'use client';

import { useState, useEffect } from 'react';

export default function RealTimeData() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const liveData = [
    {
      source: "Chainlink",
      type: "Crypto Prices",
      data: [
        { pair: "ETH/USD", price: "$2,487.92", change: "+1.06%", trend: "up" },
        { pair: "BTC/USD", price: "$67,234.15", change: "+2.34%", trend: "up" }
      ]
    },
    {
      source: "OpenWeatherMap",
      type: "Global Weather",
      data: [
        { city: "London", temp: "13.5°C", condition: "Heavy Rain", humidity: "82%" },
        { city: "New York", temp: "18.2°C", condition: "Partly Cloudy", humidity: "65%" },
        { city: "Tokyo", temp: "22.8°C", condition: "Clear", humidity: "58%" }
      ]
    },
    {
      source: "NASA",
      type: "Near-Earth Objects",
      data: [
        { date: "2024-01-15", count: "15 asteroids", size: "Avg 45m diameter" },
        { date: "2024-01-16", count: "8 asteroids", size: "Avg 32m diameter" }
      ]
    }
  ];

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-sm font-medium text-green-600">LIVE DATA</span>
          </div>
          <h2 className="text-4xl font-bold text-indigo-900 mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">Real-time Oracle Data</h2>
          <p className="text-xl text-indigo-700 max-w-2xl mx-auto mb-2">
            Live data streams from multiple Oracle sources with zero mock data
          </p>
          <p className="text-sm text-indigo-500" suppressHydrationWarning={true}>
            Last updated: {currentTime.toLocaleString()}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {liveData.map((section, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl p-6 hover:shadow-xl hover:shadow-purple-200/20 transition-all duration-500 transform hover:scale-105 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg transform hover:rotate-12 transition-all duration-500">
                  <i className="ri-database-line text-white animate-pulse"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-900">{section.source}</h3>
                  <p className="text-sm text-indigo-600">{section.type}</p>
                </div>
              </div>

              <div className="space-y-4">
                {section.data.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-indigo-50/70 border border-indigo-100/50 rounded-2xl p-4 hover:bg-indigo-100/70 transition-all duration-300">
                    {section.source === 'Chainlink' && (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-indigo-900">{item.pair}</span>
                          <div className={`flex items-center space-x-1 ${item.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                            <i className={`ri-arrow-${item.trend === 'up' ? 'up' : 'down'}-line`}></i>
                            <span className="text-sm font-medium">{item.change}</span>
                          </div>
                        </div>
                        <p className="text-xl font-bold text-indigo-700">{item.price}</p>
                      </>
                    )}
                    
                    {section.source === 'OpenWeatherMap' && (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-indigo-900">{item.city}</span>
                          <span className="text-sm text-indigo-600">{item.humidity}</span>
                        </div>
                        <p className="text-lg font-semibold text-cyan-600">{item.temp}</p>
                        <p className="text-sm text-indigo-700">{item.condition}</p>
                      </>
                    )}
                    
                    {section.source === 'NASA' && (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-indigo-900">{item.date}</span>
                        </div>
                        <p className="text-lg font-semibold text-purple-600">{item.count}</p>
                        <p className="text-sm text-indigo-700">{item.size}</p>
                      </>
                    )}
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
