import type { Metadata } from 'next';
import { requireClientSession } from '@/lib/clientAuth';
import PortalAccountForm from '@/components/portal/PortalAccountForm';

export const metadata: Metadata = { title: 'Account — Client Portal' };

export default async function PortalAccountPage() {
  const session = await requireClientSession();

  return (
    <div className="p-8 max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
          Account
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage your client portal access.</p>
      </div>

      <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <h2 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Profile</h2>
        <div className="grid grid-cols-[110px_1fr] gap-y-3 text-sm">
          <span style={{ color: 'var(--text-muted)' }}>Name</span>
          <span style={{ color: 'var(--text-primary)' }}>{session?.name}</span>
          <span style={{ color: 'var(--text-muted)' }}>Email</span>
          <span style={{ color: 'var(--text-primary)' }}>{session?.email}</span>
          {session?.company && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>Company</span>
              <span style={{ color: 'var(--text-primary)' }}>{session?.company}</span>
            </>
          )}
        </div>
        <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
          Need to update your name, email, or company? <a href="/contact" style={{ color: 'var(--accent)' }}>Contact your account manager →</a>
        </p>
      </div>

      <div className="rounded-2xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <h2 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Change Password</h2>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
          Use a strong, unique password. You&apos;ll stay signed in on this device.
        </p>
        <PortalAccountForm />
      </div>
    </div>
  );
}
