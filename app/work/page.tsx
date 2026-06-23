import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CTA from "@/components/CTA";

export const metadata: Metadata = { title: "Work — theforge" };

const CASE_STUDIES = [
  {
    slug: "jovico",
    client: "Jovico World",
    title: "E-Mobility Platform for Nigeria's EV & Solar Retailer",
    description:
      "Full-stack Next.js storefront, bespoke admin dashboard, and customer portal for an electric mobility and solar retail brand. Ongoing Inferno retainer.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Custom Admin"],
    industry: "E-Mobility / Clean Energy",
    tier: "Inferno",
    color: "#FE7F2D",
  },
  {
    slug: "fabrica",
    client: "Fabrica — A Kace Technologies Company",
    title: "Construction CMS, Client Portal & Quote Management",
    description:
      "End-to-end platform for a construction firm — CMS for ops, client-facing project tracker, and a quote builder with PDF export and online approvals.",
    tags: ["Next.js", "Supabase", "Shadcn UI", "Stripe"],
    industry: "Construction & Infrastructure",
    tier: "Blaze",
    color: "#D9591A",
  },
  {
    slug: "manella",
    client: "Manella Stores",
    title: "WooCommerce Rebuild That Doubled Mobile Conversion",
    description:
      "Stripped a bloated Elementor site, built a lean custom WooCommerce theme from scratch, and cut load times from 6.4s to 2.1s. Mobile conversion rate more than doubled.",
    tags: ["WooCommerce", "PHP", "Custom Theme", "Performance"],
    industry: "E-Commerce / Retail",
    tier: "Ember",
    color: "#6366F1",
  },
  {
    slug: "cobalt-consulting",
    client: "Cobalt Consulting",
    title: "Corporate Website & Brand Presence",
    description:
      "A sharp, performant marketing site for a management consulting firm. Built with speed and authority in mind.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    industry: "Consulting",
    tier: "Spark",
    color: "#0EA5E9",
  },
  {
    slug: "vertex-ai",
    client: "Vertex AI Solutions",
    title: "SaaS Landing Page & Waitlist",
    description:
      "Launch-ready landing page with animated feature sections, pricing, and a waitlist capture backed by Supabase.",
    tags: ["Next.js", "Supabase", "Framer Motion"],
    industry: "SaaS / AI",
    tier: "Spark",
    color: "#10B981",
  },
];

const TIER_COLOR: Record<string, string> = {
  Spark: "#94A3B8",
  Ember: "#F59E0B",
  Blaze: "#FE7F2D",
  Inferno: "#D9591A",
};

export default function WorkPage() {
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
        <div className="flex flex-col gap-6">
          {CASE_STUDIES.map((cs) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="group rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start transition-all"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                textDecoration: "none",
              }}
            >
              {/* Color swatch */}
              <div
                className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center text-2xl"
                style={{
                  background: `${cs.color}15`,
                  border: `1px solid ${cs.color}30`,
                }}
              >
                {cs.industry.includes("Mobility")
                  ? "⚡"
                  : cs.industry.includes("Construction")
                    ? "🏗️"
                    : cs.industry.includes("Commerce")
                      ? "🛍️"
                      : cs.industry.includes("SaaS")
                        ? "🤖"
                        : "💼"}
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
                      background: `${TIER_COLOR[cs.tier]}15`,
                      color: TIER_COLOR[cs.tier],
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
                  {cs.tags.map((t) => (
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
      </section>

      <CTA />
    </PageShell>
  );
}
