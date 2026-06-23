import PageShell from '@/components/PageShell';

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="page-hero max-w-3xl mx-auto px-6">
        <span className="section-label">Legal</span>
        <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
          Privacy Policy
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Last updated: June 2026</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-28 prose-forge">
        <h2>1. Information We Collect</h2>
        <p>When you fill out our contact form or start a project, we collect:</p>
        <ul>
          <li>Your name, email address, and optional company name</li>
          <li>The service area and project details you provide in messages</li>
          <li>Payment information processed by Stripe (we never store card details)</li>
          <li>Usage data collected automatically (pages visited, browser type, IP address)</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to enquiries and deliver our services</li>
          <li>Process payments securely via Stripe</li>
          <li>Send project updates and invoices</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>3. Data Storage</h2>
        <p>
          Contact form submissions and project data are stored in Supabase (PostgreSQL), hosted in a 
          secure cloud environment. Payment records are managed by Stripe and subject to Stripe&apos;s 
          own privacy policy.
        </p>
        <p>We retain your data for as long as is necessary to deliver our services and comply with legal requirements. You may request deletion at any time.</p>

        <h2>4. Sharing Your Information</h2>
        <p>We do not sell, rent, or trade your personal information. We share data only with:</p>
        <ul>
          <li><strong>Stripe</strong> — for payment processing</li>
          <li><strong>Supabase</strong> — for data storage</li>
          <li><strong>Vercel</strong> — for hosting and analytics</li>
          <li>Legal authorities, if required by law</li>
        </ul>

        <h2>5. Cookies</h2>
        <p>
          We use minimal, functional cookies required for the website to operate correctly. 
          We do not use advertising or tracking cookies. Your theme preference (light/dark) is 
          stored in your browser&apos;s localStorage.
        </p>

        <h2>6. Your Rights</h2>
        <p>Depending on your jurisdiction, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Withdraw consent at any time</li>
          <li>Lodge a complaint with your local data protection authority</li>
        </ul>
        <p>To exercise any of these rights, email us at <a href="mailto:privacy@theforge.io">privacy@theforge.io</a>.</p>

        <h2>7. Security</h2>
        <p>
          We implement industry-standard security measures including HTTPS, database row-level security (RLS), 
          and access controls. However, no method of transmission over the internet is 100% secure.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. We&apos;ll notify you of significant changes via email 
          or a notice on our website.
        </p>

        <h2>9. Contact</h2>
        <p>For any privacy-related questions: <a href="mailto:privacy@theforge.io">privacy@theforge.io</a></p>
      </section>
    </PageShell>
  );
}
