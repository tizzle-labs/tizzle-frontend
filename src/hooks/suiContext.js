'use client';

import {
  ConnectModal,
  createNetworkConfig,
  SuiClientProvider,
  useCurrentAccount,
  useSignPersonalMessage,
  WalletProvider,
} from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  devnet: { url: getFullnodeUrl('devnet') },
});
const queryClient = new QueryClient();

const SuiContext = createContext();

const SuiLayout = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect>
          <SuiProvider>{children}</SuiProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

const SuiProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: signPersonalMessage } = useSignPersonalMessage();

  const currentAccount = useCurrentAccount();

  useEffect(() => {
    const verifyUser = async () => {
      const token = Cookies.get('token');
      if (token) return;

      try {
        const challenge = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/challenge`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              wallet_public_key: currentAccount.address,
            }),
          },
        );
        const { data } = await challenge.json();
        const { message, nonce } = data;

        signPersonalMessage(
          { message: new TextEncoder().encode(message) },
          {
            onSuccess: async result => {
              const signature = result.signature;
              const verify = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    wallet_public_key: currentAccount.address,
                    signature,
                    nonce,
                  }),
                },
              );
              const { data } = await verify.json();
              const { access_token } = data;
              Cookies.set('token', access_token);
            },
            onError: error => console.log('error sign message', error),
          },
        );
      } catch (error) {
        // TODO Handle Error
      }
    };

    if (currentAccount?.address) {
      verifyUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount, currentAccount?.address]);

  return (
    <SuiContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
      <ConnectModal
        open={isModalOpen}
        onOpenChange={isOpen => setIsModalOpen(isOpen)}
      />
    </SuiContext.Provider>
  );
};

export default SuiLayout;

export const useSuiProvider = () => {
  const context = useContext(SuiContext);
  if (!context) {
    throw new Error('useSui must be used within a SuiProvider');
  }
  return context;
};
