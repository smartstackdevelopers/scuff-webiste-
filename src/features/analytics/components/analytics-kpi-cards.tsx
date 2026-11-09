"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  UserPlus,
  RotateCcw,
  Eye,
  Clock,
  Sparkles,
  Radio,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { VisitorKPISummary } from "../types/analytics";

interface AnalyticsKPICardsProps {
  summary: VisitorKPISummary;
  liveCount: number;
  isLoading?: boolean;
}

// Animated number counter component
function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 600; // ms
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

  return <span>{displayValue.toLocaleString()}</span>;
}

export function AnalyticsKPICards({
  summary,
  liveCount,
  isLoading = false,
}: AnalyticsKPICardsProps) {
  const cards = [
    {
      title: "Total Visitors",
      value: <AnimatedCounter value={summary.totalVisitors} />,
      rawValue: summary.totalVisitors,
      change: summary.totalVisitorsChange,
      changeText: "vs prior period",
      icon: Users,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Unique Visitors",
      value: <AnimatedCounter value={summary.uniqueVisitors} />,
      rawValue: summary.uniqueVisitors,
      change: summary.uniqueVisitorsChange,
      changeText: "distinct clients",
      icon: UserCheck,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "New Visitors",
      value: <AnimatedCounter value={summary.newVisitors} />,
      rawValue: summary.newVisitors,
      change: summary.newVisitorsChange,
      changeText: "first-time discovery",
      icon: UserPlus,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Returning Visitors",
      value: <AnimatedCounter value={summary.returningVisitors} />,
      rawValue: summary.returningVisitors,
      change: summary.returningVisitorsChange,
      changeText: "repeat client loyalty",
      icon: RotateCcw,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Total Page Views",
      value: <AnimatedCounter value={summary.totalPageViews} />,
      rawValue: summary.totalPageViews,
      change: summary.pageViewsChange,
      changeText: "screens examined",
      icon: Eye,
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      title: "Avg Session Duration",
      value: <span>{summary.avgSessionDuration}</span>,
      change: summary.sessionDurationChange,
      changeText: "engagement depth",
      icon: Clock,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: "Booking Conversion Rate",
      value: <span>{summary.bookingConversionRate}%</span>,
      change: summary.conversionRateChange,
      changeText: "appointment conversions",
      icon: Sparkles,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Live Visitors Right Now",
      value: (
        <span className="flex items-center gap-2 text-emerald-400">
          <AnimatedCounter value={liveCount} />
          <span className="text-xs font-normal text-emerald-400/80 uppercase tracking-widest font-mono">
            LIVE
          </span>
        </span>
      ),
      isLive: true,
      changeText: "active browsing sessions",
      icon: Radio,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isPositive = (card.change ?? 0) >= 0;

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.04 }}
            className={`p-5 rounded-2xl bg-card border border-border/80 relative overflow-hidden transition-all hover:border-amber-500/30 shadow-sm ${
              isLoading ? "opacity-60" : "opacity-100"
            }`}
          >
            {/* Top row: title & icon */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground truncate">
                {card.title}
              </span>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center border ${card.color} ${
                  card.isLive ? "relative" : ""
                }`}
              >
                {card.isLive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                )}
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Metric Value */}
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black font-mono text-foreground tracking-tight">
                {card.value}
              </div>
            </div>

            {/* Bottom row: Trend badge or Live status */}
            <div className="mt-2.5 flex items-center justify-between text-xs">
              {card.change !== undefined ? (
                <div className="flex items-center gap-1 font-semibold">
                  <span
                    className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                      isPositive
                        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                        : "text-rose-400 bg-rose-500/10 border border-rose-500/20"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {isPositive ? `+${card.change}%` : `${card.change}%`}
                  </span>
                  <span className="text-[11px] text-muted-foreground ml-1 truncate">
                    {card.changeText}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-time concurrency</span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
