'use client';

import { useState } from 'react';

export default function PortalAccountForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('New passwords do not match.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/portal/account', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong.');
        return;
      }
      setStatus('success');
      setMessage('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Current Password
        </label>
        <input
          type="password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="forge-input"
          autoComplete="current-password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          New Password
        </label>
        <input
          type="password"
          required
          minLength={8}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="forge-input"
          autoComplete="new-password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Confirm New Password
        </label>
        <input
          type="password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="forge-input"
          autoComplete="new-password"
        />
      </div>

      <button type="submit" disabled={status === 'loading'} className="btn-fire py-3 rounded-xl text-sm font-bold disabled:opacity-60">
        {status === 'loading' ? 'Updating…' : 'Update Password'}
      </button>

      {status === 'success' && (
        <p className="text-sm font-medium" style={{ color: '#16A34A' }}>✓ {message}</p>
      )}
      {status === 'error' && (
        <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{message}</p>
      )}
    </form>
  );
}
