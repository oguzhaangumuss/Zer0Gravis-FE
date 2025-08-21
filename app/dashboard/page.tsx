
'use client';

import Header from '../../components/Header';
import NetworkStatus from '../../components/NetworkStatus';
import OracleEcosystem from '../../components/OracleEcosystem';
import RealTimeData from '../../components/RealTimeData';
import TechnicalAchievements from '../../components/TechnicalAchievements';
import APIStatus from '../../components/APIStatus';
import Footer from '../../components/Footer';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-pink-200/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-56 h-56 bg-indigo-200/20 rounded-full animate-pulse delay-2000"></div>
      </div>

      <Header />
      <div className="py-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold text-indigo-900 mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Live Oracle Dashboard
            </h1>
            <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
              Real-time monitoring of Oracle data sources and 0G Network infrastructure
            </p>
          </div>
        </div>
      </div>
      <NetworkStatus />
      <OracleEcosystem />
      <RealTimeData />
      <APIStatus />
      <TechnicalAchievements />
      <Footer />
    </div>
  );
}
