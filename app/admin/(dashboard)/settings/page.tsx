import type { Metadata } from 'next';
import { requireAdminSession } from '@/lib/adminAuth';
import SettingsForm from '@/components/admin/SettingsForm';

export const metadata: Metadata = { title: 'Settings — theforge Admin' };

export default async function AdminSettingsPage() {
  const session = await requireAdminSession();

  return (
    <div className="p-8 max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
          Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage your studio account.</p>
      </div>

      <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <h2 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Account</h2>
        <div className="grid grid-cols-[100px_1fr] gap-y-3 text-sm">
          <span style={{ color: 'var(--text-muted)' }}>Name</span>
          <span style={{ color: 'var(--text-primary)' }}>{session?.name}</span>
          <span style={{ color: 'var(--text-muted)' }}>Email</span>
          <span style={{ color: 'var(--text-primary)' }}>{session?.email}</span>
          <span style={{ color: 'var(--text-muted)' }}>Role</span>
          <span className="capitalize" style={{ color: 'var(--text-primary)' }}>{session?.role}</span>
        </div>
      </div>

      <div className="rounded-2xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <h2 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Change Password</h2>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
          Use a strong, unique password. You&apos;ll stay signed in on this device.
        </p>
        <SettingsForm />
      </div>
    </div>
  );
}
