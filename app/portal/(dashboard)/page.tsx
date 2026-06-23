import type { Metadata } from 'next';
import { requireClientSession } from '@/lib/clientAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { formatDate, formatUSD, PROJECT_STATUS_LABEL } from '@/lib/utils';
import { CheckCircle2, Clock, Circle } from 'lucide-react';
import type { ReactNode } from 'react';

export const metadata: Metadata = { title: 'My Portal — theforge' };

const STATUS_COLOR: Record<string, string> = {
  discovery: '#6366F1', in_progress: '#F59E0B', review: '#3B82F6', completed: '#10B981', on_hold: '#6B7280',
};
const INV_STATUS_COLOR: Record<string, string> = {
  draft: '#6B7280', sent: '#3B82F6', paid: '#10B981', overdue: '#EF4444', void: '#4B5563',
};

interface Milestone { id: string; title: string; status: string; due_date: string | null; sort_order: number; }
interface Update { id: string; message: string; author: string; created_at: string; }
interface Project {
  id: string; name: string; status: string; description: string | null;
  target_date: string | null;
  project_milestones: Milestone[];
  project_updates: Update[];
}
interface Invoice { id: string; description: string; amount: number; status: string; due_date: string | null; }

const MILE_ICON: Record<string, ReactNode> = {
  done: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
  in_progress: <Clock className="w-4 h-4 text-amber-400" />,
  pending: <Circle className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />,
};

export default async function PortalPage() {
  const session = await requireClientSession();

  const { data: projects } = await supabaseAdmin
    .from('projects')
    .select('*, project_milestones(id, title, status, sort_order, due_date), project_updates(id, message, author, created_at)')
    .eq('client_id', session.id)
    .order('created_at', { ascending: false });

  const { data: invoices } = await supabaseAdmin
    .from('invoices')
    .select('id, description, amount, status, due_date')
    .eq('client_id', session.id)
    .order('created_at', { ascending: false })
    .limit(3);

  const projectRows = (projects as Project[]) ?? [];
  const invoiceRows = (invoices as Invoice[]) ?? [];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
          Welcome back, {session?.name?.split(' ')[0]}
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Here's a snapshot of your work with theforge.</p>
      </div>

      {projectRows.map((p) => {
        const milestones = p.project_milestones ?? [];
        const updates = p.project_updates ?? [];
        const sorted = [...milestones].sort((a, b) => a.sort_order - b.sort_order);
        const done = milestones.filter(m => m.status === 'done').length;
        const pct = milestones.length ? Math.round((done / milestones.length) * 100) : 0;

        return (
          <div key={p.id} className="rounded-2xl mb-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div className="px-6 py-5 border-b flex items-center justify-between gap-4 flex-wrap" style={{ borderColor: 'var(--border)' }}>
              <div>
                <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{p.name}</h2>
                {p.description && <p className="text-sm mt-0.5 max-w-xl" style={{ color: 'var(--text-muted)' }}>{p.description}</p>}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: `${STATUS_COLOR[p.status]}18`, color: STATUS_COLOR[p.status] }}>
                  {PROJECT_STATUS_LABEL[p.status]}
                </span>
                {p.target_date && <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Due {formatDate(p.target_date)}</span>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'var(--border)' }}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Milestones</p>
                  <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{pct}% done</span>
                </div>
                <div className="h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--accent)' }} />
                </div>
                <div className="flex flex-col gap-2.5">
                  {sorted.map((m) => (
                    <div key={m.id} className="flex items-center gap-2.5">
                      {MILE_ICON[m.status] ?? MILE_ICON.pending}
                      <span className="text-sm flex-1"
                        style={{ color: m.status === 'done' ? 'var(--text-muted)' : 'var(--text-secondary)', textDecoration: m.status === 'done' ? 'line-through' : 'none' }}>
                        {m.title}
                      </span>
                      {m.due_date && <span className="text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>{formatDate(m.due_date)}</span>}
                    </div>
                  ))}
                  {sorted.length === 0 && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No milestones yet.</p>}
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Latest Updates</p>
                <div className="flex flex-col gap-4">
                  {[...updates].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4).map((u) => (
                    <div key={u.id} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--accent)' }} />
                      <div>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{u.message}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{formatDate(u.created_at)}</p>
                      </div>
                    </div>
                  ))}
                  {updates.length === 0 && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No updates yet. We&apos;ll post progress here.</p>}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {projectRows.length === 0 && (
        <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No active projects yet. <a href="/contact" style={{ color: 'var(--accent)' }}>Let&apos;s get started →</a></p>
        </div>
      )}

      {invoiceRows.length > 0 && (
        <div className="rounded-2xl mt-2" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
            <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Recent Invoices</p>
            <a href="/portal/invoices" className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>View all →</a>
          </div>
          {invoiceRows.map((inv) => (
            <div key={inv.id} className="px-6 py-4 border-b last:border-0 flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{inv.description}</p>
                {inv.due_date && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Due {formatDate(inv.due_date)}</p>}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{formatUSD(Number(inv.amount))}</span>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize"
                  style={{ background: `${INV_STATUS_COLOR[inv.status]}18`, color: INV_STATUS_COLOR[inv.status] }}>
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
