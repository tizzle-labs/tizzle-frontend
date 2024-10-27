'use client';

import { Suspense } from 'react';
import { AgentCanvas } from '@tizzle-fe/components/interactions/AgentCanvas';
import { usePathname, useSearchParams } from 'next/navigation';

function CortezPage() {
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

export default CortezPage;
