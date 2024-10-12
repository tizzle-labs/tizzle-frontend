'use client';

import { useRef, useState } from 'react';
import { useSpeech } from '../../hooks/useSpeech';
import ChatInterface from './ChatInterface';
import Link from 'next/link';
import Image from 'next/image';

export const AgentInteraction = ({ hidden }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const inputRef = useRef();
  const { tts, loading, messages: agentMessages } = useSpeech();

  const sendMessage = textSuggest => {
    const text = textSuggest ? textSuggest : inputRef.current.value;
    if (!loading && text) {
      setMessages(prevMessage => [...prevMessage, { text, isUser: true }]);

      tts(text);
      inputRef.current.value = '';
      setInputMessage('');
    }
  };

  const handleInputChange = e => {
    setInputMessage(e.target.value);
  };

  if (hidden) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 text-black flex justify-between p-4 flex-col">
      <Link className="self-start flex flex-col items-center" href="/">
        <Image
          src="/logos/tizzle-logo-white.png"
          alt="Tizzle Logo"
          width={120}
          height={40}
          className="w-auto h-auto"
        />
      </Link>
      <div className="flex">
        <img
          src="/assets/agents/cortez/cortez-half.png"
          alt="Agent Avatar"
          className="w-16 h-16 bg-cortez-blue rounded-full object-cover absolute bottom-4 left-10"
        />
        {loading && (
          <div className="loader-outside absolute bottom-9 left-32">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      <ChatInterface
        messages={[...messages, ...agentMessages]}
        loading={loading}
        sendSuggestMessage={text => sendMessage(text)}
      />
      <div className="w-full flex flex-col items-end justify-center gap-4"></div>
      <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
        <button
          disabled={loading}
          onClick={() => alert('recording brooo...')}
          className={`bg-black hover:bg-red-500 text-white p-3 px-3 font-semibold uppercase rounded-full ${loading ? 'cursor-not-allowed opacity-30' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
            />
          </svg>
        </button>

        <input
          className="w-full placeholder:text-gray-800 placeholder:italic px-4 py-3 rounded-full bg-white backdrop-blur-md"
          placeholder="Type a message..."
          onChange={handleInputChange}
          ref={inputRef}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button
          disabled={loading || !inputMessage.trim()}
          onClick={() => sendMessage()}
          className={`bg-black text-white p-3 px-8 font-semibold uppercase rounded-full ${
            loading || !inputMessage.trim()
              ? 'cursor-not-allowed opacity-30'
              : 'hover:bg-primary'
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};
