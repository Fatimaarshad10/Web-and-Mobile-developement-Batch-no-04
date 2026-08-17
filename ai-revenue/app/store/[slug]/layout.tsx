"use client";

import { ReactNode } from "react";
import { use } from "react";
import { mockStores } from "@/lib/mock/stores";
import { CartProvider } from "@/components/store/CartContext";
import StoreNavbar from "@/components/store/StoreNavbar";
import StoreFooter from "@/components/store/StoreFooter";
import { StoreProvider } from "@/components/store/StoreContext";

interface StoreLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export default function StoreLayout({ children, params }: StoreLayoutProps) {
  const { slug } = use(params);
  const store = mockStores.find((s) => s.slug === slug);
  if (!store) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Store not found
      </div>
    );
  }

  return (
    <StoreProvider slug={slug}>
      <CartProvider>
        <div className="flex min-h-screen flex-col bg-white text-slate-900">
          <StoreNavbar store={store} />
          <main className="flex-1">{children}</main>
          <StoreFooter store={store} />
        </div>
      </CartProvider>
    </StoreProvider>
  );
}
