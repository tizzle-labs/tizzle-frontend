'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { useWallet } from './walletContext';
import useStore from '@tizzle-fe/stores/userStore';
import { useCurrentAccount } from '@mysten/dapp-kit';
import Cookies from 'js-cookie';

const SpeechContext = createContext();

export const SpeechProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const agentPath = pathname.split('/').filter(Boolean).pop();
  const { setTokens: updateToken } = useWallet();

  const currentAccount = useCurrentAccount();
  const setUpdatedToken = useStore(state => state.setUpdatedToken);

  const tts = async (message, accountId) => {
    setLoading(true);
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tts/${agentPath}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          body: JSON.stringify({
            message,
            wallet_address: currentAccount.address,
          }),
        },
      );

      const result = await data.json();
      const response = result.messages;
      const currentTokens = result.current_tokens;

      setMessages(messages => [...messages, ...response]);
      updateToken(currentTokens);
      setUpdatedToken(currentTokens);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onMessagePlayed = () => {
    setMessages(messages => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <SpeechContext.Provider
      value={{
        tts,
        message,
        messages,
        loading,
        onMessagePlayed,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
};
