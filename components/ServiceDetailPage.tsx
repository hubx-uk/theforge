import Link from "next/link";
import CTA from "./CTA";
import PageShell from "./PageShell";
import type { ServiceDetail } from "@/lib/serviceDetails";

export default function ServiceDetailPage({
  service,
}: {
  service: ServiceDetail;
}) {
  return (
    <PageShell>
      <section className="page-hero mx-auto max-w-4xl px-6 text-center">
        <span className="section-label">
          {service.group} / {service.name}
        </span>
        <h1
          className="mb-6 text-5xl font-black md:text-6xl"
          style={{ letterSpacing: "-0.04em", color: "var(--text-primary)" }}
        >
          {service.headline}{" "}
          <span className="text-fire">{service.highlight}</span>
        </h1>
        <p
          className="mx-auto mb-8 max-w-2xl text-lg leading-8"
          style={{ color: "var(--text-secondary)" }}
        >
          {service.summary}
        </p>
        <Link
          href={`/contact?service=${service.slug}`}
          className="btn-fire inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base"
        >
          {service.cta} →
        </Link>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <span className="section-label">Best for</span>
          <h2
            className="mb-6 text-3xl font-black"
            style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
          >
            Where this work fits
          </h2>
          <ul className="space-y-3">
            {service.bestFor.map((item) => (
              <li
                key={item}
                className="card flex gap-3 rounded-xl p-4 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <span style={{ color: "var(--accent)" }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="section-label">What&apos;s included</span>
          <h2
            className="mb-6 text-3xl font-black"
            style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
          >
            A complete, usable engagement
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <article key={item.title} className="card rounded-2xl p-6">
                <h3
                  className="mb-2 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "var(--bg-surface)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <span className="section-label">How we work</span>
          <h2
            className="mb-10 text-3xl font-black"
            style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
          >
            From the right problem to measurable progress
          </h2>
          <div
            className="grid gap-px overflow-hidden rounded-2xl md:grid-cols-4"
            style={{ background: "var(--border)" }}
          >
            {service.process.map((step, index) => (
              <article
                key={step.title}
                className="p-6"
                style={{ background: "var(--bg-base)" }}
              >
                <span
                  className="text-xs font-black"
                  style={{ color: "var(--accent)" }}
                >
                  0{index + 1}
                </span>
                <h3
                  className="mt-3 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="card grid gap-8 rounded-3xl p-8 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <div>
            <span className="section-label">Expected outcomes</span>
            <h2
              className="text-3xl font-black"
              style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
            >
              What better looks like
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {service.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="rounded-xl p-4 text-sm font-semibold"
                style={{
                  background: "var(--accent-glow)",
                  color: "var(--text-primary)",
                }}
              >
                {outcome}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </PageShell>
  );
}
