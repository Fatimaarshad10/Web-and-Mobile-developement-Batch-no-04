"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/store/CartContext";
import { useStore } from "@/components/store/StoreContext";
import { getProductsByStore } from "@/lib/supabase/products";
import { Product } from "@/lib/mock/products";

interface ProductPageProps {
  params: {
    slug: string;
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const { store, loading: storeLoading } = useStore();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!store) return;

    const loadProduct = async () => {
      setProductsLoading(true);
      try {
        const products = await getProductsByStore(store.id);
        const found = products.find((p) => p.id === params.id) || null;
        setProduct(found);
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setProductsLoading(false);
      }
    };

    loadProduct();
  }, [store, params.id]);

  if (storeLoading || productsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  if (!store || !product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addItem({ product: {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    }, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="flex h-96 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-100 to-sky-100">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full rounded-3xl object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-violet-700">
                {product.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900">
              {product.name}
            </h1>
            <p className="mt-4 text-base text-slate-600">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold text-slate-900">
              ${product.price.toFixed(2)}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <label className="text-sm font-medium text-slate-700">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-medium text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-violet-600 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-violet-500 disabled:opacity-50"
            >
              {added ? "Added to Cart!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
  );
}
