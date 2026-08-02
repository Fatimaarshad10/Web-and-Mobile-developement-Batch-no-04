import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RecommendationCardProps {
  title: string;
  description: string;
  impact: string;
  confidence: number;
  onAction?: () => void;
}

export function RecommendationCard({
  title,
  description,
  impact,
  confidence,
  onAction,
}: RecommendationCardProps) {
  return (
    <div className="rounded-[20px] border border-violet-100 bg-[linear-gradient(180deg,#ffffff_0%,#f9f7ff_100%)] p-5 shadow-[0_16px_50px_-26px_rgba(124,92,252,0.35)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-sm shadow-violet-200">
          <Sparkles className="h-5 w-5" />
        </div>

        <Badge className="bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
          {impact}
        </Badge>
      </div>

      <div className="mt-5 space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-600">
          AI recommendation
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h3>
        <p className="max-w-md text-sm leading-6 text-slate-600">{description}</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/80 p-3">
        <div>
          <p className="text-xs text-slate-500">Expected impact</p>
          <p className="mt-1 text-base font-semibold text-slate-900">{impact}</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">Confidence</p>
          <p className="mt-1 text-base font-semibold text-slate-900">{confidence}%</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="h-20 w-28 rounded-2xl border border-dashed border-violet-200 bg-violet-50/60" />

        <Button
          className="h-11 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-sm shadow-violet-200 hover:bg-violet-500"
          onClick={onAction}
        >
          Apply Recommendation
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
