"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  RefreshCcw,
  ShoppingBag,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { OrderStatusCard } from "@/components/dashboard/OrderStatusCard";
import { OrderTable, type OrderRow } from "@/components/dashboard/OrderTable";
import { OrderAlertCard } from "@/components/dashboard/OrderAlertCard";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";
import { Timeline } from "@/components/dashboard/Timeline";
import { OrderDetailsDrawer } from "@/components/dashboard/OrderDetailsDrawer";
import { EmptyStateCard } from "@/components/dashboard/EmptyStateCard";
import { mockOrders } from "@/lib/mock/orders";

const orderStats = [
  { title: "Total Orders", value: "3,482", change: 14.3, icon: ShoppingBag },
  { title: "Completed Orders", value: "2,684", change: 9.6, icon: CheckCircle2 },
  { title: "Pending Orders", value: "412", change: -3.1, icon: AlertTriangle },
  { title: "Cancelled Orders", value: "123", change: -7.4, icon: XCircle },
];

const statuses = [
  { label: "Pending", count: "248", amount: "$12.8K", tone: "pending" as const },
  { label: "Processing", count: "366", amount: "$22.3K", tone: "processing" as const },
  { label: "Shipped", count: "620", amount: "$31.7K", tone: "shipped" as const },
  { label: "Delivered", count: "1,842", amount: "$89.6K", tone: "delivered" as const },
  { label: "Cancelled", count: "92", amount: "$6.4K", tone: "cancelled" as const },
  { label: "Refunded", count: "54", amount: "$3.2K", tone: "refunded" as const },
];

const orders: OrderRow[] = mockOrders.map((order) => ({
  id: order.id,
  customer: order.customerName,
  productCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
  total: `$${order.total.toFixed(2)}`,
  payment: "Paid",
  fulfillment: order.status,
  date: new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
  avatar: order.customerName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase(),
}));

const alerts = [
  { title: "High-value order pending", description: "A premium order with 3 items has been waiting for fulfillment longer than 2 business days.", impact: "$1,840", priority: "High" as const },
  { title: "Payment failed", description: "Three recent payments failed on mobile checkout, creating a drop in conversion and customer friction.", impact: "$1,240", priority: "Medium" as const },
  { title: "Shipping delayed", description: "A batch of deliveries is delayed due to courier processing and may affect satisfaction metrics.", impact: "$980", priority: "Medium" as const },
  { title: "Refund requested", description: "A refund has been requested on a recently delivered product and requires review.", impact: "$420", priority: "Low" as const },
];

const activity = [
  { id: "1", title: "New order received", description: "Order #A10482 was placed by John Davis and is awaiting processing.", time: "2m ago", type: "success" as const },
  { id: "2", title: "Order shipped", description: "Order #A10471 moved to shipped status and is on the carrier network.", time: "18m ago", type: "report" as const },
  { id: "3", title: "Payment failed", description: "A mobile checkout payment failed and needs follow-up.", time: "1h ago", type: "warning" as const },
  { id: "4", title: "Customer cancelled order", description: "Order #A10433 was cancelled after the customer changed their shipping address.", time: "3h ago", type: "info" as const },
];

export default function OrdersPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="space-y-8 py-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-semibold text-violet-600">Operations</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-[-0.04em] text-slate-900">Orders</h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            Monitor customer orders, fulfillment progress, and identify issues before they affect revenue.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <TrendingUp className="h-4 w-4" />
            Last 30 days
          </button>
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white px-3 py-2.5 text-sm font-medium shadow-sm hover:bg-slate-50">
            <Download className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white px-3 py-2.5 text-sm font-medium shadow-sm hover:bg-slate-50">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {orderStats.map((stat) => (
          <KpiCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
        <SectionHeader
          eyebrow="Status overview"
          title="Order Status Overview"
          description="Track the current state of orders across the fulfillment pipeline."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {statuses.map((status) => (
            <OrderStatusCard key={status.label} {...status} />
          ))}
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
        <SectionHeader
          eyebrow="Analytics"
          title="Order Analytics"
          description="Monitor order volume across time periods and compare performance trends."
          action={
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
              {['Daily', 'Weekly', 'Monthly'].map((tab, index) => (
                <button
                  key={tab}
                  className={index === 1 ? 'rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-900 shadow-sm' : 'px-3 py-1.5 text-sm text-slate-500'}
                >
                  {tab}
                </button>
              ))}
            </div>
          }
        />

        <div className="rounded-[20px] border border-slate-200 bg-slate-50/70 p-4">
          <div className="flex h-64 items-end gap-3">
            {[24, 32, 30, 42, 46, 52, 58, 50, 65, 72, 68, 82].map((height, index) => (
              <div key={index} className="flex-1 rounded-t-2xl bg-gradient-to-t from-violet-500 to-sky-400" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
        <SectionHeader
          eyebrow="Operations"
          title="Orders"
          description="Review recent customer purchases, fulfillment status, and payment health."
          action={
            <Button className="rounded-xl bg-violet-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-violet-500" onClick={() => setDrawerOpen(true)}>
              View details
            </Button>
          }
        />

        <OrderTable orders={orders} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
          <SectionHeader
            eyebrow="Priority"
            title="Order Alerts"
            description="Action items that may delay revenue or customer satisfaction."
          />

          <div className="space-y-4">
            {alerts.map((alert) => (
              <OrderAlertCard key={alert.title} {...alert} />
            ))}
          </div>
        </div>

        <AIInsightCard
          title="Payment failures increased on mobile users"
          impact="$1,240"
          description="AI detected an increase in failed payments from mobile users, especially during checkout after shipping options are shown."
          actions={[
            "Review payment gateway performance",
            "Retry failed payments",
            "Notify affected customers",
          ]}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
          <SectionHeader
            eyebrow="Activity"
            title="Recent Order Activity"
            description="The latest order events and fulfillment signals."
          />

          <Timeline items={activity} />
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
          <SectionHeader
            eyebrow="Customer insights"
            title="Customer Order Insights"
          />

          <div className="space-y-4">
            {[
              { label: "Returning Customers", value: "64%", progress: 64 },
              { label: "First-time Buyers", value: "36%", progress: 36 },
              { label: "Average Order Value", value: "$142.90", progress: 78 },
              { label: "Repeat Purchase Rate", value: "28%", progress: 28 },
            ].map((insight) => (
              <div key={insight.label}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-700">{insight.label}</span>
                  <span className="font-semibold text-slate-900">{insight.value}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-400" style={{ width: `${insight.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <EmptyStateCard
          title="No orders"
          description="No orders match the current filters. Try adjusting the date range or reset your search criteria."
          actionLabel="Reset filters"
          onAction={() => undefined}
        />

        <EmptyStateCard
          title="No alerts"
          description="There are no active order alerts for the selected period. We’ll notify you as new issues appear."
          actionLabel="Run review"
          onAction={() => undefined}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <EmptyStateCard
          title="No AI insights"
          description="The order intelligence system is still analyzing recent customer behavior and fulfillment data."
          actionLabel="Analyze orders"
          onAction={() => undefined}
        />

        <EmptyStateCard
          title="No activity"
          description="Order events will show up here as new purchases, refunds, delays, and fulfillment updates occur."
          actionLabel="Refresh stream"
          onAction={() => undefined}
        />
      </div>

      <OrderDetailsDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}