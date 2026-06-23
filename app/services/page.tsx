import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Gauge,
  Megaphone,
  PanelsTopLeft,
  Search,
  ShoppingBag,
  Smartphone,
  Workflow,
  FileText,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import CTA from "@/components/CTA";

export const metadata: Metadata = { title: "Services — theforge" };

const GROUPS = [
  {
    title: "Development",
    intro:
      "Useful, durable software built around the way your customers actually behave.",
    services: [
      {
        id: "web-apps",
        icon: PanelsTopLeft,
        title: "Web apps",
        desc: "Full-stack digital products with the right foundations for authentication, data and scale.",
        href: "/services/web-apps",
      },
      {
        id: "mobile-apps",
        icon: Smartphone,
        title: "Mobile apps",
        desc: "Focused iOS and Android experiences that make the important action feel effortless.",
        href: "/services/mobile-apps",
      },
      {
        id: "e-commerce",
        icon: ShoppingBag,
        title: "E-commerce solutions",
        desc: "Conversion-minded Shopify and WooCommerce stores that your team can confidently operate.",
        href: "/services/ecommerce",
      },
    ],
  },
  {
    title: "Marketing",
    intro:
      "A practical growth engine that connects visibility, attention and measurable demand.",
    services: [
      {
        id: "seo",
        icon: Search,
        title: "SEO",
        desc: "Technical foundations, search strategy and useful content designed to compound over time.",
        href: "/services/seo",
      },
      {
        id: "paid-ads",
        icon: Megaphone,
        title: "Paid ads",
        desc: "Tightly managed campaigns, clear creative testing and reporting tied to business outcomes.",
        href: "/services/paid-ads",
      },
      {
        id: "content",
        icon: FileText,
        title: "Content",
        desc: "A repeatable content system that turns your expertise into trust, traffic and action.",
        href: "/services/content",
      },
    ],
  },
  {
    title: "Workflow",
    intro:
      "Less operational drag, cleaner customer data and a sharper view of what is working.",
    services: [
      {
        id: "automation",
        icon: Workflow,
        title: "Automation",
        desc: "Connected tools and dependable workflows that remove repetitive work from your week.",
        href: "/services/automation",
      },
      {
        id: "crm-setup",
        icon: Gauge,
        title: "CRM setup",
        desc: "A tidy sales system with useful stages, ownership and follow-up built into the process.",
        href: "/services/crm-setup",
      },
      {
        id: "analytics",
        icon: BarChart3,
        title: "Analytics",
        desc: "Decision-ready dashboards and tracking that tell you what happened and what to do next.",
        href: "/services/analytics",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="page-hero max-w-4xl mx-auto px-6 text-center">
        <span className="section-label">Our Services</span>
        <h1
          className="mb-6 text-5xl font-black md:text-6xl"
          style={{ letterSpacing: "-0.04em", color: "var(--text-primary)" }}
        >
          Build it. Grow it.
          <br />
          <span className="text-fire">Make it run better.</span>
        </h1>
        <p
          className="max-w-2xl mx-auto text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Development, marketing and workflow expertise in one joined-up team —
          so the product, the demand and the operation improve together.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 space-y-16">
        {GROUPS.map((group, groupIndex) => (
          <div key={group.title}>
            <div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-end mb-6">
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ color: "var(--accent)" }}
                >
                  0{groupIndex + 1}
                </span>
                <h2
                  className="mt-1 text-2xl font-black"
                  style={{
                    color: "var(--text-primary)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {group.title}
                </h2>
              </div>
              <p
                className="max-w-xl text-sm leading-6"
                style={{ color: "var(--text-muted)" }}
              >
                {group.intro}
              </p>
            </div>
            <div
              className="grid overflow-hidden rounded-3xl md:grid-cols-3"
              style={{ background: "var(--border)", gap: 1 }}
            >
              {group.services.map(({ id, icon: Icon, title, desc, href }) => (
                <Link
                  id={id}
                  key={title}
                  href={href}
                  className="group scroll-mt-28 p-7 transition-colors hover:bg-[var(--bg-elevated)]"
                  style={{ background: "var(--bg-surface)" }}
                >
                  <span
                    className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      background: "var(--accent-glow)",
                      color: "var(--accent)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="mt-2 min-h-16 text-sm leading-6"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {desc}
                  </p>
                  <span
                    className="mt-5 block text-xs font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    Explore service →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <CTA />
    </PageShell>
  );
}
