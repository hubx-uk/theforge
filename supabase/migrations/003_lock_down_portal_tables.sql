-- The application reads and writes these tables exclusively through server-side
-- routes using the Supabase service role. The original `using (true)` policies
-- unintentionally made every row available to anon/authenticated API clients.

drop policy if exists "service_role_all" on public.admins;
drop policy if exists "service_role_all" on public.clients;
drop policy if exists "service_role_all" on public.projects;
drop policy if exists "service_role_all" on public.project_milestones;
drop policy if exists "service_role_all" on public.project_updates;
drop policy if exists "service_role_all" on public.invoices;

revoke all on table public.admins from anon, authenticated;
revoke all on table public.clients from anon, authenticated;
revoke all on table public.projects from anon, authenticated;
revoke all on table public.project_milestones from anon, authenticated;
revoke all on table public.project_updates from anon, authenticated;
revoke all on table public.invoices from anon, authenticated;

-- The service role bypasses RLS. No public policies are intentionally created.
