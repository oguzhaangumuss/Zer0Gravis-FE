// ZeroGravis Backend API Client

import axios from 'axios';

// API Configuration  
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Types
export interface HealthStatus {
  status: string;
  timestamp: string;
  version: string;
  service: string;
}

export interface OracleData {
  success: boolean;
  data: {
    dataType: string;
    sources: string[];
    aggregatedValue: {
      symbol?: string;
      price?: number;
      currency?: string;
      change24h?: number;
      volume24h?: number;
      marketCap?: number;
      temperature?: number;
      condition?: string;
      location?: string;
      humidity?: number;
      pressure?: number;
      windSpeed?: number;
      coordinates?: { lat: number; lon: number };
      data?: any[];
    };
    confidence: number;
    timestamp: number;
    consensusMethod: string;
  };
  executionTime: number;
  sourcesUsed: string[];
  consensusAchieved: boolean;
  timestamp: string;
}

export interface ChainStatus {
  success: boolean;
  data: {
    network: {
      name: string;
      chainId: string;
      rpc: string;
    };
    block: {
      latest: number;
      timestamp: number;
      hash: string;
    };
    wallet: {
      address: string;
      balance: string;
      balanceWei: string;
    };
    gas: {
      gasPrice: string;
      maxFeePerGas: string;
      maxPriorityFeePerGas: string;
    };
    status: string;
  };
  timestamp: string;
}

export class ZeroGravisAPI {
  // Health Check
  static async getHealth(): Promise<HealthStatus> {
    const response = await apiClient.get<HealthStatus>('/health');
    return response.data;
  }

  // Oracle APIs
  static async getETHPrice(): Promise<OracleData> {
    const response = await apiClient.post<OracleData>('/api/v1/oracle/collect', {
      sources: ['chainlink'],
      dataType: 'price_feed',
      parameters: { symbol: 'ETH/USD' }
    });
    return response.data;
  }

  static async getBTCPrice(): Promise<OracleData> {
    const response = await apiClient.post<OracleData>('/api/v1/oracle/collect', {
      sources: ['chainlink'],
      dataType: 'price_feed',
      parameters: { symbol: 'BTC/USD' }
    });
    return response.data;
  }

  static async getWeatherData(city: string = 'London'): Promise<OracleData> {
    const response = await apiClient.post<OracleData>('/api/v1/oracle/collect', {
      sources: ['weather'],
      dataType: 'weather',
      parameters: { city }
    });
    return response.data;
  }

  static async getSpaceData(date?: string): Promise<OracleData> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const response = await apiClient.post<OracleData>('/api/v1/oracle/collect', {
      sources: ['nasa'],
      dataType: 'space',
      parameters: { 
        spaceDataType: 'asteroid',
        date: targetDate 
      }
    });
    return response.data;
  }

  // Chain Status
  static async getChainStatus(): Promise<ChainStatus> {
    const response = await apiClient.get<ChainStatus>('/api/v1/chain/status');
    return response.data;
  }

  // AI Inference
  static async runAIInference(prompt: string, maxTokens: number = 100) {
    const response = await apiClient.post('/api/v1/compute/inference', {
      model: 'llama-3.1-8b-instant',
      prompt,
      maxTokens,
      temperature: 0.7
    });
    return response.data;
  }

  // Combined Oracle Stats
  static async getAllOracleData() {
    try {
      const [ethData, btcData, weatherData, spaceData] = await Promise.allSettled([
        this.getETHPrice(),
        this.getBTCPrice(),
        this.getWeatherData('London'),
        this.getSpaceData()
      ]);

      return {
        eth: ethData.status === 'fulfilled' ? ethData.value : null,
        btc: btcData.status === 'fulfilled' ? btcData.value : null,
        weather: weatherData.status === 'fulfilled' ? weatherData.value : null,
        space: spaceData.status === 'fulfilled' ? spaceData.value : null,
      };
    } catch (error) {
      console.error('Error fetching all oracle data:', error);
      throw error;
    }
  }

  // Transaction APIs
  static async getRecentTransactions(limit: number = 10, type: string = 'all') {
    const response = await apiClient.get(`/api/v1/transactions/recent?limit=${limit}&type=${type}`);
    return response.data;
  }

  static async getTransactionStats() {
    const response = await apiClient.get('/api/v1/transactions/stats');
    return response.data;
  }

  static async getTransactionDetails(hash: string) {
    const response = await apiClient.get(`/api/v1/transactions/${hash}`);
    return response.data;
  }
}

export default ZeroGravisAPI;