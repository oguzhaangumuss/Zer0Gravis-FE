import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { Chain } from 'viem';

// 0G Galileo Testnet Configuration
export const zeroGTestnet: Chain = {
  id: 16601,
  name: '0G-Galileo-Testnet',
  nativeCurrency: {
    decimals: 18,
    name: '0G',
    symbol: 'OG',
  },
  rpcUrls: {
    default: {
      http: ['https://evmrpc-testnet.0g.ai'],
    },
    public: {
      http: ['https://evmrpc-testnet.0g.ai'],
    },
  },
  blockExplorers: {
    default: {
      name: '0G Testnet Explorer',
      url: 'https://chainscan-galileo.0g.ai',
    },
  },
  testnet: true,
};

export const config = getDefaultConfig({
  appName: 'ZeroGravis',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your-project-id',
  chains: [zeroGTestnet],
  ssr: true,
});