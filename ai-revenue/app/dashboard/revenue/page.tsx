"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  CalendarRange,
  Download,
  RefreshCcw,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { RevenueTrendChart } from "@/components/dashboard/RevenueTrendChart";
import { RevenueBreakdownCard } from "@/components/dashboard/RevenueBreakdownCard";
import { RevenueLeakCard } from "@/components/dashboard/RevenueLeakCard";
import { TopProductsTable } from "@/components/dashboard/TopProductsTable";
import { ForecastCard } from "@/components/dashboard/ForecastCard";
import { Timeline } from "@/components/dashboard/Timeline";
import { EmptyStateCard } from "@/components/dashboard/EmptyStateCard";
import { RevenuePageSkeleton } from "@/components/dashboard/RevenuePageSkeleton";

const kpis = [
  { title: "Total Revenue", value: "$84,620", change: 18.4, icon: BadgeDollarSign },
  { title: "Net Revenue", value: "$72,340", change: 11.2, icon: TrendingUp },
  { title: "AOV", value: "$142.90", change: 6.5, icon: ArrowUpRight },
  { title: "Revenue Growth", value: "+16.8%", change: 16.8, icon: TrendingUp },
];

const trendData = [42, 44, 40, 48, 52, 58, 60, 65, 62, 68, 72, 75];

const channels = [
  { label: "Organic Search", value: "$24.3K", percentage: 74, change: 12, color: "bg-violet-500" },
  { label: "Paid Ads", value: "$18.1K", percentage: 62, change: 9, color: "bg-sky-500" },
  { label: "Email", value: "$14.2K", percentage: 48, change: 14, color: "bg-indigo-500" },
  { label: "Social", value: "$11.6K", percentage: 36, change: 4, color: "bg-violet-400" },
];

const products = [
  { image: "A-102", name: "Summit Trail Backpack", units: "1,460", revenue: "$18,420", conversion: "4.8%", growth: 18 },
  { image: "B-120", name: "Aero Running Jacket", units: "1,120", revenue: "$14,260", conversion: "4.2%", growth: 14 },
  { image: "C-305", name: "North Peak Bottle", units: "980", revenue: "$9,760", conversion: "3.9%", growth: 10 },
  { image: "D-440", name: "Summit Utility Tote", units: "780", revenue: "$8,440", conversion: "3.4%", growth: 8 },
];

const revenueLeaks = [
  {
    title: "Checkout Abandonment",
    description: "A large portion of customers are dropping off during shipping and payment selection on mobile devices.",
    loss: "$3,240/month",
    severity: "critical" as const,
    priority: 1,
  },
  {
    title: "Refund Loss",
    description: "Returned items are outpacing the prior cycle, especially in winter apparel categories.",
    loss: "$1,680/month",
    severity: "warning" as const,
    priority: 2,
  },
  {
    title: "Discount Overuse",
    description: "Heavy discounting on top campaigns is reducing contribution margin without proportional lift.",
    loss: "$1,260/month",
    severity: "info" as const,
    priority: 3,
  },
];

const timeline = [
  {
    id: "1",
    title: "Revenue increased after campaign",
    description: "The spring campaign lifted direct-to-customer sales by 11.2% week over week.",
    time: "14m ago",
    type: "success" as const,
  },
  {
    id: "2",
    title: "Refund spike detected",
    description: "High-value order refunds increased following the batch of return-heavy SKUs.",
    time: "1h ago",
    type: "warning" as const,
  },
  {
    id: "3",
    title: "High-value customer purchase",
    description: "A repeat buyer placed a premium order with 2.8x average basket value.",
    time: "3h ago",
    type: "report" as const,
  },
  {
    id: "4",
    title: "New revenue opportunity identified",
    description: "AI recommends improving international checkout for best-performing product bundles.",
    time: "6h ago",
    type: "info" as const,
  },
];

export default function RevenuePage() {
  return (
    <div className="space-y-8 py-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-semibold text-violet-600">Revenue</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
            Revenue Overview
          </h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            Monitor revenue performance, identify growth opportunities, and recover lost sales.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <CalendarRange className="h-4 w-4" />
            Last 30 days
          </button>
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white px-3 py-2.5 text-sm font-medium shadow-sm hover:bg-slate-50">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white px-3 py-2.5 text-sm font-medium shadow-sm hover:bg-slate-50">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((stat) => (
          <KpiCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
        <SectionHeader
          eyebrow="Trend"
          title="Revenue over time"
          description="Track revenue trajectory and compare performance across different timeframes."
          action={
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
              {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((tab, index) => (
                <button
                  key={tab}
                  className={index === 2 ? 'rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-900 shadow-sm' : 'px-3 py-1.5 text-sm text-slate-500'}
                >
                  {tab}
                </button>
              ))}
            </div>
          }
        />

        <RevenueTrendChart data={trendData} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueBreakdownCard
          title="Sales Channel"
          items={channels}
        />

        <RevenueBreakdownCard
          title="Products"
          items={[
            { label: "Best Sellers", value: "$26.3K", percentage: 81, change: 12, color: "bg-violet-500" },
            { label: "Bundles", value: "$18.4K", percentage: 63, change: 9, color: "bg-sky-500" },
            { label: "Accessories", value: "$12.8K", percentage: 42, change: 6, color: "bg-indigo-500" },
          ]}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueBreakdownCard
          title="Categories"
          items={[
            { label: "Apparel", value: "$31.8K", percentage: 86, change: 15, color: "bg-violet-500" },
            { label: "Footwear", value: "$18.2K", percentage: 62, change: 11, color: "bg-sky-500" },
            { label: "Accessories", value: "$9.7K", percentage: 34, change: 7, color: "bg-indigo-500" },
          ]}
        />

        <RevenueBreakdownCard
          title="Devices"
          items={[
            { label: "Desktop", value: "$39.6K", percentage: 72, change: 9, color: "bg-violet-500" },
            { label: "Mobile", value: "$28.3K", percentage: 58, change: 18, color: "bg-sky-500" },
            { label: "Tablet", value: "$11.7K", percentage: 30, change: 5, color: "bg-indigo-500" },
          ]}
        />
      </div>

      <TopProductsTable products={products} />

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
          <SectionHeader
            eyebrow="Revenue protection"
            title="Revenue Leaks"
            description="The biggest issues reducing your potential revenue in the current cycle."
          />

          <div className="space-y-4">
            {revenueLeaks.map((leak) => (
              <RevenueLeakCard key={leak.title} {...leak} />
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-violet-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8f6ff_100%)] p-5 shadow-[0_20px_50px_-30px_rgba(124,92,252,0.4)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-sm shadow-violet-200">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600">
                AI insight
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">AI Revenue Insights</h3>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h4 className="text-2xl font-semibold tracking-tight text-slate-900">
                Mobile checkout abandonment increased by 24%
              </h4>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Users are dropping off before payment due to shipping options displayed late in the journey. This is reducing conversion on your highest-intent traffic.
              </p>
            </div>

            <div className="rounded-[18px] border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">Estimated lost revenue</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">$3,240/month</p>
            </div>

            <div className="rounded-[18px] border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">Recommended action</p>
              <p className="mt-2 text-base font-semibold text-slate-900">Improve mobile checkout flow</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Show shipping cost earlier</li>
                <li>• Launch abandoned cart campaign</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500">
                View Details
              </Button>
              <Button variant="outline" className="rounded-xl border-violet-200 bg-white px-4 py-2.5 text-sm font-medium text-violet-700 hover:bg-violet-50">
                Generate Action Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <ForecastCard expectedRevenue="$91,020" growth="+12.4%" confidence="88%" />

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
          <SectionHeader
            eyebrow="Activity"
            title="Recent Revenue Activity"
          />

          <Timeline items={timeline} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <EmptyStateCard
          title="No revenue data"
          description="Revenue trend data is not available for the selected range yet. Try selecting another date range or syncing your store."
          actionLabel="Refresh"
          onAction={() => undefined}
        />

        <EmptyStateCard
          title="No AI insights"
          description="The AI is analyzing your revenue pattern and will suggest improvements once it identifies a high-confidence opportunity."
          actionLabel="Run analysis"
          onAction={() => undefined}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <EmptyStateCard
          title="No revenue leaks"
          description="No major revenue leaks are currently flagged. We’ll notify you if new issues appear."
          actionLabel="Review checklist"
          onAction={() => undefined}
        />

        <EmptyStateCard
          title="No forecast available"
          description="Forecast data will appear once enough revenue history is collected for the selected period."
          actionLabel="Generate forecast"
          onAction={() => undefined}
        />
      </div>

      <RevenuePageSkeleton />
    </div>
  );
}
