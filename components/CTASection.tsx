
'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-purple-100/50">
          <h2 className="text-4xl font-bold text-indigo-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-700 mb-10 max-w-2xl mx-auto">
            Join the future of Oracle data with ZeroGravis. Experience real-time, 
            decentralized data feeds powered by 0G Network technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/dashboard">
              <button className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:shadow-xl hover:shadow-purple-300/40 transition-all duration-300 transform hover:scale-105 font-semibold text-lg whitespace-nowrap cursor-pointer">
                View Live Dashboard
              </button>
            </Link>
            <button className="px-10 py-4 bg-white/80 backdrop-blur-sm text-indigo-700 border-2 border-indigo-300 rounded-full hover:bg-indigo-50 hover:border-purple-400 transition-all duration-300 transform hover:scale-105 font-semibold text-lg whitespace-nowrap cursor-pointer">
              Explore APIs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
