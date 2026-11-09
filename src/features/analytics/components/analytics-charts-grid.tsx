"use client";

import * as React from "react";
import {
  TrendingUp,
  BarChart3,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Share2,
  Filter,
  CheckCircle2,
} from "lucide-react";
import {
  DeviceDistribution,
  FunnelStep,
  NewVsReturningPoint,
  TrafficSourceStat,
  VisitorTimelinePoint,
} from "../types/analytics";

interface AnalyticsChartsGridProps {
  timeline: VisitorTimelinePoint[];
  newVsReturning: NewVsReturningPoint[];
  trafficSources: TrafficSourceStat[];
  devices: DeviceDistribution[];
  funnel: FunnelStep[];
}

export function AnalyticsChartsGrid({
  timeline,
  newVsReturning,
  trafficSources,
  devices,
  funnel,
}: AnalyticsChartsGridProps) {
  const [activeTimelineIndex, setActiveTimelineIndex] = React.useState<number | null>(null);
  const [activeMetric, setActiveMetric] = React.useState<"total" | "unique" | "pageViews">("total");

  // SVG Area / Line calculations for Visitors Over Time
  const chartHeight = 160;
  const chartWidth = 600;
  const padX = 35;
  const padY = 25;

  const maxTimelineVal = Math.max(
    ...timeline.map((t) => (activeMetric === "pageViews" ? t.pageViews : t.totalVisitors)),
    10
  );

  const points = timeline.map((item, idx) => {
    const val =
      activeMetric === "pageViews"
        ? item.pageViews
        : activeMetric === "unique"
        ? item.uniqueVisitors
        : item.totalVisitors;

    const x =
      padX + (idx / Math.max(1, timeline.length - 1)) * (chartWidth - padX * 2);
    const y =
      chartHeight - padY - (val / maxTimelineVal) * (chartHeight - padY * 2);

    return { x, y, ...item, currentVal: val };
  });

  const linePath = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - padY} L ${
          points[0].x
        } ${chartHeight - padY} Z`
      : "";

  const activePoint =
    activeTimelineIndex !== null && points[activeTimelineIndex]
      ? points[activeTimelineIndex]
      : points[points.length - 1];

  const getDeviceIcon = (device: "mobile" | "desktop" | "tablet") => {
    switch (device) {
      case "mobile":
        return <Smartphone className="w-4 h-4 text-amber-400" />;
      case "desktop":
        return <Monitor className="w-4 h-4 text-blue-400" />;
      case "tablet":
      default:
        return <Tablet className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Row 1: Visitors Over Time & New vs Returning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart A: Interactive Visitors Timeline */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    Visitors Over Time
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Interactive
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Hover points to inspect temporal traffic and page inspection density.
                </p>
              </div>

              {/* Metric Switcher */}
              <div className="flex items-center gap-1 bg-secondary/80 p-1 rounded-xl border border-border text-[11px]">
                <button
                  onClick={() => setActiveMetric("total")}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    activeMetric === "total"
                      ? "bg-amber-500 text-zinc-950 font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Total
                </button>
                <button
                  onClick={() => setActiveMetric("unique")}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    activeMetric === "unique"
                      ? "bg-blue-500 text-white font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Unique
                </button>
                <button
                  onClick={() => setActiveMetric("pageViews")}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    activeMetric === "pageViews"
                      ? "bg-emerald-500 text-zinc-950 font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Views
                </button>
              </div>
            </div>

            {/* Active inspection summary tooltip box */}
            {activePoint && (
              <div className="bg-secondary/40 p-3 rounded-xl border border-border/80 flex items-center justify-between mb-3 text-xs">
                <div>
                  <span className="text-muted-foreground">Interval:</span>{" "}
                  <strong className="text-foreground font-mono">{activePoint.label}</strong>
                </div>
                <div className="flex items-center gap-4 font-mono">
                  <span>
                    Total: <strong className="text-amber-400">{activePoint.totalVisitors}</strong>
                  </span>
                  <span>
                    Unique: <strong className="text-blue-400">{activePoint.uniqueVisitors}</strong>
                  </span>
                  <span>
                    Views: <strong className="text-emerald-400">{activePoint.pageViews}</strong>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* SVG Chart Surface */}
          <div className="relative w-full overflow-hidden pt-2">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-44 overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="visitorAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line
                x1={padX}
                y1={padY}
                x2={chartWidth - padX}
                y2={padY}
                stroke="currentColor"
                className="text-border"
                strokeDasharray="3 3"
              />
              <line
                x1={padX}
                y1={chartHeight / 2}
                x2={chartWidth - padX}
                y2={chartHeight / 2}
                stroke="currentColor"
                className="text-border"
                strokeDasharray="3 3"
              />
              <line
                x1={padX}
                y1={chartHeight - padY}
                x2={chartWidth - padX}
                y2={chartHeight - padY}
                stroke="currentColor"
                className="text-border"
              />

              {/* Area */}
              {areaPath && (
                <path d={areaPath} fill="url(#visitorAreaGrad)" />
              )}

              {/* Line */}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Points */}
              {points.map((pt, idx) => {
                const isSelected = activeTimelineIndex === idx;
                return (
                  <g
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveTimelineIndex(idx)}
                    onMouseLeave={() => setActiveTimelineIndex(null)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? "#f59e0b" : "#18181b"}
                      stroke="#f59e0b"
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between px-4 text-[11px] font-mono text-muted-foreground mt-2">
              {timeline.map((item, idx) => (
                <span
                  key={idx}
                  className={`cursor-pointer transition-colors ${
                    activeTimelineIndex === idx ? "text-amber-400 font-bold" : ""
                  }`}
                  onMouseEnter={() => setActiveTimelineIndex(idx)}
                >
                  {item.date}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Chart B: New vs Returning Visitors */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  New vs Returning Visitors
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Comparison between brand discovery and repeat loyal automotive clients.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  New
                </span>
                <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" />
                  Returning
                </span>
              </div>
            </div>
          </div>

          {/* Stacked comparison bars */}
          <div className="space-y-3.5 pt-2">
            {newVsReturning.map((item, idx) => {
              const total = item.newVisitors + item.returningVisitors || 1;
              const newPct = Math.round((item.newVisitors / total) * 100);
              const retPct = 100 - newPct;

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-foreground font-mono">{item.label}</span>
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-emerald-400 font-bold">
                        {item.newVisitors} ({newPct}%)
                      </span>
                      <span className="text-purple-400 font-bold">
                        {item.returningVisitors} ({retPct}%)
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-3 rounded-full bg-secondary/80 overflow-hidden flex">
                    <div
                      style={{ width: `${newPct}%` }}
                      className="h-full bg-emerald-500 transition-all duration-500"
                      title={`New: ${item.newVisitors}`}
                    />
                    <div
                      style={{ width: `${retPct}%` }}
                      className="h-full bg-purple-500 transition-all duration-500"
                      title={`Returning: ${item.returningVisitors}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Overall Loyalty Retention Rate:</span>
            <span className="font-bold text-foreground">~22.4% Repeat Bookings</span>
          </div>
        </div>
      </div>

      {/* Row 2: Traffic Sources & Device Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" />
              Traffic Sources &amp; Acquisition Channels
            </h3>
            <span className="text-xs text-muted-foreground">Share of Traffic</span>
          </div>

          <div className="space-y-4 pt-1">
            {trafficSources.map((source) => (
              <div key={source.id} className="space-y-1.5">
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-semibold text-foreground">{source.source}</span>
                    <span className="text-[10px] text-muted-foreground font-mono ml-2">
                      ({source.channel})
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-muted-foreground">{source.visitors.toLocaleString()}</span>
                    <span className="font-bold text-amber-400 w-12 text-right">
                      {source.percentage}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-secondary/80 overflow-hidden">
                  <div
                    style={{ width: `${source.percentage}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Distribution */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-400" />
              Device Telemetry Breakdown
            </h3>
            <span className="text-xs text-muted-foreground">Responsive Usage</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {devices.map((d) => (
              <div
                key={d.device}
                className="p-4 rounded-xl bg-secondary/40 border border-border/60 text-center space-y-2 hover:border-amber-500/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center mx-auto">
                  {getDeviceIcon(d.device)}
                </div>
                <div>
                  <span className="text-xs font-bold text-foreground capitalize block">
                    {d.device}
                  </span>
                  <span className="text-2xl font-black font-mono text-amber-400 block mt-0.5">
                    {d.percentage}%
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground space-y-0.5 font-mono pt-1 border-t border-border/60">
                  <p>{d.visitors.toLocaleString()} users</p>
                  <p>Bounce: {d.bounceRate}%</p>
                  <p>Avg: {d.avgDuration}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/60 text-xs text-muted-foreground flex items-center justify-between">
            <span>Primary mobile preference:</span>
            <span className="font-semibold text-foreground">
              Apple iPhone (Safari 18.2) &bull; Touch booking flow
            </span>
          </div>
        </div>
      </div>

      {/* Row 3: Booking Conversion Funnel */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-400" />
              Booking Engine Conversion Funnel
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Client dropoff stages from initial studio discovery through to confirmed deposit remittance.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
              End-to-End Conversion: 8.4%
            </span>
          </div>
        </div>

        {/* Visual Funnel Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {funnel.map((step, idx) => {
            const isLast = idx === funnel.length - 1;
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border relative overflow-hidden flex flex-col justify-between ${
                  isLast
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                    : "bg-secondary/40 border-border/70"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Step {idx + 1}
                    </span>
                    {isLast ? (
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    ) : (
                      <span className="text-[10px] text-rose-400 font-mono">
                        -{step.dropoffPercentage}%
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-foreground mb-1 leading-tight">{step.step}</h4>
                  <p className="text-[11px] text-muted-foreground leading-normal line-clamp-2">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60">
                  <div className="flex justify-between items-baseline font-mono">
                    <span className="text-lg font-black text-foreground">
                      {step.count.toLocaleString()}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isLast ? "text-amber-400" : "text-muted-foreground"
                      }`}
                    >
                      {step.percentage}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-secondary mt-1.5 overflow-hidden">
                    <div
                      style={{ width: `${step.percentage}%` }}
                      className={`h-full rounded-full ${
                        isLast ? "bg-amber-400" : "bg-gradient-to-r from-amber-500 to-amber-400"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
