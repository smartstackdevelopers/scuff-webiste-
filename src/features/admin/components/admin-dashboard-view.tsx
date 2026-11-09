"use client";

import * as React from "react";
import { useAdmin } from "../hooks/use-admin";
import { TimeRangeFilter } from "../types/admin";
import { Badge } from "@/components/ui/badge";
import { AdminKPIGrid } from "./admin-kpi-card";
import { AnalyticsChartsSection } from "./analytics-charts";
import { RecentBookings } from "./recent-bookings";
import { RecentCustomers } from "./recent-customers";
import { QuickActions } from "./quick-actions";
import { ShieldAlert } from "lucide-react";

export function AdminDashboardView() {
  const { kpiData, timeRange, setTimeRange, bookings, customers } = useAdmin();

  const filterTabs: { key: TimeRangeFilter; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "7d", label: "Last 7 Days" },
    { key: "30d", label: "Last 30 Days" },
    { key: "this_month", label: "This Month" },
    { key: "custom", label: "Custom Range" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Heading & Date Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Business Overview
            </h1>
            <Badge variant="electric" className="text-xs">
              Operations Hub
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Monitor your business performance and daily operations.
          </p>
        </div>

        {/* Date Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-secondary rounded-2xl overflow-x-auto self-start md:self-center">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setTimeRange(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                timeRange === tab.key
                  ? "bg-electric text-black shadow-glow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Metric Disclaimer Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-amber-500 font-semibold">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>
            Demonstration Environment: All figures, financial metrics, and customer accounts shown are mock operational demo records.
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          UK VAT & GBP Ready
        </span>
      </div>

      {/* 8 KPI Cards */}
      <AdminKPIGrid kpi={kpiData} />

      {/* 5 Analytics Charts */}
      <AnalyticsChartsSection />

      {/* Two Column Grid: Recent Bookings & Right Sidebar Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Bookings (2 Cols) */}
        <div className="lg:col-span-2">
          <RecentBookings bookings={bookings} />
        </div>

        {/* Right Column: Recent Customers & Quick Actions (1 Col) */}
        <div className="space-y-6">
          <QuickActions />
          <RecentCustomers customers={customers} />
        </div>
      </div>
    </div>
  );
}
