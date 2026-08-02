import { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
