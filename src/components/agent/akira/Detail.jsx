import { useCurrentAccount } from '@mysten/dapp-kit';
import AgentSelector from '@tizzle-fe/components/common/selector/AgentSelector';
import { AKIRA_AGENT } from '@tizzle-fe/constants/agent';
import { useSuiProvider } from '@tizzle-fe/hooks/suiContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FaCompass, FaDna } from 'react-icons/fa';

const AkiraModel = dynamic(() => import('../Model'), {
  ssr: false,
});

const Detail = () => {
  const router = useRouter();
  const { setIsModalOpen } = useSuiProvider();
  const currentAccount = useCurrentAccount();

  const handleClickButton = () => {
    if (!currentAccount) {
      setIsModalOpen(true);
      return;
    }
    router.push('/agent/chat/akira');
  };

  return (
    <div className="text-center my-10 md:my-20 z-30 px-4 md:px-0">
      <h1 className="text-4xl md:text-6xl font-bold mb-10 md:mb-20 lightning-underline-akira">
        AKIRA
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start md:px-40 whitespace-break-spaces">
        <div className="w-full md:w-1/2">
          <div className="w-full md:w-96 h-72 md:h-96 mb-4">
            <AkiraModel agentName={AKIRA_AGENT} />
          </div>
          <div className="mt-8 md:mt-12">
            <h3 className="text-sm text-center md:text-left mb-4 text-white">
              SELECT AGENT
            </h3>
            <AgentSelector />
          </div>
        </div>
        <div className="max-w-3xl text-center md:text-left mt-8 md:mt-0 md:pl-[300px]">
          <h2 className="text-2xl md:text-3xl mb-2 text-white">Akira</h2>
          <p className="mb-2 text-lg text-primary">Nature&apos;s Guardian</p>
          <p className="mb-4 text-sm overflow-hidden text-white px-4 md:px-0">
            Akira is a mystical kunoichi and spirit warrior from Mount Fuji.
            With her swift agility and mastery of nature, she protects ancient
            secrets while striking fear into her enemies. Her presence embodies
            the serene beauty and fierce spirit of her homeland.
          </p>
          <div className="flex justify-center md:justify-start mb-8">
            <span className="text-xs bg-gray-500 px-2 py-1 rounded-full mr-2">
              Spirit
            </span>
            <span className="text-xs bg-gray-500 px-2 py-1 rounded-full">
              Emphatic
            </span>
          </div>
          <div className="mb-8 text-sm px-4 md:px-0">
            <div className="flex flex-col md:flex-row md:gap-7 border-b-2 border-gray-500 py-2">
              <div className="flex gap-1 items-center justify-center md:justify-start">
                <FaCompass className="text-gray-400" />
                <p className="font-semibold text-gray-400">ORIGIN:</p>
              </div>
              <p className="text-white">Mount Fuji</p>
            </div>
            <div className="flex flex-col md:flex-row md:gap-10 border-b-2 border-gray-500 py-2">
              <div className="flex gap-1 items-center justify-center md:justify-start">
                <FaDna className="text-gray-400" />
                <p className="font-semibold text-gray-400">TYPE:</p>
              </div>
              <p className="text-white">
                Kunoichi{' '}
                <span className="text-xs font-light">(female shinobi)</span>
              </p>
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
