import PageShell from '@/components/PageShell';

const DETAILS = [
  { label: 'Industry', value: 'AI Automation · Productivity' },
  { label: 'Outcome', value: 'Predictive workflows, smarter sales enablement, and faster customer response time' },
  { label: 'Approach', value: 'Custom AI integration, data strategy, and user-first product design' },
];

const STEPS = [
  { title: 'Discovery', desc: 'Mapped business value, data sources, and customer workflows to identify AI opportunities with clear ROI.' },
  { title: 'Model integration', desc: 'Integrated machine learning and generative workflows into existing dashboards with reliable input quality checks.' },
  { title: 'Launch', desc: 'Built a production-ready AI product with analytics, monitoring, and a path for continuous improvement.' },
];

export default function VertexAICaseStudy() {
  return (
    <PageShell>
      <section className="page-hero max-w-4xl mx-auto px-6 text-center">
        <span className="section-label">Case Study / Vertex AI</span>
        <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
          AI workflows that turn customer data into faster decisions
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
          We delivered an intelligent product layer for a data-heavy business, reducing manual review time and pushing actionable intelligence directly into the user experience.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {DETAILS.map((detail) => (
            <div key={detail.label} className="card rounded-2xl p-6">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>{detail.label}</p>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{detail.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="grid gap-10">
          <div>
            <h2 className="text-3xl font-black mb-5" style={{ letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              The challenge
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              The client had valuable usage data across products, but customer teams were still making decisions with manual reports and spreadsheets. We needed to turn that data into a reliable, self-serve intelligence layer without disrupting the existing product.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black mb-5" style={{ letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              Our solution
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              We built a custom AI workflow that combines predictions, recommendations, and automated next steps inside the customer experience. The product surfaces the right action at the right time, while keeping control and visibility in the hands of the user.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {STEPS.map((step) => (
                <div key={step.title} className="card rounded-2xl p-6">
                  <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black mb-5" style={{ letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              Impact
            </h2>
            <ul className="grid gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li>• 55% faster decision cycles for customer-facing teams</li>
              <li>• 3x more engagement with AI-driven recommendations</li>
              <li>• A scalable architecture that supports future automation features</li>
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
