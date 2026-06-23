export type ServiceDetail = {
  slug: string;
  group: 'Development' | 'Marketing' | 'Workflow';
  name: string;
  headline: string;
  highlight: string;
  summary: string;
  cta: string;
  bestFor: string[];
  deliverables: { title: string; description: string }[];
  process: { title: string; description: string }[];
  outcomes: string[];
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'web-apps': {
    slug: 'web-apps', group: 'Development', name: 'Web apps', headline: 'Web products built for', highlight: 'real work',
    summary: 'We design and build secure, scalable web applications—from customer portals and SaaS products to internal tools that replace fragile spreadsheets.',
    cta: 'Start your web app',
    bestFor: ['SaaS products and customer portals', 'Operational dashboards and internal tools', 'Marketplaces and workflow-heavy platforms'],
    deliverables: [
      { title: 'Product discovery', description: 'User journeys, priorities and a practical release plan tied to the business case.' },
      { title: 'UX and interface design', description: 'Responsive flows and a reusable design system your team can extend.' },
      { title: 'Full-stack engineering', description: 'Typed front ends, APIs, data models, authentication and role-based access.' },
      { title: 'Payments and integrations', description: 'Stripe billing plus the third-party tools your operation already relies on.' },
      { title: 'Quality and security', description: 'Automated checks, access controls, performance work and launch hardening.' },
      { title: 'Launch support', description: 'Deployment, monitoring, documentation and a clean handover.' },
    ],
    process: [
      { title: 'Define', description: 'Clarify the users, core job and smallest valuable release.' },
      { title: 'Prototype', description: 'Make the important workflows tangible before heavy engineering begins.' },
      { title: 'Build', description: 'Ship in reviewable increments with the data and integrations connected.' },
      { title: 'Launch and improve', description: 'Release safely, watch usage and refine what creates value.' },
    ],
    outcomes: ['A maintainable product foundation', 'Faster, clearer user workflows', 'Reliable data and access control', 'A roadmap informed by real usage'],
  },
  'mobile-apps': {
    slug: 'mobile-apps', group: 'Development', name: 'Mobile apps', headline: 'Mobile experiences people', highlight: 'want to keep',
    summary: 'We create focused iOS and Android products with fast, familiar interactions and a backend ready for real customers, content and transactions.',
    cta: 'Plan your mobile app',
    bestFor: ['Customer-facing companion apps', 'Field teams and mobile operations', 'New mobile-first products and MVPs'],
    deliverables: [
      { title: 'Mobile product strategy', description: 'Feature priorities, platform choices and a release plan built around user behaviour.' },
      { title: 'Native-feeling UX', description: 'Touch-friendly flows, clear navigation and thoughtful empty, loading and error states.' },
      { title: 'Cross-platform build', description: 'One maintainable product for iOS and Android where that best serves the brief.' },
      { title: 'Backend and accounts', description: 'Secure authentication, profiles, permissions, data and API integrations.' },
      { title: 'Device capabilities', description: 'Notifications, camera, location, offline support or payments where the product needs them.' },
      { title: 'Store readiness', description: 'Testing, release builds, listing guidance and launch support for both stores.' },
    ],
    process: [
      { title: 'Shape', description: 'Choose the moments where mobile creates a genuine advantage.' },
      { title: 'Test the flow', description: 'Prototype the core journey on realistic device sizes.' },
      { title: 'Build and integrate', description: 'Connect the interface, backend and device features in usable releases.' },
      { title: 'Release', description: 'Complete production checks and support store submission.' },
    ],
    outcomes: ['A focused first release', 'Consistent iOS and Android experience', 'A backend that can grow with usage', 'A practical post-launch roadmap'],
  },
  ecommerce: {
    slug: 'ecommerce', group: 'Development', name: 'E-commerce', headline: 'Commerce designed to', highlight: 'earn the checkout',
    summary: 'We build and improve Shopify and WooCommerce stores that make products easy to discover, decisions easy to make and daily operations easy to manage.',
    cta: 'Improve your store',
    bestFor: ['New direct-to-customer launches', 'Stores held back by poor conversion', 'Teams outgrowing manual commerce operations'],
    deliverables: [
      { title: 'Store strategy', description: 'Customer journeys, merchandising priorities and the platform setup that fits your team.' },
      { title: 'Conversion-led design', description: 'Product discovery, product pages, cart and checkout shaped around buying confidence.' },
      { title: 'Shopify or WooCommerce build', description: 'A maintainable theme and content structure without unnecessary app sprawl.' },
      { title: 'Payments and operations', description: 'Payments, shipping, tax, inventory and fulfilment integrations configured correctly.' },
      { title: 'Tracking and SEO', description: 'Commerce analytics, product data and technical search foundations from launch.' },
      { title: 'Team enablement', description: 'Training and documentation so your team can operate the store confidently.' },
    ],
    process: [
      { title: 'Audit', description: 'Find the biggest friction in discovery, purchase and fulfilment.' },
      { title: 'Merchandise', description: 'Structure products and content around how customers decide.' },
      { title: 'Build', description: 'Implement the storefront, integrations and measurement.' },
      { title: 'Optimise', description: 'Use real behaviour to improve conversion and repeat purchase.' },
    ],
    outcomes: ['A faster path from product to purchase', 'Cleaner store operations', 'Trustworthy commerce measurement', 'A storefront your team can evolve'],
  },
  seo: {
    slug: 'seo', group: 'Marketing', name: 'SEO', headline: 'Search growth that', highlight: 'compounds',
    summary: 'We connect technical SEO, search intent and useful content so the right customers can find you—and understand why you are worth choosing.',
    cta: 'Find your search opportunities',
    bestFor: ['Sites with traffic but weak conversion', 'Businesses entering competitive search markets', 'Teams that need an actionable SEO system'],
    deliverables: [
      { title: 'Technical audit', description: 'Crawling, indexing, site architecture, structured data and performance priorities.' },
      { title: 'Search strategy', description: 'Opportunity mapping based on intent, competition and commercial relevance.' },
      { title: 'On-page improvements', description: 'Titles, headings, internal links and page content aligned to the search job.' },
      { title: 'Content briefs', description: 'Clear briefs that give subject-matter expertise the structure it needs to rank.' },
      { title: 'Authority building', description: 'Credible outreach and digital PR opportunities—not low-quality link volume.' },
      { title: 'Reporting', description: 'A decision-ready view of visibility, qualified traffic, leads and next actions.' },
    ],
    process: [
      { title: 'Diagnose', description: 'Separate technical blockers from content and authority gaps.' },
      { title: 'Prioritise', description: 'Rank work by business value, effort and time to impact.' },
      { title: 'Implement', description: 'Fix the foundations and publish against a coherent search plan.' },
      { title: 'Learn', description: 'Measure movement, conversion and new opportunities each cycle.' },
    ],
    outcomes: ['Healthier search foundations', 'More relevant organic visibility', 'Content tied to customer intent', 'Reporting connected to business results'],
  },
  'paid-ads': {
    slug: 'paid-ads', group: 'Marketing', name: 'Paid ads', headline: 'Campaigns built to', highlight: 'learn and convert',
    summary: 'We plan, launch and manage paid search and social campaigns with disciplined testing, useful creative and reporting tied to revenue—not vanity metrics.',
    cta: 'Plan your next campaign',
    bestFor: ['Businesses ready to acquire customers predictably', 'Teams wasting spend without clear learning', 'Offers that need focused launch support'],
    deliverables: [
      { title: 'Account and tracking audit', description: 'Campaign structure, conversion events, attribution and data quality checked first.' },
      { title: 'Channel plan', description: 'Google, Meta or LinkedIn selected around audience, intent and economics.' },
      { title: 'Campaign build', description: 'Audiences, keywords, exclusions, budgets and landing paths configured carefully.' },
      { title: 'Creative system', description: 'A repeatable set of messages and formats designed for meaningful testing.' },
      { title: 'Landing-page feedback', description: 'Recommendations where the destination is limiting campaign performance.' },
      { title: 'Optimisation and reporting', description: 'Regular decisions on spend, creative and offers with a plain-language summary.' },
    ],
    process: [
      { title: 'Instrument', description: 'Make sure conversions and commercial signals can be trusted.' },
      { title: 'Launch a thesis', description: 'Start with a clear audience, promise and expected action.' },
      { title: 'Test', description: 'Change one meaningful variable at a time and record the learning.' },
      { title: 'Scale carefully', description: 'Increase spend where performance remains commercially sound.' },
    ],
    outcomes: ['Cleaner attribution', 'More useful creative learning', 'Lower wasted spend', 'A repeatable acquisition playbook'],
  },
  content: {
    slug: 'content', group: 'Marketing', name: 'Content', headline: 'Turn expertise into', highlight: 'attention and trust',
    summary: 'We build practical content systems that clarify what you know, answer real customer questions and move the right audience toward action.',
    cta: 'Build your content system',
    bestFor: ['Expert-led service businesses', 'Teams publishing without a clear strategy', 'Brands that need sales and marketing alignment'],
    deliverables: [
      { title: 'Content strategy', description: 'Audience questions, themes, formats and distribution connected to business priorities.' },
      { title: 'Editorial roadmap', description: 'A realistic calendar balancing search demand, authority and timely ideas.' },
      { title: 'Message architecture', description: 'A clear point of view and reusable language across channels.' },
      { title: 'Production', description: 'Articles, guides, case studies, emails or social assets created with your expertise intact.' },
      { title: 'Repurposing', description: 'Strong source ideas adapted efficiently without turning every channel into a copy.' },
      { title: 'Performance review', description: 'Measurement focused on reach quality, engagement, leads and assisted conversion.' },
    ],
    process: [
      { title: 'Extract', description: 'Capture the expertise, customer language and evidence already inside the business.' },
      { title: 'Plan', description: 'Match the right idea and format to each audience need.' },
      { title: 'Create and distribute', description: 'Produce consistently and give every asset a route to attention.' },
      { title: 'Refine', description: 'Double down on the themes and formats that earn useful response.' },
    ],
    outcomes: ['A recognisable point of view', 'Consistent, sustainable publishing', 'More useful sales enablement', 'Content decisions backed by evidence'],
  },
  automation: {
    slug: 'automation', group: 'Workflow', name: 'Automation', headline: 'Less busywork. More', highlight: 'useful momentum',
    summary: 'We connect the tools your team already uses and automate repetitive handoffs so work moves reliably without constant copying, chasing or checking.',
    cta: 'Find what to automate',
    bestFor: ['Teams repeating the same admin every week', 'Processes split across too many tools', 'Growing operations vulnerable to manual errors'],
    deliverables: [
      { title: 'Workflow audit', description: 'A map of handoffs, delays, duplicate entry and high-risk manual steps.' },
      { title: 'Automation plan', description: 'Opportunities ranked by hours saved, reliability and implementation effort.' },
      { title: 'Tool integration', description: 'APIs, webhooks and automation platforms connecting your existing stack.' },
      { title: 'AI-assisted workflows', description: 'Carefully scoped classification, drafting or extraction with human checks where needed.' },
      { title: 'Monitoring and recovery', description: 'Logs, alerts and exception handling so failures are visible and manageable.' },
      { title: 'Documentation', description: 'Plain-language ownership and maintenance guidance for your team.' },
    ],
    process: [
      { title: 'Observe', description: 'Understand the real workflow, including exceptions and workarounds.' },
      { title: 'Simplify', description: 'Remove unnecessary steps before automating what remains.' },
      { title: 'Connect', description: 'Build the workflow with safe permissions and clear failure paths.' },
      { title: 'Monitor', description: 'Track reliability and expand only where the first automation proves useful.' },
    ],
    outcomes: ['Fewer repetitive tasks', 'Faster handoffs', 'Lower manual-error risk', 'Clear ownership when exceptions occur'],
  },
  'crm-setup': {
    slug: 'crm-setup', group: 'Workflow', name: 'CRM setup', headline: 'A sales system people', highlight: 'actually use',
    summary: 'We configure a clean CRM around your real buying journey, giving every lead an owner, a next step and useful context from first touch to handover.',
    cta: 'Clean up your CRM',
    bestFor: ['Teams managing leads in spreadsheets or inboxes', 'Businesses migrating or replacing a CRM', 'Sales processes with weak follow-up and reporting'],
    deliverables: [
      { title: 'Sales-process mapping', description: 'Lifecycle stages, owners, handoffs and definitions agreed before configuration.' },
      { title: 'CRM configuration', description: 'Pipelines, fields, views, permissions and records tailored to the process.' },
      { title: 'Data cleanup and migration', description: 'Duplicates, field mapping and imports handled with a clear source of truth.' },
      { title: 'Lead capture', description: 'Forms, inboxes and campaign sources connected so new demand enters cleanly.' },
      { title: 'Follow-up automation', description: 'Tasks, reminders and sequences that support—not overwhelm—the sales team.' },
      { title: 'Training and reporting', description: 'Role-based guidance and dashboards for adoption, pipeline and conversion.' },
    ],
    process: [
      { title: 'Map', description: 'Agree how a real lead moves from interest to customer.' },
      { title: 'Clean', description: 'Resolve data and terminology issues before migration.' },
      { title: 'Configure', description: 'Build the pipeline, automations, permissions and reporting.' },
      { title: 'Adopt', description: 'Train users, watch usage and remove friction quickly.' },
    ],
    outcomes: ['One reliable lead record', 'Clear ownership and next steps', 'More consistent follow-up', 'Pipeline reporting leaders can trust'],
  },
  analytics: {
    slug: 'analytics', group: 'Workflow', name: 'Analytics', headline: 'Reporting that leads to', highlight: 'better decisions',
    summary: 'We make your product, marketing and sales data usable—cleaning up tracking and building focused dashboards that answer what happened and what to do next.',
    cta: 'Fix your reporting',
    bestFor: ['Leaders reconciling conflicting dashboards', 'Teams unsure which channels drive results', 'Businesses preparing for faster, evidence-led growth'],
    deliverables: [
      { title: 'Measurement plan', description: 'Business questions, metrics, owners and source systems defined in plain language.' },
      { title: 'Tracking implementation', description: 'Events, conversions, campaign tags and consent-aware collection configured correctly.' },
      { title: 'Data quality review', description: 'Duplicates, gaps, definitions and cross-platform discrepancies investigated.' },
      { title: 'Dashboard design', description: 'Focused views for leadership and operators—not a wall of every available chart.' },
      { title: 'Automated reporting', description: 'Reliable refreshes and scheduled summaries that replace manual spreadsheet assembly.' },
      { title: 'Decision cadence', description: 'A practical routine for reviewing signals, choosing actions and tracking impact.' },
    ],
    process: [
      { title: 'Ask', description: 'Start with the decisions the business needs to make.' },
      { title: 'Trace', description: 'Identify the source and quality of each required signal.' },
      { title: 'Build', description: 'Implement tracking, transformations and focused reporting.' },
      { title: 'Operationalise', description: 'Put the dashboard into a recurring decision process.' },
    ],
    outcomes: ['One agreed metric language', 'Less manual reporting', 'Faster visibility into performance', 'Clearer next actions'],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_DETAILS);
