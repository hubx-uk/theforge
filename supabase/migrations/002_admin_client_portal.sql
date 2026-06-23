-- ════════════════════════════════════════════════════════════════
-- theforge — Admin + Client Portal schema
-- Adds team auth, client auth, projects, milestones, updates, and
-- invoices so the studio can run delivery and the client can track
-- progress without leaving the site.
-- ════════════════════════════════════════════════════════════════

-- Studio team members who can sign into /admin
create table if not exists admins (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text unique not null,
  password_hash text not null,
  role text not null default 'admin' check (role in ('owner', 'admin')),
  created_at timestamptz default now()
);

-- Clients who can sign into /portal to track their own work
create table if not exists clients (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text unique not null,
  password_hash text not null,
  company text,
  phone text,
  created_at timestamptz default now()
);

-- Projects theforge is delivering for a client
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references clients(id) on delete set null,
  name text not null,
  case_study_slug text,                -- optional link to a published case study
  plan_tier text default 'custom' check (plan_tier in ('spark', 'ember', 'blaze', 'inferno', 'custom')),
  billing_type text default 'one_time' check (billing_type in ('one_time', 'retainer', 'both')),
  status text default 'discovery' check (status in ('discovery', 'in_progress', 'review', 'completed', 'on_hold')),
  budget numeric,
  retainer_amount numeric,
  start_date date,
  target_date date,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Checklist / roadmap items shown on the client's project page
create table if not exists project_milestones (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  title text not null,
  status text default 'pending' check (status in ('pending', 'in_progress', 'done')),
  due_date date,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Timeline notes from the team, visible to the client
create table if not exists project_updates (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  author text default 'theforge team',
  message text not null,
  created_at timestamptz default now()
);

-- Invoices for one-time fees and retainer billing
create table if not exists invoices (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete set null,
  client_id uuid references clients(id) on delete cascade not null,
  description text not null,
  amount numeric not null,
  currency text default 'usd',
  invoice_type text default 'one_time' check (invoice_type in ('one_time', 'retainer')),
  status text default 'draft' check (status in ('draft', 'sent', 'paid', 'overdue', 'void')),
  due_date date,
  stripe_session_id text,
  created_at timestamptz default now(),
  paid_at timestamptz
);

create index if not exists projects_client_id_idx on projects(client_id);
create index if not exists milestones_project_id_idx on project_milestones(project_id);
create index if not exists updates_project_id_idx on project_updates(project_id);
create index if not exists invoices_client_id_idx on invoices(client_id);
create index if not exists invoices_project_id_idx on invoices(project_id);

-- RLS: every read/write goes through server-side code using the
-- service role key (admin + portal session checks happen in app code),
-- so the public/anon key gets no direct access to these tables.
alter table admins enable row level security;
alter table clients enable row level security;
alter table projects enable row level security;
alter table project_milestones enable row level security;
alter table project_updates enable row level security;
alter table invoices enable row level security;

-- No anon/authenticated policies are created. The service role used by server
-- routes bypasses RLS; public clients therefore have no access to these rows.
revoke all on table admins from anon, authenticated;
revoke all on table clients from anon, authenticated;
revoke all on table projects from anon, authenticated;
revoke all on table project_milestones from anon, authenticated;
revoke all on table project_updates from anon, authenticated;
revoke all on table invoices from anon, authenticated;

-- ── Demo seed data ─────────────────────────────────────────────
-- Default studio login — CHANGE THIS PASSWORD after first login via
-- /admin/settings. Email: admin@theforge.io  Password: ForgeAdmin#2026
insert into admins (name, email, password_hash, role)
values ('Forge Admin', 'admin@theforge.io', '$2a$12$P7YlyILQ5RHn/68Bor7Rf.wRL0AHsD6t.GWK1IG1u9L27Nzet171m', 'owner')
on conflict (email) do nothing;

-- Demo client login so you can preview /portal — Email: client@jovico.world
-- Password: ClientDemo#2026
insert into clients (name, email, password_hash, company, phone)
values ('Adaeze Okonkwo', 'client@jovico.world', '$2a$12$FhUK33Va.fUsOLzQq.kEye/Lfi.WYGikUB7YQJYOq3oOqpCNksvse', 'Jovico World', '+234 803 555 0192')
on conflict (email) do nothing;

insert into projects (client_id, name, case_study_slug, plan_tier, billing_type, status, budget, retainer_amount, start_date, target_date, description)
select id, 'Jovico World — E-Mobility Platform', 'jovico', 'inferno', 'both', 'in_progress', 6500, 999, '2026-02-10', '2026-07-31',
  'Next.js storefront and admin for electric mobility and solar retail, plus an ongoing monthly retainer for new features and support.'
from clients where email = 'client@jovico.world'
on conflict do nothing;

insert into project_milestones (project_id, title, status, due_date, sort_order)
select p.id, m.title, m.status, m.due_date::date, m.sort_order
from projects p
join (values
  ('Discovery & rebrand direction', 'done', '2026-02-21', 1),
  ('Storefront build (EVs + solar catalog)', 'done', '2026-04-04', 2),
  ('Admin dashboard & order management', 'in_progress', '2026-06-27', 3),
  ('Performance pass & launch hardening', 'pending', '2026-07-18', 4)
) as m(title, status, due_date, sort_order) on true
where p.case_study_slug = 'jovico'
on conflict do nothing;

insert into project_updates (project_id, message)
select p.id, u.message
from projects p
join (values
  ('Admin dashboard wireframes approved — moving into build this week.'),
  ('Fixed the sticky sidebar + image upload bugs flagged in last review.'),
  ('Seed data and new enum values for solar SKUs are live on staging.')
) as u(message) on true
where p.case_study_slug = 'jovico'
on conflict do nothing;

insert into invoices (project_id, client_id, description, amount, invoice_type, status, due_date)
select p.id, p.client_id, 'Jovico World — Spark project, milestone 2', 1999, 'one_time', 'paid', '2026-04-10'
from projects p where p.case_study_slug = 'jovico'
on conflict do nothing;

insert into invoices (project_id, client_id, description, amount, invoice_type, status, due_date)
select p.id, p.client_id, 'Jovico World — June retainer', 999, 'retainer', 'sent', '2026-07-01'
from projects p where p.case_study_slug = 'jovico'
on conflict do nothing;
