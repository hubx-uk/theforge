const CLIENTS = ['Acme Corp','Meridian','Northlane','Stackify','PulseHR','Veritas','Blueshift','Rova','Kinetic Labs','Axiom'];

export default function Clients() {
  return (
    <section className="py-14 overflow-hidden" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
      <p className="text-center text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: 'var(--text-muted)' }}>
        Trusted by ambitious teams
      </p>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to right, var(--bg-surface), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to left, var(--bg-surface), transparent)' }} />
        <div className="marquee-track">
          {[...CLIENTS, ...CLIENTS].map((name, i) => (
            <div key={`${name}-${i}`} className="flex items-center gap-2 px-10 shrink-0">
              <span className="w-5 h-5 rounded flex items-center justify-center text-xs" style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>◈</span>
              <span className="text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
