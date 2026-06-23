import type { Metadata } from 'next';
import { requireClientSession } from '@/lib/clientAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { formatDate, formatUSD, INVOICE_STATUS_LABEL } from '@/lib/utils';

export const metadata: Metadata = { title: 'Invoices — Client Portal' };

const STATUS_COLOR: Record<string, string> = {
  draft: '#6B7280', sent: '#3B82F6', paid: '#10B981', overdue: '#EF4444', void: '#4B5563',
};

interface InvoiceRow {
  id: string;
  description: string;
  amount: number;
  status: string;
  invoice_type: string;
  due_date: string | null;
  created_at: string;
  projects: { name: string } | null;
}

export default async function PortalInvoicesPage() {
  const session = await requireClientSession();

  const { data: invoices } = await supabaseAdmin
    .from('invoices')
    .select('*, projects(name)')
    .eq('client_id', session!.id)
    .order('created_at', { ascending: false });

  const rows = (invoices as InvoiceRow[]) ?? [];
  const totalPaid = rows.filter(i => i.status === 'paid').reduce((s, i) => s + Number(i.amount), 0);
  const totalOutstanding = rows.filter(i => ['sent', 'overdue'].includes(i.status)).reduce((s, i) => s + Number(i.amount), 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>Invoices</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>All your billing history with theforge.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Total Paid</p>
          <p className="text-3xl font-black text-emerald-500" style={{ letterSpacing: '-0.03em' }}>{formatUSD(totalPaid)}</p>
        </div>
        <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Outstanding</p>
          <p className="text-3xl font-black" style={{ color: 'var(--accent)', letterSpacing: '-0.03em' }}>{formatUSD(totalOutstanding)}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {rows.map((inv) => (
          <div key={inv.id} className="rounded-2xl px-6 py-5 flex items-center justify-between gap-4 flex-wrap"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{inv.description}</p>
              {inv.projects?.name && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{inv.projects.name}</p>}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{formatUSD(Number(inv.amount))}</p>
                {inv.due_date && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Due {formatDate(inv.due_date)}</p>}
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: `${STATUS_COLOR[inv.status]}18`, color: STATUS_COLOR[inv.status] }}>
                {INVOICE_STATUS_LABEL[inv.status]}
              </span>
              {inv.status === 'sent' && (
                <a href="/contact" className="btn-fire text-xs px-3 py-1.5 rounded-lg font-semibold">Pay Now</a>
              )}
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No invoices yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
