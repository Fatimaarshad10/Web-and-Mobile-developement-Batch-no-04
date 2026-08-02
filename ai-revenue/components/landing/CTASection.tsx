import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection({ onLoginOpen, onSignUpOpen }: { onLoginOpen?: (prefillEmail?: string) => void; onSignUpOpen?: () => void }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-violet-100 bg-[linear-gradient(135deg,#ffffff_0%,#f5f3ff_48%,#eef7ff_100%)] p-8 shadow-[0_28px_70px_-42px_rgba(124,92,252,0.4)] sm:p-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600">Ready to act</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-5xl">
              Ready to recover lost revenue?
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Turn hidden revenue leaks into recoverable growth with AI-driven monitoring, alerts, and action recommendations built for ecommerce teams.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => {
                if (onSignUpOpen) {
                  onSignUpOpen();
                  return;
                }

                onLoginOpen?.();
              }}
              className="rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-medium text-white hover:bg-violet-500"
            >
              Start Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-xl border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Book Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
