import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageShell from '@/components/PageShell';
import SuccessContent from '@/components/SuccessContent';

export const metadata: Metadata = { title: 'You\u2019re In — theforge' };

export default function SuccessPage() {
  return (
    <PageShell>
      <Suspense fallback={<div className="py-40 text-center" style={{ color: 'var(--text-muted)' }}>Loading…</div>}>
        <SuccessContent />
      </Suspense>
    </PageShell>
  );
}
