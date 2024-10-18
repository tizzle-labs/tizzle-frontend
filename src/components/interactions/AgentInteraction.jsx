'use client';

import { useRef, useState } from 'react';
import { useSpeech } from '../../hooks/useSpeech';
import ChatInterface from './ChatInterface';
import Link from 'next/link';
import Image from 'next/image';
import { useWallet } from '@tizzle-fe/hooks/walletContext';
import Modal from '../common/modal/Modal';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';
import { IconNear } from '../common/svg';
import { prettyTruncate } from '@tizzle-fe/utils/common';

export const AgentInteraction = ({ agentPath, hidden }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isTokenModalOpen, setTokenModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const inputRef = useRef();
  const { tts, loading, messages: agentMessages } = useSpeech();
  const { accountId, balance, tokens } = useWallet();

  console.log('balance: ', balance);

  const avatarUrl = createAvatar(style, {
    seed: accountId,
    dataUri: true,
  });

  const tokenPackages = [
    { id: 1, label: 'Tier One', tokens: 50, price: 1 },
    { id: 2, label: 'Tier Two', tokens: 100, price: 2 },
    { id: 3, label: 'Tier Three', tokens: 250, price: 5 },
    { id: 4, label: 'Tier Four', tokens: 500, price: 10 },
    { id: 5, label: 'Tier Five', tokens: 1000, price: 20 },
  ];

  const handlePackageChange = event => {
    setSelectedPackage(event.target.value);
  };

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
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        title="Profile"
        onExit={() => setProfileModalOpen(false)}
      >
        <div className="relative p-4 flex flex-col items-center text-center">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full w-32 h-32 mb-4"
          />
          <p className="text-lg">{accountId}</p>
          <p className="text-lg">{tokens} Tokens</p>
        </div>
      </Modal>

      <Modal
        isOpen={isTokenModalOpen}
        onClose={() => setTokenModalOpen(false)}
        title="Buy Token"
        onExit={() => setTokenModalOpen(false)}
      >
        <div className="relative p-4">
          <h2 className="text-lg mb-4 text-center">Select Package Tier</h2>
          <select
            value={selectedPackage}
            onChange={handlePackageChange}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          >
            <option value="" disabled>
              Select package...
            </option>
            {tokenPackages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.price} NEAR - {pkg.tokens} tokens
              </option>
            ))}
          </select>
          <button
            className={`w-full text-white rounded-md py-2 hover:bg-opacity-80 transition duration-300 ${!selectedPackage ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-primary'}`}
            onClick={() => {
              setTokenModalOpen(false);
            }}
            disabled={!selectedPackage}
          >
            Buy Token
          </button>
          <div className="flex justify-center items-center gap-x-4 text-center border-t-2 mt-4 pt-2">
            <p className="text-gray-600">
              Your Tokens:{' '}
              <span className="font-bold text-primary">{tokens} Tokens</span>
            </p>
            <p>|</p>
            <div className="flex items-center gap-x-1">
              <p className="text-gray-600">
                Your NEAR Balance:{' '}
                <span className="font-bold text-primary">
                  {prettyTruncate(balance)}
                </span>
              </p>
              <div className="w-4 h-4">
                <IconNear />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Link className="self-start flex flex-col items-center" href="/">
        <Image
          src="/logos/tizzle-logo-white.png"
          alt="Tizzle Logo"
          width={120}
          height={40}
          className="w-auto h-auto"
        />
      </Link>
      <div className="flex absolute bottom-4 left-10">
        <div className="grid grid-cols-4 gap-x-4 gap-y-2">
          <button
            className="col-span-1 w-32 border-2 border-primary px-2 text-primary rounded-md hover:bg-primary hover:text-white transition duration-300"
            onClick={() => setProfileModalOpen(true)}
          >
            Profile
          </button>
          <p className="col-span-3 text-white">
            Account ID: <span className="text-primary">{accountId}</span>
          </p>
          <button
            className="w-32 border-2 border-primary px-2 text-primary rounded-md hover:bg-primary hover:text-white transition duration-300"
            onClick={() => setTokenModalOpen(true)}
          >
            Buy Token
          </button>{' '}
          <p className="text-white">
            Tokens: <span className="text-primary">{tokens}</span>
          </p>
        </div>
      </div>
      <div className="flex">
        <Image
          src={`/assets/agents/${agentPath}/${agentPath}-half.png`}
          className={`w-16 h-16 rounded-full object-cover absolute bottom-4 right-10 ${agentPath == 'cortez' ? 'bg-cortez-blue' : agentPath == 'akira' ? 'bg-akira-gold' : 'bg-bale-taro'}`}
          width={80}
          height={80}
          alt="Agent Avatar"
        />
        {loading && (
          <div className="loader-outside absolute bottom-9 right-32">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      <ChatInterface
        agentPath={agentPath}
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
          ref={inputRef}
          className="w-full placeholder:text-gray-800 placeholder:italic px-4 py-3 rounded-full bg-white backdrop-blur-md"
          placeholder="Type a message..."
          onChange={handleInputChange}
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
