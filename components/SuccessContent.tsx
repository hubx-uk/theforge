'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="max-w-lg mx-auto px-6 py-40 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"
        style={{ background: 'var(--accent-glow)' }}
      >
        🔥
      </div>
      <span className="section-label">Payment Confirmed</span>
      <h1 className="text-4xl font-black mb-4" style={{ letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
        You&apos;re officially <span className="text-fire">forged in</span>.
      </h1>
      <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
        Thanks for your payment. A confirmation has been sent to your email, and our team will reach out within
        one business day to kick off your project.
      </p>

      {sessionId && (
        <div className="rounded-xl p-4 mb-8 text-left" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
            Reference
          </p>
          <p className="text-sm font-mono break-all" style={{ color: 'var(--text-secondary)' }}>{sessionId}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-fire px-6 py-3 rounded-xl text-sm font-bold">
          Back to Home
        </Link>
        <Link href="/contact" className="btn-ghost px-6 py-3 rounded-xl text-sm font-bold">
          Talk to the Team
        </Link>
      </div>
    </div>
  );
}
