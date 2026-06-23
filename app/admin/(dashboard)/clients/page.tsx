import type { Metadata } from 'next';
import { requireAdminSession } from '@/lib/adminAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { formatDate } from '@/lib/utils';
import { Plus, Building2, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = { title: 'Clients — theforge Admin' };

interface ClientRow {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  created_at: string;
}

export default async function AdminClientsPage() {
  await requireAdminSession();
  const { data: clients } = await supabaseAdmin
    .from('clients')
    .select('id, name, email, company, phone, created_at')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>Clients</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{clients?.length ?? 0} registered clients</p>
        </div>
        <button className="btn-fire flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
          <Plus className="w-4 h-4" /> Add Client
        </button>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {(clients as ClientRow[] ?? []).map((c) => (
          <div key={c.id} className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: 'var(--accent)' }}>
                {c.name.slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
                {c.company && (
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 shrink-0" style={{ color: 'var(--text-muted)' }} />
                    <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{c.company}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="divider" />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--text-muted)' }} />
                <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{c.email}</p>
              </div>
              {c.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--text-muted)' }} />
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{c.phone}</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Since {formatDate(c.created_at)}</p>
            </div>
          </div>
        ))}
        {(clients ?? []).length === 0 && (
          <p className="col-span-3 text-center py-12 text-sm" style={{ color: 'var(--text-muted)' }}>No clients yet.</p>
        )}
      </div>
    </div>
  );
}
