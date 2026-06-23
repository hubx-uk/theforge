-- Contact form submissions
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Orders (one-time Stripe payments)
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  stripe_session_id text unique not null,
  customer_email text,
  plan text,
  amount integer,  -- in cents
  status text default 'pending',
  created_at timestamptz default now()
);

-- Subscriptions (recurring Stripe billing)
create table if not exists subscriptions (
  id uuid default gen_random_uuid() primary key,
  stripe_subscription_id text unique not null,
  stripe_customer_id text not null,
  status text not null,
  plan text,
  updated_at timestamptz default now()
);

-- RLS: only service role can read (not public)
alter table contact_submissions enable row level security;
alter table orders enable row level security;
alter table subscriptions enable row level security;

-- Allow service role full access (used in API routes)
create policy "service_role_all" on contact_submissions for all using (true);
create policy "service_role_all" on orders for all using (true);
create policy "service_role_all" on subscriptions for all using (true);
