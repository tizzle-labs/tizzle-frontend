import AgentSelector from '@tizzle-fe/components/common/selector/AgentSelector';
import { AKIRA_AGENT } from '@tizzle-fe/constants/agent';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FaCompass, FaDna } from 'react-icons/fa';

const AkiraModel = dynamic(() => import('../Model'), {
  ssr: false,
});

const Detail = () => {
  return (
    <div className="text-center my-20 z-30">
      <h1 className="text-6xl font-bold mb-20 lightning-underline-akira">
        AKIRA
      </h1>
      <div className="flex justify-between items-start px-40 whitespace-break-spaces">
        <div className="w-1/2">
          <div className="w-96 h-96 mb-4">
            <AkiraModel agentName={AKIRA_AGENT} />
          </div>
          <div className="mt-12">
            <h3 className="text-sm text-left mb-4">SELECT AGENT</h3>
            <AgentSelector />
          </div>
        </div>
        <div className="max-w-3xl text-left pl-[300px]">
          <h2 className="text-3xl mb-2">Akira</h2>
          <p className="mb-2 text-lg text-primary">Nature&apos;s Guardian</p>
          <p className="mb-4 text-sm overflow-hidden">
            Akira is a mystical kunoichi and spirit warrior from Mount Fuji.
            With her swift agility and mastery of nature, she protects ancient
            secrets while striking fear into her enemies. Her presence embodies
            the serene beauty and fierce spirit of her homeland.
          </p>
          <div className="flex justify-start mb-8">
            <span className="text-xs bg-gray-500 px-2 py-1 rounded-full mr-2">
              Spirit
            </span>
            <span className="text-xs bg-gray-500 px-2 py-1 rounded-full">
              Emphatic
            </span>
          </div>
          <div className="mb-8 text-sm">
            <div className="flex gap-7 border-b-2 border-gray-500 py-2">
              <div className="flex gap-1 items-center">
                <FaCompass className="text-gray-400" />
                <p className="font-semibold text-gray-400">ORIGIN:</p>{' '}
              </div>
              <p>Mount Fuji</p>
            </div>
            <div className="flex gap-10 border-b-2 border-gray-500 py-2">
              <div className="flex gap-1 items-center">
                <FaDna className="text-gray-400" />
                <p className="font-semibold text-gray-400">TYPE:</p>{' '}
              </div>
              <p>
                Kunoichi{' '}
                <span className="text-xs font-light">(female shinobi)</span>
              </p>
            </div>
          </div>
          <Link href="/agent/akira">
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
