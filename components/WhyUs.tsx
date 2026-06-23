const FEATURES = [
  {
    icon: "⚡",
    title: "Insanely Fast Delivery",
    desc: "First draft in 48 hours. Full launch in days, not months. We move fast without cutting corners.",
  },
  {
    icon: "🔒",
    title: "Security-First Stack",
    desc: "Supabase RLS, Stripe webhooks, and HTTPS by default. Your data and payments are locked down.",
  },
  {
    icon: "📱",
    title: "Mobile-First, Always",
    desc: "Every project looks and performs perfectly on every device — phones, tablets, and desktops.",
  },
  {
    icon: "📈",
    title: "Built for Growth",
    desc: "Scalable architecture with Next.js and Vercel so your site handles 10 or 10,000 visitors.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="section-label">Why Choose Us</span>
          <h2
            className="text-4xl md:text-5xl font-black leading-tight mb-6"
            style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
          >
            The Studio Your
            <br />
            <span className="text-fire">Business Deserves</span>
          </h2>
          <p
            className="leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            We believe every ambitious business deserves a world-class digital
            presence. theforge combines senior engineering with obsessive design
            craft — delivering products that perform, scale, and last.
          </p>
          <div
            className="rounded-2xl p-6 inline-flex flex-col gap-1"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <span className="stat-number">120+</span>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Projects shipped & counting
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="card rounded-xl p-6 flex flex-col gap-3"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3
                className="font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
