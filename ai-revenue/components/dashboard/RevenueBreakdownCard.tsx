import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RevenueBreakdownCardProps {
  title: string;
  items: {
    label: string;
    value: string;
    percentage: number;
    change: number;
    color?: string;
  }[];
}

export function RevenueBreakdownCard({ title, items }: RevenueBreakdownCardProps) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <span className="text-xs font-medium text-slate-400">Last 30 days</span>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-sm">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-700">{item.label}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">{item.value}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                  <ArrowUpRight className="h-3 w-3" />
                  {item.change}%
                </span>
              </div>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={cn("h-full rounded-full", item.color ?? "bg-violet-500")}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
