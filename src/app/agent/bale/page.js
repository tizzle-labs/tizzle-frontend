'use client';

import { Suspense } from 'react';
import { AgentCanvas } from '@tizzle-fe/components/interactions/AgentCanvas';
import { usePathname, useSearchParams } from 'next/navigation';

function BaleContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const agentPath = pathname.split('/').filter(Boolean).pop();
  const transactionHashes = searchParams.get('transactionHashes');

  return (
    <AgentCanvas agentPath={agentPath} transactionHashes={transactionHashes} />
  );
}

function BalePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BaleContent />
    </Suspense>
  );
}

export default BalePage;
