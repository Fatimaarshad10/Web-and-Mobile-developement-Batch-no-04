"use client";

import Link from "next/link";
import { useCart } from "@/components/store/CartContext";
import { Store } from "@/lib/mock/stores";

interface StoreNavbarProps {
  store: Store;
}

export default function StoreNavbar({ store }: StoreNavbarProps) {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href={`/store/${store.slug}`}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700 ring-1 ring-slate-200">
              {store.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </div>
            <span className="text-lg font-semibold text-slate-900">
              {store.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href={`/store/${store.slug}`}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Home
            </Link>
            <Link
              href={`/store/${store.slug}#products`}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Products
            </Link>
            <Link
              href={`/store/${store.slug}/cart`}
              className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
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
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Cart
              {itemCount > 0 && (
                <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-violet-600 px-1.5 text-[11px] font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <Link
              href={`/store/${store.slug}/cart`}
              className="relative inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-violet-600 px-1.5 text-[11px] font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
