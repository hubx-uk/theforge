import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { formatDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export const revalidate = 60;

const TAG_COLORS: Record<string, string> = {
  Engineering: '#4F46E5',
  Design: 'var(--accent)',
  SEO: '#10B981',
  Process: '#F59E0B',
};

export default async function RecentBlog() {
  const { data: posts } = await supabaseAdmin
    .from('blog_posts')
    .select('slug, title, excerpt, tag, read_time, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(4);

  if (!posts || posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section
      style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border)' }}
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="section-label">From the Studio</span>
            <h2
              className="text-4xl md:text-5xl font-black"
              style={{ letterSpacing: '-0.03em', color: 'var(--text-primary)' }}
            >
              Latest <span className="text-fire">Insights</span>
            </h2>
            <p
              className="mt-3 max-w-lg text-sm"
              style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}
            >
              Engineering deep-dives, design principles, and growth tactics from the forge floor.
            </p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-semibold shrink-0 transition-all hover:gap-3"
            style={{ color: 'var(--accent)' }}
          >
            View all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid: featured left + 3 stacked right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Featured post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="lg:col-span-3 group rounded-2xl p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden transition-all duration-300"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Glow accent */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 40% at 10% 90%, rgba(254,127,45,0.08) 0%, transparent 70%)',
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${TAG_COLORS[featured.tag] ?? '#6B7280'}20`,
                    color: TAG_COLORS[featured.tag] ?? '#6B7280',
                  }}
                >
                  {featured.tag}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {formatDate(featured.created_at)} · {featured.read_time}
                </span>
              </div>
              <h3
                className="text-2xl font-bold leading-snug group-hover:text-fire transition-colors mb-3"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
              >
                {featured.title}
              </h3>
              <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                {featured.excerpt}
              </p>
            </div>
            <div
              className="relative z-10 mt-6 flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:translate-x-1"
              style={{ color: 'var(--accent)' }}
            >
              Read article <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* 3 smaller cards stacked */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl p-6 flex flex-col justify-between flex-1 relative overflow-hidden transition-all duration-300"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 50% at 10% 90%, rgba(254,127,45,0.07) 0%, transparent 70%)',
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${TAG_COLORS[post.tag] ?? '#6B7280'}20`,
                        color: TAG_COLORS[post.tag] ?? '#6B7280',
                      }}
                    >
                      {post.tag}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {post.read_time}
                    </span>
                  </div>
                  <h3
                    className="text-base font-bold leading-snug group-hover:text-fire transition-colors mb-1.5"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {post.excerpt}
                  </p>
                </div>
                <div
                  className="relative z-10 mt-4 flex items-center gap-1 text-xs font-semibold transition-all group-hover:translate-x-1"
                  style={{ color: 'var(--accent)' }}
                >
                  Read → 
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
