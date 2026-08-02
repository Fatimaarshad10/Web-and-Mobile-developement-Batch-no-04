import { Inbox, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyStateCard({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateCardProps) {
  return (
    <Card className="border-dashed border-slate-200 bg-slate-50/80 shadow-none">
      <CardContent className="flex min-h-[240px] flex-col items-center justify-center px-6 py-10 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
        {actionLabel && onAction && (
          <Button
            variant="outline"
            className="mt-5 h-10 rounded-xl border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
