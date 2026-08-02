import { cn } from "@/lib/utils";

interface OrderStatusCardProps {
  label: string;
  count: string;
  amount?: string;
  tone: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
}

const toneMap = {
  pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  processing: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
  shipped: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
  delivered: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  cancelled: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
  refunded: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
};

export function OrderStatusCard({ label, count, amount, tone }: OrderStatusCardProps) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-18px_rgba(15,23,42,0.22)]">
      <div className="flex items-center justify-between gap-3">
        <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]", toneMap[tone])}>
          {label}
        </span>
        <span className="text-xs font-medium text-slate-400">{amount ?? ""}</span>
      </div>

      <div className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-900">{count}</div>
    </div>
  );
}
