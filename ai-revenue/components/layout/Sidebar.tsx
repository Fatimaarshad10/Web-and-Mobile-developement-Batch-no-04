"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  BarChart3,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/revenue", label: "Revenue", icon: BarChart3 },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/store", label: "Store", icon: Store },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/problems", label: "Revenue Problems", icon: AlertTriangle },
  { href: "/dashboard/insights", label: "AI Insights", icon: Sparkles },
  { href: "/dashboard/reports", label: "Reports", icon: TrendingUp },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const isMobile = useMobile();

  return (
    <>
      {isMobile && isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-slate-900/35 backdrop-blur-[1px]"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 bg-white/95 shadow-[0_0_0_1px_rgba(15,23,42,0.02)] backdrop-blur-sm transition-transform duration-300 ease-out md:sticky md:z-auto",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
          "md:flex md:flex-col"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden bg-transparent">
              <Image src="/logo.png" alt="AI Revenue Recovery" fill className="object-contain" />
            </div>
          </Link>
        </div>

        <nav className="space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={isMobile ? onClose : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-violet-600 text-white shadow-sm shadow-violet-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-slate-200 p-4">
          <div className="rounded-[18px] bg-slate-50 p-3 ring-1 ring-slate-200">
            <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              <span>Health</span>
              <span className="text-emerald-600">Good</span>
            </div>
            <p className="mt-3 text-xl font-semibold tracking-tight text-slate-900">92%</p>
            <p className="mt-1 text-xs text-slate-500">Store performance is healthy.</p>
          </div>
        </div>
      </aside>
    </>
  );
}