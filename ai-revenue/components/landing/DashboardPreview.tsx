import Image from "next/image";
import { Activity, ArrowUpRight, BadgePercent, BellDot, DollarSign, Search, Sparkles } from "lucide-react";

export function DashboardPreview() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute -left-12 top-12 h-32 w-32 rounded-full bg-violet-200/70 blur-3xl" />
      <div className="absolute -right-12 top-1/3 h-36 w-36 rounded-full bg-sky-200/70 blur-3xl" />

      <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_32px_90px_-38px_rgba(15,23,42,0.3)] sm:p-5">
        <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden bg-transparent">
                <Image src="/logo.png" alt="AI Revenue Recovery" fill className="object-contain" />
              </div>
              <div className="text-sm font-semibold text-slate-800">AI Revenue Recovery</div>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600">
                <Search className="h-4 w-4" />
                Search
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600">
                <BellDot className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { label: "Revenue", value: "$74.9K", change: "+12.4%" },
                  { label: "Orders", value: "2,148", change: "+8.1%" },
                  { label: "Recovered", value: "$18.2K", change: "+19.8%" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="text-sm">{stat.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-900">{stat.value}</div>
                    <div className="mt-2 text-xs font-medium text-emerald-600">{stat.change}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Revenue trend</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">Performance Overview</p>
                  </div>
                  <div className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">Live</div>
                </div>

                <div className="flex h-40 items-end gap-2">
                  {[24, 36, 30, 47, 40, 62, 58, 72, 78, 68, 90].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t-2xl bg-gradient-to-t from-violet-500 to-sky-400" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-700">Detected leaks</p>
                  <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-700">3 alerts</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "Checkout drop-off", value: "12%", tone: "amber" },
                    { label: "Refund spike", value: "8%", tone: "rose" },
                    { label: "Inventory mismatch", value: "4%", tone: "sky" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-slate-50 p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{item.label}</span>
                        <span className="font-semibold text-slate-900">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-700">AI recommendation</p>
                  <Sparkles className="h-4 w-4 text-violet-600" />
                </div>
                <div className="mt-4 rounded-2xl bg-violet-50 p-3">
                  <p className="text-sm font-medium text-slate-900">Reduce shipping friction on mobile</p>
                  <p className="mt-2 text-xs leading-6 text-slate-600">A 4-step checkout simplification could recover $6.2K monthly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
