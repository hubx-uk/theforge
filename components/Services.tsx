"use client";

import Link from "next/link";

import {
  BarChart3,
  FileText,
  Gauge,
  Megaphone,
  PanelsTopLeft,
  Search,
  ShoppingBag,
  Smartphone,
  Workflow,
} from "lucide-react";

const SERVICE_GROUPS = [
  {
    title: "Development",
    eyebrow: "Build",
    services: [
      {
        icon: PanelsTopLeft,
        title: "Web apps",
        desc: "Fast, scalable digital products with the right foundations for authentication, data and growth.",
        href: "/services/web-apps",
      },
      {
        icon: Smartphone,
        title: "Mobile apps",
        desc: "Focused iOS and Android experiences that make the important action feel effortless.",
        href: "/services/mobile-apps",
      },
      {
        icon: ShoppingBag,
        title: "E-commerce",
        desc: "Conversion-minded Shopify and WooCommerce stores that your team can confidently operate.",
        href: "/services/ecommerce",
      },
    ],
  },
  {
    title: "Marketing",
    eyebrow: "Grow",
    services: [
      {
        icon: Search,
        title: "SEO",
        desc: "Technical foundations, search strategy and useful content designed to compound over time.",
        href: "/services/seo",
      },
      {
        icon: Megaphone,
        title: "Paid ads",
        desc: "Tightly managed campaigns, clear creative testing and reporting tied to business outcomes.",
        href: "/services/paid-ads",
      },
      {
        icon: FileText,
        title: "Content",
        desc: "A repeatable content system that turns your expertise into trust, traffic and action.",
        href: "/services/content",
      },
    ],
  },
  {
    title: "Workflow",
    eyebrow: "Scale",
    services: [
      {
        icon: Workflow,
        title: "Automation",
        desc: "Connected tools and dependable workflows that remove repetitive work from your week.",
        href: "/services/automation",
      },
      {
        icon: Gauge,
        title: "CRM setup",
        desc: "A tidy sales system with useful stages, ownership and follow-up built into the process.",
        href: "/services/crm-setup",
      },
      {
        icon: BarChart3,
        title: "Analytics",
        desc: "Decision-ready dashboards and tracking that tell you what happened and what to do next.",
        href: "/services/analytics",
      },
    ],
  },
];

export default function Services() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-6">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="section-label">What We Do</span>
          <h2
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
          >
            Build it. Grow it.
            <br />
            <span className="text-fire">Make it run better.</span>
          </h2>
        </div>
        <p
          className="max-w-md text-sm leading-6"
          style={{ color: "var(--text-secondary)" }}
        >
          Development, marketing and workflow expertise in one joined-up team —
          so your product, demand and operations improve together.
        </p>
      </div>

      <div className="space-y-10">
        {SERVICE_GROUPS.map((group) => (
          <div key={group.title}>
            <div className="mb-4 flex items-baseline gap-3">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "var(--accent)" }}
              >
                {group.eyebrow}
              </span>
              <h3
                className="text-lg font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {group.title}
              </h3>
            </div>
            <div
              className="grid overflow-hidden rounded-2xl md:grid-cols-3"
              style={{ background: "var(--border)", gap: 1 }}
            >
              {group.services.map(({ icon: Icon, title, desc, href }) => (
                <Link
                  key={title}
                  href={href}
                  className="group flex flex-col gap-4 p-8 transition-colors hover:bg-[var(--bg-elevated)]"
                  style={{ background: "var(--bg-surface)" }}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: "var(--accent-glow)",
                      color: "var(--accent)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4
                    className="text-xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {title}
                  </h4>
                  <p
                    className="flex-1 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {desc}
                  </p>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    Explore →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="text-sm font-bold"
          style={{ color: "var(--accent)" }}
        >
          Explore every capability →
        </Link>
      </div>
    </section>
  );
}
