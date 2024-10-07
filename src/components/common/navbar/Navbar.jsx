'use client';

import useStore from '@tizzle-fe/stores/userStore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaCaretDown, FaWallet } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const setSelectedAgent = useStore(state => state.setSelectedAgent);

  const handleConnectWallet = () => {
    // TODO: connect wallet
    console.log('Connecting wallet...');
  };

  const handleOnclickLi = agent => {
    setSelectedAgent(agent);
    setDropdownOpen(false);
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
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
              className="w-auto h-auto"
            />
          </div>
        </Link>
        <nav className="space-x-4 relative">
          <a
            href="#"
            className="text-sm text-white font-bold hover:text-primary"
          >
            WHITEPAPER
          </a>
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-sm text-white font-bold hover:text-primary focus:outline-none"
            >
              AGENTS{' '}
              <FaCaretDown
                className={`ml-1 transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {dropdownOpen && (
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
        <button className="flex items-center space-x-2 bg-white hover:bg-primary text-black px-4 py-2 rounded transition duration-300 ease-in-out">
          <FaWallet className="text-lg" />
          <span>Connect Wallet</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
