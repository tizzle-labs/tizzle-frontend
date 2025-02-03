'use client';

import React, { createContext, useContext } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  return (
    <WalletContext.Provider
      value={{
        selector: null,
        modal: null,
        accountId: null,
        balance: 0,
        tokens: 0,
        setTokens: () => {},
        loading: false,
        signOut: () => {},
        getAccount: () => {},
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
