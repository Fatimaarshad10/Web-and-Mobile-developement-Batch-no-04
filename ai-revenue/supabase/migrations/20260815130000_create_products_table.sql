-- Migration: Create the products table
--
-- Products are scoped to an authenticated user via `user_id` (auth.users).
-- Row Level Security ensures users can only access their own products.

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  name        text not null,
  description text,
  price       numeric not null,
  stock       integer not null,
  image_url   text,
  status      text not null default 'Active',
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

-- Keep updated_at in sync automatically.
create or replace function public.update_updated_at()
  returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_products_updated_at
  before update on public.products
  for each row
  execute function public.update_updated_at();

-- Enforce valid status values.
alter table public.products
  add constraint products_status_check check (status in ('Active', 'Draft'));

-- Row Level Security.
alter table public.products enable row level security;

create policy "Users can view their own products"
  on public.products for select
  using (auth.uid() = user_id);

create policy "Users can insert their own products"
  on public.products for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own products"
  on public.products for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own products"
  on public.products for delete
  using (auth.uid() = user_id);
