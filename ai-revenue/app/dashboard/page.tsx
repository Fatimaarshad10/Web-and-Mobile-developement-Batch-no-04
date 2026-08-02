"use client";

import {
  ArrowRight,
  DollarSign,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ProblemCard } from "@/components/dashboard/ProblemCard";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { Timeline } from "@/components/dashboard/Timeline";
import { EmptyStateCard } from "@/components/dashboard/EmptyStateCard";
import { Button } from "@/components/ui/button";

const stats = [
  { title: "Revenue", value: "$45.2K", change: 12.4, icon: DollarSign },
  { title: "Orders", value: "1,234", change: 8.2, icon: ShoppingCart },
  { title: "Customers", value: "5,678", change: -2.1, icon: Users },
  { title: "Conversion", value: "3.24%", change: 4.5, icon: TrendingUp },
];

const problems = [
  {
    title: "Cart abandonment spike",
    description: "Users are dropping off during shipping selection at a higher rate than the last 30 days. The 3-step checkout is creating hesitation for mobile shoppers.",
    impact: "$12,450 / month",
    severity: "critical" as const,
    priority: 1,
  },
  {
    title: "Mobile checkout friction",
    description: "Checkout completion time on mobile is 39% slower than desktop. Shipping and payment step complexity are causing hesitation before purchase.",
    impact: "$8,200 / month",
    severity: "warning" as const,
    priority: 2,
  },
  {
    title: "Missing product trust signals",
    description: "A large portion of top-selling SKUs are missing reviews or social proof. This is reducing perceived quality and confidence before purchase.",
    impact: "$3,100 / month",
    severity: "info" as const,
    priority: 3,
  },
];

const activity = [
  {
    id: "1",
    title: "Store synced successfully",
    description: "Product and order data refreshed from your storefront.",
    time: "2m ago",
    type: "success" as const,
  },
  {
    id: "2",
    title: "New revenue leak detected",
    description: "Checkout drop-off increased by 5.2% after the shipping update.",
    time: "18m ago",
    type: "warning" as const,
  },
  {
    id: "3",
    title: "AI recommendation generated",
    description: "There are 2 high-confidence opportunities to improve conversion.",
    time: "1h ago",
    type: "info" as const,
  },
  {
    id: "4",
    title: "Campaign created",
    description: "A cart recovery flow was launched for high-risk segments.",
    time: "3h ago",
    type: "report" as const,
  },
];

export default function DashboardHomePage() {
  return (
    <div className="space-y-8 py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-violet-600">Overview</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
            Welcome back 👋
          </h1>
          <p className="mt-2 text-slate-500">
            Here&apos;s what&apos;s happening in your business today.
          </p>
        </div>

        <Button variant="outline" className="w-fit rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-slate-50">
          View report
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <KpiCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
          <SectionHeader
            eyebrow="Priority"
            title="Revenue Problems"
            description="These are the main issues affecting your conversion and revenue trend."
            action={
              <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100">
                View all
              </button>
            }
          />

          <div className="space-y-4">
            {problems.map((problem) => (
              <ProblemCard key={problem.title} {...problem} onInvestigate={() => undefined} />
            ))}
          </div>
        </div>

        <RecommendationCard
          title="Improve mobile checkout experience"
          description="Shipping and payment options on mobile are adding friction before purchase. Simplifying this flow can reduce checkout abandonment and unlock more revenue immediately."
          impact="High impact"
          confidence={92}
          onAction={() => undefined}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
          <SectionHeader
            eyebrow="Activity"
            title="Recent Activity"
            description="The latest signals and actions across your store."
          />
          <Timeline items={activity} />
        </div>

        <EmptyStateCard
          icon={Sparkles}
          title="No AI insights yet"
          description="Your optimization engine is reviewing the latest traffic and conversion data. We’ll surface new opportunities as soon as they’re ready."
          actionLabel="Run report"
          onAction={() => undefined}
        />
      </div>
    </div>
  );
}