'use client';

import { Suspense } from 'react';
import { AgentCanvas } from '@tizzle-fe/components/interactions/AgentCanvas';
import { usePathname, useSearchParams } from 'next/navigation';

function AkiraContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const agentPath = pathname.split('/').filter(Boolean).pop();
  const transactionHashes = searchParams.get('transactionHashes');

  return (
    <AgentCanvas agentPath={agentPath} transactionHashes={transactionHashes} />
  );
}

function AkiraPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AkiraContent />
    </Suspense>
  );
}

export default AkiraPage;
