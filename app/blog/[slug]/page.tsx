import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const revalidate = 60;

/* ─── Ultra-robust dependency-free markdown parser ─────── */
function NativeMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const rendered: React.ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      rendered.push(
        <ul
          key={`list-${rendered.length}`}
          className="list-disc pl-5 my-4 space-y-2 text-sm text-secondary"
        >
          {listItems.map((item, idx) => (
            <li
              key={idx}
              className="leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>,
      );
      listItems = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check list item
    if (line.startsWith("* ") || line.startsWith("- ")) {
      listItems.push(line.slice(2));
      continue;
    } else {
      flushList();
    }

    if (line === "") {
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      rendered.push(
        <h3
          key={i}
          className="text-lg font-bold mt-6 mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {parseInlineMarkdown(line.slice(4))}
        </h3>,
      );
    } else if (line.startsWith("## ")) {
      rendered.push(
        <h2
          key={i}
          className="text-2xl font-black mt-8 mb-4 border-b pb-2"
          style={{ color: "var(--text-primary)", borderColor: "var(--border)" }}
        >
          {parseInlineMarkdown(line.slice(3))}
        </h2>,
      );
    } else if (line.startsWith("# ")) {
      rendered.push(
        <h1
          key={i}
          className="text-3xl font-black mt-10 mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          {parseInlineMarkdown(line.slice(2))}
        </h1>,
      );
    } else {
      // Normal Paragraph
      rendered.push(
        <p
          key={i}
          className="my-4 text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {parseInlineMarkdown(line)}
        </p>,
      );
    }
  }
  flushList();

  return <div className="prose-forge">{rendered}</div>;
}

// Support bold (**text**) and inline code (`code`)
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let i = 0;

  while (i < text.length) {
    if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        parts.push(
          <strong
            key={i}
            className="font-bold text-primary"
            style={{ color: "var(--text-primary)" }}
          >
            {text.slice(i + 2, end)}
          </strong>,
        );
        i = end + 2;
        continue;
      }
    }
    if (text.startsWith("`", i)) {
      const end = text.indexOf("`", i + 1);
      if (end !== -1) {
        parts.push(
          <code
            key={i}
            className="px-1.5 py-0.5 rounded font-mono text-xs"
            style={{ background: "var(--bg-elevated)", color: "var(--accent)" }}
          >
            {text.slice(i + 1, end)}
          </code>,
        );
        i = end + 1;
        continue;
      }
    }
    parts.push(text[i]);
    i++;
  }

  return parts;
}

/* ─── Page component ───────────────────────────────────── */
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: post } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) {
    notFound();
  }

  return (
    <PageShell>
      <article className="max-w-3xl mx-auto px-6 pt-36 pb-28">
        {/* Back Link */}
        <Link
          href="/blog"
          className="text-xs font-semibold uppercase tracking-wider mb-8 inline-block transition-colors hover:text-fire"
          style={{ color: "var(--text-muted)" }}
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{
                background: "var(--accent-glow)",
                color: "var(--accent)",
              }}
            >
              {post.tag}
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {formatDate(post.created_at)} · {post.read_time}
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-black mb-6 leading-tight"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.04em" }}
          >
            {post.title}
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.excerpt}
          </p>
        </header>

        <div className="divider mb-10" />

        {/* Body content */}
        <main className="space-y-4">
          <NativeMarkdown content={post.body} />
        </main>
      </article>
    </PageShell>
  );
}
