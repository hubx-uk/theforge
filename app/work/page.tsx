import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CTA from "@/components/CTA";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const metadata: Metadata = { title: "Work • theforge" };
export const revalidate = 60;

const TIER_COLOR: Record<string, string> = {
  Spark: "#94A3B8",
  Ember: "#F59E0B",
  Blaze: "#FE7F2D",
  Inferno: "#D9591A",
  Custom: "#8B5CF6",
};

const INDUSTRY_EMOJI: Record<string, string> = {
  "E-Mobility": "⚡",
  "Clean Energy": "⚡",
  Construction: "🏗️",
  Infrastructure: "🏗️",
  "E-Commerce": "🛍️",
  DTC: "🛍️",
  Retail: "🛍️",
  SaaS: "🤖",
  AI: "🤖",
  Fintech: "📊",
  Consulting: "💼",
  B2B: "🏢",
  Design: "🎨",
  Creative: "🎨",
};

function getEmoji(industry: string): string {
  const entry = Object.entries(INDUSTRY_EMOJI).find(([key]) =>
    industry.toLowerCase().includes(key.toLowerCase()),
  );
  return entry ? entry[1] : "💼";
}

export default async function WorkPage() {
  const { data: caseStudies, error } = await supabaseAdmin
    .from("case_studies")
    .select("id, slug, client, title, description, industry, tier, color, tags")
    .eq("show_on_work", true)
    .order("sort_order");

  const list = error ? [] : (caseStudies ?? []);

  return (
    <PageShell>
      <section className="page-hero max-w-4xl mx-auto px-6 text-center">
        <span className="section-label">Our Work</span>
        <h1
          className="mb-6 text-5xl font-black md:text-6xl"
          style={{ letterSpacing: "-0.04em", color: "var(--text-primary)" }}
        >
          Built by the forge.
          <br />
          <span className="text-fire">Proven in the wild.</span>
        </h1>
        <p
          className="max-w-2xl mx-auto text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          A selection of client work across e-commerce, SaaS, construction, and
          mobility. Real products, real results.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        {list.length === 0 ? (
          <p
            className="text-center py-20 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No case studies published yet. Check back soon!
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {list.map((cs) => (
              <Link
                key={cs.id}
                href={`/work/${cs.slug}`}
                className="group rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start transition-all"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                }}
              >
                {/* Color swatch / industry icon */}
                <div
                  className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center text-2xl"
                  style={{
                    background: `${cs.color}15`,
                    border: `1px solid ${cs.color}30`,
                  }}
                >
                  {getEmoji(cs.industry)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {cs.client}
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${TIER_COLOR[cs.tier] ?? "#8B5CF6"}15`,
                        color: TIER_COLOR[cs.tier] ?? "#8B5CF6",
                      }}
                    >
                      {cs.tier}
                    </span>
                  </div>
                  <h2
                    className="text-xl font-black mb-2 group-hover:text-fire transition-all"
                    style={{
                      color: "var(--text-primary)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {cs.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {cs.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(cs.tags as string[]).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-lg font-medium"
                        style={{
                          background: "var(--bg-elevated)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 self-center">
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <CTA />
    </PageShell>
  );
}
