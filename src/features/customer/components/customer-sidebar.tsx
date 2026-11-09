"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Car,
  FileText,
  Star,
  LifeBuoy,
  Bell,
  User,
  Settings,
  LogOut,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Award,
  Gift,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CustomerSidebarProps {
  unreadCount?: number;
  onItemClick?: () => void;
}

export const CUSTOMER_SIDEBAR_LINKS = [
  {
    title: "Overview",
    href: "/customer/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Bookings",
    href: "/customer/bookings",
    icon: Calendar,
  },
  {
    title: "My Vehicles",
    href: "/customer/vehicles",
    icon: Car,
  },
  {
    title: "Invoices & Payments",
    href: "/customer/invoices",
    icon: FileText,
  },
  {
    title: "My Reviews",
    href: "/customer/reviews",
    icon: Star,
  },
  {
    title: "Support Tickets",
    href: "/customer/support",
    icon: LifeBuoy,
  },
  {
    title: "Loyalty Points",
    href: "/customer/loyalty",
    icon: Award,
  },
  {
    title: "Gift Cards",
    href: "/customer/gift-cards",
    icon: Gift,
  },
  {
    title: "Notifications",
    href: "/customer/notifications",
    icon: Bell,
    badgeKey: "notifications",
  },
  {
    title: "Profile",
    href: "/customer/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/customer/settings",
    icon: Settings,
  },
];

export function CustomerSidebar({ unreadCount = 0, onItemClick }: CustomerSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border/70 flex flex-col justify-between h-full select-none">
      <div className="p-5 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-border/60">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            onClick={onItemClick}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-charcoal-900 border border-electric/40 text-electric-cyan group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-wider uppercase text-foreground leading-tight">
                {siteConfig.name}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant="electric" size="sm" className="text-[9px] py-0">
                  Client Portal
                </Badge>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1" aria-label="Customer Sidebar Navigation">
          {CUSTOMER_SIDEBAR_LINKS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/customer/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-electric text-black shadow-glow-blue"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive ? "text-black" : "text-muted-foreground group-hover:text-electric"
                    )}
                  />
                  <span>{item.title}</span>
                </div>

                {item.badgeKey === "notifications" && unreadCount > 0 && (
                  <span
                    className={cn(
                      "px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black",
                      isActive
                        ? "bg-black text-electric"
                        : "bg-electric text-black"
                    )}
                  >
                    {unreadCount}
                  </span>
                )}

                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 text-black stroke-[3]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-5 border-t border-border/60 space-y-2">
        <Link
          href="/"
          onClick={onItemClick}
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-electric" />
          <span>Return to Website</span>
        </Link>

        <Link
          href="/login"
          onClick={onItemClick}
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
