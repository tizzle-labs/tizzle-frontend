import Image from 'next/image';
import useStore from '@tizzle-fe/stores/userStore';

const AgentSelector = () => {
  const selectedAgent = useStore(state => state.selectedAgent);
  const setSelectedAgent = useStore(state => state.setSelectedAgent);

  const agents = [
    {
      name: 'Cortez',
      img: '/assets/agents/cortez/cortez-half.png',
      bgClass: 'bg-white',
      value: 'cortez',
    },
    {
      name: 'Akira',
      img: '/assets/agents/akira/akira-half.png',
      bgClass: 'bg-white',
      value: 'akira',
    },
    {
      name: 'Bale',
      img: '/assets/agents/bale/bale-half.png',
      bgClass: 'bg-white',
      value: 'bale',
    },
  ];

  return (
    <div className="flex gap-x-4">
      {agents.map(agent => (
        <div
          key={agent.value}
          className={`${selectedAgent === agent.value ? 'bg-green-400' : agent.bgClass} cursor-pointer rounded-lg transition duration-300`}
          onClick={() => setSelectedAgent(agent.value)}
        >
          <Image
            src={agent.img}
            alt={`${agent.name} Half`}
            width={200}
            height={200}
            className="w-20 h-20 mr-2"
          />
        </div>
      ))}
    </div>
  );
};

export default AgentSelector;
