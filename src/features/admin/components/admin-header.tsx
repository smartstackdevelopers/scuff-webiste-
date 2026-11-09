"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Bell,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Settings,
  LogOut,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { LanguageToggle } from "@/components/common/language-toggle";
import { useAdmin } from "../hooks/use-admin";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

export function AdminHeader({ mobileOpen, onToggleMobile }: AdminHeaderProps) {
  const pathname = usePathname();
  const { adminUser, bookings, isSimulatedAdmin, setIsSimulatedAdmin } = useAdmin();

  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const notifRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);

  // Close menus on outside click
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  const currentSegment =
    pathname.split("/").filter(Boolean)[1] || "dashboard";

  return (
    <header className="sticky top-0 z-30 h-16 bg-card/85 backdrop-blur-md border-b border-border/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Drawer Trigger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobile}
          className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none"
          aria-label="Toggle admin navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <Link
            href="/admin/dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
          >
            Admin Operations
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground hidden sm:inline" />
          <span className="text-foreground capitalize font-bold">
            {currentSegment.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Right: Studio Status, Demo Role Toggle, Notifications, Theme, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Studio Status Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>High Wycombe Studio: Active (2 Bays Occupied)</span>
        </div>

        {/* Demo Admin Role Switcher */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-secondary/70 border border-border/70 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-electric" />
          <span className="text-muted-foreground">Role:</span>
          <button
            type="button"
            onClick={() => setIsSimulatedAdmin(!isSimulatedAdmin)}
            className="font-bold text-foreground hover:text-electric transition-colors underline decoration-dotted"
            title="Click to toggle simulated admin state for testing"
          >
            {isSimulatedAdmin ? "Master Administrator" : "Limited Viewer"}
          </button>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Admin notifications"
          >
            <Bell className="w-5 h-5" />
            {pendingCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-mono font-black flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-card border border-border/80 shadow-2xl p-3 z-50 space-y-2 animate-in fade-in-50 zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <span className="text-xs font-bold text-foreground">
                  Operations Notifications
                </span>
                <Badge variant="warning" className="text-[10px]">
                  {pendingCount} Pending Bookings
                </Badge>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto text-xs">
                {bookings
                  .filter((b) => b.status === "pending")
                  .map((b) => (
                    <Link
                      key={b.id}
                      href="/admin/bookings"
                      onClick={() => setNotificationsOpen(false)}
                      className="block p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground">{b.reference}</span>
                        <span className="text-[10px] text-amber-500 font-bold">Needs Review</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                        {b.customerName} • {b.serviceName}
                      </p>
                    </Link>
                  ))}

                <Link
                  href="/admin/activities"
                  onClick={() => setNotificationsOpen(false)}
                  className="block text-center pt-2 text-[11px] font-bold text-electric hover:underline"
                >
                  View Complete Activity Log →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Language Switcher */}
        <LanguageToggle />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-border transition-all select-none"
            aria-expanded={profileOpen}
          >
            <Avatar size="sm" status="verified">
              <AvatarImage src={adminUser.avatarUrl} alt={adminUser.name} />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>

            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-foreground leading-tight">
                {adminUser.name}
              </span>
              <span className="text-[10px] text-muted-foreground truncate max-w-[130px]">
                {adminUser.roleTitle}
              </span>
            </div>

            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 hidden sm:block",
                profileOpen && "rotate-180 text-electric"
              )}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-card border border-border/80 shadow-2xl p-2 z-50 space-y-1 animate-in fade-in-50 zoom-in-95">
              <div className="p-3 border-b border-border/50">
                <p className="text-xs font-bold text-foreground">{adminUser.name}</p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {adminUser.email}
                </p>
                <span className="inline-block text-[10px] text-electric font-semibold uppercase mt-1">
                  Super Administrator
                </span>
              </div>

              <Link
                href="/admin/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-foreground hover:bg-secondary hover:text-electric transition-colors"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span>Admin Settings</span>
              </Link>

              <Link
                href="/admin/calendar"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-foreground hover:bg-secondary hover:text-electric transition-colors"
              >
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Master Calendar</span>
              </Link>

              <Link
                href="/"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-foreground hover:bg-secondary hover:text-electric transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                <span>Open Public Website</span>
              </Link>

              <div className="pt-1 border-t border-border/50">
                <Link
                  href="/login"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
