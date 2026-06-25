import PageShell from "@/components/PageShell";
import CTA from "@/components/CTA";

const DETAILS = [
  {
    icon: "✉️",
    label: "Email",
    value: "hello@theforge.ng",
    href: "mailto:hello@theforge.ng",
  },
  {
    icon: "💬",
    label: "Twitter / X",
    value: "@theforgestudio",
    href: "https://twitter.com/theforgestudio",
  },
  { icon: "🕐", label: "Response time", value: "Within 24 hours", href: null },
  { icon: "🌍", label: "Timezone", value: "WAT / GMT+1 (Lagos)", href: null },
];

export default function ContactPage() {
  return (
    <PageShell>
      <section className="page-hero max-w-4xl mx-auto px-6 text-center">
        <span className="section-label">Get In Touch</span>
        <h1
          className="mb-6 text-5xl font-black md:text-6xl"
          style={{ letterSpacing: "-0.04em", color: "var(--text-primary)" }}
        >
          Let&apos;s <span className="text-fire">Build Together</span>
        </h1>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          Tell us about your project. We respond within 24 hours.
        </p>
      </section>

      {/* Quick details */}
      <div className="max-w-4xl mx-auto px-6 pb-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {DETAILS.map((d) => (
            <div
              key={d.label}
              className="rounded-xl p-5 flex flex-col gap-1"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <span className="text-xl">{d.icon}</span>
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {d.label}
              </span>
              {d.href ? (
                <a
                  href={d.href}
                  className="text-sm font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {d.value}
                </a>
              ) : (
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {d.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <CTA />
    </PageShell>
  );
}
