"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wrench,
  User,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { LanguageToggle } from "@/components/common/language-toggle";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 h-16 bg-card/85 backdrop-blur-md border-b border-border/70 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/staff/jobs" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-charcoal-900 border border-amber-500/40 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-wider uppercase text-foreground leading-tight">
                {siteConfig.name}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant="warning" className="text-[9px] py-0 font-bold uppercase">
                  Staff Bay Portal
                </Badge>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick links */}
          <Link
            href="/admin/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/70 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin HQ</span>
          </Link>

          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        {children}
      </main>

      {/* Mobile-First Bottom Navigation Bar (Persistent on Small Screens) */}
      <nav
        className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-xl border-t border-border/80 flex items-center justify-around px-2 z-40 select-none shadow-2xl"
        aria-label="Staff Bottom Navigation"
      >
        <Link
          href="/staff/jobs"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            pathname.startsWith("/staff/jobs") ? "text-amber-400" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Wrench className="w-5 h-5" />
          <span>Bay Jobs</span>
        </Link>

        <Link
          href="/staff/profile"
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            pathname.startsWith("/staff/profile") ? "text-amber-400" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>

        <Link
          href="/admin/dashboard"
          className="flex flex-col items-center gap-1 text-[10px] font-bold text-muted-foreground hover:text-foreground"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Admin</span>
        </Link>

        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-[10px] font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Public</span>
        </Link>
      </nav>
    </div>
  );
}
