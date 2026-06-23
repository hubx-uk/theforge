import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Fabrica — Construction Digital Platform | theforge Case Study',
  description: 'How theforge built a full-stack construction CMS and client portal for Fabrica, a Kace Technologies company.',
};

const STATS = [
  { value: '3x', label: 'Faster quote turnaround' },
  { value: '85%', label: 'Reduction in email back-and-forth' },
  { value: '12 wks', label: 'End-to-end delivery' },
  { value: '100%', label: 'Custom admin built for ops team' },
];

const STACK = ['Next.js 14', 'Supabase', 'Shadcn UI', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Stripe'];

export default function FabricaCaseStudy() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="page-hero max-w-4xl mx-auto px-6">
        <span className="section-label">Case Study</span>
        <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
          Fabrica — Building the Digital Foundation for a Construction Firm
        </h1>
        <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          A Kace Technologies company. theforge designed and built a full CMS, client-facing project tracker, and quote management system that took Fabrica from spreadsheet chaos to streamlined operations.
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>Construction & Infrastructure</span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>Abuja, Nigeria</span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(254,127,45,0.1)', color: 'var(--accent)', border: '1px solid rgba(254,127,45,0.2)' }}>Blaze Tier</span>
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
        <h2>The Challenge</h2>
        <p>
          Fabrica was growing — winning more contracts, managing more sites, and onboarding more clients. But their operations were running on WhatsApp threads, shared Google Sheets, and a static brochure website that told prospective clients almost nothing about their capabilities.
        </p>
        <p>
          The Kace Technologies leadership team wanted a system: one platform where ops staff could manage active builds, clients could check project progress, and the team could generate and track quotes without printing a PDF.
        </p>

        <h2>What We Built</h2>
        <h3>Public Marketing Site</h3>
        <p>
          A high-performance marketing website with a project showcase gallery, detailed service pages for construction, renovation, and infrastructure, and a lead capture flow that routes enquiries directly into the CMS.
        </p>
        <h3>Admin CMS</h3>
        <p>
          A bespoke admin dashboard — built around how Fabrica's ops team actually works. Project creation with phases and milestones, document uploads per project, staff assignment, and a quote builder that auto-calculates line items and exports print-ready PDFs.
        </p>
        <h3>Client Portal</h3>
        <p>
          Every client gets a secure login. Inside they can see their live project, the current phase, recent updates from the site team, uploaded documents (drawings, contracts, inspection reports), and all their invoices in one place.
        </p>
        <h3>Quote Management</h3>
        <p>
          The ops team builds quotes inside the admin, sends them to clients via email with a tracking link. Clients can approve quotes online. Approved quotes flow straight into the project timeline — no manual re-entry.
        </p>

        <h2>Technical Approach</h2>
        <p>
          We built on the Next.js 14 App Router with Supabase for the database and auth. The UI was built using Shadcn components customised to match Fabrica's brand. All file uploads go through Supabase Storage. JWT sessions handle role separation between admin staff and clients.
        </p>
        <p>
          DataContext with localStorage handles draft state across multi-step forms, so the ops team doesn't lose work if they navigate away mid-quote. Stripe handles payment collection for the deposits and milestone billing.
        </p>

        <h2>Result</h2>
        <p>
          Within six weeks of launch, Fabrica's ops manager reported that quote turnaround dropped from an average of four days to under one. Client calls asking for project updates fell by over 80% — clients simply log in and check. The team has since requested two retainer months of feature additions.
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
