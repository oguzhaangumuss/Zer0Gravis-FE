
'use client';

import { useState, useCallback } from 'react';
import { useRealtimeStats, useChainStatus, useRecentTransactions, useTransactionStats } from '../../../lib/hooks/useZeroGravis';
import { ZeroGravisAPI } from '../../../lib/api';
import { useWallet } from '../../../hooks/useWallet';
import Header from '../../../components/Header';
import NetworkStatus from '../../../components/NetworkStatus';
import RealTimeData from '../../../components/RealTimeData';
import OracleVisualization from '../../../components/OracleVisualization';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const realtimeStats = useRealtimeStats();
  const { data: chainStatus } = useChainStatus();

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'ri-dashboard-line' },
    { id: 'storage', name: '0G Storage', icon: 'ri-database-2-line', color: 'from-blue-500 to-cyan-600' },
    { id: 'compute', name: '0G Compute', icon: 'ri-brain-line', color: 'from-purple-500 to-pink-600' },
    { id: 'da', name: '0G Data Availability', icon: 'ri-cloud-line', color: 'from-green-500 to-emerald-600' },
    { id: 'chain', name: '0G Chain', icon: 'ri-links-line', color: 'from-orange-500 to-red-600' },
    { id: 'oracles', name: 'Oracle Data', icon: 'ri-database-line' },
    { id: 'transactions', name: 'Transactions', icon: 'ri-exchange-line' },
    { id: 'network', name: 'Network Status', icon: 'ri-wifi-line' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-pink-200/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-56 h-56 bg-indigo-200/20 rounded-full animate-pulse delay-2000"></div>
      </div>

      <Header />
      
      {/* Dashboard Header */}
      <div className="py-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                ZeroGravis Dashboard
              </h1>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                realtimeStats.isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  realtimeStats.isOnline ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                {realtimeStats.isOnline ? 'Online' : 'Offline'}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-indigo-600">
              <div>Block: {chainStatus?.data?.block?.latest?.toLocaleString() || 'Loading...'}</div>
              <div>ETH: {realtimeStats.ethPrice ? `$${realtimeStats.ethPrice.toLocaleString()}` : 'Loading...'}</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-2 mb-8 border border-purple-100/50">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color || 'from-indigo-500 to-purple-600'} text-white shadow-lg`
                      : 'text-indigo-600 hover:text-indigo-800 hover:bg-white/50'
                  }`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative z-10">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'storage' && <ZeroGStorageTab />}
        {activeTab === 'compute' && <ZeroGComputeTab />}
        {activeTab === 'da' && <ZeroGDATab />}
        {activeTab === 'chain' && <ZeroGChainTab />}
        {activeTab === 'oracles' && <RealTimeData />}
        {activeTab === 'transactions' && <TransactionHistory />}
        {activeTab === 'network' && <NetworkStatus />}
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab() {
  const realtimeStats = useRealtimeStats();
  const { data: chainStatus } = useChainStatus();

  return (
    <div className="container mx-auto px-6 space-y-8 pb-16">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Network Health</h3>
            <i className="ri-pulse-line text-2xl"></i>
          </div>
          <div className="text-3xl font-bold mb-2">{realtimeStats.isOnline ? '100%' : '0%'}</div>
          <p className="text-green-100 text-sm">System operational</p>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Oracle Sources</h3>
            <i className="ri-database-line text-2xl"></i>
          </div>
          <div className="text-3xl font-bold mb-2">{realtimeStats.oracleConfidence || 0}%</div>
          <p className="text-blue-100 text-sm">Data confidence</p>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Latest Block</h3>
            <i className="ri-stack-line text-2xl"></i>
          </div>
          <div className="text-2xl font-bold mb-2">{chainStatus?.data?.block?.latest?.toLocaleString() || 'N/A'}</div>
          <p className="text-purple-100 text-sm">0G Network</p>
        </div>

        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Wallet Balance</h3>
            <i className="ri-wallet-line text-2xl"></i>
          </div>
          <div className="text-2xl font-bold mb-2">{parseFloat(chainStatus?.data?.wallet?.balance || '0').toFixed(3)} ETH</div>
          <p className="text-orange-100 text-sm">Available balance</p>
        </div>
      </div>
      
      <OracleVisualization />
    </div>
  );
}

// 0G Storage Component
function ZeroGStorageTab() {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { address, isConnected, isOnZeroGNetwork, formattedBalance } = useWallet();

  const handleFileUpload = async () => {
    if (!uploadFile || !isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (!isOnZeroGNetwork) {
      alert('Please switch to 0G Testnet');
      return;
    }
    
    setIsUploading(true);
    try {
      const result = await ZeroGravisAPI.uploadFile(uploadFile, uploadFile.name, address);
      setUploadResult(result);
      setUploadProgress(100);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 space-y-6 pb-16">
      <div className="bg-white/70 backdrop-blur-md border border-blue-100/50 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-900">0G Storage - Decentralized File Storage</h2>
          {isConnected && (
            <div className="flex items-center space-x-3 text-sm">
              <div className={`px-3 py-1 rounded-full ${isOnZeroGNetwork ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isOnZeroGNetwork ? '✓ 0G Network' : '⚠ Wrong Network'}
              </div>
              {formattedBalance && (
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {formattedBalance}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800">Upload File to 0G Network</h3>
            
            {!isConnected && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                <i className="ri-wallet-line text-2xl text-yellow-600 mb-2 block"></i>
                <p className="text-yellow-700 font-medium">Connect your wallet to upload files</p>
                <p className="text-yellow-600 text-sm mt-1">Storage fees will be paid from your connected wallet</p>
              </div>
            )}
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center">
              <input 
                type="file" 
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                className="hidden" 
                id="file-upload" 
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <i className="ri-upload-cloud-line text-4xl text-blue-500 mb-4 block"></i>
                <p className="text-blue-600">Click to select file or drag and drop</p>
                {uploadFile && <p className="mt-2 text-sm text-blue-800">{uploadFile.name}</p>}
              </label>
            </div>
            
            {uploadFile && (
              <button 
                onClick={handleFileUpload}
                disabled={isUploading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-xl hover:shadow-lg transition-all"
              >
                {isUploading ? 'Uploading...' : 'Upload to 0G Storage'}
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800">Storage Results</h3>
            {uploadResult && (
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-blue-600">Root Hash: {uploadResult.rootHash}</p>
                <p className="text-sm text-blue-600">Status: {uploadResult.status}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 0G Compute Component  
function ZeroGComputeTab() {
  const [result, setResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [oracleData, setOracleData] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [selectedOracles, setSelectedOracles] = useState<string[]>(['eth', 'btc', 'weather', 'space']);

  const generateOracleReport = async (reportType: 'selected' | 'all' = 'selected') => {
    setIsProcessing(true);
    try {
      // Determine which oracles to fetch
      const oraclesToFetch = reportType === 'all' ? ['eth', 'btc', 'weather', 'space'] : selectedOracles;
      
      console.log('Fetching oracle data for:', oraclesToFetch);
      
      // Create promises array based on selection
      const promises: Promise<any>[] = [];
      const promiseMap: { [key: string]: number } = {};
      
      if (oraclesToFetch.includes('eth')) {
        promiseMap['eth'] = promises.length;
        promises.push(ZeroGravisAPI.getETHPrice());
      }
      if (oraclesToFetch.includes('btc')) {
        promiseMap['btc'] = promises.length;
        promises.push(ZeroGravisAPI.getBTCPrice());
      }
      if (oraclesToFetch.includes('weather')) {
        promiseMap['weather'] = promises.length;
        promises.push(ZeroGravisAPI.getWeatherData('London'));
      }
      if (oraclesToFetch.includes('space')) {
        promiseMap['space'] = promises.length;
        promises.push(ZeroGravisAPI.getSpaceData());
      }

      const results = await Promise.allSettled(promises);

      // Map results back to oracle names
      const combinedData: any = {
        eth: null, btc: null, weather: null, space: null
      };

      Object.keys(promiseMap).forEach(oracle => {
        const index = promiseMap[oracle];
        combinedData[oracle] = results[index].status === 'fulfilled' ? results[index].value : null;
      });

      setOracleData(combinedData);

      // Create targeted prompt based on selected oracles
      let analysisPrompt = `Analyze the following real-time oracle data and provide a focused ${reportType === 'all' ? 'comprehensive' : 'targeted'} report:\n\n`;
      
      const analysisRequests: string[] = [];
      
      if (oraclesToFetch.includes('eth') && combinedData.eth) {
        analysisPrompt += `ETH PRICE DATA: ${JSON.stringify(combinedData.eth.data || 'unavailable', null, 2)}\n\n`;
        analysisRequests.push('ETH market analysis (price trends, volatility, market sentiment)');
      }
      
      if (oraclesToFetch.includes('btc') && combinedData.btc) {
        analysisPrompt += `BTC PRICE DATA: ${JSON.stringify(combinedData.btc.data || 'unavailable', null, 2)}\n\n`;
        analysisRequests.push('BTC market analysis (price trends, volatility, market sentiment)');
      }
      
      if (oraclesToFetch.includes('weather') && combinedData.weather) {
        analysisPrompt += `WEATHER DATA (London): ${JSON.stringify(combinedData.weather.data || 'unavailable', null, 2)}\n\n`;
        analysisRequests.push('Environmental conditions assessment and potential market impacts');
      }
      
      if (oraclesToFetch.includes('space') && combinedData.space) {
        analysisPrompt += `NASA SPACE DATA: ${JSON.stringify(combinedData.space.data || 'unavailable', null, 2)}\n\n`;
        analysisRequests.push('Space data analysis and interesting astronomical findings');
      }

      if (oraclesToFetch.length > 1) {
        analysisRequests.push('Cross-correlation analysis between selected data sources');
        analysisRequests.push('Key insights and actionable recommendations');
      }

      analysisPrompt += `Please provide:\n`;
      analysisRequests.forEach((req, index) => {
        analysisPrompt += `${index + 1}. ${req}\n`;
      });
      
      analysisPrompt += `\nFormat your response as a ${reportType === 'all' ? 'comprehensive' : 'focused'} report with clear sections and actionable insights.`;

      console.log('Submitting AI analysis...');
      const response = await ZeroGravisAPI.submitInference(
        analysisPrompt,
        'llama-3.1-70b-versatile',
        reportType === 'all' ? 800 : 500,
        0.3,
        address // Connected wallet address
      );
      
      setResult(response);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Oracle report generation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleOracle = (oracle: string) => {
    setSelectedOracles(prev => 
      prev.includes(oracle) 
        ? prev.filter(o => o !== oracle)
        : [...prev, oracle]
    );
  };

  return (
    <div className="container mx-auto px-6 space-y-6 pb-16">
      <div className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-purple-900 mb-6">0G Compute - AI Oracle Analysis</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Oracle Data Analysis Report</h3>
              <p className="text-purple-600 text-sm">Generate targeted AI analysis from selected oracle data sources</p>
            </div>
            {lastUpdate && (
              <div className="text-sm text-purple-500">
                Last Update: {lastUpdate.toLocaleTimeString()}
              </div>
            )}
          </div>

          {/* Oracle Selection Interface */}
          <div className="bg-purple-50 rounded-xl p-4">
            <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
              <i className="ri-settings-3-line mr-2"></i>
              Select Oracle Data Sources
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: 'eth', name: 'ETH Price', icon: '💰', desc: 'Ethereum price feed' },
                { id: 'btc', name: 'BTC Price', icon: '₿', desc: 'Bitcoin price feed' },
                { id: 'weather', name: 'Weather', icon: '🌤️', desc: 'London weather data' },
                { id: 'space', name: 'NASA Data', icon: '🚀', desc: 'Space & astronomy data' }
              ].map(oracle => (
                <label key={oracle.id} className="flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-white">
                  <input
                    type="checkbox"
                    checked={selectedOracles.includes(oracle.id)}
                    onChange={() => toggleOracle(oracle.id)}
                    className="sr-only"
                  />
                  <div className={`flex-1 flex items-center space-x-3 ${selectedOracles.includes(oracle.id) 
                    ? 'text-purple-700' : 'text-gray-600'}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${selectedOracles.includes(oracle.id) 
                      ? 'bg-purple-200 border-2 border-purple-400' : 'bg-gray-100 border-2 border-gray-300'}`}>
                      {oracle.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{oracle.name}</div>
                      <div className="text-xs opacity-75">{oracle.desc}</div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedOracles.includes(oracle.id)
                    ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-300'}`}>
                    {selectedOracles.includes(oracle.id) && (
                      <i className="ri-check-line text-xs"></i>
                    )}
                  </div>
                </label>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-purple-200">
              <div className="text-sm text-purple-600">
                {selectedOracles.length} oracle{selectedOracles.length !== 1 ? 's' : ''} selected
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedOracles([])}
                  className="text-xs px-3 py-1 rounded bg-purple-200 text-purple-700 hover:bg-purple-300 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setSelectedOracles(['eth', 'btc', 'weather', 'space'])}
                  className="text-xs px-3 py-1 rounded bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                >
                  Select All
                </button>
              </div>
            </div>
          </div>

          {/* Oracle Data Sources Status */}
          {oracleData && (
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className={`p-3 rounded-lg border ${oracleData.eth ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${oracleData.eth ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-sm font-medium">ETH Price</span>
                </div>
                {oracleData.eth && (
                  <div className="text-xs text-gray-600 mt-1">
                    ${oracleData.eth.data?.aggregatedValue?.price || 'N/A'}
                  </div>
                )}
              </div>
              
              <div className={`p-3 rounded-lg border ${oracleData.btc ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${oracleData.btc ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-sm font-medium">BTC Price</span>
                </div>
                {oracleData.btc && (
                  <div className="text-xs text-gray-600 mt-1">
                    ${oracleData.btc.data?.aggregatedValue?.price?.toLocaleString() || 'N/A'}
                  </div>
                )}
              </div>
              
              <div className={`p-3 rounded-lg border ${oracleData.weather ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${oracleData.weather ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-sm font-medium">Weather</span>
                </div>
                {oracleData.weather && (
                  <div className="text-xs text-gray-600 mt-1">
                    {oracleData.weather.data?.aggregatedValue?.temperature || 'N/A'}°C
                  </div>
                )}
              </div>
              
              <div className={`p-3 rounded-lg border ${oracleData.space ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${oracleData.space ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-sm font-medium">NASA Data</span>
                </div>
                {oracleData.space && (
                  <div className="text-xs text-gray-600 mt-1">
                    Space data available
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => generateOracleReport('selected')}
              disabled={isProcessing || selectedOracles.length === 0}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 font-semibold flex items-center justify-center space-x-2"
            >
              <i className="ri-check-double-line"></i>
              <span>{isProcessing ? 'Analyzing...' : `Generate Report from Selected (${selectedOracles.length})`}</span>
            </button>
            
            <button
              onClick={() => generateOracleReport('all')}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 font-semibold flex items-center justify-center space-x-2"
            >
              <i className="ri-global-line"></i>
              <span>{isProcessing ? 'Analyzing...' : 'Generate Complete Report (All Oracles)'}</span>
            </button>
          </div>

          {selectedOracles.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center space-x-2">
              <i className="ri-information-line text-yellow-600"></i>
              <span className="text-sm text-yellow-700">Please select at least one oracle to generate a targeted report, or use "Generate Complete Report" for all data.</span>
            </div>
          )}
          
          {result && (
            <div className="bg-purple-50 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-purple-800 mb-4 flex items-center">
                <i className="ri-brain-line mr-2"></i>
                AI Oracle Analysis Report
              </h4>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <pre className="text-purple-700 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {result.data?.result?.response || 'No analysis available'}
                  </pre>
                </div>
                
                {result.data?.result?.tokensUsed && (
                  <div className="flex flex-wrap gap-4 text-sm text-purple-600 border-t pt-3">
                    <span>🎯 Tokens Used: {result.data.result.tokensUsed}</span>
                    {result.data.result?.confidence && (
                      <span>📊 Confidence: {(result.data.result.confidence * 100).toFixed(1)}%</span>
                    )}
                    {result.data.result?.executionTime && (
                      <span>⏱️ Execution Time: {(result.data.result.executionTime / 1000).toFixed(1)}s</span>
                    )}
                    <span>🧠 Model: {result.data.result?.model || 'llama-3.1-70b-versatile'}</span>
                  </div>
                )}
                
                {result.data?.txHash && (
                  <div className="text-xs text-purple-500 font-mono bg-purple-100 p-2 rounded">
                    🔗 Transaction: {result.data.txHash}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 0G Data Availability Component
function ZeroGDATab() {
  const [data, setData] = useState('');
  const [blobResult, setBlobResult] = useState<any>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublishData = async () => {
    if (!data.trim()) return;
    
    setIsPublishing(true);
    try {
      const result = await ZeroGravisAPI.publishDataToDA(data);
      setBlobResult(result);
    } catch (error) {
      console.error('Data publishing failed:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="container mx-auto px-6 space-y-6 pb-16">
      <div className="bg-white/70 backdrop-blur-md border border-green-100/50 rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-green-900 mb-6">0G Data Availability - Scalable Data Access</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-3">Publish Data to DA Layer</h3>
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Enter data to publish to 0G Data Availability layer..."
              className="w-full h-32 p-4 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <button
            onClick={handlePublishData}
            disabled={isPublishing || !data.trim()}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isPublishing ? 'Publishing...' : 'Publish to DA Layer'}
          </button>
          
          {blobResult && (
            <div className="bg-green-50 rounded-xl p-4 mt-4">
              <h4 className="font-semibold text-green-800 mb-2">Published Successfully:</h4>
              <p className="text-sm text-green-700">Blob ID: {blobResult.blobId}</p>
              <p className="text-sm text-green-700">Status: {blobResult.status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 0G Chain Component
function ZeroGChainTab() {
  const [txData, setTxData] = useState('');
  const [txResult, setTxResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: chainStatus } = useChainStatus();

  const handleSubmitTransaction = async () => {
    if (!txData.trim()) return;
    
    setIsSubmitting(true);
    try {
      const result = await ZeroGravisAPI.submitOracleData(txData, {}, ['chainlink']);
      setTxResult(result);
    } catch (error) {
      console.error('Transaction submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 space-y-6 pb-16">
      <div className="bg-white/70 backdrop-blur-md border border-orange-100/50 rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-orange-900 mb-6">0G Chain - EVM Compatible Blockchain</h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-800">Network Status</h3>
            <div className="bg-orange-50 rounded-xl p-4 space-y-2">
              <p className="text-sm"><span className="font-semibold">Chain ID:</span> {chainStatus?.data?.network?.chainId}</p>
              <p className="text-sm"><span className="font-semibold">Latest Block:</span> {chainStatus?.data?.block?.latest}</p>
              <p className="text-sm"><span className="font-semibold">Gas Price:</span> {chainStatus?.data?.gas?.gasPrice}</p>
              <p className="text-sm"><span className="font-semibold">Wallet Balance:</span> {chainStatus?.data?.wallet?.balance} ETH</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-800">Submit Transaction</h3>
            <textarea
              value={txData}
              onChange={(e) => setTxData(e.target.value)}
              placeholder="Enter transaction data..."
              className="w-full h-24 p-4 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            
            <button
              onClick={handleSubmitTransaction}
              disabled={isSubmitting || !txData.trim()}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Transaction'}
            </button>
            
            {txResult && (
              <div className="bg-orange-50 rounded-xl p-4 mt-4">
                <h4 className="font-semibold text-orange-800 mb-2">Transaction Result:</h4>
                <p className="text-sm text-orange-700">Hash: {txResult.transactionHash}</p>
                <p className="text-sm text-orange-700">Status: {txResult.status}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Transaction History Component
function TransactionHistory() {
  const [selectedTxType, setSelectedTxType] = useState('all');
  const { data: chainStatus } = useChainStatus();
  const { data: transactionData, isLoading: transactionsLoading } = useRecentTransactions(20, selectedTxType);
  const { data: statsData } = useTransactionStats();

  // Use only real transaction data from backend - NO MOCK DATA
  const transactions = transactionData?.data?.transactions || [];

  const txTypes = [
    { 
      id: 'all', 
      name: 'All Transactions', 
      count: statsData?.data?.totalTransactions || transactions.length 
    },
    { 
      id: 'oracle', 
      name: 'Oracle Data', 
      count: statsData?.data?.oracleTransactions || transactions.filter((tx: any) => tx.type.includes('Oracle') || tx.type.includes('Blob')).length 
    },
    { 
      id: 'storage', 
      name: 'Storage', 
      count: statsData?.data?.storageTransactions || transactions.filter((tx: any) => tx.type.includes('Storage')).length 
    },
    { 
      id: 'compute', 
      name: 'AI Compute', 
      count: statsData?.data?.computeTransactions || transactions.filter((tx: any) => tx.type.includes('AI')).length 
    }
  ];

  const filteredTransactions = selectedTxType === 'all' 
    ? transactions 
    : transactions.filter((tx: any) => {
        if (selectedTxType === 'oracle') return tx.type.includes('Oracle') || tx.type.includes('Blob');
        if (selectedTxType === 'storage') return tx.type.includes('Storage');
        if (selectedTxType === 'compute') return tx.type.includes('AI');
        return true;
      });

  return (
    <div className="container mx-auto px-6 space-y-6 pb-16">
      {/* Transaction Type Filters */}
      <div className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Transaction History</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {txTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedTxType(type.id)}
              className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                selectedTxType === type.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              <div className="text-2xl font-bold">{type.count}</div>
              <div className="text-sm">{type.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl overflow-hidden">
        {transactionsLoading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="text-indigo-600">Loading transactions...</p>
          </div>
        ) : (
          <div className="divide-y divide-purple-100/50">
            {filteredTransactions.map((tx: any) => (
            <div key={tx.id} className="p-6 hover:bg-indigo-50/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-indigo-900">{tx.type}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      tx.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : tx.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                  <p className="text-sm text-indigo-600 mb-3">{tx.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-indigo-500">
                    <div>
                      <span className="font-medium">Block:</span> #{tx.blockNumber.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Gas:</span> {parseInt(tx.gasUsed).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Value:</span> {tx.value}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span> {new Date(tx.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50/70 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-600 font-medium">Transaction Hash:</span>
                  <a 
                    href={`https://chainscan-galileo.0g.ai/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:text-indigo-700 font-mono hover:underline flex items-center space-x-1"
                  >
                    <span>{tx.hash.slice(0, 20)}...{tx.hash.slice(-20)}</span>
                    <i className="ri-external-link-line"></i>
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-600 font-medium">From → To:</span>
                  <div className="text-indigo-500 font-mono flex items-center space-x-1">
                    <a 
                      href={`https://chainscan-galileo.0g.ai/address/${tx.from}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-700 hover:underline"
                    >
                      {tx.from.slice(0, 8)}...{tx.from.slice(-6)}
                    </a>
                    <span>→</span>
                    <a 
                      href={`https://chainscan-galileo.0g.ai/address/${tx.to}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-700 hover:underline"
                    >
                      {tx.to.slice(0, 8)}...{tx.to.slice(-6)}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
