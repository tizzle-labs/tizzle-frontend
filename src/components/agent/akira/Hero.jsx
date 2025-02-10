'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaArrowDown, FaStar } from 'react-icons/fa';
import { WaveAkira } from '@tizzle-fe/components/common/svg';
import Detail from './Detail';

const HeroAkira = () => {
  const objectRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const demoArray = Array(20).fill('TIZZLE - X - SUI');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const object = objectRef.current;
      const title = titleRef.current;
      const image = imageRef.current;

      if (object && title) {
        const titleTop = title.getBoundingClientRect().top + window.scrollY;
        const stopPosition = titleTop - window.innerHeight / 3;

        if (image) {
          const parallaxSpeed = 0.3;
          image.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
        }

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

  const scrollToTizzle = () => {
    titleRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#1a150c] flex flex-col items-center justify-center text-center">
      <WaveAkira />
      <div className="flex flex-col items-center justify-center py-12 md:-mt-64 -mt-0">
        <div className="relative flex flex-col md:flex-row mb-6 px-4 md:px-0">
          <div>
            <h1 className="text-4xl md:text-8xl font-bold text-white mb-4">
              MEET <span className="text-primary">AKIRA</span>
            </h1>
            <p className="text-lg md:text-xl text-white md:pl-52 max-w-3xl text-center md:text-left mb-8 px-4 md:px-0">
              Transform your NFT PFP into a 3D avatar. Now you can interact, ask
              questions, and explore more with personalized AI agent!
            </p>
            <div className="flex justify-center md:justify-end w-full">
              <button
                className="flex items-center text-primary py-2 px-4 rounded-lg border border-primary hover:bg-primary hover:text-white transition"
                onClick={scrollToTizzle}
              >
                TRY OUR AGENT
                <FaArrowDown className="ml-2" />
              </button>
            </div>
          </div>
          <div className="hidden absolute top-0 md:top-20 left-1/2 md:left-auto transform -translate-x-1/2 md:translate-x-0 md:flex items-center justify-center mt-4 md:mt-0">
            <div
              ref={objectRef}
              className="rounded-full flex items-center justify-center transition"
            >
              <div className="mt-8 ml-4">
                <Image
                  src="/assets/agents/akira/akira-item.png"
                  alt="Akira Item"
                  width={200}
                  height={200}
                  className="object-contain animate-slow-bounce w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative -mb-20 md:-mb-24 px-4 md:px-0">
          <Image
            ref={imageRef}
            src="/assets/agents/akira/akira-half.png"
            alt="Akira Half"
            width={380}
            height={380}
            className="object-contain w-[280px] h-[280px] md:w-[380px] md:h-[380px]"
          />
        </div>
      </div>

      <div className="w-full overflow-hidden whitespace-nowrap bg-[#1a150c] pt-4 z-40">
        <div className="marquee-container overflow-hidden">
          <div className="marquee-content flex space-x-4 md:space-x-8 text-sm md:text-base">
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
          className="relative bg-[#1a150c] flex justify-center items-center text-white text-4xl"
        >
          <Detail />
          <div className="absolute bottom-0 rotate-180 w-full">
            <WaveAkira />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAkira;
