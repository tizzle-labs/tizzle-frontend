import AgentSelector from '@tizzle-fe/components/common/selector/AgentSelector';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaCompass, FaDna } from 'react-icons/fa';

const CortezModel = dynamic(() => import('./Model'), {
  ssr: false,
});

const Detail = () => {
  const [modelVisible, setModelVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModelVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center my-20">
      <h1 className="text-6xl font-bold mb-20 lightning-underline">CORTEZ</h1>
      <div className="flex justify-between items-start px-40 whitespace-break-spaces">
        <div className="w-1/2">
          <div className="w-96 h-96 mb-4 flex items-center justify-center">
            {modelVisible ? <CortezModel /> : <div></div>}
          </div>
          <div className="mt-12">
            <h3 className="text-sm text-left mb-4">SELECT AGENT</h3>
            <AgentSelector />
          </div>
        </div>
        <div className="w-1/3 text-left">
          <h2 className="text-3xl mb-2">Cortez Agent</h2>
          <p className="mb-2 text-lg text-primary">Cyborg AI</p>
          <p className="mb-4 text-sm">
            Cortez is a calm and observant Cyborg AI from Tizzle laboratory. As
            a cyborg, he excels in collecting and analyzing information.
          </p>
          <div className="flex justify-start mb-8">
            <span className="text-xs bg-gray-500 px-2 py-1 rounded-full mr-2">
              Calm
            </span>
            <span className="text-xs bg-gray-500 px-2 py-1 rounded-full">
              Observer
            </span>
          </div>
          <div className="mb-8 text-sm">
            <div className="flex gap-7 border-b-2 border-gray-500 py-2">
              <div className="flex gap-1 items-center">
                <FaCompass className="text-gray-400" />
                <p className="font-semibold text-gray-400">ORIGIN:</p>{' '}
              </div>
              <p>Tizzle Lab</p>
            </div>
            <div className="flex gap-10 border-b-2 border-gray-500 py-2">
              <div className="flex gap-1 items-center">
                <FaDna className="text-gray-400" />
                <p className="font-semibold text-gray-400">TYPE:</p>{' '}
              </div>
              <p>Cyborg</p>
            </div>
          </div>
          <button className="bg-white text-black hover:bg-primary px-8 py-2 rounded text-lg transition duration-300 ease-in-out">
            MINT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;