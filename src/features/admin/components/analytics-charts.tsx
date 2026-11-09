"use client";

import * as React from "react";
import {
  MOCK_BOOKING_TRENDS,
  MOCK_REVENUE_TRENDS,
  MOCK_STATUS_DISTRIBUTION,
  MOCK_POPULAR_SERVICES,
  MOCK_CUSTOMER_GROWTH,
} from "../data/analytics-data";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
} from "lucide-react";

export function AnalyticsChartsSection() {
  const [activeTrendPoint, setActiveTrendPoint] = React.useState<number | null>(null);
  const [activeRevenueBar, setActiveRevenueBar] = React.useState<number | null>(null);

  // SVG calculations for Booking Trends line chart
  const maxBooking = Math.max(...MOCK_BOOKING_TRENDS.map((t) => t.bookings), 12);
  const chartHeight = 140;
  const chartWidth = 500;
  const paddingX = 30;
  const paddingY = 20;

  const points = MOCK_BOOKING_TRENDS.map((item, index) => {
    const x =
      paddingX +
      (index / (MOCK_BOOKING_TRENDS.length - 1)) * (chartWidth - paddingX * 2);
    const y =
      chartHeight -
      paddingY -
      (item.bookings / maxBooking) * (chartHeight - paddingY * 2);
    return { x, y, ...item };
  });

  const linePath = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    chartHeight - paddingY
  } L ${points[0].x} ${chartHeight - paddingY} Z`;

  // Max revenue calculation for Revenue chart
  const maxRevenue = Math.max(...MOCK_REVENUE_TRENDS.map((r) => r.revenue), 50000);

  return (
    <div className="space-y-6">
      {/* Row 1: Booking Trends & Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart A: Booking Trends */}
        <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Weekly Booking Trends
                </h3>
                <Badge variant="electric" className="text-[9px] py-0">
                  Daily Volume
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Studio lift bays vs mobile detailing van dispatches
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-electric inline-block" />
                <span>Total</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span>Studio</span>
              </span>
            </div>
          </div>

          {/* Interactive SVG Line Chart */}
          <div className="relative py-2">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-44 overflow-visible"
            >
              <defs>
                <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line
                x1={paddingX}
                y1={paddingY}
                x2={chartWidth - paddingX}
                y2={paddingY}
                stroke="currentColor"
                className="text-border/40"
                strokeDasharray="3 3"
              />
              <line
                x1={paddingX}
                y1={chartHeight / 2}
                x2={chartWidth - paddingX}
                y2={chartHeight / 2}
                stroke="currentColor"
                className="text-border/40"
                strokeDasharray="3 3"
              />
              <line
                x1={paddingX}
                y1={chartHeight - paddingY}
                x2={chartWidth - paddingX}
                y2={chartHeight - paddingY}
                stroke="currentColor"
                className="text-border/80"
              />

              {/* Gradient Area Fill */}
              <path d={areaPath} fill="url(#bookingGradient)" />

              {/* Main Trend Line */}
              <path
                d={linePath}
                fill="none"
                stroke="#00d2ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((pt, i) => (
                <g key={i}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={activeTrendPoint === i ? "6" : "3.5"}
                    fill="#00d2ff"
                    stroke="#000"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setActiveTrendPoint(i)}
                    onMouseLeave={() => setActiveTrendPoint(null)}
                  />
                  {/* Day Label */}
                  <text
                    x={pt.x}
                    y={chartHeight - 4}
                    textAnchor="middle"
                    className="text-[10px] fill-muted-foreground font-mono"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Hover Tooltip overlay */}
            {activeTrendPoint !== null && (
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-card border border-electric/60 shadow-xl text-xs space-y-0.5 animate-in fade-in pointer-events-none"
              >
                <div className="font-bold text-foreground">
                  {points[activeTrendPoint].label}: {points[activeTrendPoint].bookings} Bookings
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Studio: {points[activeTrendPoint].studio} • Mobile Van: {points[activeTrendPoint].mobile}
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1 text-emerald-500 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Saturday peak: 11 vehicle bookings</span>
            </span>
            <span className="font-mono text-[10px]">7-Day Cycle</span>
          </div>
        </div>

        {/* Chart B: Revenue Overview */}
        <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Revenue Trajectory
                </h3>
                <Badge variant="success" className="text-[9px] py-0">
                  Gross GBP (£)
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Monthly gross detailing billing vs monthly target
              </p>
            </div>
            <span className="font-mono text-sm font-black text-electric">
              £42,850 MTD
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
            {MOCK_REVENUE_TRENDS.map((item, idx) => {
              const heightPct = Math.round((item.revenue / maxRevenue) * 100);
              const isHovered = activeRevenueBar === idx;

              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                  onMouseEnter={() => setActiveRevenueBar(idx)}
                  onMouseLeave={() => setActiveRevenueBar(null)}
                >
                  {/* Tooltip value */}
                  <span
                    className={`text-[10px] font-mono font-bold transition-opacity ${
                      isHovered ? "opacity-100 text-electric" : "opacity-0"
                    }`}
                  >
                    £{(item.revenue / 1000).toFixed(1)}k
                  </span>

                  {/* Vertical bar */}
                  <div className="w-full max-w-[42px] h-32 bg-secondary/70 rounded-xl relative overflow-hidden flex items-end">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-xl transition-all duration-300 ${
                        isHovered
                          ? "bg-electric shadow-glow-sm"
                          : "bg-gradient-to-t from-primary/80 to-electric"
                      }`}
                    />
                  </div>

                  <span className="text-[11px] font-mono text-muted-foreground group-hover:text-foreground">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <span>Monthly Target: £40,000</span>
            <span className="text-emerald-500 font-semibold font-mono">
              +18.2% vs Previous Quarter
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Status Distribution, Popular Services & Customer Growth */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart C: Booking Status Distribution */}
        <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <PieChart className="w-3.5 h-3.5 text-electric" />
              <span>Status Distribution</span>
            </h3>
            <span className="text-[10px] text-muted-foreground font-mono">188 Total</span>
          </div>

          {/* Segmented bar */}
          <div className="space-y-3">
            <div className="h-3 w-full rounded-full bg-secondary flex overflow-hidden">
              {MOCK_STATUS_DISTRIBUTION.map((item) => (
                <div
                  key={item.status}
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                  title={`${item.status}: ${item.count} (${item.percentage}%)`}
                  className="h-full hover:opacity-85 transition-opacity"
                />
              ))}
            </div>

            <div className="space-y-2 pt-1">
              {MOCK_STATUS_DISTRIBUTION.map((item) => (
                <div
                  key={item.status}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-foreground">{item.status}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-muted-foreground">{item.count}</span>
                    <span className="font-bold text-foreground">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart D: Popular Services Ranking */}
        <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-electric" />
              <span>Popular Services</span>
            </h3>
            <span className="text-[10px] text-muted-foreground font-mono">By Revenue</span>
          </div>

          <div className="space-y-3">
            {MOCK_POPULAR_SERVICES.map((svc) => (
              <div key={svc.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground truncate max-w-[170px]">
                    {svc.name}
                  </span>
                  <span className="font-mono text-electric font-bold">
                    £{svc.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    style={{ width: `${svc.share * 2}%` }}
                    className="h-full bg-electric rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart E: Customer Growth (New vs Returning) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-electric" />
              <span>Customer Growth</span>
            </h3>
            <span className="text-[10px] text-emerald-500 font-bold">75 Active VIPs</span>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Steady rise in returning recurring clients for maintenance washes & annual ceramic top-ups.
            </p>

            <div className="space-y-2 pt-1">
              {MOCK_CUSTOMER_GROWTH.map((row) => (
                <div
                  key={row.month}
                  className="flex items-center justify-between text-xs py-1 border-b border-border/40 last:border-b-0"
                >
                  <span className="font-mono text-foreground font-bold">
                    {row.month} 2026
                  </span>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-electric">+{row.newCustomers} New</span>
                    <span className="text-emerald-500">
                      {row.returningCustomers} Returning
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
