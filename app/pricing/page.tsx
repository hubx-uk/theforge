import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CTA from "@/components/CTA";

export const metadata: Metadata = { title: "Pricing • theforge" };

const TIERS = [
  {
    name: "Spark",
    tagline: "The first light.",
    description:
      "A focused landing page or single-purpose site for businesses that need a credible web presence fast.",
    icon: "✨",
    oneTime: {
      price: 999,
      label: "One-time project fee",
      cta: "Start with Spark",
    },
    retainer: { price: 199, label: "per month", cta: "Add a Retainer" },
    features: [
      "Up to 5 pages",
      "Source code handoff",
      "Mobile-first responsive design",
      "Contact form + basic integrations",
      "Google Analytics configuration",
      "On-page SEO setup",
      "1 revision round",
      "7-day delivery",
      "30-day post-launch support",
    ],
    highlighted: false,
  },
  {
    name: "Ember",
    tagline: "Catching, steady, real.",
    description:
      "A full marketing site — the content, structure, and SEO foundation a growing business runs on.",
    icon: "🔥",
    oneTime: {
      price: 2499,
      label: "One-time project fee",
      cta: "Start with Ember",
    },
    retainer: { price: 399, label: "per month", cta: "Add a Retainer" },
    features: [
      "Up to 12 pages",
      "Custom UI design",
      "Next.js + Tailwind build",
      "Blog / CMS integration",
      "Analytics & search console setup",
      "Lead-gen forms & email capture",
      "Social media asset kit",
      "Advanced on-page SEO",
      "2 revision rounds",
      "14-day delivery",
      "60-day priority support",
    ],
    highlighted: false,
  },
  {
    name: "Blaze",
    tagline: "When you mean business.",
    description:
      "Full-featured web applications for growing companies — custom design, multi-page flows, auth, and real integrations.",
    icon: "⚡",
    oneTime: {
      price: 4999,
      label: "One-time project fee",
      cta: "Start with Blaze",
    },
    retainer: { price: 799, label: "per month", cta: "Add a Retainer" },
    features: [
      "Unlimited pages or core product flows",
      "Next.js + Supabase build",
      "Auth & user accounts",
      "Stripe payments & subscriptions",
      "Admin dashboard included",
      "Advanced SEO + sitemap",
      "Email automation setup",
      "Performance monitoring",
      "3 revision rounds",
      "21-day delivery",
      "90-day priority support",
    ],
    highlighted: true,
  },
  {
    name: "Inferno",
    tagline: "Always burning, always building.",
    description:
      "Complex platforms, custom systems, and ongoing partnerships. Quoted individually — every scope is different.",
    icon: "🌋",
    oneTime: {
      price: null,
      label: "Starts from $4,999 — quoted per project",
      cta: "Request a Quote",
    },
    retainer: { price: 1499, label: "per month", cta: "Start Retainer" },
    features: [
      "Everything in Blaze",
      "Unlimited scope & complexity",
      "Unlimited small edits & fixes",
      "Architecture & system design",
      "Monthly new feature delivery",
      "Full-stack with any tech stack",
      "Ongoing SEO & content strategy",
      "Paid ads management (Meta + Google)",
      "Email marketing campaigns",
      "Multi-team collaboration",
      "SLA-backed support",
      // "Priority Slack channel",
      // "Social content production",
      // "Unlimited scope & complexity",
      // "Monthly SEO reporting & link building",
      "Monthly growth review call",
      "Quarterly strategy reviews",
      "Dedicated project manager",
    ],
    highlighted: false,
  },
];

const FAQS = [
  {
    q: "Can I cancel my retainer at any time?",
    a: "Yes — all retainers are opt-in and cancellable at any time at no cost. There are no lock-in periods, cancellation fees, or penalties. Just give us a heads-up and we'll wrap cleanly.",
  },
  {
    q: "What if my project is bigger than Blaze but I'm unsure about Inferno?",
    a: "Reach out and describe your scope. We'll recommend the right tier and can split large Blaze builds into phased milestones to keep things manageable.",
  },
  {
    q: "Is the one-time fee separate from the retainer?",
    a: "Yes. The one-time fee covers your initial build or feature. The retainer is optional — for ongoing work like new features, updates, fixes, and monitoring after launch.",
  },
  {
    q: "What does a retainer actually include?",
    a: "Each month you get a set number of development or marketing hours, priority access to the team, bug fixes, minor feature additions, performance checks, and a monthly progress report.",
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely. We work with small and medium-sized businesses across Africa, Europe, North America, and beyond. Payments accepted in USD via Stripe, bank transfer, or other arrangements on request.",
  },
  {
    q: "How quickly can you start?",
    a: "We typically onboard new Spark and Ember clients within 3–5 business days. Blaze and Inferno engagements begin with a scoping call, usually within a week of first contact.",
  },
];

export default function PricingPage() {
  // const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <PageShell>
      <section className="page-hero max-w-4xl mx-auto px-6 text-center">
        <span className="section-label">Pricing</span>
        <h1
          className="mb-6 text-5xl font-black md:text-6xl"
          style={{ letterSpacing: "-0.04em", color: "var(--text-primary)" }}
        >
          Transparent pricing.
          <br />
          <span className="text-fire">No dark patterns.</span>
        </h1>
        <p
          className="max-w-2xl mx-auto text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Four tiers, from a first spark to a permanent flame. Every tier has a
          one-time project fee and an optional monthly retainer for ongoing
          work. Opt in when you need it, cancel any time — no fees, no lock-in.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-4 gap-6 items-start">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="rounded-3xl overflow-hidden flex flex-col"
              style={{
                background: "var(--bg-surface)",
                border: tier.highlighted
                  ? "1.5px solid var(--accent)"
                  : "1px solid var(--border)",
                boxShadow: tier.highlighted
                  ? "0 0 48px var(--accent-glow)"
                  : undefined,
              }}
            >
              {tier.highlighted && (
                <div
                  className="py-2 text-center text-xs font-bold uppercase tracking-widest"
                  style={{
                    background: "var(--accent)",
                    color: "var(--on-accent)",
                  }}
                >
                  Most Popular
                </div>
              )}

              <div className="p-6 pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{tier.icon}</span>
                  <div>
                    <h2
                      className="text-xl font-black"
                      style={{
                        color: "var(--text-primary)",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {tier.name}
                    </h2>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {tier.tagline}
                    </p>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {tier.description}
                </p>
              </div>

              {/* One-time fee */}
              <div className="px-6 pb-3">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    One-Time Project
                  </p>
                  {tier.oneTime.price ? (
                    <div className="flex items-baseline gap-1 mb-1">
                      <span
                        className="text-3xl font-black"
                        style={{
                          color: "var(--text-primary)",
                          letterSpacing: "-0.04em",
                        }}
                      >
                        ${tier.oneTime.price.toLocaleString()}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        one-time
                      </span>
                    </div>
                  ) : (
                    <p
                      className="text-lg font-black mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Custom Quote
                    </p>
                  )}
                  <p
                    className="text-xs mb-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {tier.oneTime.label}
                  </p>
                  <a
                    href="/get-started"
                    className={`block w-full text-center py-2.5 rounded-xl text-sm font-bold transition-all ${tier.highlighted ? "btn-fire" : "btn-ghost"}`}
                  >
                    {tier.oneTime.cta}
                  </a>
                </div>
              </div>

              {/* Retainer */}
              <div className="px-6 pb-6">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <p
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Monthly Retainer
                    </p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: "var(--accent-glow)",
                        color: "var(--accent)",
                      }}
                    >
                      Opt-in
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span
                      className="text-3xl font-black"
                      style={{
                        color: "var(--text-primary)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      ${tier.retainer.price.toLocaleString()}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      /month
                    </span>
                  </div>
                  <p
                    className="text-xs mb-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {tier.retainer.label}
                  </p>
                  <a
                    href="/get-started"
                    className="block w-full text-center py-2.5 rounded-xl text-sm font-bold btn-ghost transition-all"
                  >
                    {tier.retainer.cta}
                  </a>
                </div>
              </div>

              {/* Features */}
              <div className="px-6 pb-7">
                <div className="divider mb-5" />
                <ul className="flex flex-col gap-2.5">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--accent)" }}
                      >
                        —
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center text-sm mt-8"
          style={{ color: "var(--text-muted)" }}
        >
          ✓ All retainers are optional and cancellable at any time — no fees, no
          questions asked.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 pb-24 scroll-mt-28">
        <div className="text-center mb-12">
          <span className="section-label">Common Questions</span>
          <h2
            className="text-3xl md:text-4xl font-black"
            style={{ letterSpacing: "-0.04em", color: "var(--text-primary)" }}
          >
            Pricing FAQ
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {FAQS.map(({ q, a }) => (
            <div
              key={q}
              className="rounded-2xl p-6"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {q}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </PageShell>
  );
}
