'use client';

import { Suspense } from 'react';
import { AgentCanvas } from '@tizzle-fe/components/interactions/AgentCanvas';
import { usePathname } from 'next/navigation';

function AkiraPage() {
  const pathname = usePathname();
  const agentPath = pathname.split('/').filter(Boolean).pop();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AgentCanvas agentPath={agentPath} />;
    </Suspense>
  );
}

export default AkiraPage;
