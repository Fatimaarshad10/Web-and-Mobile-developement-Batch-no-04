"use client";

import Link from "next/link";
import { Store } from "@/lib/mock/stores";

interface StoreHeroProps {
  store: Store;
}

export default function StoreHero({ store }: StoreHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-5xl">
            {store.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{store.heroDescription}</p>
          <div className="mt-8">
            <Link
              href={`/store/${store.slug}#products`}
              className="inline-flex h-12 items-center rounded-xl bg-violet-600 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-violet-500"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-50 to-sky-50" />
    </section>
  );
}
