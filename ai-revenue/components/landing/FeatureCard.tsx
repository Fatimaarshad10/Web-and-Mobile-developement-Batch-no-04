import { ArrowRight, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_-26px_rgba(15,23,42,0.18)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-violet-700">
        Learn more
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}
