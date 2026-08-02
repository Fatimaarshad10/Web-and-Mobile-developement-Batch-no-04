"use client";

import { ReactNode, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function DashboardLayout({
  children,
  breadcrumbs,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar
            breadcrumbs={breadcrumbs}
            sidebarOpen={sidebarOpen}
            onSidebarToggle={() => setSidebarOpen((state) => !state)}
          />

          <main className="flex-1 overflow-y-auto px-4 pb-8 pt-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>

          <footer className="border-t border-slate-200 bg-white/80 px-4 py-4 text-center text-xs text-slate-500 backdrop-blur-sm sm:px-6 lg:px-8">
            AI Revenue Recovery © 2026
          </footer>
        </div>
      </div>
    </div>
  );
}