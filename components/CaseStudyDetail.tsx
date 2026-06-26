import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import PageShell from "@/components/PageShell";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

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
            className="font-bold"
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
            style={{
              background: "var(--bg-elevated)",
              color: "var(--accent)",
            }}
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

function NativeMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const rendered: React.ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length === 0) return;

    rendered.push(
      <ul
        key={`list-${rendered.length}`}
        className="list-disc pl-5 my-4 space-y-2 text-sm"
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

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (line.startsWith("* ") || line.startsWith("- ")) {
      listItems.push(line.slice(2));
      return;
    }

    flushList();
    if (line === "") return;

    if (line.startsWith("### ")) {
      rendered.push(
        <h3
          key={index}
          className="text-lg font-bold mt-6 mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {parseInlineMarkdown(line.slice(4))}
        </h3>,
      );
      return;
    }

    if (line.startsWith("## ")) {
      rendered.push(
        <h2
          key={index}
          className="text-2xl font-black mt-8 mb-4 border-b pb-2"
          style={{ color: "var(--text-primary)", borderColor: "var(--border)" }}
        >
          {parseInlineMarkdown(line.slice(3))}
        </h2>,
      );
      return;
    }

    if (line.startsWith("# ")) {
      rendered.push(
        <h1
          key={index}
          className="text-3xl font-black mt-10 mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          {parseInlineMarkdown(line.slice(2))}
        </h1>,
      );
      return;
    }

    rendered.push(
      <p
        key={index}
        className="my-4 text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {parseInlineMarkdown(line)}
      </p>,
    );
  });

  flushList();

  return <div className="prose-forge">{rendered}</div>;
}

export async function CaseStudyDetail({ slug }: { slug: string }) {
  const { data: caseStudy } = await supabaseAdmin
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!caseStudy) notFound();

  const tags = (caseStudy.tags ?? []) as string[];

  return (
    <PageShell>
      <article>
        <section className="page-hero max-w-4xl mx-auto px-6">
          <Link
            href="/work"
            className="text-xs font-semibold uppercase tracking-wider mb-8 inline-block transition-colors hover:text-fire"
            style={{ color: "var(--text-muted)" }}
          >
            Back to Work
          </Link>
          <span className="section-label">Case Study / {caseStudy.client}</span>
          <h1
            className="text-5xl md:text-6xl font-black mb-6"
            style={{
              letterSpacing: "-0.04em",
              color: "var(--text-primary)",
            }}
          >
            {caseStudy.title}
          </h1>
          <p
            className="text-xl max-w-2xl"
            style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}
          >
            {caseStudy.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {caseStudy.industry}
            </span>
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: `${caseStudy.color}18`,
                color: caseStudy.color,
                border: `1px solid ${caseStudy.color}33`,
              }}
            >
              {caseStudy.tier} Tier
            </span>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 pb-20">
          <NativeMarkdown content={caseStudy.body || caseStudy.description} />
        </section>

        {tags.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 pb-24">
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "var(--text-muted)" }}
              >
                Technology Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1.5 rounded-xl font-medium"
                    style={{
                      background: "var(--bg-elevated)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTA />
    </PageShell>
  );
}
