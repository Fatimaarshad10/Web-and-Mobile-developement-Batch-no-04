import { ArrowUpRight } from "lucide-react";

interface ForecastCardProps {
  expectedRevenue: string;
  growth: string;
  confidence: string;
}

export function ForecastCard({ expectedRevenue, growth, confidence }: ForecastCardProps) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Forecast
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Revenue Forecast</h3>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
          <ArrowUpRight className="h-3 w-3" />
          {growth}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-xs text-slate-500">Expected Revenue</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{expectedRevenue}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Projected Growth</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{growth}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Confidence</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{confidence}</p>
        </div>
      </div>

      <div className="mt-5 h-24 rounded-[18px] bg-gradient-to-r from-violet-100 via-sky-50 to-slate-100 p-3">
        <div className="flex h-full items-end gap-2">
          {[20, 32, 28, 38, 42, 48, 52, 58, 60, 64, 66, 72].map((height, index) => (
            <div
              key={index}
              className="w-full rounded-t-xl bg-gradient-to-t from-violet-500 to-sky-400 opacity-80"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
