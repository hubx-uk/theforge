/* 'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, FolderOpen, Receipt, Settings, LogOut, Flame } from 'lucide-react';

const NAV = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/projects', icon: FolderOpen, label: 'Projects' },
  { href: '/admin/clients', icon: Users, label: 'Clients' },
  { href: '/admin/invoices', icon: Receipt, label: 'Invoices' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <aside className="w-60 shrink-0 flex flex-col h-full border-r" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
      {/* Logo *}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
          <Flame className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>theforge</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Studio Admin</p>
        </div>
      </div>

      {/* Nav *}
      <nav className="flex-1 p-3 flex flex-col gap-0.5">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={active ? { background: 'var(--accent)', color: '#fff' } : { color: 'var(--text-secondary)' }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-elevated)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout *}
      <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Receipt,
  Settings,
  LogOut,
  Flame,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/projects", icon: FolderOpen, label: "Projects" },
  { href: "/admin/clients", icon: Users, label: "Clients" },
  { href: "/admin/invoices", icon: Receipt, label: "Invoices" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  // Restore preference from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("admin_sidebar_collapsed");
    if (stored !== null) setCollapsed(stored === "true");
  }, []);

  function toggle() {
    setCollapsed((prev) => {
      localStorage.setItem("admin_sidebar_collapsed", String(!prev));
      return !prev;
    });
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <aside
      className="shrink-0 flex flex-col h-full border-r overflow-hidden"
      style={{
        width: collapsed ? 64 : 240,
        transition: "width 0.22s cubic-bezier(0.4,0,0.2,1)",
        background: "var(--bg-surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* ── Logo + collapse toggle ──────────────────── */}
      <div
        className="flex items-center border-b shrink-0"
        style={{
          borderColor: "var(--border)",
          height: 64,
          padding: collapsed ? "0 16px" : "0 12px 0 20px",
          justifyContent: collapsed ? "center" : "space-between",
          transition: "padding 0.22s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
          <div
            className="flex items-center justify-center rounded-lg shrink-0"
            style={{ width: 32, height: 32, background: "var(--accent)" }}
          >
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div
            className="overflow-hidden"
            style={{
              opacity: collapsed ? 0 : 1,
              maxWidth: collapsed ? 0 : 160,
              transition:
                "opacity 0.15s ease, max-width 0.22s cubic-bezier(0.4,0,0.2,1)",
              whiteSpace: "nowrap",
            }}
          >
            <p
              className="text-sm font-black tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              theforge
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Studio Admin
            </p>
          </div>
        </div>

        {!collapsed && (
          <button
            onClick={toggle}
            title="Collapse sidebar"
            className="flex items-center justify-center rounded-lg shrink-0 transition-colors"
            style={{
              width: 28,
              height: 28,
              background: "var(--bg-elevated)",
              color: "var(--text-muted)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ── Nav ────────────────────────────────────── */}
      <nav className="flex-1 flex flex-col gap-0.5 p-2 overflow-hidden">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className="flex items-center rounded-xl text-sm font-medium shrink-0"
              style={{
                gap: collapsed ? 0 : 12,
                padding: collapsed ? "10px 0" : "10px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                background: active ? "var(--accent)" : "transparent",
                color: active ? "#fff" : "var(--text-secondary)",
                transition:
                  "background 0.15s, color 0.15s, padding 0.22s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => {
                if (!active)
                  e.currentTarget.style.background = "var(--bg-elevated)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span
                style={{
                  opacity: collapsed ? 0 : 1,
                  maxWidth: collapsed ? 0 : 160,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  transition:
                    "opacity 0.15s ease, max-width 0.22s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom: expand button + logout ─────────── */}
      <div
        className="p-2 flex flex-col gap-0.5 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        {collapsed && (
          <button
            onClick={toggle}
            title="Expand sidebar"
            className="flex items-center justify-center rounded-xl transition-colors shrink-0"
            style={{
              width: "100%",
              padding: "10px 0",
              color: "var(--text-muted)",
              background: "transparent",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--bg-elevated)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={handleLogout}
          title={collapsed ? "Sign Out" : undefined}
          className="flex items-center rounded-xl text-sm font-medium shrink-0"
          style={{
            gap: collapsed ? 0 : 12,
            padding: collapsed ? "10px 0" : "10px 12px",
            width: "100%",
            justifyContent: collapsed ? "center" : "flex-start",
            color: "var(--text-muted)",
            background: "transparent",
            transition: "padding 0.22s cubic-bezier(0.4,0,0.2,1)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-elevated)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span
            style={{
              opacity: collapsed ? 0 : 1,
              maxWidth: collapsed ? 0 : 160,
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition:
                "opacity 0.15s ease, max-width 0.22s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
}
