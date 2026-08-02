import { Activity, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "success" | "info" | "warning" | "report";
}

interface TimelineProps {
  items: TimelineItem[];
}

const iconMap = {
  success: CheckCircle2,
  info: Sparkles,
  warning: Activity,
  report: TrendingUp,
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const Icon = iconMap[item.type];

        return (
          <div key={item.id} className="flex gap-3">
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm",
                  item.type === "success" && "bg-emerald-500",
                  item.type === "info" && "bg-violet-500",
                  item.type === "warning" && "bg-amber-500",
                  item.type === "report" && "bg-sky-500"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>

              {index < items.length - 1 && (
                <div className="mt-2 h-8 w-px bg-slate-200" />
              )}
            </div>

            <div className="min-w-0 flex-1 pb-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-900">{item.title}</p>
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                  {item.time}
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-500">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
