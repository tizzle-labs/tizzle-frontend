'use client';

import { AgentCanvas } from '@tizzle-fe/components/interactions/AgentCanvas';
import { usePathname } from 'next/navigation';

function BalePage() {
  const pathname = usePathname();
  const agentPath = pathname.split('/').filter(Boolean).pop();

  return <AgentCanvas agentPath={agentPath} />;
}

export default BalePage;