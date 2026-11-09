"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useVisitorAnalytics } from "../hooks/use-visitor-analytics";
import { AnalyticsKPICards } from "./analytics-kpi-cards";
import { AnalyticsDatePicker } from "./analytics-date-picker";
import { AnalyticsChartsGrid } from "./analytics-charts-grid";
import { AnalyticsGeoSection } from "./analytics-geo-section";
import { LiveVisitorsSection } from "./live-visitors-section";
import { AnalyticsTables } from "./analytics-tables";
import { AnalyticsExportModal } from "./analytics-export-modal";

export function VisitorAnalyticsView() {
  const {
    filter,
    dataset,
    isLoading,
    error,
    liveCount,
    liveVisitors,
    isLiveAutoRefresh,
    setIsLiveAutoRefresh,
    toastMessage,
    setPreset,
    setCustomRange,
    refresh,
    handleExport,
  } = useVisitorAnalytics();

  const [isExportModalOpen, setIsExportModalOpen] = React.useState(false);

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-card border border-amber-500/40 text-amber-400 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <p className="text-xs font-semibold text-foreground">{toastMessage}</p>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              TELEMETRY &amp; CONVERSIONS
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              You Scuff We Buff &bull; Mayfair Studio
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            Visitor Analytics Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time client discovery, acquisition channels, device telemetry, and booking engine conversion funnels.
          </p>
        </div>
      </div>

      {/* Error state if API fails */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-3 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Date Filter Toolbar */}
      <AnalyticsDatePicker
        filter={filter}
        onSelectPreset={setPreset}
        onApplyCustomRange={setCustomRange}
        onRefresh={refresh}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        isAutoRefresh={isLiveAutoRefresh}
        onToggleAutoRefresh={setIsLiveAutoRefresh}
        isLoading={isLoading}
      />

      {/* Section 1: KPI Summary Cards */}
      <AnalyticsKPICards
        summary={dataset.summary}
        liveCount={liveCount}
        isLoading={isLoading}
      />

      {/* Section 2: Interactive Charts Grid */}
      <AnalyticsChartsGrid
        timeline={dataset.timeline}
        newVsReturning={dataset.newVsReturning}
        trafficSources={dataset.trafficSources}
        devices={dataset.devices}
        funnel={dataset.funnel}
      />

      {/* Section 3: Live Active Telemetry Stream */}
      <LiveVisitorsSection
        liveVisitors={liveVisitors}
        liveCount={liveCount}
        isAutoRefresh={isLiveAutoRefresh}
        onToggleAutoRefresh={setIsLiveAutoRefresh}
      />

      {/* Section 4: Geographic Information */}
      <AnalyticsGeoSection geography={dataset.geography} />

      {/* Section 5: Analytics Data Tables (Pages, Sources, Services, Activity) */}
      <AnalyticsTables
        pages={dataset.pages}
        trafficSources={dataset.trafficSources}
        topServices={dataset.topServices}
        activities={dataset.recentActivities}
      />

      {/* Export Report Modal */}
      <AnalyticsExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        filter={filter}
        onExport={handleExport}
      />
    </div>
  );
}
