import AgentSelector from '@tizzle-fe/components/common/selector/AgentSelector';
import { BALE_AGENT } from '@tizzle-fe/constants/agent';
import { useWallet } from '@tizzle-fe/hooks/walletContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FaCompass, FaDna } from 'react-icons/fa';

const BaleModel = dynamic(() => import('../Model'), {
  ssr: false,
});

const Detail = () => {
  const router = useRouter();
  const { accountId, modal } = useWallet();

  const handleClickButton = () => {
    if (!accountId) {
      modal.show();
      return;
    }
    router.push('/agent/bale');
  };

  return (
    <div className="text-center my-10 md:my-20 z-30 px-4 md:px-0">
      <h1 className="text-4xl md:text-6xl text-white font-bold mb-10 md:mb-20 lightning-underline-bale">
        BALE
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start md:px-40 whitespace-break-spaces">
        <div className="w-full md:w-1/2">
          <div className="w-full md:w-96 h-72 md:h-96 mb-4">
            <BaleModel agentName={BALE_AGENT} />
          </div>
          <div className="mt-8 md:mt-12">
            <h3 className="text-sm text-center md:text-left mb-4 text-white">
              SELECT AGENT
            </h3>
            <AgentSelector />
          </div>
        </div>
        <div className="max-w-3xl text-center md:text-left mt-8 md:mt-0 md:pl-[300px]">
          <h2 className="text-2xl md:text-3xl mb-2 text-white">Bale</h2>
          <p className="mb-2 text-lg text-primary">Sleuth Jester</p>
          <p className="mb-4 text-sm overflow-hidden text-white px-4 md:px-0">
            Bale is an enigmatic and quick-witted agent known for his sharp
            humor and penchant for riddles. Despite his playful demeanor, he is
            an exceptionally skilled investigator whose origins remain shrouded
            in mystery.
          </p>
          <div className="flex justify-center md:justify-start mb-8">
            <span className="text-xs bg-gray-500 px-2 py-1 rounded-full mr-2">
              Humorist
            </span>
            <span className="text-xs bg-gray-500 px-2 py-1 rounded-full">
              Confident
            </span>
          </div>
          <div className="mb-8 text-sm px-4 md:px-0">
            <div className="flex flex-col md:flex-row md:gap-7 border-b-2 border-gray-500 py-2">
              <div className="flex gap-1 items-center justify-center md:justify-start">
                <FaCompass className="text-gray-400" />
                <p className="font-semibold text-gray-400">ORIGIN:</p>
              </div>
              <p className="text-white">Unknown</p>
            </div>
            <div className="flex flex-col md:flex-row md:gap-10 border-b-2 border-gray-500 py-2">
              <div className="flex gap-1 items-center justify-center md:justify-start">
                <FaDna className="text-gray-400" />
                <p className="font-semibold text-gray-400">TYPE:</p>
              </div>
              <p className="text-white">Human</p>
            </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <button
              className="bg-white text-black hover:bg-primary px-8 py-2 rounded text-lg transition duration-300 ease-in-out"
              onClick={handleClickButton}
            >
              Start Conversation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
