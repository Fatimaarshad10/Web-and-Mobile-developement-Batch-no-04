"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { mockOrders } from "@/lib/mock/orders";
import { useStore } from "@/components/store/StoreContext";

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { store, loading } = useStore();
  const order = orderId ? mockOrders.find((o) => o.id === orderId) : null;

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

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-600"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Order Successful!
        </h1>
        <p className="mt-2 text-slate-500">
          Thank you for your order. We&apos;ll send you a confirmation shortly.
        </p>

        {order && (
          <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-sm">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-500">Order ID</span>
                <span className="font-semibold text-slate-900">{order.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-500">Customer</span>
                <span className="font-semibold text-slate-900">{order.customerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-500">Total</span>
                <span className="font-semibold text-slate-900">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-500">Status</span>
                <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={() => router.push(`/store/${store.slug}`)}
          className="mt-8 rounded-xl bg-violet-600 px-6 py-3 text-sm font-medium text-white hover:bg-violet-500"
        >
          Continue Shopping
        </Button>
      </div>
  );
}
