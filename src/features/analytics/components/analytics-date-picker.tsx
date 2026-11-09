"use client";

import * as React from "react";
import {
  Calendar as CalendarIcon,
  RotateCw,
  Download,
  Check,
} from "lucide-react";
import { DateRangeFilter, DateRangePreset } from "../types/analytics";

interface AnalyticsDatePickerProps {
  filter: DateRangeFilter;
  onSelectPreset: (preset: DateRangePreset) => void;
  onApplyCustomRange: (start: string, end: string) => void;
  onRefresh: () => void;
  onOpenExportModal: () => void;
  isAutoRefresh: boolean;
  onToggleAutoRefresh: (val: boolean) => void;
  isLoading?: boolean;
}

export function AnalyticsDatePicker({
  filter,
  onSelectPreset,
  onApplyCustomRange,
  onRefresh,
  onOpenExportModal,
  isAutoRefresh,
  onToggleAutoRefresh,
  isLoading = false,
}: AnalyticsDatePickerProps) {
  const [isCustomOpen, setIsCustomOpen] = React.useState(false);
  const [customStart, setCustomStart] = React.useState(
    new Date(Date.now() - 14 * 86400000).toISOString().split("T")[0]
  );
  const [customEnd, setCustomEnd] = React.useState(
    new Date().toISOString().split("T")[0]
  );

  const presets: { id: DateRangePreset; label: string }[] = [
    { id: "today", label: "Today" },
    { id: "7d", label: "Last 7 Days" },
    { id: "30d", label: "Last 30 Days" },
    { id: "custom", label: "Custom Range" },
  ];

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customStart && customEnd) {
      onApplyCustomRange(customStart, customEnd);
      setIsCustomOpen(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 backdrop-blur-md p-3.5 rounded-2xl border border-border/80">
      {/* Preset Pill Selector */}
      <div className="flex items-center flex-wrap gap-1.5">
        {presets.map((p) => {
          const isActive = filter.preset === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                if (p.id === "custom") {
                  setIsCustomOpen(true);
                } else {
                  onSelectPreset(p.id);
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20 font-bold"
                  : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/40"
              }`}
            >
              {p.label}
            </button>
          );
        })}

        {filter.preset === "custom" && (
          <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 ml-1">
            {filter.startDate} &rarr; {filter.endDate}
          </span>
        )}
      </div>

      {/* Right controls: Live Ticker, Refresh, Export */}
      <div className="flex items-center flex-wrap gap-2.5">
        {/* Live Sync Toggle */}
        <button
          onClick={() => onToggleAutoRefresh(!isAutoRefresh)}
          title="Toggle live telemetry stream"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
            isAutoRefresh
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : "bg-secondary text-muted-foreground border-border hover:text-foreground"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isAutoRefresh ? "bg-emerald-400 animate-pulse" : "bg-zinc-500"
            }`}
          />
          <span className="hidden sm:inline">Live Telemetry:</span>
          <span className="font-bold">{isAutoRefresh ? "ON" : "OFF"}</span>
        </button>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh analytics data"
          className="p-2 rounded-xl bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/60 transition-colors disabled:opacity-50"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-amber-400" : ""}`} />
        </button>

        {/* Export Reports Button */}
        <button
          onClick={onOpenExportModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Custom Date Modal */}
      {isCustomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card border border-border rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <h3 className="text-base font-bold text-foreground mb-1 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-amber-400" />
              Select Custom Date Window
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Filter telemetry and conversion metrics across a specific date interval.
            </p>

            <form onSubmit={handleApplyCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="w-full px-3 py-2 bg-secondary/60 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="w-full px-3 py-2 bg-secondary/60 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsCustomOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all"
                >
                  <Check className="w-3.5 h-3.5" />
                  Apply Filter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
