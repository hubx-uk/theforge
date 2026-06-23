import PageShell from '@/components/PageShell';
import Link from 'next/link';

export default function RefundPage() {
  return (
    <PageShell>
      <section className="page-hero max-w-3xl mx-auto px-6">
        <span className="section-label">Legal</span>
        <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
          Refund Policy
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Last updated: June 2026</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-28 prose-forge">
        <p>
          We stand behind the quality of our work. This policy outlines when refunds apply, 
          how to request them, and what to expect.
        </p>

        <h2>1. One-Time Projects (Spark & Forge)</h2>

        <h3>Initial Deposit (50%)</h3>
        <p>
          The initial 50% deposit is non-refundable once a project kickoff call has been completed 
          and work has begun. This covers our time for discovery, planning, and initial design work.
        </p>
        <p>
          If you cancel <strong>before the kickoff call</strong>, a full refund of the deposit is available within 7 days of payment.
        </p>

        <h3>7-Day Satisfaction Window</h3>
        <p>
          If you are not satisfied with the initial design direction presented within the first round 
          of deliverables, you may request a partial refund of up to 25% of the total project fee 
          within 7 days of receiving that first delivery.
        </p>
        <p>
          This window closes once you approve the initial direction in writing or we move into the 
          development phase.
        </p>

        <h3>Completion Payment (50%)</h3>
        <p>
          The final payment is due on delivery of the agreed scope. Refunds are not available on 
          the completion payment once the project has been delivered and accepted.
        </p>

        <h2>2. Retainer Subscriptions (Inferno)</h2>

        <h3>Monthly Billing</h3>
        <p>
          Retainer subscriptions are billed monthly. You may cancel at any time. Cancellations 
          take effect at the end of the current billing period — you retain access until that date.
        </p>

        <h3>Pro-Rated Refunds</h3>
        <p>
          If significant work has not begun in the current billing month at the time of cancellation, 
          we may issue a pro-rated refund at our discretion. Please contact us to discuss.
        </p>

        <h2>3. Non-Refundable Items</h2>
        <ul>
          <li>Third-party costs paid on your behalf (domains, hosting, stock images, fonts)</li>
          <li>Rush delivery fees</li>
          <li>Completed and approved deliverables</li>
          <li>SEO and growth retainer work already performed</li>
        </ul>

        <h2>4. How to Request a Refund</h2>
        <p>To request a refund:</p>
        <ul>
          <li>Email us at <a href="mailto:billing@theforge.io">billing@theforge.io</a> with the subject line &ldquo;Refund Request — [Your Name]&rdquo;</li>
          <li>Include your project name or invoice number</li>
          <li>Describe the reason for the request</li>
        </ul>
        <p>We will respond within 2 business days. Approved refunds are processed via Stripe and typically appear within 5–10 business days.</p>

        <h2>5. Disputes</h2>
        <p>
          We always prefer to resolve issues through honest conversation before any formal dispute. 
          If you have concerns about the quality or scope of work, please reach out directly — 
          we&apos;ll do our best to make it right.
        </p>
        <p>
          If we cannot reach a resolution, disputes are handled in accordance with our{' '}
          <Link href="/terms">Terms of Service</Link>.
        </p>

        <h2>6. Contact</h2>
        <p>For any billing or refund questions: <a href="mailto:billing@theforge.io">billing@theforge.io</a></p>
      </section>
    </PageShell>
  );
}
