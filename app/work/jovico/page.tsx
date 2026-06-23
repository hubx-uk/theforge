import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Jovico World — E-Mobility Platform | theforge Case Study',
  description: "How theforge built the digital platform for Jovico, Nigeria's electric mobility and solar retail brand.",
};

const STATS = [
  { value: '2', label: 'Verticals in one platform (EVs + Solar)' },
  { value: '<3s', label: 'Time to interactive on 3G' },
  { value: '100%', label: 'Custom admin with order management' },
  { value: '6 mo', label: 'Ongoing retainer engagement' },
];

const STACK = ['Next.js 14', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'TypeScript', 'Supabase Storage', 'JWT Auth', 'Vercel'];

export default function JovicoCaseStudy() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="page-hero max-w-4xl mx-auto px-6">
        <span className="section-label">Case Study</span>
        <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
          Jovico World — Building Nigeria's E-Mobility Storefront
        </h1>
        <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          Jovico sells electric vehicles and solar energy products across Nigeria. theforge designed and built their entire digital platform — storefront, admin, and customer account portal — from the ground up.
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>E-Mobility / Clean Energy</span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>Nigeria</span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(254,127,45,0.1)', color: 'var(--accent)', border: '1px solid rgba(254,127,45,0.2)' }}>Inferno Tier + Retainer</span>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="rounded-2xl p-6 text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <p className="stat-number mb-2">{value}</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="max-w-3xl mx-auto px-6 pb-20 prose-forge">
        <h2>Background</h2>
        <p>
          Jovico started as an electric motorcycle retailer. As they expanded into solar panels, inverters, and electric cars, their original website — a simple brochure with a WhatsApp link — stopped working. Customers couldn't browse the full catalog, compare specs, or place deposits online. The ops team had no visibility on leads or orders.
        </p>
        <p>
          They came to theforge needing a full platform, not just a redesign.
        </p>

        <h2>What We Built</h2>
        <h3>Multi-Category Storefront</h3>
        <p>
          The storefront handles two distinct product categories — electric mobility (bikes and cars) and solar (panels, inverters, battery packs) — each with their own browse flow, filter logic, and spec comparison UI. Product pages are fully dynamic, pulling from the Prisma-backed database and rendering structured spec tables based on product type.
        </p>
        <h3>Admin Dashboard</h3>
        <p>
          A complete bespoke admin built specifically for the Jovico ops team. Product management with image/video upload, order tracking with status stages (pending → confirmed → in-transit → delivered), customer management, and a reporting dashboard showing sales by category and period. All protected by JWT-based admin authentication.
        </p>
        <h3>Customer Account Portal</h3>
        <p>
          Customers register, sign in, track their orders, download their invoices, and manage their profile from within the site. The account section handles order history, saved addresses, and communication preferences. We built a separate JWT session layer for customers so their session is entirely independent of the admin session.
        </p>
        <h3>Seed Data & Database Architecture</h3>
        <p>
          We designed the schema from scratch using Prisma with PostgreSQL. The product model uses a discriminated union pattern with shared base fields and category-specific spec extensions — so an electric bike and a solar inverter share a common product structure but render completely different spec tables. A comprehensive seed script populates realistic data for all product categories.
        </p>

        <h2>Challenges & Solutions</h2>
        <h3>Image & Video Upload Bug</h3>
        <p>
          Early in development, product image uploads were failing silently due to a mismatch between Supabase Storage bucket CORS settings and Next.js route handler chunking. We resolved this by switching to a presigned URL upload pattern — the server issues a short-lived upload URL and the client uploads directly to storage, bypassing the route handler size limits entirely.
        </p>
        <h3>Multi-Enum Migration</h3>
        <p>
          Adding solar products required new Prisma enum values mid-project. We built a migration SQL file that gracefully adds the new enum variants without requiring a full schema reset — keeping the existing seed data intact through the update.
        </p>
        <h3>Sticky Sidebar UX</h3>
        <p>
          The product detail page has a spec sidebar that needs to stay fixed while the main content scrolls. We resolved a recurring z-index and overflow conflict between the sidebar, the sticky nav, and the mobile image gallery by restructuring the layout into a CSS grid with explicit stacking contexts.
        </p>

        <h2>Ongoing Engagement</h2>
        <p>
          After launch, Jovico moved to a monthly Inferno retainer. The first three months have covered admin UI improvements flagged during ops team onboarding, a new financing calculator for the electric car range, and performance hardening ahead of a campaign launch. We meet bi-weekly on a short call to review priorities and ship updates.
        </p>
      </section>

      {/* Stack */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="rounded-2xl p-8" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)' }}>Technology Stack</p>
          <div className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span key={s} className="text-sm px-3 py-1.5 rounded-xl font-medium" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </PageShell>
  );
}
