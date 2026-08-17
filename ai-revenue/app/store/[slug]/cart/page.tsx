"use client";

import { useRouter } from "next/navigation";
import CartItemCard from "@/components/store/CartItem";
import OrderSummary from "@/components/store/OrderSummary";
import { useCart } from "@/components/store/CartContext";
import { useStore } from "@/components/store/StoreContext";

export default function CartPage() {
  const router = useRouter();
  const { store, loading } = useStore();
  const { items, subtotal } = useCart();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading...
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

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-slate-900">Your cart is empty</h2>
        <p className="mt-2 text-slate-500">Looks like you haven&apos;t added anything yet.</p>
        <button
          type="button"
          onClick={() => router.push(`/store/${store.slug}`)}
          className="mt-6 inline-flex h-10 items-center rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-500"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900">
        Shopping Cart
      </h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((item) => (
            <CartItemCard key={item.product.id} item={item} />
          ))}
        </div>
        <div>
          <OrderSummary items={items} subtotal={subtotal} shipping={0} />
          <button
            type="button"
            onClick={() => router.push(`/store/${store.slug}/checkout`)}
            className="mt-4 w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-violet-500"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
