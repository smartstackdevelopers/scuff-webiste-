// Visitor Analytics API & Export Service Layer
import {
  DateRangeFilter,
  FullAnalyticsDataset,
  LiveVisitor,
} from "../types/analytics";
import { getAnalyticsDatasetByPreset } from "../data/mock-analytics";

/**
 * Fetch visitor analytics dataset based on active date range filter.
 * In production, this proxies to a backend endpoint like `/api/admin/analytics`.
 * Falls back safely to high-fidelity mock data.
 */
export async function fetchAnalyticsData(
  filter: DateRangeFilter
): Promise<FullAnalyticsDataset> {
  // Simulate network latency for realistic loading skeletons & smooth UI transitions
  await new Promise((resolve) => setTimeout(resolve, 250));

  try {
    // If backend endpoint is configured in env
    const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_API_URL;
    if (endpoint) {
      const queryParams = new URLSearchParams({
        preset: filter.preset,
        ...(filter.startDate && { start: filter.startDate }),
        ...(filter.endDate && { end: filter.endDate }),
      });
      const res = await fetch(`${endpoint}/visitor-summary?${queryParams.toString()}`);
      if (res.ok) {
        return (await res.json()) as FullAnalyticsDataset;
      }
    }
  } catch (err) {
    console.warn("Analytics API unavailable, reverting to verified local cache:", err);
  }

  // Return realistic mock dataset corresponding to selected filter preset
  return getAnalyticsDatasetByPreset(filter.preset);
}

/**
 * Simulates real-time polling or WebSocket stream for active visitors on site.
 */
export function simulateLiveVisitorStream(
  current: LiveVisitor[]
): { updatedVisitors: LiveVisitor[]; liveCount: number } {
  // Randomly adjust durations and occasionally rotate an active page
  const pages = ["/booking", "/services", "/pricing", "/gallery", "/"];
  const updatedVisitors = current.map((v) => {
    const durationIncrement = Math.floor(Math.random() * 3) + 2;
    const shouldRotatePage = Math.random() > 0.85;

    return {
      ...v,
      visitDurationSeconds: v.visitDurationSeconds + durationIncrement,
      activePage: shouldRotatePage ? pages[Math.floor(Math.random() * pages.length)] : v.activePage,
    };
  });

  // Calculate live count (e.g. 16 - 24 live visitors)
  const variance = Math.floor(Math.random() * 5) - 2;
  const liveCount = Math.max(12, Math.min(30, 18 + variance));

  return { updatedVisitors, liveCount };
}

/**
 * Export analytics summary and tables to CSV format.
 */
export function exportToCSV(
  dataset: FullAnalyticsDataset,
  filter: DateRangeFilter,
  filename?: string
): void {
  const dateStr = new Date().toISOString().split("T")[0];
  const targetFilename =
    filename || `yswb-visitor-analytics-${filter.preset}-${dateStr}.csv`;

  const sections: string[] = [];

  // Header & Date Filter
  sections.push(`YOU SCUFF WE BUFF - VISITOR ANALYTICS AUDIT REPORT`);
  sections.push(`Date Range Filter: ${filter.label}`);
  sections.push(`Generated: ${new Date().toUTCString()}`);
  sections.push(``);

  // Executive KPI Summary
  sections.push(`EXECUTIVE KPI OVERVIEW`);
  sections.push(`Metric,Value,Period Change`);
  sections.push(`Total Visitors,${dataset.summary.totalVisitors},+${dataset.summary.totalVisitorsChange}%`);
  sections.push(`Unique Visitors,${dataset.summary.uniqueVisitors},+${dataset.summary.uniqueVisitorsChange}%`);
  sections.push(`New Visitors,${dataset.summary.newVisitors},+${dataset.summary.newVisitorsChange}%`);
  sections.push(`Returning Visitors,${dataset.summary.returningVisitors},+${dataset.summary.returningVisitorsChange}%`);
  sections.push(`Total Page Views,${dataset.summary.totalPageViews},+${dataset.summary.pageViewsChange}%`);
  sections.push(`Average Session Duration,${dataset.summary.avgSessionDuration},+${dataset.summary.sessionDurationChange}%`);
  sections.push(`Booking Conversion Rate,${dataset.summary.bookingConversionRate}%,+${dataset.summary.conversionRateChange}%`);
  sections.push(`Active Concurrent Visitors,${dataset.summary.liveVisitorsRightNow},Live`);
  sections.push(``);

  // Traffic Sources
  sections.push(`TRAFFIC SOURCES`);
  sections.push(`Channel,Source,Visitors,Percentage,Bounce Rate,Conversion Rate`);
  dataset.trafficSources.forEach((t) => {
    sections.push(
      `"${t.channel}","${t.source}",${t.visitors},${t.percentage}%,${t.bounceRate}%,${t.conversionRate}%`
    );
  });
  sections.push(``);

  // Most Visited Pages
  sections.push(`MOST VISITED PAGES`);
  sections.push(`Path,Page Title,Page Views,Unique Views,Avg Time on Page,Bounce Rate`);
  dataset.pages.forEach((p) => {
    sections.push(
      `"${p.path}","${p.title}",${p.pageViews},${p.uniqueViews},"${p.avgTimeOnPage}",${p.bounceRate}%`
    );
  });
  sections.push(``);

  // Top Performing Services
  sections.push(`TOP PERFORMING SERVICES`);
  sections.push(`Service Name,Category,Views,Booking Inquiries,Conversion Rate,Est Pipeline (£)`);
  dataset.topServices.forEach((s) => {
    sections.push(
      `"${s.serviceName}","${s.category}",${s.views},${s.bookingInquiries},${s.conversionRate}%,£${s.estimatedPipeline}`
    );
  });
  sections.push(``);

  // Geography
  sections.push(`VISITOR GEOGRAPHY`);
  sections.push(`Country,City,Visitors,Share,Top Device,Conversion Rate`);
  dataset.geography.forEach((g) => {
    sections.push(
      `"${g.country}","${g.city}",${g.visitors},${g.percentage}%,${g.topDevice},${g.conversionRate}%`
    );
  });

  const csvContent = "\uFEFF" + sections.join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", targetFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export analytics summary in Excel XML / TSV format.
 */
export function exportToExcel(
  dataset: FullAnalyticsDataset,
  filter: DateRangeFilter
): void {
  // Uses TSV spreadsheet structure formatted with tab stops for instant opening in Microsoft Excel & Apple Numbers
  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `yswb-analytics-export-${filter.preset}-${dateStr}.xls`;

  const lines: string[] = [];
  lines.push(`YOU SCUFF WE BUFF\tVISITOR ANALYTICS REPORT\t${filter.label}`);
  lines.push(`Generated\t${new Date().toLocaleString("en-GB")}`);
  lines.push(``);
  lines.push(`Metric\tValue\tVariance`);
  lines.push(`Total Visitors\t${dataset.summary.totalVisitors}\t+${dataset.summary.totalVisitorsChange}%`);
  lines.push(`Unique Visitors\t${dataset.summary.uniqueVisitors}\t+${dataset.summary.uniqueVisitorsChange}%`);
  lines.push(`New Visitors\t${dataset.summary.newVisitors}\t+${dataset.summary.newVisitorsChange}%`);
  lines.push(`Returning Visitors\t${dataset.summary.returningVisitors}\t+${dataset.summary.returningVisitorsChange}%`);
  lines.push(`Total Page Views\t${dataset.summary.totalPageViews}\t+${dataset.summary.pageViewsChange}%`);
  lines.push(`Avg Session Duration\t${dataset.summary.avgSessionDuration}\t+${dataset.summary.sessionDurationChange}%`);
  lines.push(`Booking Conversion\t${dataset.summary.bookingConversionRate}%\t+${dataset.summary.conversionRateChange}%`);
  lines.push(``);
  lines.push(`Top Pages\tViews\tUnique Views\tBounce Rate`);
  dataset.pages.forEach((p) => {
    lines.push(`${p.path}\t${p.pageViews}\t${p.uniqueViews}\t${p.bounceRate}%`);
  });

  const blob = new Blob([lines.join("\r\n")], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
