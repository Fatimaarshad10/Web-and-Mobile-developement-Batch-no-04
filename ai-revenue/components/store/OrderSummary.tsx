"use client";

import { CartItem } from "@/lib/mock/orders";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
}

export default function OrderSummary({ items, subtotal, shipping }: OrderSummaryProps) {
  const total = subtotal + shipping;

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between text-sm">
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium text-slate-900">{item.product.name}</p>
              <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
            </div>
            <span className="font-semibold text-slate-900">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
        <div className="flex items-center justify-between text-slate-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex items-center justify-between text-base font-semibold text-slate-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
