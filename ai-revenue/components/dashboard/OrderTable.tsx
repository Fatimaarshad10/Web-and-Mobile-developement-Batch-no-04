import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface OrderRow {
  id: string;
  customer: string;
  productCount: number;
  total: string;
  payment: "Paid" | "Pending" | "Failed" | "Refunded";
  fulfillment: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  avatar: string;
}

interface OrderTableProps {
  orders: OrderRow[];
}

const paymentTone = {
  Paid: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  Failed: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
  Refunded: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
};

const fulfillmentTone = {
  Pending: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
  Processing: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
  Shipped: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
  Delivered: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  Cancelled: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
};

export function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Orders</h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Filter
          </button>
          <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Sort
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left">
          <thead className="bg-slate-50 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
            <tr>
              <th className="px-5 py-3">Order ID</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Items</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Payment</th>
              <th className="px-5 py-3">Fulfillment</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-slate-200 transition-colors hover:bg-slate-50/80">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">#{order.id}</td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
                      {order.avatar}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{order.customer}</span>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">{order.productCount}</td>
                <td className="px-5 py-4 text-sm font-semibold text-slate-900">{order.total}</td>

                <td className="px-5 py-4">
                  <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", paymentTone[order.payment])}>
                    {order.payment}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", fulfillmentTone[order.fulfillment])}>
                    {order.fulfillment}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">{order.date}</td>

                <td className="px-5 py-4 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-slate-100">
                    <MoreHorizontal className="h-4 w-4 text-slate-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-5 py-3 text-sm text-slate-500">
        <span>Showing 1-5 of 128</span>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5">Previous</button>
          <button className="rounded-lg bg-violet-600 px-3 py-1.5 text-white">1</button>
          <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5">2</button>
          <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5">Next</button>
        </div>
      </div>
    </div>
  );
}
