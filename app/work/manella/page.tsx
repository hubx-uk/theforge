import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Manella Stores — E-Commerce Rebuild | theforge Case Study',
  description: 'How theforge redesigned and optimised a WooCommerce store for Manella, cutting page load times in half and doubling conversion.',
};

const STATS = [
  { value: '2.1s', label: 'Page load (down from 6.4s)' },
  { value: '+114%', label: 'Mobile conversion rate' },
  { value: '40%', label: 'Drop in cart abandonment' },
  { value: '8 wks', label: 'Full redesign & delivery' },
];

const STACK = ['WordPress', 'WooCommerce', 'Custom Theme (PHP)', 'Advanced Custom Fields', 'Elementor (removed)', 'WP Rocket', 'Cloudflare CDN'];

export default function ManellaCaseStudy() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="page-hero max-w-4xl mx-auto px-6">
        <span className="section-label">Case Study</span>
        <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
          Manella Stores — From Slow Site to High-Converting Storefront
        </h1>
        <p className="text-xl max-w-2xl" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          A retail e-commerce brand selling lifestyle and home goods. theforge stripped out a bloated Elementor build, designed a custom WooCommerce theme from scratch, and cut load times by 67%.
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>E-Commerce / Retail</span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>WooCommerce</span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(254,127,45,0.1)', color: 'var(--accent)', border: '1px solid rgba(254,127,45,0.2)' }}>Ember Tier</span>
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
        <h2>The Problem with the Previous Site</h2>
        <p>
          Manella's original WooCommerce store was built on a generic theme with Elementor handling every page. The result was a beautiful site — in the editor. In the browser, it was 6+ seconds to first meaningful paint on mobile. The plugin stack had grown to 47 active plugins and the database was bloated with revision noise.
        </p>
        <p>
          Mobile traffic was over 70% of their sessions, but mobile conversion was under 1%. The team suspected the site but didn't have the data to confirm it. We confirmed it immediately.
        </p>

        <h2>Approach</h2>
        <h3>Audit First</h3>
        <p>
          Before writing a line of code, we ran a comprehensive audit: Core Web Vitals, plugin dependency mapping, database query profiling, and a heatmap session review to understand where users were dropping off. The findings guided every decision that followed.
        </p>
        <h3>Custom Theme from Scratch</h3>
        <p>
          We stripped Elementor entirely and built a lean custom WordPress child theme. No page builder, no visual composer, no drag-and-drop overhead. Every template — shop, product, cart, checkout, account — written directly in PHP with minimal JavaScript.
        </p>
        <h3>WooCommerce Optimisation</h3>
        <p>
          We trimmed the plugin count from 47 to 18, replacing plugin bundles with purpose-built functions. The checkout flow was rebuilt as a single-page experience with inline validation. The product image galleries were lazy-loaded with native WebP delivery through Cloudflare.
        </p>
        <h3>Performance Architecture</h3>
        <p>
          WP Rocket handles page caching and CSS/JS minification. Cloudflare sits in front for CDN and DDoS protection. Database tables were cleaned, orphaned rows removed, and auto-draft revisions limited. Load time dropped from 6.4 seconds to 2.1 seconds in the first week.
        </p>

        <h2>Design Direction</h2>
        <p>
          The new design was rooted in the brand's existing palette — warm neutrals, generous whitespace, editorial product photography. We replaced the busy homepage carousel with a hero that loaded a single optimised image and a direct category entry point. The navigation was simplified from 11 items to 5.
        </p>

        <h2>Results</h2>
        <p>
          Within thirty days of launch, mobile conversion rate had more than doubled. Cart abandonment dropped by 40%. The team reported the highest single-day revenue in the store's history in week three. They've since moved to a monthly retainer for SEO content, new collection pages, and conversion testing.
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
