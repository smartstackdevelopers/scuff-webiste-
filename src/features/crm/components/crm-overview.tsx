"use client";

import * as React from "react";
import Link from "next/link";
import { useCrm } from "../hooks/use-crm";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  UserCheck,
  TrendingUp,
  Clock,
  PhoneCall,
  CheckCircle2,
  XCircle,
  CalendarCheck,
} from "lucide-react";

// Animated Counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 500;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export function CRMOverview() {
  const { crmKpi, leads, followUps } = useCrm();
  const [dateFilter, setDateFilter] = React.useState<"all" | "month" | "quarter" | "ytd">("all");

  const funnelStages = [
    { label: "New Inquiries", count: crmKpi.newLeads, color: "bg-blue-500", pct: 100 },
    { label: "Contacted", count: crmKpi.contactedLeads, color: "bg-cyan-500", pct: 85 },
    { label: "Interested", count: crmKpi.interestedLeads, color: "bg-indigo-500", pct: 70 },
    { label: "Qualified", count: crmKpi.qualifiedLeads, color: "bg-purple-500", pct: 55 },
    { label: "Proposal Sent", count: crmKpi.pipelineStageCounts.proposal_sent, color: "bg-amber-500", pct: 40 },
    { label: "Converted Won", count: crmKpi.convertedLeads, color: "bg-emerald-500", pct: crmKpi.conversionRate },
    { label: "Lost / Dropped", count: crmKpi.lostLeads, color: "bg-rose-500", pct: 12 },
  ];

  // Lead Sources Analytics
  const sourceStats = React.useMemo(() => {
    const counts: Record<string, { total: number; converted: number }> = {
      website: { total: 0, converted: 0 },
      google: { total: 0, converted: 0 },
      instagram: { total: 0, converted: 0 },
      whatsapp: { total: 0, converted: 0 },
      phone_call: { total: 0, converted: 0 },
      referral: { total: 0, converted: 0 },
      walk_in: { total: 0, converted: 0 },
      facebook: { total: 0, converted: 0 },
    };

    leads.forEach((l) => {
      const src = l.leadSource || "website";
      if (!counts[src]) counts[src] = { total: 0, converted: 0 };
      counts[src].total += 1;
      if (l.status === "converted") counts[src].converted += 1;
    });

    const entries = Object.entries(counts).map(([src, data]) => {
      const convRate = data.total > 0 ? Math.round((data.converted / data.total) * 100) : 0;
      return {
        source: src,
        label: src.replace("_", " ").toUpperCase(),
        total: data.total,
        converted: data.converted,
        conversionRate: convRate,
      };
    });

    entries.sort((a, b) => b.total - a.total);
    return entries;
  }, [leads]);

  const mostEffectiveChannel = sourceStats.reduce(
    (best, cur) => (cur.conversionRate > best.conversionRate ? cur : best),
    sourceStats[0] || { label: "REFERRAL", conversionRate: 50 }
  );

  const upcomingFollowUps = followUps.filter((f) => f.status === "pending").slice(0, 4);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header & Date Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              CRM &amp; Leads Management System
            </h1>
            <Badge variant="electric" className="text-xs">
              Live Pipeline
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Monitor client acquisition, sales rep deal velocity, follow-up queues, and lead conversions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Interactive Date Range Filter */}
          <div className="flex items-center gap-1 bg-secondary/80 p-1 rounded-xl border border-border text-xs">
            <button
              onClick={() => setDateFilter("all")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                dateFilter === "all"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setDateFilter("month")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                dateFilter === "month"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setDateFilter("quarter")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                dateFilter === "quarter"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Quarter Q4
            </button>
            <button
              onClick={() => setDateFilter("ytd")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                dateFilter === "ytd"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              YTD
            </button>
          </div>

          <Link
            href="/admin/crm/leads"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-electric text-black text-xs font-black uppercase tracking-wider hover:bg-electric/90 shadow-glow-sm transition-all"
          >
            <Target className="w-3.5 h-3.5 stroke-[3]" />
            <span>Kanban Pipeline</span>
          </Link>
        </div>
      </div>

      {/* 8 Required CRM KPI Cards with Animated Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Leads */}
        <div className="p-5 rounded-2xl bg-card border border-border/80 hover:border-amber-500/50 transition-all space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Leads</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-foreground">
            <AnimatedCounter value={crmKpi.totalLeads} />
          </p>
          <span className="text-[11px] text-muted-foreground block truncate">
            Across all marketing touchpoints
          </span>
        </div>

        {/* 2. New Leads */}
        <div className="p-5 rounded-2xl bg-card border border-border/80 hover:border-blue-500/50 transition-all space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">New Leads</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-blue-400">
            <AnimatedCounter value={crmKpi.newLeads} />
          </p>
          <span className="text-[11px] text-muted-foreground block truncate">
            Uncontacted fresh inquiries
          </span>
        </div>

        {/* 3. Contacted Leads */}
        <div className="p-5 rounded-2xl bg-card border border-border/80 hover:border-cyan-500/50 transition-all space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">Contacted Leads</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">
            <AnimatedCounter value={crmKpi.contactedLeads} />
          </p>
          <span className="text-[11px] text-muted-foreground block truncate">
            Consultation underway
          </span>
        </div>

        {/* 4. Qualified Leads */}
        <div className="p-5 rounded-2xl bg-card border border-border/80 hover:border-purple-500/50 transition-all space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">Qualified Leads</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-purple-400">
            <AnimatedCounter value={crmKpi.qualifiedLeads} />
          </p>
          <span className="text-[11px] text-muted-foreground block truncate">
            Vehicle specs &amp; budget verified
          </span>
        </div>

        {/* 5. Converted Leads */}
        <div className="p-5 rounded-2xl bg-card border border-border/80 hover:border-emerald-500/50 transition-all space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">Converted Leads</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
            <AnimatedCounter value={crmKpi.convertedLeads} />
          </p>
          <span className="text-[11px] text-muted-foreground block truncate">
            Confirmed customer studio bookings
          </span>
        </div>

        {/* 6. Lost Leads */}
        <div className="p-5 rounded-2xl bg-card border border-border/80 hover:border-rose-500/50 transition-all space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">Lost Leads</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-rose-400">
            <AnimatedCounter value={crmKpi.lostLeads} />
          </p>
          <span className="text-[11px] text-muted-foreground block truncate">
            Postponed or lost to alternatives
          </span>
        </div>

        {/* 7. Follow-ups Due Today */}
        <div className="p-5 rounded-2xl bg-card border border-border/80 hover:border-amber-500/50 transition-all space-y-2 shadow-sm relative overflow-hidden">
          {crmKpi.followUpsDueToday > 0 && (
            <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
          )}
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">Follow-ups Due Today</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
            <AnimatedCounter value={crmKpi.followUpsDueToday} />
          </p>
          <span className="text-[11px] text-muted-foreground block truncate">
            {crmKpi.pendingFollowUps} total pending tasks
          </span>
        </div>

        {/* 8. Conversion Rate */}
        <div className="p-5 rounded-2xl bg-card border border-border/80 hover:border-emerald-500/50 transition-all space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">Conversion Rate</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
            <AnimatedCounter value={crmKpi.conversionRate} suffix="%" />
          </p>
          <span className="text-[11px] text-muted-foreground block truncate">
            Inquiry-to-paid client win rate
          </span>
        </div>
      </div>

      {/* Funnel Pipeline & Marketing Sources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Pipeline Funnel Stages */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Pipeline Stage Distribution
              </h3>
              <Badge variant="outline" className="text-[10px]">
                Active Deals
              </Badge>
            </div>
            <Link
              href="/admin/crm/leads"
              className="text-xs text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold"
            >
              Kanban View &rarr;
            </Link>
          </div>

          <div className="space-y-3.5 pt-2">
            {funnelStages.map((stage, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-foreground">{stage.label}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-foreground font-bold">{stage.count} leads</span>
                  </div>
                </div>
                <div className="w-full h-2.5 rounded-full bg-secondary/80 overflow-hidden">
                  <div
                    style={{
                      width: `${crmKpi.totalLeads > 0 ? Math.max(8, (stage.count / crmKpi.totalLeads) * 100) : 0}%`,
                    }}
                    className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Total Active Pipeline Value:</span>
            <strong className="text-foreground font-mono text-sm">
              £{crmKpi.totalPipelineValue.toLocaleString()}
            </strong>
          </div>
        </div>

        {/* Marketing Lead Sources & Conversion Tracking */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Lead Sources &amp; Attribution
              </h3>
              <Badge variant="outline" className="text-[10px]">
                Marketing ROI
              </Badge>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              Top: {mostEffectiveChannel.label} ({mostEffectiveChannel.conversionRate}%)
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {sourceStats.slice(0, 6).map((src, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-semibold text-foreground">{src.label}</span>
                    <span className="text-[10px] text-muted-foreground ml-2">
                      ({src.total} inquiries)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-muted-foreground text-[11px]">{src.converted} converted</span>
                    <span className="font-bold text-amber-400 w-12 text-right">
                      {src.conversionRate}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-secondary/80 overflow-hidden">
                  <div
                    style={{ width: `${Math.max(5, src.conversionRate)}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Most effective marketing channel:</span>
            <span className="text-foreground font-bold">
              {mostEffectiveChannel.label} with {mostEffectiveChannel.conversionRate}% conversion rate
            </span>
          </div>
        </div>
      </div>

      {/* Upcoming Follow-ups & Quick Actions */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              Priority Follow-Up Queue
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              ({followUps.filter((f) => f.status === "pending").length} active tasks)
            </span>
          </div>
          <Link
            href="/admin/crm/follow-ups"
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            Manage All Follow-ups &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {upcomingFollowUps.map((fup) => (
            <div
              key={fup.id}
              className="p-4 rounded-xl bg-secondary/40 border border-border/70 hover:border-amber-500/30 transition-colors space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-mono text-amber-400 font-bold">
                    {fup.leadReference || "INQ"}
                  </span>
                  <span className="capitalize px-1.5 py-0.5 rounded text-[10px] bg-secondary border border-border font-semibold">
                    {fup.type}
                  </span>
                </div>
                <p className="font-bold text-foreground text-xs">{fup.customerName}</p>
                <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                  {fup.notes || fup.description}
                </p>
              </div>

              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>{fup.followUpDate || fup.scheduledDate}</span>
                <span className="text-foreground font-semibold">
                  {fup.assignedSalespersonName?.split(" ")[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
