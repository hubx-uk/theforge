import PageShell from "@/components/PageShell";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { formatDate } from "@/lib/utils";

export const revalidate = 60; // cached for up to 1 min

const TAG_COLORS: Record<string, string> = {
  Engineering: "#4F46E5",
  Design: "var(--accent)",
  SEO: "#10B981",
  Process: "#F59E0B",
};

export default async function BlogPage() {
  const { data: posts } = await supabaseAdmin
    .from("blog_posts")
    .select("slug, title, excerpt, tag, read_time, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <PageShell>
      <section className="page-hero max-w-4xl mx-auto px-6 text-center">
        <span className="section-label">The Forge Blog</span>
        <h1
          className="text-5xl md:text-6xl font-black mb-6"
          style={{ letterSpacing: "-0.04em", color: "var(--text-primary)" }}
        >
          Ideas Worth <span className="text-fire">Building On</span>
        </h1>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          Engineering deep-dives, design principles, and growth tactics from the
          studio floor.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-28">
        <div className="flex flex-col gap-6">
          {(posts ?? []).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${TAG_COLORS[post.tag] ?? "#6B7280"}20`,
                      color: TAG_COLORS[post.tag] ?? "#6B7280",
                    }}
                  >
                    {post.tag}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {formatDate(post.created_at)} · {post.read_time}
                  </span>
                </div>
                <h2
                  className="text-xl font-bold mb-2 group-hover:text-fire transition-colors"
                  style={{
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {post.title}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {post.excerpt}
                </p>
              </div>
              <div
                className="shrink-0 flex items-center gap-1 text-sm font-semibold transition-all group-hover:translate-x-1"
                style={{ color: "var(--accent)", whiteSpace: "nowrap" }}
              >
                Read →
              </div>
            </Link>
          ))}
          {(posts ?? []).length === 0 && (
            <p
              className="text-center py-20 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              No articles published yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </PageShell>
  );
}
