"use client";

import { useEffect, useState } from "react";
import StoreHero from "@/components/store/StoreHero";
import ProductGrid from "@/components/store/ProductGrid";
import { useStore } from "@/components/store/StoreContext";
import { getProductsByStore } from "@/lib/supabase/products";
import { Product } from "@/lib/mock/products";

export default function StorePage() {
  const { store, loading } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    if (!store) return;

    const loadProducts = async () => {
      setProductsLoading(true);
      try {
        const data = await getProductsByStore(store.id);
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, [store]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading store...
      </div>
    );
  }

  if (!store) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Store not found
      </div>
    );
  }

  return (
    <>
      <StoreHero store={store} />
      <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Our Products
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Browse our curated selection of products.
        </p>
        <div className="mt-8">
          {productsLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-violet-600" />
            </div>
          ) : (
            <ProductGrid products={products} storeSlug={store.slug} />
          )}
        </div>
      </section>
    </>
  );
}
