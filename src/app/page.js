'use client';

import useStore from '@tizzle-fe/stores/userStore';
import Cortez from '@tizzle-fe/components/agent/cortez/Cortez';
import Akira from '@tizzle-fe/components/agent/akira/Akira';
import Bale from '@tizzle-fe/components/agent/bale/Bale';

export default function Home() {
  const selectedAgent = useStore(state => state.selectedAgent);

  const renderAgent = () => {
    switch (selectedAgent) {
      case 'cortez':
        return <Cortez />;
      case 'akira':
        return <Akira />;
      default:
        return <Bale />;
    }
  };

  return <>{renderAgent()}</>;
}
