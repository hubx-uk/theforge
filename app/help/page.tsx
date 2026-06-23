import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CircleHelp, Mail, MessageSquareText } from 'lucide-react';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Help & FAQs — theforge',
  description: 'Answers about theforge services, projects, billing, support, ownership and client portal.',
};

const FAQ_GROUPS = [
  {
    title: 'Getting started',
    intro: 'What happens before we begin building or running campaigns.',
    questions: [
      { question: 'What should I bring to the first conversation?', answer: 'A clear description of the problem is more useful than a finished specification. Share what is not working, who it affects, what you have tried, any deadlines and the result you want. Existing research, analytics, brand files and technical access can come later.' },
      { question: 'Which service do I need?', answer: 'You do not need to diagnose that alone. Tell us what needs work in the contact form. We will determine whether the best starting point is development, marketing, workflow improvement or a short discovery engagement that spans more than one area.' },
      { question: 'Do you work with existing products and teams?', answer: 'Yes. We can improve an existing site, app, store, campaign stack, CRM or reporting setup. We are comfortable joining an internal team, working alongside another specialist or owning a defined workstream end to end.' },
      { question: 'Who is a good fit for theforge?', answer: 'We work best with small and mid-sized organisations that have a meaningful problem, access to the people who understand it and the willingness to measure whether the work helped. We can support both new initiatives and established operations.' },
    ],
  },
  {
    title: 'Scope, timing and delivery',
    intro: 'How projects are shaped, run and reviewed.',
    questions: [
      { question: 'How long does a project take?', answer: 'Timing depends on scope, access and decision speed. A focused audit or setup may take a few weeks; a new product or larger transformation can take several months. Your proposal will include phases, review points, dependencies and a realistic target window.' },
      { question: 'What happens after I submit the form?', answer: 'We review the context and reply within one business day. If there is a likely fit, we arrange a short discovery call. You then receive a written recommendation covering scope, deliverables, timing, responsibilities and commercial terms before any work begins.' },
      { question: 'How will I follow progress?', answer: 'Every active client receives a portal with project status, milestones, updates and invoices. We also agree a communication rhythm appropriate to the engagement, usually combining written updates with focused review calls.' },
      { question: 'Can the scope change after kickoff?', answer: 'Yes, when new information makes a change worthwhile. We make the trade-off explicit: replace an existing priority, extend the timeline or approve an additional scope. Nothing material is added silently.' },
    ],
  },
  {
    title: 'Pricing and billing',
    intro: 'How costs, invoices and outside expenses are handled.',
    questions: [
      { question: 'How is work priced?', answer: 'Focused builds can use a fixed project fee, while ongoing optimisation and delivery use a monthly engagement. Complex or uncertain work may begin with a paid discovery phase. The proposal states what is included, payment timing and how changes are handled.' },
      { question: 'Are software and advertising costs included?', answer: 'Third-party costs such as hosting, paid-media spend, premium software, app-store fees and usage-based services are normally paid directly by you and listed separately from our fees. We identify expected costs before approval wherever possible.' },
      { question: 'When are invoices due?', answer: 'The due date and payment schedule appear in your proposal and invoice. Project work is commonly split across agreed milestones; ongoing work is billed on a recurring schedule. You can see invoice status in the client portal.' },
      { question: 'What is the refund or cancellation policy?', answer: 'Terms depend on the type and stage of the engagement. Review the refund policy for the general framework; your signed proposal takes precedence where it contains engagement-specific terms.' },
    ],
  },
  {
    title: 'Ownership, access and support',
    intro: 'What you receive and how the work is maintained.',
    questions: [
      { question: 'Who owns the finished work?', answer: 'Once the agreed fees are paid, you own the custom deliverables created for your engagement, subject to third-party licences and any reusable tools identified in the agreement. We place production accounts in your organisation wherever practical.' },
      { question: 'Will my team be able to manage it?', answer: 'That is part of the job. We favour maintainable systems, sensible permissions and documentation over unnecessary dependence. Handover and training are included where your team will operate the result.' },
      { question: 'What support is available after launch?', answer: 'We include a defined stabilisation period for launch issues. Ongoing maintenance, optimisation, campaigns and feature delivery can continue through a monthly engagement with agreed priorities and response expectations.' },
      { question: 'How do you protect our data and accounts?', answer: 'We use least-privilege access, separate environments, secure secret storage and role-based controls. Sensitive credentials should be shared through an agreed secure channel—not ordinary email or the contact form.' },
    ],
  },
  {
    title: 'Client portal',
    intro: 'Accessing project information after you become a client.',
    questions: [
      { question: 'How do I get a portal account?', answer: 'Your project contact receives portal credentials when the engagement is created. The portal is for active clients and is not created automatically when you submit an enquiry.' },
      { question: 'What can I see in the portal?', answer: 'The portal shows your project status, milestones, recent updates, invoices and account details. Access is limited to the client record associated with your sign-in.' },
      { question: 'I cannot sign in. What should I do?', answer: 'Check that you are using the email address invited to the project. If the problem continues, email hello@theforge.io from that address and include the company and project name. Never send your password.' },
    ],
  },
];

const faqId = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function HelpPage() {
  return (
    <PageShell>
      <section className="page-hero mx-auto max-w-4xl px-6 text-center">
        <span className="section-label">Help & FAQs</span>
        <h1 className="mb-6 text-5xl font-black md:text-6xl" style={{ letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
          Clear answers before we <span className="text-fire">get to work</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-8" style={{ color: 'var(--text-secondary)' }}>
          Learn how engagements work, what to expect and where to go when you need a human answer.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-24 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-2xl p-5 lg:sticky lg:top-24" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>On this page</p>
          <nav className="space-y-1" aria-label="FAQ categories">
            {FAQ_GROUPS.map((group) => <a key={group.title} href={`#${faqId(group.title)}`} className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--accent-glow)]" style={{ color: 'var(--text-secondary)' }}>{group.title}</a>)}
          </nav>
          <div className="mt-5 border-t pt-5" style={{ borderColor: 'var(--border)' }}>
            <Link href="/portal/login" className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--accent)' }}>Client portal <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </aside>

        <div className="space-y-14">
          {FAQ_GROUPS.map((group) => (
            <section key={group.title} id={faqId(group.title)} className="scroll-mt-28">
              <div className="mb-5">
                <h2 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{group.title}</h2>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>{group.intro}</p>
              </div>
              <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border)' }}>
                {group.questions.map((item) => (
                  <details key={item.question} className="group p-5 open:bg-[var(--bg-elevated)]" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold" style={{ color: 'var(--text-primary)' }}>
                      {item.question}<CircleHelp className="h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} />
                    </summary>
                    <p className="max-w-3xl pt-4 text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="py-20" style={{ background: 'var(--bg-surface)' }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="section-label">Still need help?</span>
          <h2 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>Tell us what you are trying to solve.</h2>
          <p className="mx-auto mb-8 mt-3 max-w-xl text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>We reply to new enquiries within one business day. Existing clients can also use the contact details in their portal.</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-fire inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3"><MessageSquareText className="h-4 w-4" /> Contact theforge</Link>
            <a href="mailto:hello@theforge.io" className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3"><Mail className="h-4 w-4" /> hello@theforge.io</a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
