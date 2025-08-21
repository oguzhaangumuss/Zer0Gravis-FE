
'use client';

export default function Footer() {
  return (
    <footer className="py-16 mt-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <i className="ri-database-2-line text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-indigo-900">ZeroGravis</h3>
                <p className="text-sm text-indigo-600">Oracle Data Platform</p>
              </div>
            </div>
            <p className="text-indigo-600 mb-6 max-w-md">
              Revolutionizing Oracle data delivery through 0G Network infrastructure and 
              AI-powered consensus mechanisms for enterprise applications.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'github', 'discord', 'telegram'].map((social) => (
                <div 
                  key={social} 
                  className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 cursor-pointer shadow-lg border border-purple-100/50 group"
                >
                  <i className={`ri-${social}-line text-indigo-600 group-hover:text-purple-700 transition-colors duration-300`}></i>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-indigo-900 mb-6">Platform</h4>
            <ul className="space-y-3">
              {['Dashboard', 'Data Sources', 'APIs', 'Documentation'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-indigo-600 hover:text-purple-700 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-indigo-900 mb-6">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'Contact', 'Status', 'Community'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-indigo-600 hover:text-purple-700 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-200/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-indigo-600 mb-4 md:mb-0">
              © 2024 ZeroGravis. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-indigo-600 hover:text-purple-700 transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-indigo-600 hover:text-purple-700 transition-colors duration-300 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
