import { ArrowRight, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProblemSeverity = "critical" | "warning" | "info";

interface ProblemCardProps {
  title: string;
  description: string;
  impact: string;
  severity: ProblemSeverity;
  priority?: number;
  onInvestigate?: () => void;
}

const severityConfig: Record<
  ProblemSeverity,
  { label: string; className: string; dot: string }
> = {
  critical: {
    label: "Critical",
    className: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
    dot: "bg-rose-500",
  },
  warning: {
    label: "Warning",
    className: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
    dot: "bg-amber-500",
  },
  info: {
    label: "Info",
    className: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
    dot: "bg-sky-500",
  },
};

export function ProblemCard({
  title,
  description,
  impact,
  severity,
  priority,
  onInvestigate,
}: ProblemCardProps) {
  const config = severityConfig[severity];

  return (
    <div className="rounded-[18px] border border-slate-200 bg-slate-50/70 p-4 transition-all duration-200 hover:border-slate-300 hover:bg-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-white ring-1 ring-slate-200">
            <ShieldAlert className="h-4 w-4 text-slate-600" />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
              <Badge className={cn("text-[11px] font-medium", config.className)}>
                {config.label}
              </Badge>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-600">{description}</p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <span className={cn("h-2 w-2 rounded-full", config.dot)} />
                Est. revenue loss: <span className="font-semibold text-slate-700">{impact}</span>
              </span>
              {priority !== undefined && (
                <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">
                  Priority {priority}
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="h-9 rounded-xl border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          onClick={onInvestigate}
        >
          Investigate
          <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
