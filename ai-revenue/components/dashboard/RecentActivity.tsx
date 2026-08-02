"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ActivityItem } from "@/types";

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {activities.map((activity, index) => (
            <div key={activity.id}>
              <div className="flex items-start gap-4 py-3.5">
                <div
                  className={cn(
                    "mt-1 h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-white",
                    activity.type === "success" && "bg-green-500 ring-green-100",
                    activity.type === "warning" && "bg-orange-500 ring-orange-100",
                    activity.type === "info" && "bg-blue-500 ring-blue-100",
                    activity.type === "error" && "bg-red-500 ring-red-100"
                  )}
                />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{activity.description}</p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
                    {activity.timestamp}
                  </p>
                </div>
              </div>

              {index < activities.length - 1 && <Separator className="bg-slate-200" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}