'use client';

import { useAccount, useBalance, useChainId, useDisconnect, useNetwork } from 'wagmi';
import { zeroGTestnet } from '../lib/wagmi';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { data: balance } = useBalance({
    address,
    watch: true,
  });

  const isOnZeroGNetwork = chainId === zeroGTestnet.id;

  return {
    address,
    isConnected,
    disconnect,
    balance,
    chainId,
    isOnZeroGNetwork,
    network: isOnZeroGNetwork ? zeroGTestnet : null,
    formattedBalance: balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : null,
  };
}