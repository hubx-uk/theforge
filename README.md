# theforge — Full Version (v2)

A software development and digital marketing studio site for small and medium-sized
businesses worldwide. Built with **Next.js 16**, **Supabase**, **Stripe**, and
deployed on **Vercel**. Uses **Satoshi** (primary) and **Inter** (auxiliary) fonts
with a **Pumpkin (#FE7F2D) & Charcoal (#233D4D)** color system.

This is the **full version** — it includes the public marketing site plus the
**Admin Dashboard** (`/admin`) and **Client Portal** (`/portal`).

> Looking for the lighter build without the dashboard and portal? See the
> separate **v1 (MVP)** package.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 + Tailwind CSS |
| Fonts | Satoshi (primary) + Inter (auxiliary) |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Custom JWT sessions (`jose` + `bcryptjs`), httpOnly cookies |
| Payments | Stripe (one-time + subscriptions) |
| Hosting | Vercel |

---

## What's included

- Full marketing site: home, about, services (7 pages), work / case studies,
  blog, pricing, contact, legal pages
- **4-tier pricing**: Spark, Ember, Blaze, Inferno (one-time + optional monthly retainer)
- **Admin Dashboard** (`/admin`) — studio team login, projects, clients, invoices, settings
- **Client Portal** (`/portal`) — client login, project tracking, milestones, invoices, account
- Stripe Checkout + webhooks for one-time payments and subscriptions
- Supabase-backed contact form, projects, invoices, and auth tables with RLS

---

## Project Structure

```
theforge/
├── app/
│   ├── layout.tsx                # Root layout, fonts, metadata
│   ├── page.tsx                  # Homepage (all marketing sections)
│   ├── about/ services/ work/ blog/ pricing/ contact/   # Marketing pages
│   ├── get-started/              # Plan selection + Stripe checkout
│   ├── success/                  # Post-checkout confirmation
│   ├── admin/                    # Studio admin dashboard (protected)
│   │   ├── layout.tsx            # Session guard + sidebar shell
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── projects/ clients/ invoices/ settings/
│   │   └── login/
│   ├── portal/                   # Client portal (protected)
│   │   ├── layout.tsx            # Session guard + sidebar shell
│   │   ├── page.tsx              # Portal overview
│   │   ├── projects/ invoices/ account/
│   │   └── login/
│   └── api/
│       ├── contact/              # Saves contact form to Supabase
│       ├── checkout/             # Creates Stripe checkout session
│       ├── webhooks/stripe/      # Stripe webhook handler
│       ├── admin/                # Admin auth + CRUD endpoints
│       └── portal/                # Client auth + read endpoints
├── components/
│   ├── Navbar.tsx                # Scroll-aware pill navbar (no portal link — see Footer)
│   ├── Footer.tsx                # Site links + Client Portal entry point
│   ├── Hero.tsx Services.tsx Work.tsx WhyUs.tsx Pricing.tsx
│   ├── Testimonials.tsx CTA.tsx Clients.tsx PageShell.tsx ForgeLogo.tsx
│   ├── SuccessContent.tsx
│   ├── admin/                    # AdminSidebar, AdminLoginForm, SettingsForm
│   └── portal/                   # PortalSidebar, PortalLoginForm
├── lib/
│   ├── supabase.ts               # Public (anon) Supabase client
│   ├── supabaseAdmin.ts          # Service-role Supabase client (server-only)
│   ├── adminAuth.ts              # Admin JWT session helpers
│   ├── clientAuth.ts             # Client JWT session helpers
│   ├── stripe.ts                 # Stripe client
│   └── utils.ts                  # Formatting + class-name helpers
└── supabase/
    └── migrations/
        ├── 001_init.sql                  # Contact, orders, subscriptions
        └── 002_admin_client_portal.sql   # Admins, clients, projects, invoices
```

---

## Getting Started

### 1. Install

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

A `.env.local` with safe development placeholders is already included so
`npm run dev` boots immediately — replace the values once you have real
Supabase/Stripe credentials.

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. In the SQL editor, run **both** migrations in order:
   - `supabase/migrations/001_init.sql`
   - `supabase/migrations/002_admin_client_portal.sql` (creates the demo admin
     and client logins — see below)
3. Copy your project URL, anon key, and service role key into `.env.local`

**Demo logins seeded by migration 002** (change these immediately after first login):

| Portal | Email | Password |
|--------|-------|----------|
| Admin (`/admin/login`) | `admin@theforge.io` | `ForgeAdmin#2026` |
| Client (`/portal/login`) | `client@jovico.world` | `ClientDemo#2026` |

### 4. Set up Stripe

1. Create products + prices in the [Stripe Dashboard](https://dashboard.stripe.com)
   for each tier: Spark, Ember, Blaze, Inferno
2. Add the price IDs to `.env.local`:
   ```env
   STRIPE_PRICE_SPARK=price_xxx
   STRIPE_PRICE_EMBER=price_xxx
   STRIPE_PRICE_BLAZE=price_xxx
   STRIPE_PRICE_INFERNO=price_xxx
   ```
3. Add a webhook endpoint pointing to `/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.*`

### 5. Generate auth secrets

```bash
openssl rand -hex 32   # ADMIN_JWT_SECRET
openssl rand -hex 32   # CLIENT_JWT_SECRET
```

### 6. Run locally

```bash
npm run dev
# Visit http://localhost:3000
```

For Stripe webhooks locally:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## Deploy

### Supabase

Already covered in step 3 above — run both migration files against your
hosted Supabase project before going live.

### Vercel

```bash
npm i -g vercel
vercel
```

Or connect the repo on [vercel.com](https://vercel.com) and add the same
environment variables from `.env.example` in the Vercel project settings.
`vercel.json` is pre-configured for the Next.js framework preset.

---

## Pricing Tiers

| Tier | One-time | Retainer | Best for |
|------|----------|----------|----------|
| **Spark** | $999 | $199/mo | A focused landing page to get online fast |
| **Ember** | $2,499 | $399/mo | A full marketing site with SEO foundations |
| **Blaze** | $4,999 | $799/mo | Full web apps — auth, payments, dashboards |
| **Inferno** | Custom quote | $1,499/mo | Complex platforms & ongoing partnerships |

---

## Brand

- **Logo**: flame mark in Pumpkin on a Charcoal field, wordmark `the` (Pumpkin) + `forge` (primary text color)
- **Fonts**: [Satoshi](https://fontshare.com/fonts/satoshi) (primary) + [Inter](https://fonts.google.com/specimen/Inter) (auxiliary)
- **Pumpkin**: `#FE7F2D` — primary accent, CTAs, highlights
- **Charcoal**: `#233D4D` — ink and dark surfaces
- Dark and light themes both supported via CSS variables (toggle in the navbar)

---

## License

MIT — theforge
