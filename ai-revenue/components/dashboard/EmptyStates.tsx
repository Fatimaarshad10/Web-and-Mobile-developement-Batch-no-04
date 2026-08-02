"use client";

import { Inbox, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <Card className="flex min-h-[280px] items-center justify-center border-dashed border-slate-200 bg-slate-50/80 shadow-none">
      <CardContent className="flex max-w-sm flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mb-5 text-sm leading-6 text-slate-500">{description}</p>
        {action && (
          <Button
            variant="outline"
            onClick={action.onClick}
            className="rounded-xl border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}