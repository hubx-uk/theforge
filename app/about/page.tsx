import PageShell from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="page-hero max-w-4xl mx-auto px-6 text-center">
        <span className="section-label">
          About the<span style={{ color: "var(--text-primary)" }}>forge</span>
        </span>
        <h1
          className="mb-6 text-5xl font-black md:text-6xl"
          style={{ letterSpacing: "-0.04em", color: "var(--text-primary)" }}
        >
          The team behind your business boom
        </h1>
        <p
          className="max-w-2xl mx-auto text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          We build software and run digital marketing with one goal: help
          ambitious small and medium-sized businesses worldwide grow faster with
          fewer risks, clear pricing, and direct access to the people doing the
          work.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div
          className="rounded-2xl p-8 md:p-12"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
          }}
        >
          <span className="section-label">Our Story</span>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            theforge began because too many businesses were paying too much for
            websites that didn&apos;t work. We saw a pattern of overpromised
            launches, hidden fees, and sites that never delivered results.
          </p>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            So we built a different studio: small, practical, and obsessively
            focused on outcomes. Every project starts with the same questions —
            what do you need, who are you talking to, and how will success be
            measured?
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Since then, we&apos;ve delivered over 120 projects for startups,
            ecommerce brands, and service businesses — with the same tight team
            and hands-on approach. We work with small and medium-sized
            businesses worldwide, wherever growth is the goal.
          </p>
        </div>
      </section>

      {/* Commitments */}
      <section className="max-w-7xl mx-auto px-6 py-10 pb-20">
        <span className="section-label text-center block">
          What we refuse to compromise on
        </span>
        <h2
          className="text-3xl font-black text-center mb-12"
          style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
        >
          Our priorities for every project
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="card rounded-2xl p-6 flex flex-col gap-3">
            <span className="text-2xl">💬</span>
            <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
              Honest Pricing
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              You get a clear price before we start. No surprise invoices, no
              hidden fees, no scope creep.
            </p>
          </div>
          <div className="card rounded-2xl p-6 flex flex-col gap-3">
            <span className="text-2xl">⏱️</span>
            <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
              Real Timelines
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              We launch websites on a schedule, not on charged days. When we say
              it will be ready, it will be ready.
            </p>
          </div>
          <div className="card rounded-2xl p-6 flex flex-col gap-3">
            <span className="text-2xl">📞</span>
            <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
              Direct Access
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              You collaborate with our designers and engineers directly — not
              through layers of account managers.
            </p>
          </div>
          <div className="card rounded-2xl p-6 flex flex-col gap-3">
            <span className="text-2xl">🚀</span>
            <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
              Built to Grow
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Every site is created with expansion in mind so adding pages,
              products, or features later is easy.
            </p>
          </div>
          <div className="card rounded-2xl p-6 flex flex-col gap-3">
            <span className="text-2xl">🏁</span>
            <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>
              Long-Term Support
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              We don&apos;t disappear after launch. If anything breaks or needs
              updating, we&apos;re already familiar with your site.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-4xl font-black"
              style={{ color: "var(--accent)" }}
            >
              120+
            </p>
            <p
              className="mt-3 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Websites Delivered
            </p>
          </div>
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-4xl font-black"
              style={{ color: "var(--accent)" }}
            >
              10+
            </p>
            <p
              className="mt-3 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Years of experience
            </p>
          </div>
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-4xl font-black"
              style={{ color: "var(--accent)" }}
            >
              1 team
            </p>
            <p
              className="mt-3 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Focused, nimble, and always reachable.
            </p>
          </div>
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-4xl font-black"
              style={{ color: "var(--accent)" }}
            >
              Weeks
            </p>
            <p
              className="mt-3 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Most projects move from brief to launch in just a few weeks.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <span className="section-label text-center block">Meet the team</span>
        <h2
          className="text-3xl font-black text-center mb-12"
          style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
        >
          Real people who build real digital experiences
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Joshua Prince",
              role: "Founder & Design Lead",
              initials: "JP",
              bio: "Former agency creative director. 3 years shaping digital brands for startups and SMBs.",
            },
            {
              name: "Kelechi Egbuta",
              role: "Lead Engineer",
              initials: "KE",
              bio: "Full-stack engineer with deep expertise in Next.js, Supabase, and scalable SaaS architecture.",
            },
            {
              name: "John Christopher",
              role: "Growth & SEO",
              initials: "JC",
              bio: "Data-driven marketer who has grown organic traffic by 400%+ for multiple B2B SaaS companies.",
            },
            {
              name: "Caleb Onyenaturuchi",
              role: "Head of Operations",
              initials: "CO",
              bio: "",
            },
          ].map((member) => (
            <div
              key={member.name}
              className="card rounded-2xl p-8 flex flex-col gap-4"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-black text-white"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent), var(--accent-alt))",
                }}
              >
                {member.initials}
              </div>
              <div>
                <h3
                  className="font-bold text-lg"
                  style={{ color: "var(--text-primary)" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {member.role}
                </p>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-28 text-center">
        <div
          className="rounded-2xl p-10"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
          }}
        >
          <span className="section-label">Want to work with us?</span>
          <h2
            className="text-3xl md:text-4xl font-black mb-6"
            style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
          >
            Let&apos;s build a site that actually grows your business.
          </h2>
          <p
            className="text-sm leading-relaxed max-w-2xl mx-auto mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Tell us about your project and we&apos;ll respond quickly with the
            right plan, timeline, and clear next steps.
          </p>
          <a
            href="/contact"
            className="btn-fire inline-flex mx-auto px-8 py-4 rounded-full text-sm font-bold"
          >
            Get in touch
          </a>
        </div>
      </section>
    </PageShell>
  );
}
