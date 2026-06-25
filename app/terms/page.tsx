import PageShell from "@/components/PageShell";

export default function TermsPage() {
  return (
    <PageShell>
      <section className="page-hero max-w-3xl mx-auto px-6">
        <span className="section-label">Legal</span>
        <h1
          className="text-4xl md:text-5xl font-black mb-4"
          style={{ letterSpacing: "-0.04em", color: "var(--text-primary)" }}
        >
          Terms of Service
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Last updated: June 2026
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-28 prose-forge">
        <p>
          By engaging theforge for services, you agree to the following terms.
          Please read them carefully.
        </p>

        <h2>1. Services</h2>
        <p>
          theforge provides web design, web development, e-commerce, SEO, and
          related digital services as described on our website and in individual
          project proposals. The scope of each project is agreed upon in writing
          before work begins.
        </p>

        <h2>2. Payment Terms</h2>
        <ul>
          <li>
            Project fees are due according to the payment schedule in your
            project agreement
          </li>
          <li>
            One-time projects typically require 50% upfront, 50% on delivery
          </li>
          <li>
            Retainer subscriptions are billed monthly via Stripe, Payoneer or
            Paystack
          </li>
          <li>Invoices unpaid after 14 days may result in work pausing</li>
        </ul>

        <h2>3. Revisions & Scope</h2>
        <p>
          Each plan includes a set number of revision rounds as stated at
          purchase. Revisions outside the agreed scope will be quoted
          separately. A revision is defined as changes to existing agreed
          designs — not new features or directions.
        </p>

        <h2>4. Client Responsibilities</h2>
        <p>You agree to:</p>
        <ul>
          <li>Provide timely feedback within agreed turnaround windows</li>
          <li>
            Supply all required content (copy, images, brand assets) before work
            begins
          </li>
          <li>Ensure you have rights to all materials you provide</li>
          <li>Designate a single point of contact for the project</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          Upon full payment, you own the final delivered work product. theforge
          retains the right to display completed work in our portfolio unless
          you request otherwise in writing.
        </p>
        <p>
          We retain ownership of any tools, frameworks, or internal libraries we
          develop independently. Third-party code (open-source libraries, fonts,
          etc.) remains subject to its original licence.
        </p>

        <h2>6. Confidentiality</h2>
        <p>
          Both parties agree to keep confidential any non-public information
          disclosed during the project relationship. This obligation survives
          the end of our engagement.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          theforge&apos;s liability is limited to the total amount paid for the
          relevant project. We are not liable for indirect, consequential, or
          incidental damages including lost profits or business interruption.
        </p>

        <h2>8. Termination</h2>
        <ul>
          <li>
            Either party may terminate a project with 14 days written notice
          </li>
          <li>
            You are responsible for fees for work completed up to the
            termination date
          </li>
          <li>
            Retainer subscriptions can be cancelled with 30 days notice, no
            penalties
          </li>
        </ul>

        <h2>9. Governing Law</h2>
        <p>
          These terms are governed by the laws of the Federal Republic of
          Nigeria. Any disputes will be resolved through good-faith negotiation
          before any formal proceedings.
        </p>

        <h2>10. Changes</h2>
        <p>
          We may update these terms. Continued use of our services after changes
          constitutes acceptance.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about these terms:{" "}
          <a href="mailto:hello@theforge.ng">hello@theforge.ng</a>
        </p>
      </section>
    </PageShell>
  );
}
