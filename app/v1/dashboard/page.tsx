
'use client';

import { useState, useCallback } from 'react';
import { useRealtimeStats, useChainStatus, useRecentTransactions, useTransactionStats } from '../../../lib/hooks/useZeroGravis';
import { ZeroGravisAPI } from '../../../lib/api';
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

  const handleFileUpload = async () => {
    if (!uploadFile) return;
    
    setIsUploading(true);
    try {
      const result = await ZeroGravisAPI.uploadFile(uploadFile);
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
        <h2 className="text-2xl font-bold text-blue-900 mb-6">0G Storage - Decentralized File Storage</h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800">Upload File to 0G Network</h3>
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
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInference = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    try {
      const response = await ZeroGravisAPI.submitInference(prompt);
      setResult(response);
    } catch (error) {
      console.error('Inference failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-6 space-y-6 pb-16">
      <div className="bg-white/70 backdrop-blur-md border border-purple-100/50 rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-purple-900 mb-6">0G Compute - AI Inference</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-purple-800 mb-3">AI Model Inference</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt for AI inference..."
              className="w-full h-32 p-4 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <button
            onClick={handleInference}
            disabled={isProcessing || !prompt.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Run AI Inference'}
          </button>
          
          {result && (
            <div className="bg-purple-50 rounded-xl p-4 mt-4">
              <h4 className="font-semibold text-purple-800 mb-2">AI Response:</h4>
              <p className="text-purple-700">{result.response}</p>
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
