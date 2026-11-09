"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Target,
  PieChart,
  BarChart3,
  Download,
  CheckCircle2,
  Award,
  Sparkles,
} from "lucide-react";
import { useCrm } from "../hooks/use-crm";
import { exportToCsv } from "../lib/crm-calculations";
import { Button } from "@/components/ui/button";
import { LeadSource, LeadStatus } from "../types/crm";

export function CRMReportsView() {
  const { leads, salespersons, followUps } = useCrm();

  const [timeframe, setTimeframe] = React.useState<"all" | "month" | "quarter" | "ytd">("all");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter leads based on selected timeframe
  const filteredLeads = React.useMemo(() => {
    if (timeframe === "all") return leads;
    const now = new Date();
    return leads.filter((lead) => {
      const created = new Date(lead.createdDate);
      if (timeframe === "month") {
        return (
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        );
      }
      if (timeframe === "quarter") {
        // Current quarter
        const currentQ = Math.floor(now.getMonth() / 3);
        const leadQ = Math.floor(created.getMonth() / 3);
        return leadQ === currentQ && created.getFullYear() === now.getFullYear();
      }
      if (timeframe === "ytd") {
        return created.getFullYear() === now.getFullYear();
      }
      return true;
    });
  }, [leads, timeframe]);

  // High-level aggregates
  const totalLeadsCount = filteredLeads.length;
  const convertedLeads = filteredLeads.filter((l) => l.status === "converted");
  const lostLeads = filteredLeads.filter((l) => l.status === "lost");
  const activeLeads = filteredLeads.filter((l) => l.status !== "converted" && l.status !== "lost");

  const conversionRate = totalLeadsCount > 0
    ? Math.round((convertedLeads.length / totalLeadsCount) * 100)
    : 0;

  const totalPipelineValue = filteredLeads.reduce(
    (sum, l) => sum + (l.estimatedValue || 0),
    0
  );

  const wonRevenue = convertedLeads.reduce(
    (sum, l) => sum + (l.estimatedValue || 0),
    0
  );

  const averageDealSize = totalLeadsCount > 0
    ? Math.round(totalPipelineValue / totalLeadsCount)
    : 0;

  // Follow-up completion statistics
  const totalFollowUps = followUps.length;
  const completedFollowUps = followUps.filter((f) => f.status === "completed").length;
  const followUpCompletionRate = totalFollowUps > 0
    ? Math.round((completedFollowUps / totalFollowUps) * 100)
    : 0;

  // Leads by Marketing Source
  const sourceStats = React.useMemo(() => {
    const sources: LeadSource[] = [
      "website",
      "google",
      "facebook",
      "instagram",
      "whatsapp",
      "phone_call",
      "referral",
      "walk_in",
      "other",
    ];

    const sourceNames: Record<LeadSource, string> = {
      website: "Website Direct / Organic",
      google: "Google Ads & Search",
      facebook: "Meta / Facebook",
      instagram: "Instagram Luxury Gallery",
      whatsapp: "WhatsApp Direct Concierge",
      phone_call: "Telephone Consultations",
      referral: "VIP Client Referrals",
      walk_in: "Studio Walk-Ins",
      other: "Private Automotive Club",
    };

    return sources.map((src) => {
      const matching = filteredLeads.filter((l) => (l.leadSource || l.source) === src);
      const converted = matching.filter((l) => l.status === "converted").length;
      const value = matching.reduce((s, l) => s + (l.estimatedValue || 0), 0);
      const rate = matching.length > 0 ? Math.round((converted / matching.length) * 100) : 0;
      const pctOfTotal = totalLeadsCount > 0 ? Math.round((matching.length / totalLeadsCount) * 100) : 0;

      return {
        key: src,
        name: sourceNames[src],
        count: matching.length,
        converted,
        value,
        rate,
        percentage: pctOfTotal,
      };
    }).sort((a, b) => b.count - a.count);
  }, [filteredLeads, totalLeadsCount]);

  // Stage Distribution
  const stageStats = React.useMemo(() => {
    const stages: { status: LeadStatus; label: string; color: string }[] = [
      { status: "new", label: "New Inquiries", color: "bg-blue-500" },
      { status: "contacted", label: "Contacted", color: "bg-cyan-500" },
      { status: "interested", label: "Interested", color: "bg-indigo-500" },
      { status: "qualified", label: "Qualified", color: "bg-purple-500" },
      { status: "proposal_sent", label: "Proposal Sent", color: "bg-amber-500" },
      { status: "converted", label: "Converted (Won)", color: "bg-emerald-500" },
      { status: "lost", label: "Lost Opportunity", color: "bg-rose-500" },
    ];

    return stages.map((st) => {
      const matching = filteredLeads.filter((l) => l.status === st.status);
      const value = matching.reduce((s, l) => s + (l.estimatedValue || 0), 0);
      const pct = totalLeadsCount > 0 ? Math.round((matching.length / totalLeadsCount) * 100) : 0;

      return {
        ...st,
        count: matching.length,
        value,
        percentage: pct,
      };
    });
  }, [filteredLeads, totalLeadsCount]);

  // Salesperson League & Performance
  const repPerformance = React.useMemo(() => {
    return salespersons.map((rep) => {
      const assigned = filteredLeads.filter(
        (l) => l.assignedSalespersonId === rep.id
      );
      const converted = assigned.filter((l) => l.status === "converted");
      const inProgress = assigned.filter((l) => l.status !== "converted" && l.status !== "lost");
      const assignedVal = assigned.reduce((s, l) => s + (l.estimatedValue || 0), 0);
      const wonVal = converted.reduce((s, l) => s + (l.estimatedValue || 0), 0);
      const rate = assigned.length > 0 ? Math.round((converted.length / assigned.length) * 100) : 0;
      const commissionEst = Math.round(wonVal * ((rep.commissionRate || 10) / 100));

      return {
        id: rep.id,
        name: rep.fullName,
        role: rep.role,
        assignedCount: assigned.length,
        inProgressCount: inProgress.length,
        convertedCount: converted.length,
        totalPipeline: assignedVal,
        wonRevenue: wonVal,
        conversionRate: rate,
        commissionEarned: commissionEst,
      };
    }).sort((a, b) => b.wonRevenue - a.wonRevenue);
  }, [salespersons, filteredLeads]);

  // Customer Type breakdown
  const customerTypeStats = React.useMemo(() => {
    const types: Array<{ type: string; label: string }> = [
      { type: "individual", label: "Private Vehicle Owner" },
      { type: "collector", label: "Supercar / Collector" },
      { type: "vip", label: "VIP Executive / Celebrity" },
      { type: "dealership", label: "Prestige Dealership" },
      { type: "corporate", label: "Corporate Fleet" },
    ];

    return types.map((t) => {
      const matching = filteredLeads.filter((l) => (l.customerType || "individual") === t.type);
      const value = matching.reduce((s, l) => s + (l.estimatedValue || 0), 0);
      const pct = totalLeadsCount > 0 ? Math.round((matching.length / totalLeadsCount) * 100) : 0;
      return {
        label: t.label,
        count: matching.length,
        value,
        percentage: pct,
      };
    }).sort((a, b) => b.count - a.count);
  }, [filteredLeads, totalLeadsCount]);

  const handleExportCsv = () => {
    const csvData = filteredLeads.map((l) => ({
      Reference: l.leadReference || l.id,
      ClientName: l.customerName,
      Email: l.email,
      Phone: l.phone,
      CustomerType: l.customerType || "individual",
      Service: l.interestedService,
      Source: l.leadSource || l.source || "website",
      Status: l.status,
      Priority: l.priority || "medium",
      ValueGBP: l.estimatedValue || 0,
      AssignedAdvisor: l.assignedSalespersonName || "Unassigned",
      CreatedDate: l.createdDate,
      LastContacted: l.lastContactedDate || "N/A",
      NextFollowUp: l.nextFollowUpDate || "N/A",
    }));

    exportToCsv(csvData, `you-scuff-we-buff-crm-report-${timeframe}-${new Date().toISOString().split("T")[0]}`);
    showToast("CRM performance report downloaded as CSV.");
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 right-6 z-50 bg-emerald-500 text-zinc-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </motion.div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Executive Intelligence
            </span>
            <span className="text-muted-foreground text-xs font-mono">• CRM Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground font-serif tracking-tight mt-1">
            CRM & Lead Performance Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Comprehensive audit of sales pipeline conversion velocity, marketing attribution, and advisor quotas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Timeframe selector */}
          <div className="flex items-center bg-card border border-border/60 rounded-xl p-1 text-xs">
            {(
              [
                { id: "all", label: "All Time" },
                { id: "month", label: "This Month" },
                { id: "quarter", label: "Q4 Quarter" },
                { id: "ytd", label: "YTD 2026" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTimeframe(t.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  timeframe === t.id
                    ? "bg-amber-500 text-zinc-950 font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            onClick={handleExportCsv}
            className="bg-card hover:bg-muted text-foreground border border-border/60 shadow-sm"
          >
            <Download className="w-4 h-4 mr-2 text-amber-400" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* 6 Key Performance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Inquiries */}
        <div className="bg-card/70 border border-border/60 rounded-2xl p-4 shadow-sm hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Leads</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-foreground">{totalLeadsCount}</p>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1 font-sans">
            <span className="text-blue-400 font-bold">{activeLeads.length} active</span> in funnel
          </span>
        </div>

        {/* Lead Conversion Rate */}
        <div className="bg-card/70 border border-border/60 rounded-2xl p-4 shadow-sm hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Conversion Rate</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-400">{conversionRate}%</p>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1 font-sans">
            <span className="text-emerald-400 font-bold">{convertedLeads.length}</span> won •{" "}
            <span className="text-rose-400 font-bold">{lostLeads.length}</span> lost
          </span>
        </div>

        {/* Pipeline Value */}
        <div className="bg-card/70 border border-border/60 rounded-2xl p-4 shadow-sm hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Funnel Pipeline</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-amber-400">
            £{totalPipelineValue.toLocaleString("en-GB")}
          </p>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1 font-sans">
            Est. total deal book
          </span>
        </div>

        {/* Realized Won Revenue */}
        <div className="bg-card/70 border border-border/60 rounded-2xl p-4 shadow-sm hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Won Revenue</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-foreground">
            £{wonRevenue.toLocaleString("en-GB")}
          </p>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1 font-sans">
            Closed converted bookings
          </span>
        </div>

        {/* Average Deal Value */}
        <div className="bg-card/70 border border-border/60 rounded-2xl p-4 shadow-sm hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Deal Value</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-purple-400">
            £{averageDealSize.toLocaleString("en-GB")}
          </p>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1 font-sans">
            Per qualified lead
          </span>
        </div>

        {/* Follow-up Touchpoint Rate */}
        <div className="bg-card/70 border border-border/60 rounded-2xl p-4 shadow-sm hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Touchpoint SLA</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-cyan-400">{followUpCompletionRate}%</p>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1 font-sans">
            <span className="text-cyan-400 font-bold">{completedFollowUps}/{totalFollowUps}</span> follow-ups done
          </span>
        </div>
      </div>

      {/* Row 2: Marketing Source Attribution & Pipeline Stages Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Marketing Attribution */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <PieChart className="w-4 h-4 text-amber-400" />
                Marketing Attribution & Lead Sources
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Channel acquisition efficiency and customer acquisition ROI
              </p>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">9 Channels Active</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {sourceStats.map((src) => (
              <div key={src.key} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    {src.name}
                  </span>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-muted-foreground">
                      {src.count} leads ({src.percentage}%)
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {src.rate}% conv.
                    </span>
                    <span className="text-foreground font-bold">
                      £{src.value.toLocaleString("en-GB")}
                    </span>
                  </div>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                    style={{ width: `${Math.max(3, src.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Stage Breakdown */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                Pipeline Funnel & Conversion Health
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Distribution of current active volume across sales cycle milestones
              </p>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">7 Pipeline Stages</span>
          </div>

          <div className="space-y-4 pt-2">
            {stageStats.map((st) => (
              <div key={st.status} className="p-3 rounded-xl bg-background/50 border border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-md ${st.color}`} />
                  <div>
                    <h3 className="text-xs font-bold text-foreground">{st.label}</h3>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {st.percentage}% of total lead volume
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-mono font-bold text-foreground">
                    {st.count} {st.count === 1 ? "Lead" : "Leads"}
                  </p>
                  <p className="text-[11px] font-mono text-amber-400 font-semibold">
                    £{st.value.toLocaleString("en-GB")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Sales Rep League & Customer Segmentation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Rep League Table (2 Cols) */}
        <div className="lg:col-span-2 bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Advisor Performance & Revenue Production
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Individual deal closure velocity, active quotas, and estimated commissions
              </p>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              {salespersons.length} Detailing Advisors
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/30 text-muted-foreground border-b border-border/40 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Sales Advisor</th>
                  <th className="py-2.5 px-3 text-center">Assigned</th>
                  <th className="py-2.5 px-3 text-center">In Flight</th>
                  <th className="py-2.5 px-3 text-center">Won</th>
                  <th className="py-2.5 px-3 text-right">Win Rate</th>
                  <th className="py-2.5 px-3 text-right">Closed Revenue</th>
                  <th className="py-2.5 px-3 text-right">Est. Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {repPerformance.map((rep, idx) => (
                  <tr key={rep.id} className="hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{rep.name}</p>
                          <p className="text-[10px] text-muted-foreground capitalize">{rep.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono">{rep.assignedCount}</td>
                    <td className="py-3 px-3 text-center font-mono text-blue-400">{rep.inProgressCount}</td>
                    <td className="py-3 px-3 text-center font-mono text-emerald-400 font-bold">{rep.convertedCount}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-foreground">
                      {rep.conversionRate}%
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">
                      £{rep.wonRevenue.toLocaleString("en-GB")}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-400 font-semibold">
                      £{rep.commissionEarned.toLocaleString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Type Segmentation (1 Col) */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                Customer Segments
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Market demographic breakdown
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {customerTypeStats.map((item) => (
              <div key={item.label} className="p-3 rounded-xl bg-background/50 border border-border/40">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-foreground">{item.label}</span>
                  <span className="font-mono font-bold text-amber-400">
                    £{item.value.toLocaleString("en-GB")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono mb-2">
                  <span>{item.count} inquiries</span>
                  <span>{item.percentage}% volume</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-purple-500"
                    style={{ width: `${Math.max(4, item.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
