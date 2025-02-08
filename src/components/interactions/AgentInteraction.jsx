'use client';

import { useEffect, useRef, useState } from 'react';
import { useSpeech } from '../../hooks/useSpeech';
import ChatInterface from './ChatInterface';
import Link from 'next/link';
import Image from 'next/image';
import { useWallet } from '@tizzle-fe/hooks/walletContext';
import Modal from '../common/modal/Modal';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';
import { IconNear } from '../common/svg';
import { prettyTruncate, truncateAddress } from '@tizzle-fe/utils/common';
import { buyToken } from '@tizzle-fe/services/nearService';
import Confetti from 'react-confetti';
import { useUser } from '@tizzle-fe/hooks/useUser';
import { useCurrentAccount } from '@mysten/dapp-kit';

export const AgentInteraction = ({ agentPath, hidden, transactionHashes }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isTokenModalOpen, setTokenModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [purchasedTokens, setPurchasedTokens] = useState(0);
  const [transactionHash, setTransactionHash] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef();
  const { tts, loading, messages: agentMessages } = useSpeech();
  const { updateToken, createTokenHistory } = useUser();

  const { selector, balance, tokens, setTokens: updateTokens } = useWallet();

  const account = useCurrentAccount();
  const accountId = account?.address || '';
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

  useEffect(() => {
    if (transactionHashes) {
      setTransactionHash(transactionHashes);
      setSuccessModalOpen(true);
      setShowConfetti(true);

      const purchasedPackage = JSON.parse(
        localStorage.getItem('purchasedPackage'),
      );

      if (purchasedPackage) {
        setPurchasedTokens(purchasedPackage.tokens);
        setPrice(purchasedPackage.price);
        localStorage.removeItem('purchasedPackage');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionHashes, tokens, updateTokens]);

  useEffect(() => {
    if (transactionHash != '') {
      handleTokenHistory(accountId, transactionHash, price, purchasedTokens);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionHash]);

  const handleTokenHistory = async (accountId, txHash, price, tokens) => {
    await updateToken(accountId, tokens);
    await createTokenHistory(accountId, txHash, price, tokens);

    updateTokens(tokens);
  };

  const handleBuyToken = async () => {
    if (!selectedPackage) return;

    const selectedTokenPackage = tokenPackages.find(
      pkg => pkg.id === parseInt(selectedPackage),
    );
    if (!selectedTokenPackage) return;

    if (parseFloat(balance) < selectedTokenPackage.price) {
      setErrorMessage(`Insufficient NEAR balance.`);
      return;
    }

    try {
      setErrorMessage('');

      localStorage.setItem(
        'purchasedPackage',
        JSON.stringify(selectedTokenPackage),
      );

      // on-chain tx
      await buyToken(
        selectedTokenPackage.price,
        selector,
        accountId,
        'tizzle.testnet',
      );
      setTokenModalOpen(false);
    } catch (error) {
      console.error('Error buying token:', error);
      localStorage.removeItem('purchasedPackage');
      setErrorMessage(
        'An error occurred while processing your purchase. Please try again.',
      );
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    setShowConfetti(false);
    const newUrl = window.location.pathname;
    window.history.pushState({}, '', newUrl);
  };

  const handlePackageChange = event => {
    setSelectedPackage(event.target.value);
  };

  const sendMessage = textSuggest => {
    const text = textSuggest ? textSuggest : inputRef.current.value;
    if (!loading && text) {
      setMessages(prevMessage => [...prevMessage, { text, isUser: true }]);

      tts(text, accountId);
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
      {showConfetti && <Confetti />}

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
          <p className="text-lg">{truncateAddress(accountId)}</p>
          <p className="text-lg">{tokens} Tokens</p>
        </div>
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        title="Purchase Successful!"
        onExit={handleSuccessModalClose}
      >
        <div className="relative p-4 text-center">
          <p className="text-lg mb-4">
            You have successfully purchased {purchasedTokens} tokens!
          </p>
          <a
            href={`https://explorer.testnet.near.org/transactions/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View transaction on NEAR Explorer
          </a>
        </div>
      </Modal>

      <Modal
        isOpen={isTokenModalOpen}
        onClose={() => {
          setTokenModalOpen(false);
          setErrorMessage('');
          setSelectedPackage('');
        }}
        title="Buy Token"
        onExit={() => {
          setTokenModalOpen(false);
          setErrorMessage('');
          setSelectedPackage('');
        }}
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
            className={`w-full text-white rounded-md py-2 hover:bg-opacity-80 transition duration-300 ${
              !selectedPackage
                ? 'cursor-not-allowed bg-gray-300'
                : 'cursor-pointer bg-primary'
            }`}
            onClick={handleBuyToken}
            disabled={!selectedPackage}
          >
            Buy Token
          </button>
          <div className="h-8 mb-4">
            {errorMessage && (
              <p className="text-sm text-red-500 text-center">{errorMessage}</p>
            )}
          </div>
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
      <div className="fixed md:absolute bottom-24 md:bottom-4 left-0 md:left-10 w-full md:w-auto px-4 md:px-0">
        <div className="flex flex-col md:grid md:grid-cols-4 md:gap-x-4 md:gap-y-2">
          {/* mobile: text above buttons */}
          <div className="flex flex-col justify-between mb-2 md:hidden">
            <p className="text-white text-sm">
              Account ID:{' '}
              <span className="text-primary">{truncateAddress(accountId)}</span>
            </p>
            {/* <p className="text-white text-sm">
              Tokens: <span className="text-primary">{tokens}</span>
            </p> */}
          </div>

          {/* mobile: button */}
          <div className="flex justify-between md:contents">
            <button
              className="w-[48%] md:w-32 md:col-span-1 border-2 border-primary px-2 py-1 text-primary rounded-md hover:bg-primary hover:text-white transition duration-300 text-sm"
              onClick={() => setProfileModalOpen(true)}
            >
              Profile
            </button>

            {/* desktop: account ID */}
            <p className="hidden md:block md:col-span-3 text-white">
              Account ID:{' '}
              <span className="text-primary">{truncateAddress(accountId)}</span>
            </p>

            {/* <button
              className="w-[48%] md:w-32 border-2 border-primary px-2 py-1 text-primary rounded-md hover:bg-primary hover:text-white transition duration-300 text-sm"
              onClick={() => setTokenModalOpen(true)}
            >
              Buy Token
            </button> */}

            {/* desktop: tokens */}
            {/* <p className="hidden md:block text-white">
              Tokens: <span className="text-primary">{tokens}</span>
            </p> */}
          </div>
        </div>
      </div>
      <div className="flex">
        <Image
          src={`/assets/agents/${agentPath}/${agentPath}-half.png`}
          className={`w-12 h-12 md:w-16 md:h-16 rounded-full object-cover fixed md:absolute bottom-36 md:bottom-4 right-4 md:right-10 ${
            agentPath == 'cortez'
              ? 'bg-cortez-blue'
              : agentPath == 'akira'
                ? 'bg-akira-gold'
                : 'bg-bale-taro'
          }`}
          width={80}
          height={80}
          alt="Agent Avatar"
        />
        {loading && (
          <div className="loader-outside fixed md:absolute bottom-40 md:bottom-9 right-20 md:right-32">
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
        {/* <button
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
        </button> */}

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
