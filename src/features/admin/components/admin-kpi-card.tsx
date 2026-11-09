"use client";

import * as React from "react";
import {
  Calendar,
  Clock,
  Users,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Globe,
  FileSpreadsheet,
} from "lucide-react";
import { DashboardKPIData } from "../types/admin";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "electric" | "emerald" | "amber" | "purple" | "rose" | "blue";
}

export function KPICard({
  title,
  value,
  change,
  changeLabel = "vs prev period",
  subtitle,
  icon: Icon,
  accent = "electric",
}: KPICardProps) {
  const isPositive = change !== undefined ? change >= 0 : true;

  const accentStyles = {
    electric: "text-electric bg-electric/10 border-electric/30",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  };

  return (
    <div className="relative group p-5 rounded-2xl bg-card border border-border/80 hover:border-electric/50 transition-all duration-300 hover:shadow-card-hover space-y-3">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground truncate">
          {title}
        </span>
        <div
          className={cn(
            "w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
            accentStyles[accent]
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="space-y-1">
        <p className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-foreground">
          {value}
        </p>

        {subtitle && (
          <p className="text-[11px] text-muted-foreground font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {/* Footer Comparison */}
      <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px]">
        {change !== undefined ? (
          <div className="flex items-center gap-1 font-semibold">
            {isPositive ? (
              <span className="flex items-center text-emerald-500">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                +{change}%
              </span>
            ) : (
              <span className="flex items-center text-rose-500">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                {change}%
              </span>
            )}
            <span className="text-muted-foreground font-normal">
              {changeLabel}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground font-mono">Live Demo Metric</span>
        )}

        <span className="text-[9px] uppercase font-bold text-muted-foreground/60 tracking-wider">
          Demo
        </span>
      </div>
    </div>
  );
}

interface AdminKPIGridProps {
  kpi: DashboardKPIData;
}

export function AdminKPIGrid({ kpi }: AdminKPIGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Bookings */}
      <KPICard
        title="Total Bookings"
        value={kpi.totalBookings}
        change={kpi.totalBookingsChange}
        subtitle="Cumulative service appointments"
        icon={Calendar}
        accent="electric"
      />

      {/* 2. Today's Bookings */}
      <KPICard
        title="Today's Bookings"
        value={kpi.todayBookings}
        subtitle={`${kpi.todayBookingsStudio} in Studio • ${kpi.todayBookingsMobile} Mobile Van`}
        icon={Clock}
        accent="blue"
      />

      {/* 3. Total Customers */}
      <KPICard
        title="Total Customers"
        value={kpi.totalCustomers}
        change={kpi.totalCustomersChange}
        subtitle="Registered vehicle owners"
        icon={Users}
        accent="purple"
      />

      {/* 4. Total Revenue */}
      <KPICard
        title="Total Revenue"
        value={`£${kpi.totalRevenue.toLocaleString()}`}
        change={kpi.totalRevenueChange}
        subtitle="Gross invoiced detailing"
        icon={CreditCard}
        accent="emerald"
      />

      {/* 5. Pending Bookings */}
      <KPICard
        title="Pending Bookings"
        value={kpi.pendingBookings}
        subtitle="Awaiting schedule verification"
        icon={AlertCircle}
        accent="amber"
      />

      {/* 6. Completed Services */}
      <KPICard
        title="Completed Services"
        value={kpi.completedServices}
        subtitle={`${kpi.completedServicesRate}% satisfaction rate`}
        icon={CheckCircle2}
        accent="emerald"
      />

      {/* 7. Total Visitors */}
      <KPICard
        title="Total Visitors"
        value={kpi.totalVisitors.toLocaleString()}
        change={kpi.totalVisitorsChange}
        subtitle="Portal traffic & inquiries"
        icon={Globe}
        accent="electric"
      />

      {/* 8. Outstanding Payments */}
      <KPICard
        title="Outstanding Payments"
        value={`£${kpi.outstandingPayments}`}
        subtitle={`${kpi.outstandingPaymentsCount} unpaid invoice(s)`}
        icon={FileSpreadsheet}
        accent="rose"
      />
    </div>
  );
}
