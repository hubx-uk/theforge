import PageShell from '@/components/PageShell';
import Link from 'next/link';

const POSTS = [
  { slug: 'nextjs-supabase-auth', title: 'Setting Up Auth in 20 Minutes with Next.js + Supabase', excerpt: 'A step-by-step guide to adding magic-link and OAuth authentication to your Next.js app using Supabase Auth.', date: 'May 28, 2026', readTime: '6 min read', tag: 'Engineering' },
  { slug: 'stripe-subscriptions-guide', title: 'The Complete Guide to Stripe Subscriptions in 2026', excerpt: 'From creating products to handling webhooks and cancellations — everything you need to ship recurring billing.', date: 'May 14, 2026', readTime: '9 min read', tag: 'Engineering' },
  { slug: 'web-design-conversion', title: '7 Web Design Principles That Actually Improve Conversions', excerpt: 'The design decisions that consistently move the needle on conversion rates — backed by real A/B test data.', date: 'April 30, 2026', readTime: '5 min read', tag: 'Design' },
  { slug: 'technical-seo-nextjs', title: 'Technical SEO for Next.js: The 2026 Checklist', excerpt: 'Core Web Vitals, metadata, sitemaps, structured data — the full checklist to rank your Next.js site.', date: 'April 18, 2026', readTime: '7 min read', tag: 'SEO' },
  { slug: 'supabase-rls-patterns', title: 'Row Level Security Patterns Every SaaS Should Know', excerpt: 'Practical RLS patterns for multi-tenant apps, team workspaces, and public/private resource sharing.', date: 'April 3, 2026', readTime: '8 min read', tag: 'Engineering' },
  { slug: 'fast-website-launch', title: 'How We Launch Websites in 5 Days (Without Cutting Corners)', excerpt: 'Our internal process for rapid, high-quality web launches — from kickoff call to live URL.', date: 'March 20, 2026', readTime: '4 min read', tag: 'Process' },
];

const TAG_COLORS: Record<string, string> = {
  Engineering: '#4F46E5',
  Design: 'var(--accent)',
  SEO: '#10B981',
  Process: '#F59E0B',
};

export default function BlogPage() {
  return (
    <PageShell>
      <section className="page-hero max-w-4xl mx-auto px-6 text-center">
        <span className="section-label">The Forge Blog</span>
        <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
          Ideas Worth <span className="text-fire">Building On</span>
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Engineering deep-dives, design principles, and growth tactics from the studio floor.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-28">
        <div className="flex flex-col gap-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${TAG_COLORS[post.tag]}20`, color: TAG_COLORS[post.tag] }}
                  >
                    {post.tag}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{post.date} · {post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-fire transition-colors" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
              </div>
              <div
                className="shrink-0 flex items-center gap-1 text-sm font-semibold transition-gap"
                style={{ color: 'var(--accent)', whiteSpace: 'nowrap' }}
              >
                Read →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
