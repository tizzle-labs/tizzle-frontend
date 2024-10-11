'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaArrowDown, FaStar } from 'react-icons/fa';
import { WaveBale } from '@tizzle-fe/components/common/svg';
import Detail from './Detail';

const HeroBale = () => {
  const objectRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const demoArray = Array(20).fill('TIZZLE - X - NEAR');

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
    <div className="bg-[#DEE2FC] flex flex-col items-center justify-center text-center">
      <WaveBale fill={'#525B88'} />
      <div className="flex flex-col items-center justify-center py-12 -mt-64">
        <div className="relative flex mb-6">
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
              <div className="mt-8 ml-4">
                <Image
                  src="/assets/agents/bale/bale-item.png"
                  alt="Cortez Item"
                  width={200}
                  height={200}
                  className="object-contain animate-slow-bounce w-[150px] h-[150px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative -mb-12">
          <Image
            ref={imageRef}
            src="/assets/agents/bale/bale-half.png"
            alt="Cortez Half"
            width={380}
            height={380}
            className="object-contain w-auto h-auto"
          />
        </div>
      </div>

      <div className="w-full overflow-hidden whitespace-nowrap bg-bale-taro pt-4 z-40">
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
          className="relative bg-bale-taro flex justify-center items-center text-white text-4xl"
        >
          <Detail />
          <div className="absolute bottom-0 rotate-180 w-full">
            <WaveBale fill={'#DEE2FC'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBale;
