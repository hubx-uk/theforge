/* import type { Metadata } from 'next';
import { requireAdminSession } from '@/lib/adminAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { formatDate, formatUSD, PROJECT_STATUS_LABEL } from '@/lib/utils';
import { Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'Projects • theforge Admin' };

const STATUS_COLOR: Record<string, string> = {
  discovery: '#6366F1', in_progress: '#F59E0B', review: '#3B82F6', completed: '#10B981', on_hold: '#6B7280',
};
const TIER_COLOR: Record<string, string> = { spark: '#94A3B8', ember: '#F59E0B', blaze: '#FE7F2D', inferno: '#D9591A', custom: '#6366F1' };

export default async function AdminProjectsPage() {
  await requireAdminSession();
  const { data: projects } = await supabaseAdmin
    .from('projects')
    .select('*, clients(name, email)')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>Projects</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{projects?.length ?? 0} total projects</p>
        </div>
        <button className="btn-fire flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <table className="w-full">
          <thead>
            <tr className="border-b text-left" style={{ borderColor: 'var(--border)' }}>
              {['Project', 'Client', 'Plan', 'Budget', 'Status', 'Target'].map(h => (
                <th key={h} className="px-5 py-3.5 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {(projects ?? []).map((p: Record<string, unknown>) => {
              const client = p.clients as Record<string, string> | null;
              return (
                <tr key={p.id as string} className="transition-colors"
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{p.name as string}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{client?.name ?? '—'}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{client?.email ?? ''}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{ background: `${TIER_COLOR[p.plan_tier as string] ?? '#6B7280'}15`, color: TIER_COLOR[p.plan_tier as string] ?? '#6B7280' }}>
                      {p.plan_tier as string}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {p.budget ? formatUSD(Number(p.budget)) : '—'}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: `${STATUS_COLOR[p.status as string]}18`, color: STATUS_COLOR[p.status as string] }}>
                      {PROJECT_STATUS_LABEL[p.status as string]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                    {p.target_date ? formatDate(p.target_date as string) : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(projects ?? []).length === 0 && (
          <p className="text-center py-12 text-sm" style={{ color: 'var(--text-muted)' }}>No projects yet. Create one above.</p>
        )}
      </div>
    </div>
  );
}
*/

import type { Metadata } from "next";
import { requireAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ProjectsClient } from "@/components/admin/ProjectsClient";

export const metadata: Metadata = { title: "Projects • theforge Admin" };

export default async function AdminProjectsPage() {
  await requireAdminSession();
  const [{ data: projects }, { data: clients }] = await Promise.all([
    supabaseAdmin
      .from("projects")
      .select("*, clients(name, email)")
      .order("created_at", { ascending: false }),
    supabaseAdmin.from("clients").select("id, name, email").order("name"),
  ]);
  return (
    <div className="p-8">
      <ProjectsClient projects={projects ?? []} clients={clients ?? []} />
    </div>
  );
}
