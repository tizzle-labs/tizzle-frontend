import { Suspense } from 'react';
import { AgentCanvas } from '@tizzle-fe/components/interactions/AgentCanvas';

const AVAILABLE_AGENT = ['akira', 'bale', 'cortez', 'jordan', 'mike', 'isaac'];

async function AgentPage({ params }) {
  const agent = (await params).agent;

  if (!AVAILABLE_AGENT.includes(agent)) {
    return;
  }

  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      }
    >
      <AgentCanvas agentPath={agent} />
    </Suspense>
  );
}

export default AgentPage;
