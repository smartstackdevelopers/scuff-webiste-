"use client";

import * as React from "react";
import Link from "next/link";
import { useCrm } from "../hooks/use-crm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  DollarSign,
  Award,
  Target,
  FileCheck,
  Users,
  ArrowUpRight,
  Download,
  ChevronRight,
  Layers,
} from "lucide-react";
import { exportToCsv } from "../lib/crm-calculations";

export function SalesOverview() {
  const { salespersons, quotations, leads, commissions, crmKpi } = useCrm();

  const [timeframe, setTimeframe] = React.useState<"month" | "quarter" | "year">("month");

  // Calculate aggregates
  const acceptedQuotations = quotations.filter((q) => q.status === "accepted");
  const totalClosedSalesValue = acceptedQuotations.reduce(
    (sum, q) => sum + (q.grandTotal ?? q.totalAmount ?? 0),
    0
  );
  const avgDealSize =
    acceptedQuotations.length > 0
      ? Math.round(totalClosedSalesValue / acceptedQuotations.length)
      : 0;
  const quoteAcceptanceRate =
    quotations.length > 0
      ? Math.round((acceptedQuotations.length / quotations.length) * 100)
      : 0;

  // Monthly revenue mock data for SVG chart
  const monthlyRevenueData = [
    { month: "Nov", revenue: 16800, target: 15000 },
    { month: "Dec", revenue: 21400, target: 20000 },
    { month: "Jan", revenue: 19200, target: 18000 },
    { month: "Feb", revenue: 25600, target: 22000 },
    { month: "Mar", revenue: 28400, target: 25000 },
    { month: "Apr", revenue: 34250, target: 30000 },
  ];

  const maxRevenue = Math.max(...monthlyRevenueData.map((d) => d.revenue));

  // Service category breakdown
  const serviceCategories = [
    { name: "Paint Protection Film (PPF)", value: 42, amount: 24500, color: "bg-primary" },
    { name: "Ceramic Coating Packages", value: 28, amount: 16300, color: "bg-blue-500" },
    { name: "Paint Correction & Polish", value: 16, amount: 9350, color: "bg-purple-500" },
    { name: "Interior Bespoke Restorations", value: 9, amount: 5250, color: "bg-emerald-500" },
    { name: "Wheel & Caliper Refinishing", value: 5, amount: 2920, color: "bg-amber-500" },
  ];

  const handleExportSalesCsv = () => {
    const csvData = acceptedQuotations.map((q) => ({
      QuotationNumber: q.quotationNumber,
      Client: q.customerName || q.clientName || "Client",
      Vehicle: `${q.vehicleYear || "2024"} ${q.vehicleMake} ${q.vehicleModel}`,
      Salesperson: q.salespersonName,
      Subtotal: q.subtotal,
      VAT: q.taxAmount ?? q.vatAmount ?? 0,
      TotalAmount: q.grandTotal ?? q.totalAmount ?? 0,
      AcceptedDate: q.createdDate,
    }));
    exportToCsv(csvData, "you-scuff-we-buff-sales-report");
  };

  const activePipeline = crmKpi.totalPipelineValue || crmKpi.activePipelineValue || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-serif">
            Sales Performance & Revenue Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time sales velocity, quota attainment, average deal size, and team commission structures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Timeframe selector */}
          <div className="flex items-center rounded-lg border border-border/40 bg-card p-1">
            <button
              onClick={() => setTimeframe("month")}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                timeframe === "month"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeframe("quarter")}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                timeframe === "quarter"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Q1 2026
            </button>
            <button
              onClick={() => setTimeframe("year")}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                timeframe === "year"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Year to Date
            </button>
          </div>

          <Button variant="outline" size="sm" onClick={handleExportSalesCsv}>
            <Download className="mr-1.5 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales Volume */}
        <div className="rounded-xl border border-border/40 bg-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Total Closed Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold font-mono text-foreground">
            £{totalClosedSalesValue.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+18.4% vs previous period</span>
          </div>
        </div>

        {/* Average Deal Value */}
        <div className="rounded-xl border border-border/40 bg-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Average Deal Size</span>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold font-mono text-foreground">
            £{avgDealSize.toLocaleString("en-GB")}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-primary font-medium">
            <span>High-end luxury PPF & Coatings</span>
          </div>
        </div>

        {/* Proposal Acceptance Rate */}
        <div className="rounded-xl border border-border/40 bg-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Proposal Acceptance Rate</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <FileCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold font-mono text-foreground">
            {quoteAcceptanceRate}%
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{acceptedQuotations.length} won of {quotations.length} proposals</span>
          </div>
        </div>

        {/* Active Pipeline Value */}
        <div className="rounded-xl border border-border/40 bg-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Active Pipeline Value</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold font-mono text-purple-400">
            £{activePipeline.toLocaleString("en-GB")}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{leads.filter((l) => l.status !== "converted" && l.status !== "lost").length} active deal inquiries</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid: Revenue Trend & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Trend (2 cols) */}
        <div className="rounded-xl border border-border/40 bg-card p-5 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Monthly Revenue Velocity vs Target
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Past 6 months detailing revenue trend in GBP (£)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                Actual Revenue
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                Monthly Target
              </span>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="pt-6">
            <div className="grid grid-cols-6 gap-3 sm:gap-6 items-end h-56 pb-6 border-b border-border/40">
              {monthlyRevenueData.map((item, idx) => {
                const heightPercent = Math.round((item.revenue / (maxRevenue * 1.15)) * 100);
                const targetPercent = Math.round((item.target / (maxRevenue * 1.15)) * 100);

                return (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group">
                    <span className="text-[11px] font-mono text-muted-foreground mb-1 group-hover:text-primary transition-colors">
                      £{(item.revenue / 1000).toFixed(1)}k
                    </span>
                    <div className="w-full flex items-end justify-center gap-1 h-full max-h-40">
                      {/* Revenue Bar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full max-w-[28px] rounded-t-md bg-gradient-to-t from-primary/80 to-primary group-hover:brightness-125 transition-all shadow-sm"
                      />
                      {/* Target marker / subtle bar */}
                      <div
                        style={{ height: `${targetPercent}%` }}
                        className="w-1.5 rounded-t bg-muted/60 hidden sm:block"
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground mt-2">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Revenue by Service Category (1 col) */}
        <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
          <div>
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              Revenue by Service Line
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Service share percentage of gross revenue
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            {serviceCategories.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground font-medium truncate max-w-[180px]">
                    {cat.name}
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-muted-foreground">£{cat.amount.toLocaleString()}</span>
                    <span className="font-bold text-foreground">{cat.value}%</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden">
                  <div
                    style={{ width: `${cat.value}%` }}
                    className={`h-full rounded-full ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border/20 text-xs text-muted-foreground">
            <span className="text-primary font-semibold">PPF & Ceramic Coatings</span> account for 70% of total workshop revenue.
          </div>
        </div>
      </div>

      {/* Sales Representatives Leaderboard */}
      <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Sales Representative Leaderboard
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Monthly target progress, conversion rates, and accrued commission earnings.
            </p>
          </div>
          <Link href="/admin/salespersons">
            <Button variant="outline" size="sm">
              Manage Team & Tiers
              <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/40 text-left text-muted-foreground font-medium">
                <th className="pb-3 pl-2">Advisor</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Commission Tier</th>
                <th className="pb-3 text-center">Assigned / Won</th>
                <th className="pb-3 text-center">Win Rate</th>
                <th className="pb-3 text-right">Month Sales</th>
                <th className="pb-3 min-w-[140px]">Target Attainment</th>
                <th className="pb-3 text-right pr-2">Accrued Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {salespersons.map((rep) => {
                const repName = rep.fullName || rep.name || "Advisor";
                const targetPct = Math.min(100, Math.round((rep.currentMonthSales / rep.monthlyTarget) * 100));
                const winRate = rep.assignedLeadsCount > 0 ? Math.round((rep.convertedLeadsCount / rep.assignedLeadsCount) * 100) : 0;
                const accrued = commissions
                  .filter((c) => c.salespersonId === rep.id)
                  .reduce((sum, c) => sum + c.commissionAmount, 0);

                return (
                  <tr key={rep.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 pl-2">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                          {repName.split(" ").map((n: string) => n[0]).join("")}
                        </div>
                        <span className="font-semibold text-foreground">{repName}</span>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{rep.department || rep.role}</td>
                    <td className="py-3">
                      <Badge variant="secondary" className="font-mono text-[10px]">
                        {rep.commissionRate}%
                      </Badge>
                    </td>
                    <td className="py-3 text-center font-mono">
                      {rep.assignedLeadsCount} / <strong className="text-emerald-400">{rep.convertedLeadsCount}</strong>
                    </td>
                    <td className="py-3 text-center font-mono font-semibold text-foreground">
                      {winRate}%
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-foreground">
                      £{rep.currentMonthSales.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-muted-foreground">{targetPct}% of £{rep.monthlyTarget.toLocaleString()}</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted/40 overflow-hidden">
                          <div
                            style={{ width: `${targetPct}%` }}
                            className={`h-full rounded-full ${targetPct >= 100 ? "bg-emerald-400" : "bg-primary"}`}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right pr-2 font-mono font-bold text-emerald-400">
                      £{accrued.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent High-Value Closed Won Proposals */}
      <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-emerald-400" />
            Recent High-Value Closed Proposals
          </h3>
          <Link href="/admin/quotations">
            <Button variant="ghost" size="sm" className="text-xs">
              View All Proposals
            </Button>
          </Link>
        </div>

        <div className="space-y-2.5">
          {acceptedQuotations.slice(0, 4).map((q) => {
            const client = q.customerName || q.clientName || "Client";
            const total = q.grandTotal ?? q.totalAmount ?? 0;
            const vat = q.taxAmount ?? q.vatAmount ?? 0;

            return (
              <div
                key={q.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-background/40 hover:border-emerald-500/30 transition-all text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-foreground">{q.quotationNumber}</span>
                    <Badge variant="success" className="text-[10px]">Closed Won</Badge>
                    <span className="text-muted-foreground">• Advisor: {q.salespersonName}</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">{client}</strong> — {q.vehicleYear} {q.vehicleMake} {q.vehicleModel}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-sm text-foreground block">
                    £{total.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    VAT £{vat.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
