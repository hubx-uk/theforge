"use client";
import { useState } from "react";
import Link from "next/link";

export const PLANS = [
  {
    name: "Spark",
    price: "$999",
    period: "one-time",
    retainer: { monthly: "$199", annual: "$179" },
    tagline: "Ignite your online presence",
    desc: "A focused landing page or one-page site to get a small business online fast.",
    features: [
      "Up to 5 pages",
      "Mobile-first responsive design",
      "Contact form + basic integrations",
      "On-page SEO setup",
      "Google Analytics configured",
      "1 revision round",
      "7-day delivery",
      "30-day post-launch support",
    ],
    cta: "Ignite Now",
    href: "/get-started?plan=spark",
    highlight: false,
  },
  {
    name: "Ember",
    price: "$2,499",
    period: "one-time",
    retainer: { monthly: "$399", annual: "$359" },
    tagline: "Fan the flame of growth",
    desc: "A full marketing site with the content and structure growing businesses need.",
    features: [
      "Up to 12 pages",
      "Custom UI design",
      "Next.js + Tailwind build",
      "Blog / CMS integration",
      "Lead-gen forms & email capture",
      "Advanced on-page SEO",
      "Social media asset kit",
      "2 revision rounds",
      "14-day delivery",
      "60-day priority support",
    ],
    cta: "Fan the Flame",
    href: "/get-started?plan=ember",
    highlight: false,
  },
  {
    name: "Blaze",
    price: "$4,999",
    period: "one-time",
    retainer: { monthly: "$799", annual: "$719" },
    tagline: "Burn past the competition",
    desc: "Full web apps with custom functionality — the most popular tier for SMBs scaling up.",
    features: [
      "Unlimited pages or core workflows",
      "Next.js + Supabase full-stack",
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
    cta: "Blaze Forward",
    href: "/get-started?plan=blaze",
    highlight: true,
  },
  {
    name: "Inferno",
    price: { monthly: "$1,499", annual: "$1,339" },
    period: "/month",
    tagline: "Unstoppable monthly momentum",
    desc: "An ongoing partnership — shipping features, running campaigns, and growing your business every single month.",
    features: [
      "Everything in Blaze",
      "Unlimited small edits & fixes",
      "Monthly new feature delivery",
      "Paid ads management (Meta + Google)",
      "Monthly SEO reporting & link building",
      "Email marketing campaigns",
      "Social content production",
      "Priority Slack channel",
      "Monthly growth report",
      "Dedicated project manager",
    ],
    cta: "Go Inferno",
    href: "/get-started?plan=inferno",
    highlight: false,
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        {(["monthly", "annual"] as const).map((b) => (
          <button
            key={b}
            onClick={() => setBilling(b)}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
            style={{
              background:
                billing === b ? "var(--accent)" : "var(--bg-elevated)",
              color: billing === b ? "#fff" : "var(--text-muted)",
              border: "1.5px solid",
              borderColor:
                billing === b ? "var(--accent)" : "var(--border-hover)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {b === "monthly" ? "One-time / Monthly" : "Annual (10% off)"}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className="relative rounded-2xl p-7 flex flex-col gap-5"
            style={{
              background: plan.highlight
                ? "var(--bg-elevated)"
                : "var(--bg-surface)",
              border: `1.5px solid ${plan.highlight ? "var(--accent)" : "var(--border)"}`,
              boxShadow: plan.highlight
                ? "0 0 40px var(--accent-glow)"
                : "none",
            }}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="btn-fire text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {plan.name}
              </h3>
              <p
                className="text-xs"
                style={{
                  color: "var(--accent)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {plan.tagline}
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {plan.desc}
              </p>
            </div>
            <div className="flex items-end gap-1">
              <span
                className="text-3xl font-black"
                style={{ color: "var(--text-primary)" }}
              >
                {typeof plan.price !== "string"
                  ? plan.price[billing]
                  : plan.price}
              </span>
              <span
                className="text-sm mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                {plan.period}
              </span>
            </div>
            {plan.retainer && (
              <span
                className="text-sm mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                * opt-in monthly retainer of {plan.retainer[billing]}
              </span>
            )}
            <ul className="flex flex-col gap-3 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--accent)" }} className="shrink-0">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={`py-3 rounded-xl text-sm font-bold text-center transition-all ${plan.highlight ? "btn-fire" : "btn-ghost"}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <p
        className="text-center text-sm mt-8"
        style={{ color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}
      >
        All prices in USD · Custom enterprise pricing available ·{" "}
        <Link href="/contact" style={{ color: "var(--accent)" }}>
          Talk to us →
        </Link>
      </p>
    </section>
  );
}
