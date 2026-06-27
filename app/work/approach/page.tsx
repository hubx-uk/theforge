import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Hammer,
  RefreshCw,
  Rocket,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import CTA from "@/components/CTA";

export const metadata: Metadata = { title: "Our Approach • theforge" };

const PHASES = [
  {
    number: "01",
    title: "Diagnose",
    text: "We map the real constraint, the people affected and the outcome worth measuring before prescribing a solution.",
    icon: Search,
  },
  {
    number: "02",
    title: "Build",
    text: "We work in small, visible increments so useful feedback shapes the product while it is still inexpensive to act on.",
    icon: Hammer,
  },
  {
    number: "03",
    title: "Launch",
    text: "We release deliberately, prepare your team and watch the moments that matter instead of treating launch day as the finish line.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Measure & refine",
    text: "We compare reality with the original goal, improve weak points and document what the evidence teaches us.",
    icon: SlidersHorizontal,
  },
];

export default function ApproachPage() {
  return (
    <PageShell>
      <section className="page-hero max-w-4xl mx-auto px-6 text-center">
        <span className="section-label">Our Approach</span>
        <h1
          className="text-5xl md:text-6xl font-black mb-6"
          style={{ letterSpacing: "-0.04em", color: "var(--text-primary)" }}
        >
          One system.
          <br />
          <span className="text-fire">Continuous progress.</span>
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Four focused phases form one continuous loop: diagnose, build, launch,
          then measure and refine. What we learn becomes the next, sharper
          diagnosis.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div
          className="grid gap-px overflow-hidden rounded-3xl md:grid-cols-2"
          style={{ background: "var(--border)" }}
        >
          {PHASES.map(({ number, title, text, icon: Icon }) => (
            <article
              key={title}
              className="p-8 md:p-10"
              style={{ background: "var(--bg-surface)" }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    color: "var(--accent)",
                    background: "var(--accent-glow)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className="text-xs font-bold tracking-[0.18em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {number}
                </span>
              </div>
              <h2
                className="text-2xl font-black"
                style={{
                  color: "var(--text-primary)",
                  letterSpacing: "-0.03em",
                }}
              >
                {title}
              </h2>
              <p
                className="mt-3 text-sm leading-7"
                style={{ color: "var(--text-secondary)" }}
              >
                {text}
              </p>
            </article>
          ))}
        </div>

        <div
          className="mt-6 flex flex-col items-start gap-5 rounded-3xl p-8 md:flex-row md:items-center"
          style={{
            background: "var(--accent-glow)",
            border: "1px solid var(--border)",
          }}
        >
          <RefreshCw
            className="h-7 w-7 shrink-0"
            style={{ color: "var(--accent)" }}
          />
          <div className="flex-1">
            <h2 className="font-bold" style={{ color: "var(--text-primary)" }}>
              Then we repeat — with better information.
            </h2>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              The loop keeps the work grounded in evidence and makes every new
              investment more precise than the last.
            </p>
          </div>
          <Link
            href="/work"
            className="flex items-center gap-2 text-sm font-bold"
            style={{ color: "var(--accent)" }}
          >
            See it in practice <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <CTA />
    </PageShell>
  );
}
