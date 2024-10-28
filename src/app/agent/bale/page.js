'use client';

import { AgentCanvas } from '@tizzle-fe/components/interactions/AgentCanvas';
import { usePathname } from 'next/navigation';
import { Suspense, useSearchParams } from 'react';

function BalePage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const agentPath = pathname.split('/').filter(Boolean).pop();
  const transactionHashes = searchParams.get('transactionHashes');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AgentCanvas
        agentPath={agentPath}
        transactionHashes={transactionHashes}
      />
    </Suspense>
  );
}

export default BalePage;
