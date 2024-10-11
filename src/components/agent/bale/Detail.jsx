import AgentSelector from '@tizzle-fe/components/common/selector/AgentSelector';
import { BALE_AGENT } from '@tizzle-fe/components/constants/agent';
import dynamic from 'next/dynamic';
import { FaCompass, FaDna } from 'react-icons/fa';

const BaleModel = dynamic(() => import('../Model'), {
  ssr: false,
});

const Detail = () => {
  return (
    <div className="text-center my-20 z-30">
      <h1 className="text-6xl text-white font-bold mb-20 lightning-underline-bale">
        BALE
      </h1>
      <div className="flex justify-between items-start px-40 whitespace-break-spaces">
        <div className="w-1/2">
          <div className="w-96 h-96 mb-4">
            <BaleModel agentName={BALE_AGENT} />
          </div>
          <div className="mt-12">
            <h3 className="text-sm text-left mb-4 text-white">SELECT AGENT</h3>
            <AgentSelector />
          </div>
        </div>
        <div className="max-w-3xl text-left pl-[300px]">
          <h2 className="text-3xl mb-2 text-white">Bale</h2>
          <p className="mb-2 text-lg text-primary">Sleuth Jester</p>
          <p className="mb-4 text-sm overflow-hidden text-white">
            Bale is an enigmatic and quick-witted agent known for his sharp
            humor and penchant for riddles. Despite his playful demeanor, he is
            an exceptionally skilled investigator whose origins remain shrouded
            in mystery.
          </p>
          <div className="flex justify-start mb-8">
            <span className="text-xs bg-gray-500 px-2 py-1 rounded-full mr-2">
              Humorist
            </span>
            <span className="text-xs bg-gray-500 px-2 py-1 rounded-full">
              Confident
            </span>
          </div>
          <div className="mb-8 text-sm">
            <div className="flex gap-7 border-b-2 border-gray-500 py-2">
              <div className="flex gap-1 items-center">
                <FaCompass className="text-gray-400" />
                <p className="font-semibold text-gray-400">ORIGIN:</p>{' '}
              </div>
              <p className="text-white">Unknown</p>
            </div>
            <div className="flex gap-10 border-b-2 border-gray-500 py-2">
              <div className="flex gap-1 items-center">
                <FaDna className="text-gray-400" />
                <p className="font-semibold text-gray-400">TYPE:</p>{' '}
              </div>
              <p className="text-white">Human</p>
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
