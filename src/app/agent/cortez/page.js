'use client';

import { Suspense } from 'react';
import { AgentCanvas } from '@tizzle-fe/components/interactions/AgentCanvas';
import { usePathname, useSearchParams } from 'next/navigation';

function CortezContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const agentPath = pathname.split('/').filter(Boolean).pop();
  const transactionHashes = searchParams.get('transactionHashes');

  return (
    <AgentCanvas agentPath={agentPath} transactionHashes={transactionHashes} />
  );
}

function CortezPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CortezContent />
    </Suspense>
  );
}

export default CortezPage;
