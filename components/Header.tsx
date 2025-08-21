
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-purple-200/30 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-purple-300/30">
                <i className="ri-database-2-line text-white text-xl animate-pulse"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-indigo-900 group-hover:text-purple-700 transition-colors duration-300">ZeroGravis</h1>
                <p className="text-sm text-indigo-600">Oracle Data Platform</p>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-indigo-700 hover:text-purple-700 transition-colors duration-300 relative group font-medium">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#data-sources" className="text-indigo-700 hover:text-purple-700 transition-colors duration-300 relative group font-medium">
              Data Sources
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#technology" className="text-indigo-700 hover:text-purple-700 transition-colors duration-300 relative group font-medium">
              Technology
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <Link href="/dashboard" className="text-indigo-700 hover:text-purple-700 transition-colors duration-300 relative group font-medium">
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-sm font-medium text-green-600">Live</span>
            </div>
            <Link href="/dashboard">
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:shadow-xl hover:shadow-purple-300/30 transition-all duration-300 whitespace-nowrap cursor-pointer transform hover:scale-105 font-semibold">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
