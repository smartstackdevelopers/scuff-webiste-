"use client";

import * as React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Download,
  CreditCard,
  Building,
  Banknote,
  PieChart,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Layers,
} from "lucide-react";
import { useFinance } from "../hooks/use-finance";
import { formatCurrency, exportToCsv } from "../lib/financial-calculations";

export function FinancialReportsView() {
  const { invoices, payments, summary } = useFinance();

  const [timeframe, setTimeframe] = React.useState<"all" | "ytd" | "q1" | "month">("all");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // VAT calculations
  const totalVAT = React.useMemo(() => {
    return invoices
      .filter((inv) => inv.status !== "cancelled" && inv.status !== "draft")
      .reduce((sum, inv) => sum + inv.taxAmount, 0);
  }, [invoices]);

  const totalDiscounts = React.useMemo(() => {
    return invoices
      .filter((inv) => inv.status !== "cancelled")
      .reduce((sum, inv) => sum + inv.discountAmount, 0);
  }, [invoices]);

  const netRealized = Math.max(0, summary.totalPaymentsCollected - summary.totalRefunds);

  // Collection efficiency
  const collectionRate =
    summary.totalRevenue > 0
      ? Math.round((summary.totalPaymentsCollected / summary.totalRevenue) * 100)
      : 100;

  // Average invoice value
  const billableInvoices = invoices.filter((i) => i.status !== "cancelled" && i.status !== "draft");
  const averageInvoiceValue =
    billableInvoices.length > 0 ? summary.totalRevenue / billableInvoices.length : 0;

  // Revenue by Service Category
  const categoryBreakdown = React.useMemo(() => {
    const map: Record<string, number> = {
      "Ceramic & Graphene Protection": 0,
      "Multi-Stage Paint Correction": 0,
      "Interior & Leather Restoration": 0,
      "Smart Scuff & Alloy Repair": 0,
      "Maintenance & Maintenance Wash": 0,
    };

    invoices.forEach((inv) => {
      if (inv.status === "cancelled" || inv.status === "draft") return;
      inv.items.forEach((item) => {
        const cat = item.category?.toLowerCase() || "";
        const desc = item.description.toLowerCase();

        if (cat.includes("coating") || cat.includes("ceramic") || desc.includes("ceramic") || desc.includes("coating")) {
          map["Ceramic & Graphene Protection"] += item.totalPrice;
        } else if (cat.includes("correction") || desc.includes("correction") || desc.includes("buff")) {
          map["Multi-Stage Paint Correction"] += item.totalPrice;
        } else if (cat.includes("interior") || desc.includes("interior") || desc.includes("leather")) {
          map["Interior & Leather Restoration"] += item.totalPrice;
        } else if (cat.includes("repair") || cat.includes("alloy") || desc.includes("wheel") || desc.includes("scuff")) {
          map["Smart Scuff & Alloy Repair"] += item.totalPrice;
        } else {
          map["Maintenance & Maintenance Wash"] += item.totalPrice;
        }
      });
    });

    const totalCategorySum = Object.values(map).reduce((a, b) => a + b, 0) || 1;

    return Object.entries(map).map(([name, amount]) => ({
      name,
      amount,
      percentage: Math.round((amount / totalCategorySum) * 100),
    }));
  }, [invoices]);

  // Revenue by Payment Method
  const methodBreakdown = React.useMemo(() => {
    let bankTransfer = 0;
    let card = 0;
    let cash = 0;

    payments.forEach((p) => {
      if (p.status !== "paid") return;
      if (p.paymentMethod === "bank_transfer") bankTransfer += p.amount;
      else if (p.paymentMethod === "cash") cash += p.amount;
      else card += p.amount;
    });

    const totalMethods = bankTransfer + card + cash || 1;

    return [
      {
        name: "Direct Bank Transfer (BACS)",
        amount: bankTransfer,
        percentage: Math.round((bankTransfer / totalMethods) * 100),
        icon: Building,
        color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        barColor: "bg-blue-500",
      },
      {
        name: "Online Merchant / Card",
        amount: card,
        percentage: Math.round((card / totalMethods) * 100),
        icon: CreditCard,
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        barColor: "bg-amber-500",
      },
      {
        name: "Cash Settlement",
        amount: cash,
        percentage: Math.round((cash / totalMethods) * 100),
        icon: Banknote,
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        barColor: "bg-emerald-500",
      },
    ];
  }, [payments]);

  // Monthly Simulation Bars (Oct 2025 - Mar 2026)
  const monthlyData = [
    { month: "Nov 2025", invoiced: 6800, collected: 6400 },
    { month: "Dec 2025", invoiced: 9200, collected: 8900 },
    { month: "Jan 2026", invoiced: 7400, collected: 7100 },
    { month: "Feb 2026", invoiced: 8600, collected: 8000 },
    { month: "Mar 2026 (Live)", invoiced: summary.totalRevenue, collected: summary.totalPaymentsCollected },
  ];

  const maxMonthValue = Math.max(...monthlyData.map((m) => Math.max(m.invoiced, m.collected))) || 1;

  const handleExportAuditCsv = () => {
    const reportData = invoices.map((inv) => ({
      InvoiceNumber: inv.invoiceNumber,
      Customer: inv.customerName,
      IssueDate: inv.issueDate,
      DueDate: inv.dueDate,
      Status: inv.status,
      Subtotal: inv.subtotal,
      Discount: inv.discountAmount,
      NetTaxable: inv.taxableAmount,
      VAT_20: inv.taxAmount,
      GrandTotal: inv.grandTotal,
      AmountPaid: inv.amountPaid,
      Outstanding: inv.outstandingBalance,
    }));

    exportToCsv(reportData, `yswb-full-financial-report-${new Date().toISOString().split("T")[0]}.csv`);
    showToast(`Full financial audit dataset exported to CSV.`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-zinc-900 border border-amber-500/40 text-amber-300 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              EXECUTIVE INTELLIGENCE
            </span>
            <span className="text-xs text-zinc-500 font-mono">HMRC VAT Registered GB 492 819 320</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Financial Reports &amp; Revenue Analytics
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Reconciliation of gross turnover, tax liabilities, settlement speed, and debtor aging.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Timeframe Selector */}
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as "all" | "ytd" | "q1" | "month")}
            className="bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-xl text-xs px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Records (2025 - 2026)</option>
            <option value="ytd">Year to Date (2026)</option>
            <option value="q1">Q1 Quarter</option>
            <option value="month">Current Month (March)</option>
          </select>

          <button
            onClick={handleExportAuditCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            Export Audit CSV
          </button>
        </div>
      </div>

      {/* Executive KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Invoiced Turnover */}
        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold uppercase tracking-wider">Gross Turnover</span>
            <span className="text-amber-400 font-mono text-[11px] font-bold">INVOICED</span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black font-mono text-white">
              {formatCurrency(summary.totalRevenue)}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            Total value of billable services
          </p>
        </div>

        {/* Net Cash Realized */}
        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold uppercase tracking-wider">Net Cash Realized</span>
            <span className="text-emerald-400 font-mono text-[11px] font-bold">SETTLED</span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black font-mono text-emerald-400">
              {formatCurrency(netRealized)}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">
            Collections less refunds ({collectionRate}% efficiency)
          </p>
        </div>

        {/* Outstanding Receivables */}
        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold uppercase tracking-wider">Outstanding Debtors</span>
            <span
              className={`font-mono text-[11px] font-bold ${
                summary.outstandingBalance > 0 ? "text-amber-400" : "text-emerald-400"
              }`}
            >
              RECEIVABLE
            </span>
          </div>
          <div className="mt-3">
            <span
              className={`text-3xl font-black font-mono ${
                summary.outstandingBalance > 0 ? "text-amber-400" : "text-emerald-400"
              }`}
            >
              {formatCurrency(summary.outstandingBalance)}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">
            {summary.overdueInvoices} overdue &bull; {summary.partiallyPaidInvoices} partial balances
          </p>
        </div>

        {/* Total VAT 20% */}
        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold uppercase tracking-wider">HMRC VAT (20%)</span>
            <span className="text-blue-400 font-mono text-[11px] font-bold">LIABILITY</span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black font-mono text-white">{formatCurrency(totalVAT)}</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Accrued UK Value Added Tax
          </p>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
          <span className="text-zinc-500 block">Average Detailing Job Value</span>
          <span className="font-mono text-lg font-bold text-white mt-1 block">
            {formatCurrency(averageInvoiceValue)}
          </span>
        </div>
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
          <span className="text-zinc-500 block">Client Discounts Granted</span>
          <span className="font-mono text-lg font-bold text-emerald-400 mt-1 block">
            {formatCurrency(totalDiscounts)}
          </span>
        </div>
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
          <span className="text-zinc-500 block">Total Refunds Issued</span>
          <span className="font-mono text-lg font-bold text-rose-400 mt-1 block">
            {formatCurrency(summary.totalRefunds)}
          </span>
        </div>
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
          <span className="text-zinc-500 block">Cash Collection Rate</span>
          <span className="font-mono text-lg font-bold text-amber-400 mt-1 block">
            {collectionRate}%
          </span>
        </div>
      </div>

      {/* Trajectory Bar Chart */}
      <div className="bg-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-800/80 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              Monthly Revenue Trajectory &amp; Collections
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Comparison of invoiced client turnover against verified banking receipts (past 5 months).
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-3 h-3 rounded bg-zinc-600 inline-block" />
              Invoiced (£)
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
              Settled (£)
            </span>
          </div>
        </div>

        {/* Bar Visualizer */}
        <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-4 border-b border-zinc-800">
          {monthlyData.map((data, idx) => {
            const invoicedHeight = Math.round((data.invoiced / maxMonthValue) * 100);
            const collectedHeight = Math.round((data.collected / maxMonthValue) * 100);

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  {/* Invoiced Bar */}
                  <div
                    style={{ height: `${invoicedHeight}%` }}
                    className="w-1/2 max-w-[28px] bg-zinc-700/80 rounded-t-md transition-all group-hover:bg-zinc-600 relative"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-[10px] font-mono text-zinc-300 pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      Inv: {formatCurrency(data.invoiced)}
                    </div>
                  </div>

                  {/* Collected Bar */}
                  <div
                    style={{ height: `${collectedHeight}%` }}
                    className="w-1/2 max-w-[28px] bg-amber-400 rounded-t-md transition-all group-hover:bg-amber-300 relative"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-amber-500/40 px-2 py-1 rounded text-[10px] font-mono text-amber-300 pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      Paid: {formatCurrency(data.collected)}
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-zinc-400 text-center truncate w-full">
                  {data.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Detailed Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue by Service Category */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Turnover by Detailing Category
            </h2>
            <span className="text-xs text-zinc-500">Service Line Share</span>
          </div>

          <div className="space-y-4 pt-2">
            {categoryBreakdown.map((cat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-zinc-200">{cat.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-zinc-400">{formatCurrency(cat.amount)}</span>
                    <span className="font-mono font-bold text-amber-400 w-8 text-right">
                      {cat.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                  <div
                    style={{ width: `${cat.percentage}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Settlement Channel */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-400" />
              Settlement Channels &amp; Remittance
            </h2>
            <span className="text-xs text-zinc-500">Total Cleared</span>
          </div>

          <div className="space-y-4 pt-2">
            {methodBreakdown.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-200 flex items-center gap-2">
                      <span className={`p-1 rounded-md border ${m.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      {m.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-zinc-300">{formatCurrency(m.amount)}</span>
                      <span className="font-mono font-bold text-white w-8 text-right">
                        {m.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                    <div
                      style={{ width: `${m.percentage}%` }}
                      className={`h-full rounded-full ${m.barColor} transition-all duration-500`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between mt-4">
            <span>Primary settlement preference:</span>
            <span className="font-semibold text-zinc-200">
              Bank Transfer (BACS) &bull; 0% merchant transaction fee
            </span>
          </div>
        </div>
      </div>

      {/* Invoice Portfolio Aging & Status */}
      <div className="bg-zinc-950 rounded-2xl border border-zinc-800/80 p-6 shadow-xl">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          Invoice Aging &amp; Portfolio Status
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <span className="text-xs font-semibold text-emerald-400 block">Paid in Full</span>
            <span className="text-2xl font-black font-mono text-white mt-1 block">
              {summary.paidInvoices}
            </span>
            <span className="text-[11px] text-zinc-400">100% reconciled</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
            <span className="text-xs font-semibold text-amber-400 block">Partially Paid</span>
            <span className="text-2xl font-black font-mono text-white mt-1 block">
              {summary.partiallyPaidInvoices}
            </span>
            <span className="text-[11px] text-zinc-400">Deposits cleared</span>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
            <span className="text-xs font-semibold text-rose-400 block">Overdue Invoices</span>
            <span className="text-2xl font-black font-mono text-white mt-1 block">
              {summary.overdueInvoices}
            </span>
            <span className="text-[11px] text-zinc-400">Passed payment terms</span>
          </div>

          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
            <span className="text-xs font-semibold text-blue-400 block">Sent (Pending Terms)</span>
            <span className="text-2xl font-black font-mono text-white mt-1 block">
              {invoices.filter((i) => i.status === "sent").length}
            </span>
            <span className="text-[11px] text-zinc-400">Net 14 day window</span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-800/40 border border-zinc-700/60 text-center col-span-2 md:col-span-1">
            <span className="text-xs font-semibold text-zinc-400 block">Draft Invoices</span>
            <span className="text-2xl font-black font-mono text-white mt-1 block">
              {summary.draftInvoices}
            </span>
            <span className="text-[11px] text-zinc-500">Unfinalized scope</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800 text-xs">
          <span className="text-zinc-500">
            Certified accounting period: <strong className="text-zinc-300">Q1 2026 Financial Audit</strong>
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/invoices"
              className="text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold"
            >
              Manage Invoices &rarr;
            </Link>
            <Link
              href="/admin/payments"
              className="text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold"
            >
              Reconcile Payments &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
