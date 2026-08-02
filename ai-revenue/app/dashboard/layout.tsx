"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";

const AUTH_STORAGE_KEY = "ai-revenue-auth";

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
    if (!isAuthenticated) {
      router.replace("/?login=1");
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) {
    return null;
  }

  return <DashboardLayout breadcrumbs={[{ label: "Dashboard" }]}>{children}</DashboardLayout>;
}