import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdminSession } from '@/lib/adminAuth';
import { formatUSD, formatDate, PROJECT_STATUS_LABEL, INVOICE_STATUS_LABEL } from '@/lib/utils';
import { FolderOpen, Users, Receipt, TrendingUp } from 'lucide-react';

export const metadata: Metadata = { title: 'Dashboard — theforge Admin' };

export default async function AdminDashboard() {
  const session = await requireAdminSession();

  const [{ count: projectCount }, { count: clientCount }, { data: invoices }, { data: recentProjects }] =
    await Promise.all([
      supabaseAdmin.from('projects').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('clients').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('invoices').select('amount, status'),
      supabaseAdmin.from('projects').select('id, name, status, clients(name), updated_at').order('updated_at', { ascending: false }).limit(5),
    ]);

  const totalRevenue = (invoices ?? []).filter(i => i.status === 'paid').reduce((s, i) => s + Number(i.amount), 0);
  const outstanding = (invoices ?? []).filter(i => ['sent', 'overdue'].includes(i.status)).reduce((s, i) => s + Number(i.amount), 0);

  const STATS = [
    { icon: FolderOpen, label: 'Active Projects', value: projectCount ?? 0, color: '#FE7F2D' },
    { icon: Users, label: 'Clients', value: clientCount ?? 0, color: '#F59E0B' },
    { icon: TrendingUp, label: 'Revenue Collected', value: formatUSD(totalRevenue), color: '#10B981' },
    { icon: Receipt, label: 'Outstanding', value: formatUSD(outstanding), color: '#6366F1' },
  ];

  const STATUS_COLOR: Record<string, string> = {
    discovery: '#6366F1', in_progress: '#F59E0B', review: '#3B82F6', completed: '#10B981', on_hold: '#6B7280',
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
          Good morning, {session?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Here's what's happening at the studio.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</span>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
            </div>
            <p className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>Recent Projects</h2>
          <a href="/admin/projects" className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>View all →</a>
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {(recentProjects ?? []).map((p: Record<string, unknown>) => {
            const client = p.clients as Record<string, string> | null;
            return (
              <div key={p.id as string} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{p.name as string}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{client?.name ?? 'No client'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: `${STATUS_COLOR[p.status as string]}18`, color: STATUS_COLOR[p.status as string] }}>
                    {PROJECT_STATUS_LABEL[p.status as string]}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{formatDate(p.updated_at as string)}</span>
                </div>
              </div>
            );
          })}
          {(recentProjects ?? []).length === 0 && (
            <p className="px-6 py-8 text-sm text-center" style={{ color: 'var(--text-muted)' }}>No projects yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
