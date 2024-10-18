'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupBitteWallet } from '@near-wallet-selector/bitte-wallet';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { useUser } from './useUser';
import { providers } from 'near-api-js';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [selector, setSelector] = useState(null);
  const [modal, setModal] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [walletId, setWalletId] = useState(null);
  const [tokens, setTokens] = useState();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const { getAccountId, createNewUser } = useUser();

  useEffect(() => {
    const initWallet = async () => {
      setLoading(true);

      try {
        const selectorInstance = await setupWalletSelector({
          network: 'testnet',
          modules: [setupMyNearWallet(), setupBitteWallet(), setupHereWallet()],
        });

        const modalInstance = setupModal(selectorInstance, {
          contractId: 'tizzle.testnet',
        });

        setSelector(selectorInstance);
        setModal(modalInstance);

        const accounts = selectorInstance.store.getState().accounts;
        const walletId = (await selectorInstance.wallet()).id;
        if (accounts.length && walletId) {
          setAccountId(accounts[0].accountId);
          setWalletId(walletId);
        }
      } catch (error) {
        console.error('Failed to initialize wallet selector:', error);
      } finally {
        setLoading(false);
      }
    };

    initWallet();
  }, []);

  useEffect(() => {
    const initUser = async () => {
      try {
        const userData = await getAccountId(accountId);

        if (!userData) {
          const newUserData = await createNewUser(accountId, walletId);
          setTokens(newUserData.tokens);
        }

        setTokens(userData.tokens);
      } catch (error) {
        console.error(error);
      }

      await fetchBalance();
    };

    if (accountId && walletId) {
      initUser();
    }
  }, [accountId, walletId]);

  const signOut = async () => {
    if (!selector) {
      console.error('Wallet selector not initialized yet');
      return;
    }

    try {
      const wallet = await selector.wallet(walletId);
      await wallet.signOut();

      setAccountId(null);
      localStorage.clear();
      console.log('Successfully signed out');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const getAccount = async () => {
    if (!selector) {
      console.error('Wallet selector not initialized yet');
      return null;
    }

    const wallet = await selector.wallet('my-near-wallet');
    const accounts = await wallet.getAccounts();
    return accounts[0]?.accountId || null;
  };

  const fetchBalance = async () => {
    if (!selector || !accountId) {
      console.error('Wallet selector or accountId not initialized yet');
      return;
    }

    try {
      const provider = new providers.JsonRpcProvider({
        url: 'https://rpc.testnet.near.org',
      });

      const result = await provider.query({
        request_type: 'view_account',
        finality: 'final',
        account_id: accountId,
      });

      const balanceInNear = result.amount / 1e24;

      setBalance(balanceInNear);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        selector,
        modal,
        accountId,
        balance,
        tokens,
        loading,
        signOut,
        getAccount,
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
