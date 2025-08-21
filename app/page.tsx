
'use client';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeatureShowcase from '../components/FeatureShowcase';
import DataSourcesSection from '../components/DataSourcesSection';
import TechStackSection from '../components/TechStackSection';
import StatsSection from '../components/StatsSection';
import OracleVisualization from '../components/OracleVisualization';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-pink-200/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-56 h-56 bg-indigo-200/20 rounded-full animate-pulse delay-2000"></div>
      </div>
      
      <Header />
      <HeroSection />
      <StatsSection />
      <FeatureShowcase />
      <OracleVisualization />
      <DataSourcesSection />
      <TechStackSection />
      <CTASection />
      <Footer />
    </div>
  );
}
