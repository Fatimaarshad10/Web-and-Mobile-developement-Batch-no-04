"use client";

import { CartItem } from "@/lib/mock/orders";
import { useCart } from "@/components/store/CartContext";

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-sky-100">
        {item.product.imageUrl ? (
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <span className="text-sm font-bold text-violet-700">
            {item.product.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-slate-900 truncate">
          {item.product.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 line-clamp-1">
          {item.product.description}
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-900">
          ${item.product.price.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => removeItem(item.product.id)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-medium text-slate-900">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
