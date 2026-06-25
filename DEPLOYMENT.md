# Deploying theforge to Supabase and Vercel

This runbook deploys the production app, applies the complete database schema, loads the included demo data, configures Stripe, and verifies the result.

## 1. Prerequisites

- A Git repository containing this project
- A [Supabase](https://supabase.com/dashboard) account and hosted project
- A [Vercel](https://vercel.com/new) account
- A Stripe account if checkout will be enabled
- Node.js 20.9 or newer
- The [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started) available through `npx supabase`

Install the project locally and confirm it is healthy before deploying:

```bash
npm install
npm run lint
npm run build
```

Copy the environment template for local work:

```bash
cp .env.example .env.local 
```

On PowerShell, use `Copy-Item .env.example .env.local`.

## 2. Create and configure Supabase

Create a Supabase project and record its project reference. In **Project Settings > API**, copy:

- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- anon/publishable key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- service-role/secret key → `SUPABASE_SERVICE_ROLE_KEY`

The service-role key bypasses Row Level Security. It belongs only in server-side environment variables. Never commit it or expose it with a `NEXT_PUBLIC_` prefix.

### Apply migrations with the Supabase CLI

Authenticate, link this directory to the hosted project, preview the pending migrations, then push them:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase migration list
npx supabase db push
```

`db push` applies every file in `supabase/migrations` in filename order:

1. `001_init.sql` — contact submissions, orders, subscriptions
2. `002_admin_client_portal.sql` — admins, clients, projects, milestones, updates, invoices, and demo rows
3. `003_lock_down_portal_tables.sql` — removes public table access
4. `004_contact_submission_details.sql` — company and service-interest fields for enquiries

The CLI records applied migrations in the target database, so subsequent pushes apply only new files. See Supabase's official [database migrations guide](https://supabase.com/docs/guides/deployment/database-migrations).

### Dashboard alternative

If the CLI cannot be used, open **SQL Editor** in Supabase and run the four migration files above in order. Do not skip the lock-down migrations.

## 3. Understand and secure the included seed data

Migration `002_admin_client_portal.sql` inserts a working demo workspace:

| Area | Login | Password |
| --- | --- | --- |
| Admin at `/admin/login` | `admin@theforge.ng` | `ForgeAdmin#2026` |
| Client at `/portal/login` | `client@jovico.world` | `ClientDemo#2026` |

It also creates the Jovico World demo project, milestones, updates, and invoices. The account inserts are conflict-safe, and a migration is applied only once by Supabase.

Treat these credentials as temporary seed data:

1. Sign in to `/admin/login` immediately after the first production deployment.
2. Change the admin name, email, and password in **Settings**.
3. Replace or delete the demo client and project records from the admin dashboard before inviting real clients.
4. Never reuse either demo password for another account.

For a production database that must contain no demonstration records, remove the seed section from migration `002_admin_client_portal.sql` **before the first push to a brand-new project**. Do not edit an already-applied migration; create a new cleanup migration instead.

Supabase's general seeding behaviour is documented in [Seeding your database](https://supabase.com/docs/guides/local-development/seeding-your-database).

## 4. Create application secrets

Generate two independent secrets. Do not use the fallback strings in the source code in production.

```bash
openssl rand -hex 32
openssl rand -hex 32
```

Store the first as `ADMIN_JWT_SECRET` and the second as `CLIENT_JWT_SECRET`.

## 5. Configure Stripe

In Stripe, create one product/price for each plan:

- Spark: one-time price
- Ember: one-time price
- Blaze: one-time price
- Inferno: recurring price

Record the price IDs as `STRIPE_PRICE_SPARK`, `STRIPE_PRICE_EMBER`, `STRIPE_PRICE_BLAZE`, and `STRIPE_PRICE_INFERNO`.

Use test keys in local and Preview environments. Use live keys only in Vercel's Production environment. Keep `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` server-only.

## 6. Import the project into Vercel

Push the repository to your Git provider, then use Vercel's **Add New > Project** flow to import it. Vercel detects Next.js automatically; the checked-in `vercel.json` keeps the install and build commands explicit.

In **Project Settings > Environment Variables**, add every variable from `.env.example`. At minimum, production needs:

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_JWT_SECRET
CLIENT_JWT_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_SPARK
STRIPE_PRICE_EMBER
STRIPE_PRICE_BLAZE
STRIPE_PRICE_INFERNO
```

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin with no trailing slash, for example `https://theforge.example`. Environment-variable changes apply only to new deployments, so redeploy after changing them. Vercel documents environment scopes and redeployment in [Environment variables](https://vercel.com/docs/environment-variables).

Deploy from the dashboard, or use the CLI from the project root:

```bash
npx vercel
npx vercel --prod
```

Vercel's official Next.js deployment guidance is available at [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs).

## 7. Register the production Stripe webhook

After the production URL is live, create a Stripe webhook endpoint:

```text
https://YOUR_DOMAIN/api/webhooks/stripe
```

Subscribe it to:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Copy the endpoint signing secret to Vercel as `STRIPE_WEBHOOK_SECRET`, then redeploy. Test mode and live mode use different webhook endpoints and secrets.

## 8. Production verification

Complete these checks without using real customer data:

1. Open `/`, `/services`, all nine service pages, `/help`, `/contact`, `/pricing`, `/admin/login`, and `/portal/login`.
2. Submit the contact form with a test address and confirm the row appears in `contact_submissions` with `company` and `work_needed`.
3. Sign in with the temporary admin and client seed accounts, then rotate the admin credentials.
4. Create a Stripe test checkout and confirm the webhook creates an `orders` or `subscriptions` row.
5. In a private browser window, verify Supabase tables cannot be read with only the public anon key.
6. Review Vercel function logs and Supabase logs for errors.

## 9. Future database changes

Never edit a migration that has already reached production. Create a new timestamped migration, test it locally or against a disposable Supabase project, then run:

```bash
npx supabase migration list
npx supabase db push
```

Back up important data before destructive schema changes. Database rollback is normally performed with a new forward migration; Vercel can roll the application back independently from the database.

## Common deployment failures

| Symptom | Check |
| --- | --- |
| Contact form returns 500 | `SUPABASE_SERVICE_ROLE_KEY` is present and migration `004` was applied |
| Admin/client login always fails | migrations and demo rows exist; JWT secrets are set |
| Checkout cannot create a session | Stripe secret and all four price IDs match the current Stripe mode |
| Checkout redirects to `undefined` | `NEXT_PUBLIC_SITE_URL` is set to the deployed origin |
| Webhook reports invalid signature | Vercel has the signing secret for that exact Stripe endpoint and mode |
| A new environment variable appears ignored | redeploy after saving it in Vercel |
