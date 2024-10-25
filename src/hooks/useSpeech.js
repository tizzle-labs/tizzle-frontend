'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { useWallet } from './walletContext';
import useStore from '@tizzle-fe/stores/userStore';

const SpeechContext = createContext();

export const SpeechProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const agentPath = pathname.split('/').filter(Boolean).pop();
  const { setTokens: updateToken } = useWallet();

  const setUpdatedToken = useStore(state => state.setUpdatedToken);

  const tts = async (message, accountId) => {
    setLoading(true);
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tts/${agentPath}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, account_id: accountId }),
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
