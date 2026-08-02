interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.2)]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-sm font-semibold text-white shadow-[0_12px_24px_-16px_rgba(124,92,252,0.75)]">
        {number}
      </div>
      <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}
