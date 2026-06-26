-- ════════════════════════════════════════════════════════════════
-- theforge — Case Studies table
-- Drives both the homepage Work grid and the /work case studies page
-- dynamically, so both surfaces always stay in sync.
-- ════════════════════════════════════════════════════════════════

create table if not exists case_studies (
  id            uuid        default gen_random_uuid() primary key,
  slug          text        unique not null,           -- URL key, e.g. "jovico"
  client        text        not null,                  -- Display client name
  title         text        not null,                  -- Case-study headline
  description   text        not null,                  -- Short summary paragraph
  body          text        not null default '',       -- Long-form case-study content
  industry      text        not null,                  -- e.g. "E-Mobility / Clean Energy"
  tier          text        not null default 'custom'
                            check (tier in ('Spark','Ember','Blaze','Inferno','Custom')),
  color         text        not null default '#FE7F2D', -- Accent hex used for swatch
  tags          text[]      not null default '{}',     -- Tech stack tags
  -- Home-page Work grid fields
  home_category text,                                  -- e.g. "Web App · Supabase · Stripe"
  home_desc     text,                                  -- Short one-liner for the grid card
  show_on_home  boolean     not null default true,     -- Include in homepage Work grid
  -- Case studies page
  show_on_work  boolean     not null default true,     -- Include in /work listing
  sort_order    integer     not null default 0,
  created_at    timestamptz default now()
);

-- RLS: same pattern as other tables — service role only
alter table case_studies enable row level security;
revoke all on table case_studies from anon, authenticated;

-- ── Seed data ───────────────────────────────────────────────────
-- Projects visible on the home page Work grid (show_on_home = true)
-- and/or the /work case studies listing (show_on_work = true).

insert into case_studies
  (slug, client, title, description, industry, tier, color, tags, home_category, home_desc, show_on_home, show_on_work, sort_order)
values

  -- ── Real client projects (appear on both surfaces) ──────────

  ('jovico',
   'Jovico World',
   'E-Mobility Platform for Nigeria''s EV & Solar Retailer',
   'Full-stack Next.js storefront, bespoke admin dashboard, and customer portal for an electric mobility and solar retail brand. Ongoing Inferno retainer.',
   'E-Mobility / Clean Energy',
   'Inferno',
   '#FE7F2D',
   ARRAY['Next.js','Prisma','PostgreSQL','Custom Admin'],
   'Web App · Next.js · Supabase',
   'Full-stack e-mobility storefront with bespoke admin and client portal.',
   true, true, 1),

  ('fabrica',
   'Fabrica — A Kace Technologies Company',
   'Construction CMS, Client Portal & Quote Management',
   'End-to-end platform for a construction firm — CMS for ops, client-facing project tracker, and a quote builder with PDF export and online approvals.',
   'Construction & Infrastructure',
   'Blaze',
   '#D9591A',
   ARRAY['Next.js','Supabase','Shadcn UI','Stripe'],
   'Web App · Supabase · Stripe',
   'Construction CMS with client portal, quote builder, and PDF approvals.',
   true, true, 2),

  ('manella',
   'Manella Stores',
   'WooCommerce Rebuild That Doubled Mobile Conversion',
   'Stripped a bloated Elementor site, built a lean custom WooCommerce theme from scratch, and cut load times from 6.4 s to 2.1 s. Mobile conversion rate more than doubled.',
   'E-Commerce / Retail',
   'Ember',
   '#6366F1',
   ARRAY['WooCommerce','PHP','Custom Theme','Performance'],
   'E-Commerce · WooCommerce',
   'Custom WooCommerce rebuild — 6.4 s → 2.1 s load time, 2× mobile conversions.',
   true, true, 3),

  ('cobalt-consulting',
   'Cobalt Consulting',
   'Corporate Website & Brand Presence',
   'A sharp, performant marketing site for a management consulting firm. Built with speed and authority in mind.',
   'Consulting',
   'Spark',
   '#14B8A6',
   ARRAY['Next.js','Tailwind','Framer Motion'],
   'Software Consulting · Scale',
   'Technical strategy playbook and delivery support for a high-growth SaaS team.',
   true, true, 4),

  ('vertex-ai',
   'Vertex AI Solutions',
   'SaaS Landing Page & Waitlist',
   'Launch-ready landing page with animated feature sections, pricing, and a waitlist capture backed by Supabase.',
   'SaaS / AI',
   'Spark',
   '#10B981',
   ARRAY['Next.js','Supabase','Framer Motion'],
   'AI Product · Automation',
   'Intelligent workflows and customer insights powered by custom AI.',
   true, true, 5),

  -- ── Showcase projects (home grid only — no dedicated case study page yet) ──

  ('meridian-finance',
   'Meridian Finance',
   'Real-Time Portfolio Dashboard with Subscription Billing',
   'Real-time portfolio dashboard with subscription billing and SSO for a fintech client. Built on Next.js, Supabase, and Stripe with multi-tenant architecture.',
   'Fintech / SaaS',
   'Blaze',
   '#4F46E5',
   ARRAY['Next.js','Supabase','Stripe','SSO'],
   'Web App · Supabase · Stripe',
   'Real-time portfolio dashboard with subscription billing and SSO.',
   true, false, 6),

  ('rova-apparel',
   'Rova Apparel',
   'High-Conversion Storefront with Product Bundling & Upsells',
   'High-conversion storefront with product bundling and upsells for a DTC apparel brand. Optimised checkout flow increased AOV by 34 %.',
   'E-Commerce / DTC',
   'Ember',
   '#16A34A',
   ARRAY['Next.js','Stripe','Custom Checkout'],
   'E-Commerce · Stripe',
   'High-conversion storefront with product bundling and upsells.',
   true, false, 7),

  ('blueshift-saas',
   'Blueshift SaaS',
   'Multi-Tenant B2B Platform with Role-Based Access & API Keys',
   'Multi-tenant B2B platform with role-based access control and API key management. Built for a Series-A startup moving from a monolith to a modular SaaS.',
   'B2B SaaS',
   'Inferno',
   '#0EA5E9',
   ARRAY['Next.js','Supabase','tRPC','Stripe'],
   'Web App · Next.js · Supabase',
   'Multi-tenant B2B platform with role-based access and API keys.',
   true, false, 8),

  ('axiom-agency',
   'Axiom Agency',
   'Brand Identity & Marketing Site — Launched in 5 Days',
   'Full brand identity and marketing site for a creative agency — conceived, designed, and shipped in five days. Includes custom type specimen and motion design.',
   'Design / Creative Agency',
   'Spark',
   '#F59E0B',
   ARRAY['Next.js','Figma','Custom Brand'],
   'Web Design · Brand',
   'Brand identity and marketing site — launched in 5 days.',
   true, false, 9)

on conflict (slug) do update set
  client        = excluded.client,
  title         = excluded.title,
  description   = excluded.description,
  industry      = excluded.industry,
  tier          = excluded.tier,
  color         = excluded.color,
  tags          = excluded.tags,
  home_category = excluded.home_category,
  home_desc     = excluded.home_desc,
  show_on_home  = excluded.show_on_home,
  show_on_work  = excluded.show_on_work,
  sort_order    = excluded.sort_order;
