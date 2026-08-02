import { ArrowRight, Play, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero({ onLoginOpen, onSignUpOpen }: { onLoginOpen?: (prefillEmail?: string) => void; onSignUpOpen?: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,_rgba(124,92,252,0.18),_rgba(116,185,255,0.1)_38%,_transparent_68%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-20 lg:pt-16">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
            <Sparkles className="h-3.5 w-3.5" />
            AI revenue recovery
          </div>

          <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-6xl">
            Recover lost ecommerce revenue before it impacts your business.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            AI Revenue Recovery continuously monitors your store, surfaces hidden revenue leaks, and helps your team act before conversions and profit slip away.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
              <Play className="mr-2 h-4 w-4" />
              View Demo
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              2.4x faster issue detection
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-sky-500" />
              Real-time monitoring
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-violet-200/60 blur-3xl" />
          <div className="absolute -right-4 bottom-0 h-40 w-40 rounded-full bg-sky-200/60 blur-3xl" />

          <div className="relative rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_32px_80px_-36px_rgba(15,23,42,0.32)]">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Revenue health</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">$89.4K</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-2.5 py-2 text-emerald-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-xs text-slate-500">Conversion</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">3.24%</p>
                  <div className="mt-3 flex h-12 items-end gap-1">
                    {[24, 36, 28, 48, 54, 66].map((height, index) => (
                      <span key={index} className="block flex-1 rounded-t-md bg-violet-200" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-xs text-slate-500">Recovered</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">$12.8K</p>
                  <div className="mt-4 space-y-2">
                    {[84, 64, 52, 72].map((width, index) => (
                      <div key={index} className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-400" style={{ width: `${width}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 left-6 rounded-2xl border border-violet-100 bg-white p-3 shadow-lg shadow-violet-100/50">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">AI signal</p>
                  <p className="text-sm font-semibold text-slate-900">Checkout drop-off +12%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
