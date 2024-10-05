'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaWallet } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleConnectWallet = () => {
    // TODO: connect wallet
    console.log('Connecting wallet...');
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full transition duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Image
            src="/logos/tizzle-logo-white.png"
            alt="Tizzle Logo"
            width={120}
            height={40}
          />
        </div>
        <nav className="space-x-4">
          <a
            href="#"
            className="text-sm text-gray-400 font-bold hover:text-white"
          >
            WHITEPAPER
          </a>
        </nav>
        <button className="flex items-center space-x-2 bg-white hover:bg-primary text-black px-4 py-2 rounded transition duration-300 ease-in-out">
          <FaWallet className="text-lg" />
          <span>Connect Wallet</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
