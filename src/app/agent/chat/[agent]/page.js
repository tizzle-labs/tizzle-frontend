import { Suspense } from 'react';
import { AgentCanvas } from '@tizzle-fe/components/interactions/AgentCanvas';
import { AVAILABLE_AGENT_V2 } from '@tizzle-fe/constants/agent';

async function AgentPage({ params }) {
  const agent = (await params).agent;

  if (!AVAILABLE_AGENT_V2.includes(agent)) {
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
