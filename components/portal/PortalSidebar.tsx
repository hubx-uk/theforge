'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderOpen, Receipt, User, Flame, LogOut } from 'lucide-react';

const NAV = [
  { href: '/portal', icon: LayoutDashboard, label: 'Overview' },
  { href: '/portal/projects', icon: FolderOpen, label: 'My Projects' },
  { href: '/portal/invoices', icon: Receipt, label: 'Invoices' },
  { href: '/portal/account', icon: User, label: 'Account' },
];

export function PortalSidebar({ clientName }: { clientName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/portal/auth', { method: 'DELETE' });
    router.push('/portal/login');
  }

  return (
    <aside className="w-60 shrink-0 flex flex-col h-full border-r" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
          <Flame className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>theforge</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Client Portal</p>
        </div>
      </div>

      {/* Client chip */}
      <div className="mx-3 mt-3 rounded-xl px-3 py-2.5 flex items-center gap-2.5" style={{ background: 'var(--bg-elevated)' }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: 'var(--accent)' }}>
          {clientName.slice(0, 1).toUpperCase()}
        </div>
        <span className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{clientName}</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-0.5 mt-2">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = href === '/portal' ? pathname === '/portal' : pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={active ? { background: 'var(--accent)', color: '#fff' } : { color: 'var(--text-secondary)' }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-elevated)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
