import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type LeakSeverity = "critical" | "warning" | "info";

interface RevenueLeakCardProps {
  title: string;
  description: string;
  loss: string;
  severity: LeakSeverity;
  priority: number;
}

const severityMap: Record<LeakSeverity, string> = {
  critical: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  info: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
};

export function RevenueLeakCard({ title, description, loss, severity, priority }: RevenueLeakCardProps) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-slate-50/70 p-4 transition-all duration-200 hover:border-slate-300 hover:bg-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <Badge className={severityMap[severity]}>{severity}</Badge>
          </div>

          <p className="max-w-xl text-sm leading-6 text-slate-600">{description}</p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-800">Est. loss: {loss}</span>
            <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">
              Priority {priority}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="h-9 rounded-xl border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Investigate
          <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
