import { supabase } from "./client";

export interface Store {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  heroTitle: string;
  heroDescription: string;
}

export interface StoreInsert {
  name: string;
  slug: string;
  description: string;
  logo: string;
  heroTitle: string;
  heroDescription: string;
}

export interface StoreUpdate {
  name?: string;
  slug?: string;
  description?: string;
  logo?: string;
  heroTitle?: string;
  heroDescription?: string;
}

export async function getStores(userId: string): Promise<Store[]> {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    logo: row.logo ?? "",
    heroTitle: row.hero_title,
    heroDescription: row.hero_description,
  }));
}

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    slug: data.slug,
    description: data.description ?? "",
    logo: data.logo ?? "",
    heroTitle: data.hero_title,
    heroDescription: data.hero_description,
  };
}

export async function createStore(userId: string, store: StoreInsert): Promise<Store> {
  const { data, error } = await supabase
    .from("stores")
    .insert({
      user_id: userId,
      name: store.name,
      slug: store.slug,
      description: store.description,
      logo: store.logo,
      hero_title: store.heroTitle,
      hero_description: store.heroDescription,
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create store.");
  }

  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    slug: data.slug,
    description: data.description ?? "",
    logo: data.logo ?? "",
    heroTitle: data.hero_title,
    heroDescription: data.hero_description,
  };
}

export async function updateStore(userId: string, storeId: string, updates: StoreUpdate): Promise<Store> {
  const payload: Record<string, unknown> = {};
  if (updates.name !== undefined) payload.name = updates.name;
  if (updates.slug !== undefined) payload.slug = updates.slug;
  if (updates.description !== undefined) payload.description = updates.description;
  if (updates.logo !== undefined) payload.logo = updates.logo;
  if (updates.heroTitle !== undefined) payload.hero_title = updates.heroTitle;
  if (updates.heroDescription !== undefined) payload.hero_description = updates.heroDescription;

  const { data, error } = await supabase
    .from("stores")
    .update(payload)
    .eq("id", storeId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to update store.");
  }

  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    slug: data.slug,
    description: data.description ?? "",
    logo: data.logo ?? "",
    heroTitle: data.hero_title,
    heroDescription: data.hero_description,
  };
}

export async function deleteStore(userId: string, storeId: string): Promise<void> {
  const { error } = await supabase
    .from("stores")
    .delete()
    .eq("id", storeId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
