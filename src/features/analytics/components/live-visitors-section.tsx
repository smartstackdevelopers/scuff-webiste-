"use client";

import * as React from "react";
import {
  Radio,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Clock,
  Sparkles,
  ShieldCheck,
  Pause,
  Play,
} from "lucide-react";
import { LiveVisitor } from "../types/analytics";

interface LiveVisitorsSectionProps {
  liveVisitors: LiveVisitor[];
  liveCount: number;
  isAutoRefresh: boolean;
  onToggleAutoRefresh: (val: boolean) => void;
}

export function LiveVisitorsSection({
  liveVisitors,
  liveCount,
  isAutoRefresh,
  onToggleAutoRefresh,
}: LiveVisitorsSectionProps) {
  const [filterPage, setFilterPage] = React.useState<string>("all");

  const filteredVisitors = React.useMemo(() => {
    if (filterPage === "all") return liveVisitors;
    if (filterPage === "funnel") return liveVisitors.filter((v) => v.isBookingFunnel);
    return liveVisitors.filter((v) => v.activePage === filterPage);
  }, [liveVisitors, filterPage]);

  const getDeviceIcon = (device: "mobile" | "desktop" | "tablet") => {
    switch (device) {
      case "mobile":
        return <Smartphone className="w-3.5 h-3.5 text-amber-400" />;
      case "desktop":
        return <Monitor className="w-3.5 h-3.5 text-blue-400" />;
      case "tablet":
      default:
        return <Tablet className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-6">
      {/* Header with live pulse */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              Real-Time Active Visitors Stream
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {liveCount} CONCURRENT CLIENTS
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time telemetry showing live browsing sessions and active booking engine journeys.
          </p>
        </div>

        {/* Live controls & Funnel filter */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Funnel quick filter */}
          <div className="flex items-center gap-1 bg-secondary/80 p-1 rounded-xl border border-border text-xs">
            <button
              onClick={() => setFilterPage("all")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterPage === "all"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Pages
            </button>
            <button
              onClick={() => setFilterPage("funnel")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                filterPage === "funnel"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              In Booking Funnel
            </button>
          </div>

          {/* Pause / Resume Ticker */}
          <button
            onClick={() => onToggleAutoRefresh(!isAutoRefresh)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border text-xs font-semibold transition-colors"
          >
            {isAutoRefresh ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume Stream</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Visitors Table */}
      <div className="rounded-xl border border-border/80 overflow-hidden bg-card/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-secondary/50 font-bold text-muted-foreground uppercase tracking-wider">
                <th className="py-3 px-4">Visitor Node (IP Masked)</th>
                <th className="py-3 px-4">Current Screen / Action</th>
                <th className="py-3 px-4">Device &amp; Browser</th>
                <th className="py-3 px-4">Referral Source</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-right">Elapsed Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredVisitors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No active sessions found for this view filter.
                  </td>
                </tr>
              ) : (
                filteredVisitors.map((visitor) => (
                  <tr
                    key={visitor.id}
                    className={`hover:bg-secondary/30 transition-colors ${
                      visitor.isBookingFunnel ? "bg-amber-500/5" : ""
                    }`}
                  >
                    {/* Visitor ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{visitor.ipMasked}</span>
                      </div>
                    </td>

                    {/* Active Page */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-foreground">
                          {visitor.activePage}
                        </span>
                        {visitor.isBookingFunnel && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            <Sparkles className="w-3 h-3" />
                            Booking Flow
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground">{visitor.pageTitle}</p>
                    </td>

                    {/* Device & Browser */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-foreground capitalize">
                        {getDeviceIcon(visitor.device)}
                        <span className="font-medium">{visitor.device}</span>
                      </div>
                      <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                        {visitor.browser}
                      </p>
                    </td>

                    {/* Source */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-medium text-foreground">
                        <Globe className="w-3 h-3 text-sky-400" />
                        {visitor.trafficSource}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-foreground">{visitor.location}</span>
                    </td>

                    {/* Duration */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        <Clock className="w-3 h-3" />
                        {formatDuration(visitor.visitDurationSeconds)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground bg-secondary/30 p-3 rounded-xl border border-border/60">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          Privacy &amp; Cookie Compliance: IP addresses are anonymized in compliance with UK GDPR and
          PECR regulations. Zero raw personal identifiers are captured in telemetry logs.
        </span>
      </div>
    </div>
  );
}
