"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  Menu,
  X,
  User,
  Calendar,
  FileText,
  LogOut,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { LanguageToggle } from "@/components/common/language-toggle";
import { MOCK_CUSTOMER_PROFILE } from "../data/customer-data";
import { cn } from "@/lib/utils";

interface CustomerHeaderProps {
  unreadNotificationCount?: number;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export function CustomerHeader({
  unreadNotificationCount = 0,
  mobileMenuOpen,
  onToggleMobileMenu,
}: CustomerHeaderProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [profileDropdownOpen]);

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-card/85 backdrop-blur-md border-b border-border/70 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile Drawer Trigger & Page Context */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none"
          aria-label="Toggle navigation drawer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Client Portal • Secure Verified Session</span>
        </div>
      </div>

      {/* Right: Quick Actions, Theme, Notifications, Profile Dropdown */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Book Now Shortcut Button */}
        <Link
          href="/booking"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-electric text-black text-xs font-black uppercase tracking-wider hover:bg-electric/90 shadow-glow-sm transition-all"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Detailing</span>
        </Link>

        {/* Notification Icon with Badge */}
        <Link
          href="/customer/notifications"
          className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-electric text-black text-[9px] font-mono font-black flex items-center justify-center shadow-md">
              {unreadNotificationCount}
            </span>
          )}
        </Link>

        {/* Language Switcher */}
        <LanguageToggle />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Customer Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-border transition-all select-none"
            aria-expanded={profileDropdownOpen}
          >
            <Avatar size="sm" status="online">
              <AvatarImage src={MOCK_CUSTOMER_PROFILE.avatarUrl} alt={MOCK_CUSTOMER_PROFILE.fullName} />
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>

            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-foreground leading-tight">
                {MOCK_CUSTOMER_PROFILE.fullName}
              </span>
              <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                {MOCK_CUSTOMER_PROFILE.email}
              </span>
            </div>

            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 hidden sm:block",
                profileDropdownOpen && "rotate-180 text-electric"
              )}
            />
          </button>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-card border border-border/80 shadow-2xl p-2 z-50 space-y-1 animate-in fade-in-50 zoom-in-95">
              <div className="p-3 border-b border-border/50">
                <p className="text-xs font-bold text-foreground">
                  {MOCK_CUSTOMER_PROFILE.fullName}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {MOCK_CUSTOMER_PROFILE.email}
                </p>
                <span className="inline-block text-[10px] text-electric font-semibold uppercase mt-1">
                  Private Client
                </span>
              </div>

              <Link
                href="/customer/profile"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-foreground hover:bg-secondary hover:text-electric transition-colors"
              >
                <User className="w-4 h-4 text-muted-foreground" />
                <span>Profile Settings</span>
              </Link>

              <Link
                href="/customer/bookings"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-foreground hover:bg-secondary hover:text-electric transition-colors"
              >
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>My Bookings</span>
              </Link>

              <Link
                href="/customer/invoices"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-foreground hover:bg-secondary hover:text-electric transition-colors"
              >
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span>Invoices & Payments</span>
              </Link>

              <div className="pt-1 border-t border-border/50">
                <Link
                  href="/login"
                  onClick={() => setProfileDropdownOpen(false)}
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
