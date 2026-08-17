"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/components/store/CartContext";
import StoreNavbar from "@/components/store/StoreNavbar";
import StoreFooter from "@/components/store/StoreFooter";
import { StoreProvider, useStore } from "@/components/store/StoreContext";

interface StoreLayoutProps {
  children: ReactNode;
  params: {
    slug: string;
  };
}

function StoreContent({ children }: { children: ReactNode }) {
  const { store, loading, error } = useStore();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading store...
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        {error || "Store not found"}
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-white text-slate-900">
        <StoreNavbar store={store} />
        <main className="flex-1">{children}</main>
        <StoreFooter store={store} />
      </div>
    </CartProvider>
  );
}

export default function StoreLayout({ children, params }: StoreLayoutProps) {
  return (
    <StoreProvider slug={params.slug}>
      <StoreContent>{children}</StoreContent>
    </StoreProvider>
  );
}
