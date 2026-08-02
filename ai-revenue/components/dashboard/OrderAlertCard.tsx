import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type AlertPriority = "High" | "Medium" | "Low";

interface OrderAlertCardProps {
  title: string;
  description: string;
  impact: string;
  priority: AlertPriority;
}

const priorityTone: Record<AlertPriority, string> = {
  High: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
  Medium: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  Low: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
};

export function OrderAlertCard({ title, description, impact, priority }: OrderAlertCardProps) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-slate-50/70 p-4 transition-all duration-200 hover:border-slate-300 hover:bg-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <Badge className={priorityTone[priority]}>{priority}</Badge>
          </div>

          <p className="text-sm leading-6 text-slate-600">{description}</p>

          <div className="text-xs text-slate-500">
            Estimated impact: <span className="font-semibold text-slate-800">{impact}</span>
          </div>
        </div>

        <Button variant="outline" className="h-9 rounded-xl border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
          Quick action
          <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
