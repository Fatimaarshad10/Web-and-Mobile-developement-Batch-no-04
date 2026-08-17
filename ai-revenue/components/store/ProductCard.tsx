"use client";

import Link from "next/link";
import { Product } from "@/lib/mock/products";

interface ProductCardProps {
  product: Product;
  storeSlug: string;
}

export default function ProductCard({ product, storeSlug }: ProductCardProps) {
  return (
    <Link
      href={`/store/${storeSlug}/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-violet-100 to-sky-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-2xl font-bold text-violet-700">
            {product.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-violet-700">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-slate-500">Stock: {product.stock}</span>
        </div>
      </div>
    </Link>
  );
}
