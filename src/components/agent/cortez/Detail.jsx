import AgentSelector from '@tizzle-fe/components/common/selector/AgentSelector';
import { CORTEZ_AGENT } from '@tizzle-fe/components/constants/agent';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FaCompass, FaDna } from 'react-icons/fa';

const CortezModel = dynamic(() => import('../Model'), {
  ssr: false,
});

const Detail = () => {
  return (
    <div className="text-center my-20">
      <h1 className="text-6xl font-bold mb-20 lightning-underline">CORTEZ</h1>
      <div className="flex justify-between items-start px-40 whitespace-break-spaces">
        <div className="w-1/2">
          <div className="w-96 h-96 mb-4 flex items-center justify-center">
            <CortezModel agentName={CORTEZ_AGENT} />
          </div>
          <div className="mt-12">
            <h3 className="text-sm text-left mb-4">SELECT AGENT</h3>
            <AgentSelector />
          </div>
        </div>
        <div className="max-w-3xl text-left pl-[300px]">
          <h2 className="text-3xl mb-2">Cortez</h2>
          <p className="mb-2 text-lg text-primary">Data Analyzer</p>
          <p className="mb-4 text-sm overflow-hidden">
            Cortez is a calm and observant Cyborg AI from Tizzle laboratory. As
            a cyborg, he excels in collecting and analyzing information. His
            presence is marked by a blend of human-like intuition and
            machine-like precision, making him an invaluable asset in critical
            missions.
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
          <Link href={'/agent/cortez'}>
            <button className="bg-white text-black hover:bg-primary px-8 py-2 rounded text-lg transition duration-300 ease-in-out">
              MINT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;
