import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIInsightCardProps {
  title: string;
  impact: string;
  description: string;
  actions: string[];
}

export function AIInsightCard({ title, impact, description, actions }: AIInsightCardProps) {
  return (
    <div className="rounded-[24px] border border-violet-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8f6ff_100%)] p-5 shadow-[0_20px_50px_-30px_rgba(124,92,252,0.4)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-sm shadow-violet-200">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-600">AI recommendation</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>
        </div>
      </div>

      <div className="mt-5 rounded-[18px] border border-slate-200 bg-white p-4">
        <p className="text-xs text-slate-500">Potential revenue impact</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{impact}</p>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-600">{description}</p>

      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {actions.map((action) => (
          <li key={action} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500" />
            <span>{action}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500">
          Investigate
        </Button>
        <Button variant="outline" className="rounded-xl border-violet-200 bg-white px-4 py-2.5 text-sm font-medium text-violet-700 hover:bg-violet-50">
          Generate Recovery Plan
        </Button>
      </div>
    </div>
  );
}
