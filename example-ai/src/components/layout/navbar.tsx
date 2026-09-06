"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/ui/logo-mark";
import { NAV_LINKS } from "@/lib/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative z-10 flex h-20 items-center justify-between px-5 md:h-[95px] md:px-[30px] lg:px-20">
      {/* Wordmark */}
      <Link
        href="/"
        className="flex items-center gap-[13px] font-serif text-xl font-medium text-cream md:text-[25px]"
      >
        <LogoMark />
        AI Revenue
      </Link>

      {/* Glass nav pill: hidden below lg, matching the original breakpoint */}
      <div className="hidden items-center rounded-[30px] border border-white/8 bg-white/13 p-[5px] backdrop-blur-[15px] lg:flex">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.label}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-[22px] px-[17px] py-[9px] text-sm transition-colors duration-300 hover:bg-white/11 hover:text-white ${
                isActive ? "bg-white/11 text-white" : "text-white/78"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        className="cursor-pointer rounded-[30px] bg-white px-[15px] py-[10px] text-sm font-semibold text-[#111] transition-transform duration-200 hover:-translate-y-0.5 md:px-[23px] md:py-[13px]"
      >
        Get Started
      </button>
    </nav>
  );
}
