import { supabase } from "./client";

export interface Product {
  id: string;
  userId: string;
  storeId?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  status: "Active" | "Draft";
}

export interface ProductInsert {
  userId: string;
  storeId?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  status: "Active" | "Draft";
}

export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  status?: "Active" | "Draft";
}

export async function getProducts(userId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    storeId: row.store_id,
    name: row.name,
    description: row.description ?? "",
    price: Number(row.price),
    stock: row.stock,
    imageUrl: row.image_url ?? "",
    status: row.status,
  }));
}

export async function getProductsByStore(storeId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", storeId)
    .eq("status", "Active")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    storeId: row.store_id,
    name: row.name,
    description: row.description ?? "",
    price: Number(row.price),
    stock: row.stock,
    imageUrl: row.image_url ?? "",
    status: row.status,
  }));
}

export async function createProduct(payload: ProductInsert): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert({
      user_id: payload.userId,
      store_id: payload.storeId,
      name: payload.name,
      description: payload.description,
      price: payload.price,
      stock: payload.stock,
      image_url: payload.imageUrl,
      status: payload.status,
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create product.");
  }

  return {
    id: data.id,
    userId: data.user_id,
    storeId: data.store_id,
    name: data.name,
    description: data.description ?? "",
    price: Number(data.price),
    stock: data.stock,
    imageUrl: data.image_url ?? "",
    status: data.status,
  };
}

export async function updateProduct(userId: string, productId: string, updates: ProductUpdate): Promise<Product> {
  const payload: Record<string, unknown> = {};
  if (updates.name !== undefined) payload.name = updates.name;
  if (updates.description !== undefined) payload.description = updates.description;
  if (updates.price !== undefined) payload.price = updates.price;
  if (updates.stock !== undefined) payload.stock = updates.stock;
  if (updates.imageUrl !== undefined) payload.image_url = updates.imageUrl;
  if (updates.status !== undefined) payload.status = updates.status;

  const { data, error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", productId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to update product.");
  }

  return {
    id: data.id,
    userId: data.user_id,
    storeId: data.store_id,
    name: data.name,
    description: data.description ?? "",
    price: Number(data.price),
    stock: data.stock,
    imageUrl: data.image_url ?? "",
    status: data.status,
  };
}

export async function deleteProduct(userId: string, productId: string): Promise<void> {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
