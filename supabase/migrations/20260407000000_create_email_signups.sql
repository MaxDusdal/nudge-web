create table if not exists public.email_signups (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  source     text not null default 'landing_page',
  created_at timestamptz not null default now(),

  constraint email_signups_email_key unique (email)
);

-- Only the service role and authenticated users can read rows.
-- Anon can INSERT (needed by the API route which uses the anon key).
alter table public.email_signups enable row level security;

create policy "anon can insert"
  on public.email_signups
  for insert
  to anon
  with check (true);
