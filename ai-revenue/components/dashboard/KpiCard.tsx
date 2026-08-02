import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  trend?: number[];
}

export function KpiCard({ title, value, change, icon: Icon, trend = [32, 38, 34, 42, 46, 49, 58] }: KpiCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="group border border-slate-200 bg-white shadow-[0_8px_24px_-18px_rgba(15,23,42,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-22px_rgba(15,23,42,0.22)]">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <div className="mt-3 text-[28px] font-semibold tracking-[-0.04em] text-slate-900">
              {value}
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1",
                isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}
            >
              {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(change)}%
            </span>
          </div>

          <div className="flex h-10 items-end gap-1">
            {trend.map((point, index) => (
              <span
                key={`${title}-${index}`}
                className={cn(
                  "block w-1.5 rounded-full bg-violet-100 transition-all group-hover:bg-violet-200",
                  index === trend.length - 1 && "bg-violet-500",
                  index === trend.length - 2 && "bg-violet-400"
                )}
                style={{ height: `${point}px` }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
