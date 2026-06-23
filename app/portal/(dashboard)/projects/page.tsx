import type { Metadata } from 'next';
import { requireClientSession } from '@/lib/clientAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { formatDate, PROJECT_STATUS_LABEL } from '@/lib/utils';

export const metadata: Metadata = { title: 'My Projects — Client Portal' };

const STATUS_COLOR: Record<string, string> = {
  discovery: '#6366F1', in_progress: '#F59E0B', review: '#3B82F6', completed: '#10B981', on_hold: '#6B7280',
};

interface Milestone { id: string; status: string; }
interface ProjectRow {
  id: string;
  name: string;
  status: string;
  description: string | null;
  start_date: string | null;
  target_date: string | null;
  plan_tier: string;
  project_milestones: Milestone[];
}

export default async function PortalProjectsPage() {
  const session = await requireClientSession();

  const { data: projects } = await supabaseAdmin
    .from('projects')
    .select('id, name, status, description, start_date, target_date, plan_tier, project_milestones(id, status)')
    .eq('client_id', session!.id)
    .order('created_at', { ascending: false });

  const rows = (projects as ProjectRow[]) ?? [];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
          My Projects
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Every project theforge is delivering for you.</p>
      </div>

      <div className="flex flex-col gap-4">
        {rows.map((p) => {
          const milestones = p.project_milestones ?? [];
          const done = milestones.filter(m => m.status === 'done').length;
          const pct = milestones.length ? Math.round((done / milestones.length) * 100) : 0;

          return (
            <div key={p.id} className="rounded-2xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{p.name}</h2>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>
                      {p.plan_tier}
                    </span>
                  </div>
                  {p.description && <p className="text-sm max-w-xl" style={{ color: 'var(--text-secondary)' }}>{p.description}</p>}
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
                  style={{ background: `${STATUS_COLOR[p.status]}18`, color: STATUS_COLOR[p.status] }}>
                  {PROJECT_STATUS_LABEL[p.status]}
                </span>
              </div>

              <div className="h-1.5 rounded-full mb-3 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--accent)' }} />
              </div>

              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                <span>{pct}% of milestones complete</span>
                <div className="flex gap-4">
                  {p.start_date && <span>Started {formatDate(p.start_date)}</span>}
                  {p.target_date && <span>Target {formatDate(p.target_date)}</span>}
                </div>
              </div>
            </div>
          );
        })}

        {rows.length === 0 && (
          <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              No active projects yet. <a href="/contact" style={{ color: 'var(--accent)' }}>Let&apos;s get started →</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
