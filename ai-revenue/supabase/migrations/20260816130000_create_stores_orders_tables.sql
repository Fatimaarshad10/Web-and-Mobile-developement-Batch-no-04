-- Migration: Create stores, orders, and order_items tables
--
-- This migration adds the storefront and order domain to the app schema.
-- It also backfills `store_id` onto the existing `products` table so
-- products can be scoped to a storefront.

-- ---------------------------------------------------------------------------
-- Stores
-- ---------------------------------------------------------------------------
create table if not exists public.stores (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  name           text not null,
  slug           text not null unique,
  description    text,
  logo           text,
  hero_title     text not null,
  hero_description text not null,
  created_at     timestamptz default now() not null,
  updated_at     timestamptz default now() not null
);

create trigger set_stores_updated_at
  before update on public.stores
  for each row
  execute function public.update_updated_at();

alter table public.stores enable row level security;

create policy "Users can view their own stores"
  on public.stores for select
  using (auth.uid() = user_id);

create policy "Public can view all stores"
  on public.stores for select
  using (true);

create policy "Users can insert their own stores"
  on public.stores for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own stores"
  on public.stores for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own stores"
  on public.stores for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Orders
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id                  uuid primary key default gen_random_uuid(),
  store_id            uuid not null references public.stores(id) on delete cascade,
  customer_name       text not null,
  customer_email      text not null,
  customer_phone      text not null,
  customer_address    text not null,
  customer_city       text not null,
  customer_postal_code text not null,
  subtotal            numeric not null,
  shipping            numeric not null default 0,
  total               numeric not null,
  status              text not null default 'Pending',
  created_at          timestamptz default now() not null,
  updated_at          timestamptz default now() not null
);

create trigger set_orders_updated_at
  before update on public.orders
  for each row
  execute function public.update_updated_at();

alter table public.orders enable row level security;

-- Public checkout: allow anyone to insert an order.
create policy "Allow public order creation"
  on public.orders for insert
  with check (true);

-- Store owners can view orders for their stores.
create policy "Users can view orders for their stores"
  on public.orders for select
  using (
    exists (
      select 1 from public.stores
      where stores.id = orders.store_id
        and stores.user_id = auth.uid()
    )
  );

create policy "Users can update orders for their stores"
  on public.orders for update
  using (
    exists (
      select 1 from public.stores
      where stores.id = orders.store_id
        and stores.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.stores
      where stores.id = orders.store_id
        and stores.user_id = auth.uid()
    )
  );

create policy "Users can delete orders for their stores"
  on public.orders for delete
  using (
    exists (
      select 1 from public.stores
      where stores.id = orders.store_id
        and stores.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- Order Items
-- ---------------------------------------------------------------------------
create table if not exists public.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders(id) on delete cascade,
  product_id  uuid not null,
  name        text not null,
  price       numeric not null,
  quantity    integer not null,
  created_at  timestamptz default now() not null
);

alter table public.order_items enable row level security;

-- Public checkout: allow anyone to insert order items.
create policy "Allow public order item creation"
  on public.order_items for insert
  with check (true);

-- Store owners can view order items for orders belonging to their stores.
create policy "Users can view order items for their stores"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      join public.stores on stores.id = orders.store_id
      where orders.id = order_items.order_id
        and stores.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- Backfill store relationship onto products
-- ---------------------------------------------------------------------------
alter table public.products
  add column if not exists store_id uuid references public.stores(id) on delete set null;

-- Public read access for active products so storefronts can display them.
create policy "Users can view their own products"
  on public.products for select
  using (auth.uid() = user_id);

create policy "Public can view active products"
  on public.products for select
  using (status = 'Active');
