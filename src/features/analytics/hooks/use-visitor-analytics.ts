"use client";

import * as React from "react";
import {
  DateRangeFilter,
  DateRangePreset,
  FullAnalyticsDataset,
  LiveVisitor,
} from "../types/analytics";
import {
  exportToCSV,
  exportToExcel,
  fetchAnalyticsData,
  simulateLiveVisitorStream,
} from "../services/analytics-api";
import { getAnalyticsDatasetByPreset } from "../data/mock-analytics";

export function useVisitorAnalytics() {
  const [filter, setFilter] = React.useState<DateRangeFilter>({
    preset: "30d",
    label: "Last 30 Days",
  });

  const [dataset, setDataset] = React.useState<FullAnalyticsDataset>(() =>
    getAnalyticsDatasetByPreset("30d")
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  // Live Visitors Streaming State
  const [liveVisitors, setLiveVisitors] = React.useState<LiveVisitor[]>(
    dataset.liveVisitors
  );
  const [liveCount, setLiveCount] = React.useState<number>(
    dataset.summary.liveVisitorsRightNow
  );
  const [isLiveAutoRefresh, setIsLiveAutoRefresh] = React.useState<boolean>(true);

  // Toast notification state
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Load data when filter changes
  const loadData = React.useCallback(async (activeFilter: DateRangeFilter) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAnalyticsData(activeFilter);
      setDataset(data);
      setLiveVisitors(data.liveVisitors);
      setLiveCount(data.summary.liveVisitorsRightNow);
    } catch (err) {
      console.error("Failed to load analytics dataset:", err);
      setError("Unable to load latest visitor analytics. Showing cached insights.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData(filter);
  }, [filter, loadData]);

  // Live Visitors simulation ticker (every 4 seconds when auto-refresh enabled)
  React.useEffect(() => {
    if (!isLiveAutoRefresh) return;

    const interval = setInterval(() => {
      setLiveVisitors((prev) => {
        const { updatedVisitors, liveCount: nextCount } = simulateLiveVisitorStream(prev);
        setLiveCount(nextCount);
        return updatedVisitors;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isLiveAutoRefresh]);

  // Handler for preset date ranges
  const setPreset = (preset: DateRangePreset) => {
    const labels: Record<DateRangePreset, string> = {
      today: "Today (Live)",
      "7d": "Last 7 Days",
      "30d": "Last 30 Days",
      custom: "Custom Range",
    };

    setFilter({
      preset,
      label: labels[preset],
    });
    showToast(`Filtering insights: ${labels[preset]}`);
  };

  // Handler for custom date range
  const setCustomRange = (startDate: string, endDate: string) => {
    setFilter({
      preset: "custom",
      startDate,
      endDate,
      label: `${startDate} to ${endDate}`,
    });
    showToast(`Custom range applied: ${startDate} to ${endDate}`);
  };

  // Refresh handler
  const refresh = () => {
    showToast("Synchronizing visitor metrics & live stream...");
    loadData(filter);
  };

  // Export handlers
  const handleExport = (format: "csv" | "excel" | "pdf") => {
    if (format === "csv") {
      exportToCSV(dataset, filter);
      showToast(`Exported ${filter.label} Visitor Analytics to CSV`);
    } else if (format === "excel") {
      exportToExcel(dataset, filter);
      showToast(`Exported ${filter.label} Visitor Analytics to Excel (.xls)`);
    } else if (format === "pdf") {
      window.print();
    }
  };

  return {
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
    showToast,
  };
}
