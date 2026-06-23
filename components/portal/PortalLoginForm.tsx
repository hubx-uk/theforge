'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export function PortalLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError('');
    const fd = new FormData(e.currentTarget);
    const res = await fetch('/api/portal/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: fd.get('email'), password: fd.get('password') }),
    });
    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? 'Login failed');
      setLoading(false);
      return;
    }
    router.push('/portal');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl p-3 text-sm font-medium text-center"
          style={{ background: 'rgba(254,127,45,0.1)', color: 'var(--accent)', border: '1px solid rgba(254,127,45,0.2)' }}>
          {error}
        </div>
      )}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Email</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <input type="email" name="email" required placeholder="you@company.com" className="forge-input pl-10" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <input type={showPass ? 'text' : 'password'} name="password" required placeholder="••••••••" className="forge-input pl-10 pr-11" />
          <button type="button" onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <button type="submit" disabled={loading} className="btn-fire w-full flex items-center justify-center gap-2 py-3 rounded-xl disabled:opacity-60">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Signing in…</> : 'Access Portal'}
      </button>
    </form>
  );
}
