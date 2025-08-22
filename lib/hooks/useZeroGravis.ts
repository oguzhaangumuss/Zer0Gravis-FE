// Custom React Query Hooks for ZeroGravis Backend

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ZeroGravisAPI } from '../api';

// Query Keys
export const QUERY_KEYS = {
  HEALTH: ['health'] as const,
  ETH_PRICE: ['eth-price'] as const,
  BTC_PRICE: ['btc-price'] as const,
  WEATHER: (city: string) => ['weather', city] as const,
  SPACE_DATA: (date: string) => ['space-data', date] as const,
  CHAIN_STATUS: ['chain-status'] as const,
  ALL_ORACLE_DATA: ['all-oracle-data'] as const,
};

// Health Check Hook
export function useHealth() {
  return useQuery({
    queryKey: QUERY_KEYS.HEALTH,
    queryFn: () => ZeroGravisAPI.getHealth(),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // 10 seconds
  });
}

// Oracle Price Feeds
export function useETHPrice() {
  return useQuery({
    queryKey: QUERY_KEYS.ETH_PRICE,
    queryFn: () => ZeroGravisAPI.getETHPrice(),
    refetchInterval: 15000, // Refetch every 15 seconds
    staleTime: 5000, // 5 seconds
    retry: 3,
  });
}

export function useBTCPrice() {
  return useQuery({
    queryKey: QUERY_KEYS.BTC_PRICE,
    queryFn: () => ZeroGravisAPI.getBTCPrice(),
    refetchInterval: 15000, // Refetch every 15 seconds
    staleTime: 5000, // 5 seconds
    retry: 3,
  });
}

// Weather Data Hook
export function useWeatherData(city: string = 'London') {
  return useQuery({
    queryKey: QUERY_KEYS.WEATHER(city),
    queryFn: () => ZeroGravisAPI.getWeatherData(city),
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // 30 seconds
    enabled: !!city,
  });
}

// Space Data Hook
export function useSpaceData(date?: string) {
  const targetDate = date || new Date().toISOString().split('T')[0];
  
  return useQuery({
    queryKey: QUERY_KEYS.SPACE_DATA(targetDate),
    queryFn: () => ZeroGravisAPI.getSpaceData(targetDate),
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 60000, // 1 minute
  });
}

// Chain Status Hook
export function useChainStatus() {
  return useQuery({
    queryKey: QUERY_KEYS.CHAIN_STATUS,
    queryFn: () => ZeroGravisAPI.getChainStatus(),
    refetchInterval: 20000, // Refetch every 20 seconds
    staleTime: 10000, // 10 seconds
    retry: 2,
  });
}

// All Oracle Data Hook
export function useAllOracleData() {
  return useQuery({
    queryKey: QUERY_KEYS.ALL_ORACLE_DATA,
    queryFn: () => ZeroGravisAPI.getAllOracleData(),
    refetchInterval: 20000, // Refetch every 20 seconds
    staleTime: 10000, // 10 seconds
    retry: 2,
  });
}

// AI Inference Mutation
export function useAIInference() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ prompt, maxTokens }: { prompt: string; maxTokens?: number }) =>
      ZeroGravisAPI.runAIInference(prompt, maxTokens),
    onSuccess: () => {
      // Invalidate and refetch any related data
      queryClient.invalidateQueries({ queryKey: ['ai-inference'] });
    },
  });
}

// Real-time Stats Hook
export function useRealtimeStats() {
  const { data: health } = useHealth();
  const { data: ethPrice } = useETHPrice();
  const { data: btcPrice } = useBTCPrice();
  const { data: chainStatus } = useChainStatus();
  const { data: weather } = useWeatherData();

  return {
    isOnline: health?.status === 'healthy',
    latestBlock: chainStatus?.data?.block?.latest,
    ethPrice: ethPrice?.data?.aggregatedValue?.price,
    btcPrice: btcPrice?.data?.aggregatedValue?.price,
    temperature: weather?.data?.aggregatedValue?.temperature,
    totalTransactions: chainStatus?.data?.block?.latest ? chainStatus.data.block.latest * 1000 : 0,
    oracleConfidence: ethPrice?.data?.confidence ? Math.round(ethPrice.data.confidence * 100) : 0,
    networkStatus: chainStatus?.data?.status || 'unknown',
  };
}

// Network Statistics Hook
export function useNetworkStats() {
  const { data: chainStatus } = useChainStatus();
  const { data: allOracle } = useAllOracleData();

  const stats = {
    chainId: chainStatus?.data?.network?.chainId || '16601',
    networkName: chainStatus?.data?.network?.name || '0G-Galileo-Testnet',
    latestBlock: chainStatus?.data?.block?.latest || 0,
    gasPrice: chainStatus?.data?.gas?.gasPrice || '0',
    walletBalance: chainStatus?.data?.wallet?.balance || '0',
    oracleSourcesActive: [
      allOracle?.eth?.success ? 'Chainlink ETH' : null,
      allOracle?.btc?.success ? 'Chainlink BTC' : null, 
      allOracle?.weather?.success ? 'OpenWeatherMap' : null,
      allOracle?.space?.success ? 'NASA' : null,
    ].filter(Boolean).length,
    totalSources: 4,
  };

  return {
    ...stats,
    healthPercentage: Math.round((stats.oracleSourcesActive / stats.totalSources) * 100),
  };
}

// Transaction Hooks
export function useRecentTransactions(limit: number = 10, type: string = 'all') {
  return useQuery({
    queryKey: ['transactions', 'recent', limit, type],
    queryFn: () => ZeroGravisAPI.getRecentTransactions(limit, type),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000, // 15 seconds
    retry: 2,
  });
}

export function useTransactionStats() {
  return useQuery({
    queryKey: ['transactions', 'stats'],
    queryFn: () => ZeroGravisAPI.getTransactionStats(),
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // 30 seconds
    retry: 2,
  });
}

export function useTransactionDetails(hash: string) {
  return useQuery({
    queryKey: ['transactions', 'details', hash],
    queryFn: () => ZeroGravisAPI.getTransactionDetails(hash),
    enabled: !!hash && hash.length === 66, // Valid tx hash length
    staleTime: 300000, // 5 minutes - transaction details don't change
    retry: 1,
  });
}