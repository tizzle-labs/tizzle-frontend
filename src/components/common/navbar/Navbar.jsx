'use client';

import { useWallet } from '@tizzle-fe/hooks/walletContext';
import useStore from '@tizzle-fe/stores/userStore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaCaretDown, FaWallet, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [agentDropdownOpen, setAgentDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const setSelectedAgent = useStore(state => state.setSelectedAgent);
  const { modal, accountId, signOut, loading, tokens } = useWallet();
  const agentDropdownRef = useRef(null);

  const handleOnclickLi = agent => {
    setSelectedAgent(agent);
    setAgentDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleClickOutside = event => {
    if (
      agentDropdownRef.current &&
      !agentDropdownRef.current.contains(event.target)
    ) {
      setAgentDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full transition duration-300 bg-transparent z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" passHref>
          <div className="flex items-center">
            <Image
              src="/logos/tizzle-logo-white.png"
              alt="Tizzle Logo"
              width={120}
              height={40}
              className="w-24 md:w-auto h-auto"
            />
          </div>
        </Link>

        {/* mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FaBars size={24} />
        </button>

        {/* desktop nav */}
        <nav className="hidden md:flex space-x-4 relative">
          <a
            href="#"
            className="text-sm text-white font-bold hover:text-primary"
          >
            WHITEPAPER
          </a>
          <div className="relative inline-block" ref={agentDropdownRef}>
            <button
              onClick={() => setAgentDropdownOpen(!agentDropdownOpen)}
              className="flex items-center text-sm text-white font-bold hover:text-primary focus:outline-none"
            >
              AGENTS{' '}
              <FaCaretDown
                className={`ml-1 transform transition-transform ${agentDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {agentDropdownOpen && (
              <ul className="absolute top-full left-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-10">
                <li>
                  <div
                    className="block px-4 py-2 hover:bg-green-400/80 rounded-t-lg cursor-pointer"
                    onClick={() => handleOnclickLi('cortez')}
                  >
                    Cortez
                  </div>
                </li>
                <li>
                  <div
                    className="block px-4 py-2 hover:bg-green-400/80 cursor-pointer"
                    onClick={() => handleOnclickLi('akira')}
                  >
                    Akira
                  </div>
                </li>
                <li>
                  <div
                    className="block px-4 py-2 hover:bg-green-400/80 rounded-b-lg cursor-pointer"
                    onClick={() => handleOnclickLi('bale')}
                  >
                    Bale
                  </div>
                </li>
              </ul>
            )}
          </div>
        </nav>

        {/* desktop */}
        <div className="hidden md:block">
          {!accountId ? (
            <button
              className={`flex items-center space-x-2 bg-white hover:bg-primary text-black px-4 py-2 rounded transition duration-300 ease-in-out ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => modal.show()}
              disabled={loading}
            >
              <FaWallet className="text-lg" />
              <span>Connect Wallet</span>
            </button>
          ) : (
            <div className="flex gap-x-8">
              <p>
                Welcome, <span className="text-primary">{accountId}</span>
              </p>
              <p>
                Tokens: <span className="text-primary">{tokens}</span>
              </p>
              <button
                className="border-2 border-red-500 px-2 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
                onClick={signOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black/90 md:hidden">
            <div className="flex flex-col p-4">
              <a href="#" className="text-white py-2">
                WHITEPAPER
              </a>

              {/* mobile wallet section */}
              <div className="pt-4 border-t border-gray-700 mt-4">
                {!accountId ? (
                  <button
                    className={`flex items-center space-x-2 bg-white hover:bg-primary text-black px-4 py-2 rounded transition duration-300 ease-in-out w-full ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => modal.show()}
                    disabled={loading}
                  >
                    <FaWallet className="text-lg" />
                    <span>Connect Wallet</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-y-4 text-white">
                    <p>
                      Welcome, <span className="text-primary">{accountId}</span>
                    </p>
                    <p>
                      Tokens: <span className="text-primary">{tokens}</span>
                    </p>
                    <button
                      className="border-2 border-red-500 px-2 py-1 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
                      onClick={signOut}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
