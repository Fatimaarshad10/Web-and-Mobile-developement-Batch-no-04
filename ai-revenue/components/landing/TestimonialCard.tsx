interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
}

export function TestimonialCard({ name, role, company, quote, initials }: TestimonialCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(15,23,42,0.18)]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
      </div>

      <p className="mt-5 text-base leading-7 text-slate-600">“{quote}”</p>

      <div className="mt-5 border-t border-slate-200 pt-4 text-sm font-medium text-slate-500">
        {company}
      </div>
    </div>
  );
}
