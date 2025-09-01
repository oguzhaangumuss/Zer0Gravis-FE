// ZeroGravis Backend API Client

import axios from 'axios';

// API Configuration  
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // Increased to 60 seconds for blockchain scanning
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

  // ========================================
  // 0G STORAGE APIS - Real file/dataset storage
  // ========================================
  
  static async uploadFile(file: File, fileName?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (fileName) formData.append('fileName', fileName);
    
    const response = await apiClient.post('/api/v1/storage/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 300000 // 5 minutes for large files
    });
    return response.data;
  }

  static async uploadData(data: any, fileName: string) {
    const response = await apiClient.post('/api/v1/storage/upload-data', {
      data,
      fileName
    });
    return response.data;
  }

  static async downloadFile(rootHash: string, fileName?: string) {
    const params = fileName ? `?fileName=${fileName}` : '';
    const response = await apiClient.get(`/api/v1/storage/download/${rootHash}${params}`, {
      responseType: 'blob'
    });
    return response;
  }

  static async getStorageData(rootHash: string) {
    const response = await apiClient.get(`/api/v1/storage/data/${rootHash}`);
    return response.data;
  }

  static async getStorageInfo() {
    const response = await apiClient.get('/api/v1/storage/info');
    return response.data;
  }

  static async getStorageStatus(rootHash: string) {
    const response = await apiClient.get(`/api/v1/storage/status/${rootHash}`);
    return response.data;
  }

  static async estimateStorageCost(fileSize: number) {
    const response = await apiClient.post('/api/v1/storage/estimate-cost', { fileSize });
    return response.data;
  }

  static async testStorageConnection() {
    const response = await apiClient.get('/api/v1/storage/test');
    return response.data;
  }

  // ========================================
  // 0G COMPUTE APIS - AI inference and model training
  // ========================================

  static async submitInference(prompt: string, model?: string, maxTokens?: number, temperature?: number) {
    const response = await apiClient.post('/api/v1/compute/inference', {
      prompt,
      model: model || 'llama-3.1-8b-instant',
      maxTokens: maxTokens || 200,
      temperature: temperature || 0.7
    });
    return response.data;
  }

  static async getJobInfo(jobId: string) {
    const response = await apiClient.get(`/api/v1/compute/jobs/${jobId}`);
    return response.data;
  }

  static async performOracleConsensus(oracleResponses: any[], consensusMethod: string, dataType: string) {
    const response = await apiClient.post('/api/v1/compute/oracle-consensus', {
      oracleResponses,
      consensusMethod,
      dataType
    });
    return response.data;
  }

  static async getAvailableModels() {
    const response = await apiClient.get('/api/v1/compute/models');
    return response.data;
  }

  static async getComputeNetworkStatus() {
    const response = await apiClient.get('/api/v1/compute/status');
    return response.data;
  }

  static async estimateComputeCost(model: string, maxTokens: number) {
    const response = await apiClient.post('/api/v1/compute/estimate-cost', {
      model,
      maxTokens
    });
    return response.data;
  }

  static async testComputeNetwork() {
    const response = await apiClient.get('/api/v1/compute/test');
    return response.data;
  }

  // ========================================
  // 0G DATA AVAILABILITY APIS - Scalable data access
  // ========================================

  static async publishDataToDA(data: any, metadata?: any) {
    const response = await apiClient.post('/api/v1/da/publish-data', {
      data,
      metadata
    });
    return response.data;
  }

  static async retrieveDataFromDA(blobId: string) {
    const response = await apiClient.get(`/api/v1/da/retrieve-data/${blobId}`);
    return response.data;
  }

  static async getBlobInfo(blobId: string) {
    const response = await apiClient.get(`/api/v1/da/blob-info/${blobId}`);
    return response.data;
  }

  static async getDANetworkStatus() {
    const response = await apiClient.get('/api/v1/da/status');
    return response.data;
  }

  static async testDALayer() {
    const response = await apiClient.post('/api/v1/da/test', {
      testData: { message: 'Test blob data', timestamp: Date.now() }
    });
    return response.data;
  }

  // ========================================
  // 0G CHAIN APIS - Fast EVM-compatible transactions
  // ========================================

  static async submitOracleData(oracleData: any, consensusValue: any, sources: string[]) {
    const response = await apiClient.post('/api/v1/chain/submit-oracle-data', {
      oracleData,
      consensusValue,
      sources
    });
    return response.data;
  }

  static async getWalletInfo() {
    const response = await apiClient.get('/api/v1/chain/wallet');
    return response.data;
  }

  static async estimateGas(data: any, toAddress?: string) {
    const response = await apiClient.post('/api/v1/chain/estimate-gas', {
      data,
      to: toAddress
    });
    return response.data;
  }

  static async getNetworkInfo() {
    const response = await apiClient.get('/api/v1/chain/network');
    return response.data;
  }

  static async testChainConnection() {
    const response = await apiClient.get('/api/v1/chain/test');
    return response.data;
  }
}

export default ZeroGravisAPI;