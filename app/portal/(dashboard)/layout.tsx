import { requireClientSession } from '@/lib/clientAuth';
import { PortalSidebar } from '@/components/portal/PortalSidebar';

export default async function PortalDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireClientSession();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <PortalSidebar clientName={session.name} />
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
