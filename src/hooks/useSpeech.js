'use client';
import useStore from '@tizzle-fe/stores/userStore';
import { createContext, useContext, useEffect, useState } from 'react';

const SpeechContext = createContext();

export const SpeechProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const selectedAgent = useStore(state => state.selectedAgent);

  const tts = async message => {
    setLoading(true);
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tts/${selectedAgent}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        },
      );
      const response = (await data.json()).messages;
      setMessages(messages => [...messages, ...response]);
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
