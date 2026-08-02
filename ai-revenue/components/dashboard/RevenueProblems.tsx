"use client";

import { ArrowRight, AlertTriangle, Info, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Problem } from "@/types";

interface RevenueProblemsProps {
  problems: Problem[];
  onInvestigate: (id: string) => void;
}

const severityConfig = {
  critical: {
    label: "Critical",
    variant: "destructive" as const,
    icon: XCircle,
  },
  warning: {
    label: "Warning",
    variant: "warning" as const,
    icon: AlertTriangle,
  },
  info: {
    label: "Info",
    variant: "secondary" as const,
    icon: Info,
  },
};

export function RevenueProblems({ problems, onInvestigate }: RevenueProblemsProps) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
            Priority
          </p>
          <CardTitle className="mt-2 text-xl">Revenue Problems</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {problems.map((problem) => {
          const config = severityConfig[problem.severity];
          const Icon = config.icon;

          return (
            <div
              key={problem.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-200 hover:border-slate-300 hover:bg-white md:flex-row md:items-start md:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
                  <Icon className="h-4 w-4" />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900">{problem.title}</h4>
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </div>

                  <p className="max-w-xl text-sm leading-6 text-slate-600">{problem.description}</p>

                  <p className="text-xs font-medium text-red-600">
                    Est. impact: {problem.estimatedImpact}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onInvestigate(problem.id)}
                className="h-9 rounded-xl border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Investigate
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}