'use client';

import { useParams } from 'next/navigation';
import { HeroAkira, HeroBale, HeroCortez } from '../agent';
import useStore from '@tizzle-fe/stores/userStore';

function AgentOverview() {
  const selectedAgent = useStore(state => state.selectedAgent);
  const params = useParams();

  const renderAgent = () => {
    switch (selectedAgent) {
      case 'cortez':
        return <HeroCortez />;
      case 'akira':
        return <HeroAkira />;
      default:
        return <HeroBale />;
    }
  };

  return <div>{renderAgent()}</div>;
}

export default AgentOverview;
