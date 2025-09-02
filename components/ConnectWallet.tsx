'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:shadow-xl hover:shadow-purple-300/30 transition-all duration-300 whitespace-nowrap cursor-pointer transform hover:scale-105 font-semibold flex items-center space-x-2"
                  >
                    <i className="ri-wallet-line text-lg"></i>
                    <span>Connect Wallet</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:shadow-xl hover:shadow-red-300/30 transition-all duration-300 whitespace-nowrap cursor-pointer transform hover:scale-105 font-semibold flex items-center space-x-2"
                  >
                    <i className="ri-error-warning-line text-lg"></i>
                    <span>Wrong Network</span>
                  </button>
                );
              }

              return (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-indigo-700 border border-indigo-200 rounded-full hover:bg-indigo-50 transition-all duration-300"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 20,
                          height: 20,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 20, height: 20 }}
                          />
                        )}
                      </div>
                    )}
                    <span className="text-sm font-medium">{chain.name}</span>
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:shadow-lg hover:shadow-green-300/30 transition-all duration-300 whitespace-nowrap cursor-pointer transform hover:scale-105 font-semibold flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>{account.displayName}</span>
                    {account.displayBalance && (
                      <span className="text-green-100">({account.displayBalance})</span>
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}