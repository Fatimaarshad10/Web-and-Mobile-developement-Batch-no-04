"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIRecommendation } from "@/types";

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
  onAction: (id: string) => void;
}

export function AIRecommendations({ recommendations, onAction }: AIRecommendationsProps) {
  return (
    <Card className="border-blue-100 bg-slate-50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              AI insights
            </p>
            <CardTitle className="mt-1 text-xl">Top Recommendation</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-3">
                <h4 className="text-base font-semibold text-slate-900">{rec.title}</h4>
                <p className="text-sm leading-6 text-slate-600">{rec.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success" className="text-[11px]">
                    {rec.impact}
                  </Badge>
                  <span className="text-xs text-slate-500">{rec.confidence}% confidence</span>
                </div>
              </div>

              <Button
                size="sm"
                onClick={() => onAction(rec.id)}
                className="mt-1 h-9 rounded-xl bg-blue-600 px-3 text-white hover:bg-blue-700"
              >
                Apply
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}