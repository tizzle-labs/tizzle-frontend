'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaArrowDown, FaStar } from 'react-icons/fa';
import { Wave } from '@tizzle-fe/components/common/svg';

const HeroCortez = () => {
  const objectRef = useRef(null);
  const titleRef = useRef(null);
  const demoArray = Array(20).fill('TIZZLE - X - NEAR');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const object = objectRef.current;
      const tizzleElement = titleRef.current;

      if (object && tizzleElement) {
        const stopPosition = tizzleElement.offsetTop - 200;

        if (scrollPosition < stopPosition) {
          object.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        } else {
          object.style.transform = `translateY(${stopPosition * 0.5}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTizzle = () => {
    titleRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const object = objectRef.current;
      const title = titleRef.current;

      if (object && title) {
        const titleTop = title.getBoundingClientRect().top + window.scrollY;
        const stopPosition = titleTop - window.innerHeight / 2;

        if (scrollPosition < stopPosition) {
          object.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        } else {
          object.style.transform = `translateY(${stopPosition * 2}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#3046C7] flex flex-col items-center justify-center text-center">
      <Wave />
      <div className="flex flex-col items-center justify-center py-12 -mt-64">
        <div className="relative flex">
          <div>
            <h1 className="text-8xl font-bold text-white mb-4">
              MEET <span className="text-primary">OUR AGENTS</span>
            </h1>
            <p className="text-xl text-white pl-52 max-w-3xl text-left mb-8">
              Transform your NFT PFP into a 3D avatar. Now you can interact, ask
              questions, and explore more with personalized AI agent!
            </p>
            <div className="flex justify-end w-full">
              <button
                className="flex items-center text-primary py-2 px-4 rounded-lg border border-primary hover:bg-primary hover:text-white transition"
                onClick={scrollToTizzle}
              >
                TRY OUR AGENT
                <FaArrowDown className="ml-2" />
              </button>
            </div>
          </div>
          <div className="absolute top-20 flex items-center justify-center">
            <div
              ref={objectRef}
              className="rounded-full flex items-center justify-center transition"
            >
              <Image
                src="/assets/agents/cortez/cortez-item.png"
                alt="Cortez Item"
                width={200}
                height={200}
                className="object-contain animate-slow-bounce"
              />
            </div>
          </div>
        </div>

        <div className="relative -mb-12">
          <Image
            src="/assets/agents/cortez/cortez-half.png"
            alt="Cortez Half"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>

      <div className="w-full overflow-hidden whitespace-nowrap bg-[#203088] py-4">
        <div className="marquee-container overflow-hidden">
          <div className="marquee-content flex space-x-8">
            {demoArray.map((text, index) => (
              <div key={index} className="flex items-center justify-between">
                <FaStar className="text-primary" />
                <span key={index} className="text-white font-bold pl-8">
                  {text}
                </span>
              </div>
            ))}
            {demoArray.map((text, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex items-center justify-between"
              >
                <FaStar className="text-primary" />
                <span key={index} className="text-white font-bold pl-8">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={titleRef}
          className="bg-[#203088] h-[100vh] flex justify-center items-center text-white text-4xl"
        >
          {/* TODO: cortez detail */}
          <h1>Cortez Agent</h1>
        </div>
      </div>
    </div>
  );
};

export default HeroCortez;
