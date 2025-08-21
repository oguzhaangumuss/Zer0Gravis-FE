
'use client';

import { useState } from 'react';
import { useRealtimeStats, useChainStatus, useRecentTransactions, useTransactionStats } from '../../lib/hooks/useZeroGravis';
import Header from '../../components/Header';
import NetworkStatus from '../../components/NetworkStatus';
import RealTimeData from '../../components/RealTimeData';
import APIStatus from '../../components/APIStatus';
import OracleVisualization from '../../components/OracleVisualization';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const realtimeStats = useRealtimeStats();
  const { data: chainStatus } = useChainStatus();

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'ri-dashboard-line' },
    { id: 'transactions', name: 'Transactions', icon: 'ri-exchange-line' },
    { id: 'oracles', name: 'Oracle Data', icon: 'ri-database-line' },
    { id: 'network', name: 'Network Status', icon: 'ri-wifi-line' },
    { id: 'apis', name: 'API Status', icon: 'ri-server-line' }
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
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
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
        {activeTab === 'transactions' && <TransactionHistory />}
        {activeTab === 'oracles' && <RealTimeData />}
        {activeTab === 'network' && <NetworkStatus />}
        {activeTab === 'apis' && <APIStatus />}
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

// Transaction History Component
function TransactionHistory() {
  const [selectedTxType, setSelectedTxType] = useState('all');
  const { data: chainStatus } = useChainStatus();
  const { data: transactionData, isLoading: transactionsLoading } = useRecentTransactions(20, selectedTxType);
  const { data: statsData } = useTransactionStats();

  // Use real transaction data or fallback to mock data
  const transactions = transactionData?.data?.transactions || [
    {
      id: '1',
      hash: '0xa1b2c3d4e5f67890123456789abcdef01234567890abcdef01234567890abcdef',
      type: 'Oracle Data Recording',
      status: 'confirmed',
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 min ago
      value: '0.001 ETH',
      gasUsed: '21000',
      blockNumber: chainStatus?.data?.block?.latest ? chainStatus.data.block.latest - 2 : 5317770,
      from: '0xEA0017d462dDec5fB098AF885a867E40303E730E',
      to: '0x857C0A28A8634614BB2C96039Cf4a20AFF709Aa9',
      description: 'ETH/USD price data recorded to 0G DA layer'
    },
    {
      id: '2', 
      hash: '0xb2c3d4e5f67890123456789abcdef01234567890abcdef01234567890abcdef12',
      type: 'Storage Upload',
      status: 'confirmed',
      timestamp: new Date(Date.now() - 600000).toISOString(), // 10 min ago
      value: '0.002 ETH',
      gasUsed: '45000',
      blockNumber: chainStatus?.data?.block?.latest ? chainStatus.data.block.latest - 5 : 5317767,
      from: '0xEA0017d462dDec5fB098AF885a867E40303E730E',
      to: '0xbD75117F80b4E22698D0Cd7612d92BDb8eaff628',
      description: 'Weather data stored on 0G Storage network'
    },
    {
      id: '3',
      hash: '0xc3d4e5f67890123456789abcdef01234567890abcdef01234567890abcdef1234',
      type: 'AI Inference',
      status: 'pending',
      timestamp: new Date(Date.now() - 120000).toISOString(), // 2 min ago
      value: '0.005 ETH',
      gasUsed: '75000',
      blockNumber: chainStatus?.data?.block?.latest ? chainStatus.data.block.latest - 1 : 5317771,
      from: '0xEA0017d462dDec5fB098AF885a867E40303E730E',
      to: '0x857C0A28A8634614BB2C96039Cf4a20AFF709Aa9',
      description: 'AI model execution on 0G Compute network'
    },
    {
      id: '4',
      hash: '0xd4e5f67890123456789abcdef01234567890abcdef01234567890abcdef12345',
      type: 'Blob Submission',
      status: 'confirmed',
      timestamp: new Date(Date.now() - 900000).toISOString(), // 15 min ago
      value: '0.003 ETH',
      gasUsed: '55000',
      blockNumber: chainStatus?.data?.block?.latest ? chainStatus.data.block.latest - 8 : 5317764,
      from: '0xEA0017d462dDec5fB098AF885a867E40303E730E',
      to: '0x857C0A28A8634614BB2C96039Cf4a20AFF709Aa9',
      description: 'NASA space data submitted to 0G DA layer'
    }
  ];

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
                  <span className="text-indigo-500 font-mono">
                    {tx.from.slice(0, 8)}...{tx.from.slice(-6)} → {tx.to.slice(0, 8)}...{tx.to.slice(-6)}
                  </span>
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
