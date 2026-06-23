import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getClientSession } from '@/lib/clientAuth';
import { PortalLoginForm } from '@/components/portal/PortalLoginForm';
import { Flame } from 'lucide-react';

export const metadata: Metadata = { title: 'Client Portal — theforge' };

export default async function PortalLoginPage() {
  const session = await getClientSession();
  if (session) redirect('/portal');

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg-base)' }}>
      <div aria-hidden className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(254,127,45,0.05) 0%, transparent 70%)' }} />
      <div className="relative z-10 w-full max-w-[400px]">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'var(--accent)', boxShadow: '0 0 40px rgba(254,127,45,0.3)' }}>
            <Flame className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
            the<span className="text-fire">forge</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Client portal — track your project progress</p>
        </div>
        <div className="rounded-3xl p-8" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <PortalLoginForm />
        </div>
        <p className="text-center text-xs mt-5" style={{ color: 'var(--text-muted)' }}>
          Don&apos;t have access? <a href="/contact" className="underline" style={{ color: 'var(--accent)' }}>Contact us →</a>
        </p>
      </div>
    </div>
  );
}
