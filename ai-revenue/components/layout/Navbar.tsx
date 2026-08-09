"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMobile } from "@/hooks/use-mobile";
import { getCurrentUser, getProfile } from "@/lib/supabase/auth";

const AUTH_STORAGE_KEY = "ai-revenue-auth";

interface NavbarProps {
  breadcrumbs?: { label: string; href?: string }[];
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export function Navbar({
  breadcrumbs,
  sidebarOpen,
  onSidebarToggle,
}: NavbarProps) {
  const router = useRouter();
  const isMobile = useMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const syncAuthState = () => {
      const auth = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
      setIsLoggedIn(auth);
      if (auth) loadUserName();
    };
    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  const loadUserName = async () => {
    const userResult = await getCurrentUser();
    if (userResult.success && userResult.user) {
      const profileResult = await getProfile(userResult.user.id);
      if (profileResult.success && profileResult.profile) {
        setUserName(profileResult.profile.full_name ?? "");
      }
    }
  };

  const handleProfileClick = () => {
    router.push("/dashboard/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("auth-change"));
    router.push("/?login=1");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              className="h-9 w-9"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}

          <div className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
            {breadcrumbs?.length ? (
              breadcrumbs.map((crumb, index) => (
                <div key={`${crumb.label}-${index}`} className="flex min-w-0 items-center gap-2">
                  {index > 0 && <span className="text-slate-300">/</span>}
                  {crumb.href ? (
                    <a href={crumb.href} className="truncate transition-colors hover:text-slate-900">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="truncate font-medium text-slate-900">{crumb.label}</span>
                  )}
                </div>
              ))
            ) : (
              <span className="font-medium text-slate-900">Overview</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(isLoggedIn ? "/dashboard" : "/?login=1")}
            className="hidden rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 md:inline-flex"
          >
            {isLoggedIn ? "Dashboard" : "Login"}
          </button>

          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 md:flex">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Workspace
            </span>
            <span className="text-sm font-medium text-slate-700">Northstar Studio</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>

          <div className="hidden rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 md:flex md:items-center md:gap-2">
            <span className="font-medium text-slate-700">Last 30 days</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>

          <div className="relative hidden lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-64 rounded-xl border-slate-200 bg-slate-50 pl-9 text-sm focus-visible:ring-violet-500"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-xl">
            <Bell className="h-4 w-4 text-slate-600" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex h-9 items-center gap-2 rounded-xl px-2">
                <Avatar src="" alt={userName || "User"} fallback={(userName || "U").charAt(0).toUpperCase()} className="h-8 w-8" />
                <span className="hidden text-sm font-medium text-slate-700 md:block">
                  {userName || "User"}
                </span>
                <ChevronDown className="hidden h-4 w-4 text-slate-400 md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleProfileClick}>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onSelect={handleLogout}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}