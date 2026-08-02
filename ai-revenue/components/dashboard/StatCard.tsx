"use client";

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  prefix,
  suffix,
}: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="group border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
              {prefix}
              {value}
              {suffix}
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium",
              isPositive
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(change)}%
          </span>
          <span className="text-slate-500">vs. last month</span>
        </div>
      </CardContent>
    </Card>
  );
}