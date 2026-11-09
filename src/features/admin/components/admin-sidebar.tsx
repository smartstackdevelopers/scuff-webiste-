"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Activity,
  CalendarDays,
  Users,
  Wrench,
  Shield,
  Settings,
  ArrowLeft,
  LogOut,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Target,
  PhoneCall,
  UserCheck,
  TrendingUp,
  Briefcase,
  FileText,
  Percent,
  BarChart3,
  Receipt,
  CreditCard,
  RotateCcw,
  LineChart,
  Globe,
  Star,
  LifeBuoy,
  Tag,
  Award,
  Gift,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAdmin } from "../hooks/use-admin";

interface AdminSidebarProps {
  onItemClick?: () => void;
}

interface NavSection {
  title: string;
  items: {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badgeKey?: "pendingBookings";
  }[];
}

export const ADMIN_SIDEBAR_SECTIONS: NavSection[] = [
  {
    title: "OVERVIEW",
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Calendar",
        href: "/admin/calendar",
        icon: CalendarDays,
      },
      {
        title: "Activities",
        href: "/admin/activities",
        icon: Activity,
      },
    ],
  },
  {
    title: "BUSINESS MANAGEMENT",
    items: [
      {
        title: "Bookings",
        href: "/admin/bookings",
        icon: Calendar,
        badgeKey: "pendingBookings",
      },
      {
        title: "Customers",
        href: "/admin/customers",
        icon: Users,
      },
      {
        title: "Services",
        href: "/admin/services",
        icon: Wrench,
      },
      {
        title: "Staff",
        href: "/admin/staff",
        icon: Shield,
      },
    ],
  },
  {
    title: "CRM & LEADS",
    items: [
      {
        title: "CRM Hub",
        href: "/admin/crm",
        icon: BarChart3,
      },
      {
        title: "Leads & Pipeline",
        href: "/admin/crm/leads",
        icon: Target,
      },
      {
        title: "Follow-ups",
        href: "/admin/crm/follow-ups",
        icon: PhoneCall,
      },
      {
        title: "CRM Clients",
        href: "/admin/crm/customers",
        icon: UserCheck,
      },
      {
        title: "CRM Reports",
        href: "/admin/crm/reports",
        icon: LineChart,
      },
    ],
  },
  {
    title: "SALES",
    items: [
      {
        title: "Sales Analytics",
        href: "/admin/sales",
        icon: TrendingUp,
      },
      {
        title: "Sales Representatives",
        href: "/admin/salespersons",
        icon: Briefcase,
      },
      {
        title: "Quotations",
        href: "/admin/quotations",
        icon: FileText,
      },
      {
        title: "Commissions",
        href: "/admin/commissions",
        icon: Percent,
      },
    ],
  },
  {
    title: "BILLING & FINANCE",
    items: [
      {
        title: "Invoices",
        href: "/admin/invoices",
        icon: Receipt,
      },
      {
        title: "Payments",
        href: "/admin/payments",
        icon: CreditCard,
      },
      {
        title: "Refunds",
        href: "/admin/refunds",
        icon: RotateCcw,
      },
      {
        title: "Financial Reports",
        href: "/admin/financial-reports",
        icon: LineChart,
      },
    ],
  },
  {
    title: "ANALYTICS & INTELLIGENCE",
    items: [
      {
        title: "Visitor Analytics",
        href: "/admin/analytics",
        icon: Globe,
      },
      {
        title: "Operations Reports",
        href: "/admin/reports",
        icon: LineChart,
      },
    ],
  },
  {
    title: "CLIENT ENGAGEMENT",
    items: [
      {
        title: "Client Reviews",
        href: "/admin/reviews",
        icon: Star,
      },
      {
        title: "Support Tickets",
        href: "/admin/support",
        icon: LifeBuoy,
      },
      {
        title: "Coupons & Offers",
        href: "/admin/coupons",
        icon: Tag,
      },
      {
        title: "Loyalty & Referrals",
        href: "/admin/loyalty",
        icon: Award,
      },
      {
        title: "Gift Cards",
        href: "/admin/gift-cards",
        icon: Gift,
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export function AdminSidebar({ onItemClick }: AdminSidebarProps) {
  const pathname = usePathname();
  const { bookings } = useAdmin();

  const pendingBookingsCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <aside className="w-64 bg-card border-r border-border/80 flex flex-col justify-between h-full select-none">
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Brand & Suite Tag */}
        <div className="pb-4 border-b border-border/60">
          <Link
            href="/admin/dashboard"
            onClick={onItemClick}
            className="flex items-center gap-2.5 group focus-visible:outline-none"
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
                  Operations Console
                </Badge>
              </div>
            </div>
          </Link>

          {/* Demo Sandbox Banner */}
          <div className="mt-3 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-between text-[10px]">
            <span className="font-bold text-amber-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Simulated Admin Mode</span>
            </span>
            <span className="text-muted-foreground font-mono">Demo</span>
          </div>
        </div>

        {/* Grouped Navigation */}
        <nav className="space-y-5" aria-label="Admin Navigation Sections">
          {ADMIN_SIDEBAR_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-1">
              <h4 className="px-3 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                {section.title}
              </h4>

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin/dashboard" &&
                      item.href !== "/admin/crm" &&
                      item.href !== "/admin/sales" &&
                      pathname.startsWith(item.href));
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onItemClick}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 group",
                        isActive
                          ? "bg-electric text-black shadow-glow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={cn(
                            "w-4 h-4 transition-colors",
                            isActive
                              ? "text-black"
                              : "text-muted-foreground group-hover:text-electric"
                          )}
                        />
                        <span>{item.title}</span>
                      </div>

                      {item.badgeKey === "pendingBookings" && pendingBookingsCount > 0 && (
                        <span
                          className={cn(
                            "px-1.5 py-0.2 rounded-full text-[9px] font-mono font-black",
                            isActive
                              ? "bg-black text-electric"
                              : "bg-amber-500 text-black"
                          )}
                        >
                          {pendingBookingsCount}
                        </span>
                      )}

                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-black stroke-[3]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-border/60 space-y-2">
        <Link
          href="/"
          onClick={onItemClick}
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-electric" />
          <span>Back to Website</span>
        </Link>

        <Link
          href="/login"
          onClick={onItemClick}
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout (Admin)</span>
        </Link>
      </div>
    </aside>
  );
}
