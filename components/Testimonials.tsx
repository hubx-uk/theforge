const REVIEWS = [
  { name: 'Sarah Okonkwo', role: 'Founder, Meridian Finance', body: 'theforge shipped our entire dashboard in two weeks. The quality was beyond what any agency had delivered in six months.', initials: 'SO' },
  { name: 'James Rowe', role: 'CTO, Blueshift SaaS', body: "The Supabase architecture they set up is rock solid. RLS, real-time, auth — everything just worked from day one.", initials: 'JR' },
  { name: 'Amina Diallo', role: 'CEO, Rova Apparel', body: 'Our conversion rate jumped 40% after the redesign. The Stripe integration is flawless and our customers love checkout.', initials: 'AD' },
  { name: 'Tom Eriksen', role: 'Marketing Director, Axiom', body: 'Five days from kickoff to launch. I genuinely could not believe it. The site looks like it cost 10x what we paid.', initials: 'TE' },
  { name: 'Priya Sharma', role: 'Product Lead, Kinetic Labs', body: "theforge's retainer has been a game-changer. We ship new features every month without worrying about hiring engineers.", initials: 'PS' },
  { name: 'Carlos Mendez', role: 'Founder, Stackify', body: 'From Figma to production-ready Next.js in a week. The attention to detail in every hover state and animation is insane.', initials: 'CM' },
];

export default function Testimonials() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <span className="section-label">Reviews</span>
        <h2 className="text-4xl md:text-5xl font-black" style={{ letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
          Wall of <span className="text-fire">Love</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {REVIEWS.map((r) => (
          <div key={r.name} className="card rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: 'var(--accent-alt)' }}>★</span>
              ))}
            </div>
            <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>&ldquo;{r.body}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-alt))' }}>
                {r.initials}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{r.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
