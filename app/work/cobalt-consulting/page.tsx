import PageShell from '@/components/PageShell';

const STATS = [
  { title: 'Delivery confidence', value: '95%', desc: 'Clear architecture and delivery plans reduced risk for the product roadmap.' },
  { title: 'Faster prioritization', value: '3 weeks', desc: 'We helped the team choose and scope the next high-impact initiatives quickly.' },
  { title: 'Stronger foundation', value: 'Long-term', desc: 'A technical plan that supports expansion without repeated rework.' },
];

const FOCUS = [
  { title: 'Architecture review', desc: 'We audited the existing system and defined the scalable path forward.' },
  { title: 'Product alignment', desc: 'We aligned engineering work with business goals and measurable outcomes.' },
  { title: 'Execution support', desc: 'We provided guidance on prioritization, sprint planning, and handoff for engineering teams.' },
];

export default function CobaltConsultingCaseStudy() {
  return (
    <PageShell>
      <section className="page-hero max-w-4xl mx-auto px-6 text-center">
        <span className="section-label">Case Study / Cobalt Consulting</span>
        <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
          Strategic technical leadership for a growing SaaS team
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
          We helped the product and engineering teams move from fragmented delivery to a shared technical roadmap with clarity, speed, and stronger decision-making.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div key={stat.title} className="card rounded-2xl p-6">
              <p className="text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>{stat.title}</p>
              <p className="text-4xl font-black mb-4" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="grid gap-10">
          <div>
            <h2 className="text-3xl font-black mb-5" style={{ letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              The situation
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              The client had a product roadmap and a strong team, but the architecture and delivery plan were not aligned with their growth goals. We stepped in to remove uncertainty and create a shared technical direction.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black mb-5" style={{ letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              Our approach
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {FOCUS.map((item) => (
                <div key={item.title} className="card rounded-2xl p-6">
                  <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black mb-5" style={{ letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              Results
            </h2>
            <ul className="grid gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li>• A shared architecture plan that reduced technical uncertainty.</li>
              <li>• Prioritized roadmap decisions that supported rapid feature delivery.</li>
              <li>• Ongoing engineering alignment and execution support.</li>
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
