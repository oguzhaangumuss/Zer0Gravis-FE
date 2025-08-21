
'use client';

import { useState, useEffect } from 'react';
import { useETHPrice, useBTCPrice, useWeatherData, useSpaceData } from '../lib/hooks/useZeroGravis';

export default function RealTimeData() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { data: ethPrice, isLoading: ethLoading } = useETHPrice();
  const { data: btcPrice, isLoading: btcLoading } = useBTCPrice();
  const { data: weatherData, isLoading: weatherLoading } = useWeatherData('London');
  const { data: spaceData, isLoading: spaceLoading } = useSpaceData();

  const formatPrice = (price: number | undefined) => {
    if (!price) return 'Loading...';
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatChange = (value: number | undefined) => {
    if (!value) return 'N/A';
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const liveData = [
    {
      source: "Chainlink",
      type: "Crypto Prices",
      loading: ethLoading || btcLoading,
      data: [
        { 
          pair: "ETH/USD", 
          price: formatPrice(ethPrice?.data?.aggregatedValue?.price),
          change: formatChange(ethPrice?.data?.aggregatedValue?.change24h),
          trend: (ethPrice?.data?.aggregatedValue?.change24h || 0) >= 0 ? "up" : "down",
          confidence: ethPrice?.data?.confidence ? `${Math.round(ethPrice.data.confidence * 100)}%` : 'N/A'
        },
        { 
          pair: "BTC/USD", 
          price: formatPrice(btcPrice?.data?.aggregatedValue?.price),
          change: formatChange(btcPrice?.data?.aggregatedValue?.change24h), 
          trend: (btcPrice?.data?.aggregatedValue?.change24h || 0) >= 0 ? "up" : "down",
          confidence: btcPrice?.data?.confidence ? `${Math.round(btcPrice.data.confidence * 100)}%` : 'N/A'
        }
      ]
    },
    {
      source: "OpenWeatherMap",
      type: "Global Weather",
      loading: weatherLoading,
      data: [
        { 
          city: weatherData?.data?.aggregatedValue?.location || "London",
          temp: weatherData?.data?.aggregatedValue?.temperature ? `${weatherData.data.aggregatedValue.temperature.toFixed(1)}°C` : "Loading...",
          condition: weatherData?.data?.aggregatedValue?.condition || "Loading...",
          humidity: weatherData?.data?.aggregatedValue?.humidity ? `${weatherData.data.aggregatedValue.humidity}%` : "N/A",
          windSpeed: weatherData?.data?.aggregatedValue?.windSpeed ? `${weatherData.data.aggregatedValue.windSpeed} km/h` : "N/A"
        }
      ]
    },
    {
      source: "NASA", 
      type: "Near-Earth Objects",
      loading: spaceLoading,
      data: spaceData?.data?.aggregatedValue?.data?.slice(0, 2)?.map((asteroid: any) => ({
        name: asteroid.name || "Unknown",
        diameter: asteroid.estimated_diameter ? `${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(1)}km` : "N/A",
        distance: asteroid.close_approach_data?.[0]?.miss_distance?.kilometers ? 
          `${parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km` : "N/A",
        hazardous: asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"
      })) || [
        { name: "Loading...", diameter: "N/A", distance: "N/A", hazardous: "N/A" }
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
          {isClient && (
            <p className="text-sm text-indigo-500">
              Last updated: {currentTime.toLocaleString()}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {liveData.map((section, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl p-6 hover:shadow-xl hover:shadow-purple-200/20 transition-all duration-500 transform hover:scale-105 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg transform hover:rotate-12 transition-all duration-500">
                    <i className="ri-database-line text-white animate-pulse"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-900">{section.source}</h3>
                    <p className="text-sm text-indigo-600">{section.type}</p>
                  </div>
                </div>
                {section.loading && (
                  <div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
                )}
              </div>

              <div className="space-y-4">
                {section.data.map((item: any, itemIndex: number) => (
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
                        <p className="text-xs text-indigo-500 mt-1">Confidence: {item.confidence}</p>
                      </>
                    )}
                    
                    {section.source === 'OpenWeatherMap' && (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-indigo-900">{item.city}</span>
                          <span className="text-sm text-indigo-600">{item.humidity}</span>
                        </div>
                        <p className="text-lg font-semibold text-cyan-600">{item.temp}</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm text-indigo-700">{item.condition}</p>
                          <p className="text-xs text-indigo-500">Wind: {item.windSpeed}</p>
                        </div>
                      </>
                    )}
                    
                    {section.source === 'NASA' && (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-indigo-900 text-sm truncate">{item.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${item.hazardous === 'Yes' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {item.hazardous === 'Yes' ? 'Hazardous' : 'Safe'}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-purple-600">Diameter: {item.diameter}</p>
                        <p className="text-xs text-indigo-700">Distance: {item.distance}</p>
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
