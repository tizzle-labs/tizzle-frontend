'use client';

import Akira from '@tizzle-fe/components/agent/akira/Akira';
import useStore from '@tizzle-fe/stores/userStore';
import Cortez from '@tizzle-fe/components/agent/cortez/Cortez';

export default function Home() {
  const selectedAgent = useStore(state => state.selectedAgent);

  const renderAgent = () => {
    switch (selectedAgent) {
      case 'cortez':
        return <Cortez />;
      case 'akira':
      default:
        return <Akira />;
    }
  };

  return <>{renderAgent()}</>;
}
