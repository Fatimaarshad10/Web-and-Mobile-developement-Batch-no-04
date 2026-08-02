"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const AUTH_STORAGE_KEY = "ai-revenue-auth";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "FAQ", href: "#faq" },
  { label: "Pricing", href: "#pricing" },
];

interface NavbarProps {
  onLoginOpen?: (prefillEmail?: string) => void;
  onSignUpOpen?: () => void;
}

export function Navbar({ onLoginOpen, onSignUpOpen }: NavbarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(localStorage.getItem(AUTH_STORAGE_KEY) === "true");
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-change", syncAuthState);
    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-change", syncAuthState);
    };
  }, []);

  const handlePrimaryAction = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
      return;
    }

    onSignUpOpen?.();
  };

  const handleLoginAction = () => {
    onLoginOpen?.();
  };

  const handleMobileAction = () => {
    setOpen(false);
    handlePrimaryAction();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="relative h-14 w-14 overflow-hidden bg-transparent sm:h-16 sm:w-16">
            <Image src="/logo.png" alt="AI Revenue Recovery" fill className="object-contain" />
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm text-slate-600 transition-colors hover:text-slate-900">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={handleLoginAction}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            {isLoggedIn ? "Dashboard" : "Login"}
          </button>
          <Button onClick={handlePrimaryAction} className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_24px_-16px_rgba(124,92,252,0.8)] hover:bg-violet-500">
            {isLoggedIn ? "Open Dashboard" : "Get Started"}
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={isLoggedIn ? handleMobileAction : handleLoginAction}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-700"
              >
                {isLoggedIn ? "Dashboard" : "Login"}
              </button>
              <Button onClick={handleMobileAction} className="flex-1 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500">
                {isLoggedIn ? "Open Dashboard" : "Get Started"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
