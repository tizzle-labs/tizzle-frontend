'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaWallet } from 'react-icons/fa';

const Navbar = () => {
  const handleConnectWallet = () => {
    // TODO: connect wallet
    console.log('Connecting wallet...');
  };

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
        <nav className="space-x-4">
          <a
            href="#"
            className="text-sm text-white font-bold hover:text-primary"
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

export default Navbar;
