import { cn } from "@/lib/utils";

interface RevenuePageSkeletonProps {
  className?: string;
}

export function RevenuePageSkeleton({ className }: RevenuePageSkeletonProps) {
  return (
    <div className={cn("space-y-8 animate-pulse", className)}>
      <div className="h-16 w-72 rounded-xl bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-36 rounded-[22px] border border-slate-200 bg-slate-100" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="h-80 rounded-[22px] border border-slate-200 bg-slate-100" />
        <div className="h-80 rounded-[22px] border border-slate-200 bg-slate-100" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-80 rounded-[22px] border border-slate-200 bg-slate-100" />
        <div className="h-80 rounded-[22px] border border-slate-200 bg-slate-100" />
      </div>
    </div>
  );
}
