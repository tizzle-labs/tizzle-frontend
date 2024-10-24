'use client';

import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const getAccountId = async accountId => {
    setLoading(true);

    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${accountId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const response = (await data.json()).data;
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createNewUser = async (accountId, walletId) => {
    setLoading(true);

    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account_id: accountId, wallet_id: walletId }),
      });
      const response = (await data.json()).data;
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateToken = async (accountId, token) => {
    setLoading(true);

    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-token/${accountId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        },
      );
      const response = (await data.json()).data;
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createTokenHistory = async (accountId, txHash, price, tokens) => {
    setLoading(true);

    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/token-history`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            account_id: accountId,
            tx_hash: txHash,
            price,
            tokens,
          }),
        },
      );
      const response = (await data.json()).data;
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        getAccountId,
        createNewUser,
        updateToken,
        createTokenHistory,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
