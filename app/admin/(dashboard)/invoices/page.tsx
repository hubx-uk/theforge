/* import type { Metadata } from 'next';
import { requireAdminSession } from '@/lib/adminAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { formatDate, formatUSD, INVOICE_STATUS_LABEL } from '@/lib/utils';
import { Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'Invoices • theforge Admin' };

const STATUS_COLOR: Record<string, string> = {
  draft: '#6B7280', sent: '#3B82F6', paid: '#10B981', overdue: '#EF4444', void: '#4B5563',
};

export default async function AdminInvoicesPage() {
  await requireAdminSession();
  const { data: invoices } = await supabaseAdmin
    .from('invoices')
    .select('*, clients(name, email), projects(name)')
    .order('created_at', { ascending: false });

  const totalPaid = (invoices ?? []).filter(i => i.status === 'paid').reduce((s, i) => s + Number(i.amount), 0);
  const totalPending = (invoices ?? []).filter(i => ['sent', 'overdue'].includes(i.status)).reduce((s, i) => s + Number(i.amount), 0);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>Invoices</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{invoices?.length ?? 0} total invoices</p>
        </div>
        <button className="btn-fire flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      {/* Summary strip *}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Total Collected', value: formatUSD(totalPaid), color: '#10B981' },
          { label: 'Outstanding', value: formatUSD(totalPending), color: '#F59E0B' },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
            <p className="text-3xl font-black" style={{ color, letterSpacing: '-0.03em' }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <table className="w-full">
          <thead>
            <tr className="border-b text-left" style={{ borderColor: 'var(--border)' }}>
              {['Description', 'Client', 'Project', 'Amount', 'Type', 'Status', 'Due'].map(h => (
                <th key={h} className="px-5 py-3.5 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {(invoices ?? []).map((inv: Record<string, unknown>) => {
              const client = inv.clients as Record<string, string> | null;
              const project = inv.projects as Record<string, string> | null;
              return (
                <tr key={inv.id as string} className="transition-colors"
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td className="px-5 py-4 text-sm max-w-xs" style={{ color: 'var(--text-primary)' }}>
                    <p className="truncate">{inv.description as string}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{client?.name ?? '—'}</p>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>{project?.name ?? '—'}</td>
                  <td className="px-5 py-4 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{formatUSD(Number(inv.amount))}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium capitalize" style={{ color: 'var(--text-muted)' }}>
                      {(inv.invoice_type as string).replace('_', '-')}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: `${STATUS_COLOR[inv.status as string]}18`, color: STATUS_COLOR[inv.status as string] }}>
                      {INVOICE_STATUS_LABEL[inv.status as string]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                    {inv.due_date ? formatDate(inv.due_date as string) : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(invoices ?? []).length === 0 && (
          <p className="text-center py-12 text-sm" style={{ color: 'var(--text-muted)' }}>No invoices yet.</p>
        )}
      </div>
    </div>
  );
}
 */

import type { Metadata } from "next";
import { requireAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { InvoicesClient } from "@/components/admin/InvoicesClient";

export const metadata: Metadata = { title: "Invoices • theforge Admin" };

export default async function AdminInvoicesPage() {
  await requireAdminSession();
  const [{ data: invoices }, { data: clients }, { data: projects }] =
    await Promise.all([
      supabaseAdmin
        .from("invoices")
        .select("*, clients(name, email), projects(name)")
        .order("created_at", { ascending: false }),
      supabaseAdmin.from("clients").select("id, name").order("name"),
      supabaseAdmin
        .from("projects")
        .select("id, name, client_id")
        .order("name"),
    ]);
  return (
    <div className="p-8">
      <InvoicesClient
        invoices={invoices ?? []}
        clients={clients ?? []}
        projects={projects ?? []}
      />
    </div>
  );
}
