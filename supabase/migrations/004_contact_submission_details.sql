-- Capture the current service area and optional company from the public contact form.
alter table public.contact_submissions
  add column if not exists company text,
  add column if not exists work_needed text;

alter table public.contact_submissions
  drop constraint if exists contact_submissions_work_needed_check;

alter table public.contact_submissions
  add constraint contact_submissions_work_needed_check
  check (work_needed is null or work_needed in (
    'web-apps', 'mobile-apps', 'ecommerce', 'seo', 'paid-ads',
    'content', 'automation', 'crm-setup', 'analytics', 'not-sure'
  ));

-- Server routes use the service role, which bypasses RLS. Public clients need no policy.
drop policy if exists "service_role_all" on public.contact_submissions;
revoke all on table public.contact_submissions from anon, authenticated;
