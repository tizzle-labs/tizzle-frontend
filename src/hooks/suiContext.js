'use client';

import {
  ConnectModal,
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  devnet: { url: getFullnodeUrl('devnet') },
});
const queryClient = new QueryClient();

const SuiContext = createContext();

const SuiProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider>
          <SuiContext.Provider value={{ isModalOpen, setIsModalOpen }}>
            {children}
            <ConnectModal
              open={isModalOpen}
              onOpenChange={isOpen => setIsModalOpen(isOpen)}
            />
          </SuiContext.Provider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default SuiProvider;

export const useSuiProvider = () => {
  const context = useContext(SuiContext);
  if (!context) {
    throw new Error('useSui must be used within a SuiProvider');
  }
  return context;
};
