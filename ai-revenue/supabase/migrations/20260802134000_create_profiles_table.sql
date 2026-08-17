-- Migration: Create the profiles table
--
-- Security: This table intentionally does NOT contain a `password` column.
-- Supabase Auth (`auth.users`) is the sole owner of credential data.
--
-- If you previously ran a migration that added a `password` column to `profiles`,
-- remove it before applying this migration with:
--   ALTER TABLE public.profiles DROP COLUMN IF EXISTS password;
--
-- Apply this migration in the Supabase SQL editor or via the Supabase CLI
-- (`supabase db push`). Run it BEFORE the sign-up flow so the `profiles`
-- table exists for inserts.

create table if not exists public.profiles (
  auth_id       uuid primary key references auth.users not null,
  full_name     text not null,
  business_name text not null,
  email         text not null unique,
  created_at    timestamp with time zone default now() not null,
  updated_at    timestamp with time zone default now() not null
);

-- Keep updated_at in sync automatically (production-ready).
create or replace function public.update_updated_at()
  returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.update_updated_at();

-- Row Level Security: only authenticated users may manage their own profile.
alter table public.profiles enable row level security;

create policy "Allow read access to own profile"
  on public.profiles for select
  using (auth.uid() = auth_id);

create policy "Allow insert of own profile on sign up"
  on public.profiles for insert
  with check (auth.uid() = auth_id);

create policy "Allow update of own profile"
  on public.profiles for update
  using (auth.uid() = auth_id)
  with check (auth.uid() = auth_id);
