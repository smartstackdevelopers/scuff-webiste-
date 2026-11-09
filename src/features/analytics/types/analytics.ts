// Visitor Analytics Data Model & Type Definitions

export type DateRangePreset = "today" | "7d" | "30d" | "custom";

export interface DateRangeFilter {
  preset: DateRangePreset;
  startDate?: string;
  endDate?: string;
  label: string;
}

export interface VisitorKPISummary {
  totalVisitors: number;
  totalVisitorsChange: number; // percentage, e.g. +14.2
  uniqueVisitors: number;
  uniqueVisitorsChange: number;
  newVisitors: number;
  newVisitorsChange: number;
  returningVisitors: number;
  returningVisitorsChange: number;
  totalPageViews: number;
  pageViewsChange: number;
  avgSessionDuration: string; // e.g. "3m 42s"
  avgSessionDurationSeconds: number;
  sessionDurationChange: number;
  bookingConversionRate: number; // e.g. 8.4%
  conversionRateChange: number;
  liveVisitorsRightNow: number;
}

export interface VisitorTimelinePoint {
  date: string;
  label: string;
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
}

export interface NewVsReturningPoint {
  date: string;
  label: string;
  newVisitors: number;
  returningVisitors: number;
}

export interface TrafficSourceStat {
  id: string;
  source: string;
  channel: "Organic Search" | "Paid Search" | "Social Media" | "Direct" | "Referral";
  visitors: number;
  percentage: number;
  bounceRate: number;
  avgDuration: string;
  conversionRate: number;
  change: number;
}

export interface DeviceDistribution {
  device: "mobile" | "desktop" | "tablet";
  label: string;
  visitors: number;
  percentage: number;
  bounceRate: number;
  avgDuration: string;
}

export interface PageVisitStat {
  id: string;
  path: string;
  title: string;
  pageViews: number;
  uniqueViews: number;
  avgTimeOnPage: string;
  bounceRate: number;
  exitRate: number;
}

export interface TopServiceStat {
  id: string;
  serviceName: string;
  category: string;
  views: number;
  bookingInquiries: number;
  conversionRate: number;
  estimatedPipeline: number;
}

export interface FunnelStep {
  step: string;
  description: string;
  count: number;
  percentage: number;
  dropoffPercentage: number;
}

export interface GeographicStat {
  id: string;
  country: string;
  countryCode: string;
  city: string;
  region?: string;
  visitors: number;
  percentage: number;
  topDevice: "mobile" | "desktop" | "tablet";
  conversionRate: number;
}

export interface LiveVisitor {
  id: string;
  ipMasked: string;
  activePage: string;
  pageTitle: string;
  device: "mobile" | "desktop" | "tablet";
  browser: string;
  trafficSource: string;
  location: string;
  countryCode: string;
  visitDurationSeconds: number;
  isBookingFunnel: boolean;
  startedAt: string;
}

export interface VisitorActivityEvent {
  id: string;
  timestamp: string;
  visitorId: string;
  eventType: "page_view" | "booking_started" | "quote_requested" | "cta_click" | "booking_completed";
  eventLabel: string;
  page: string;
  device: "mobile" | "desktop" | "tablet";
  location: string;
}

export interface FullAnalyticsDataset {
  summary: VisitorKPISummary;
  timeline: VisitorTimelinePoint[];
  newVsReturning: NewVsReturningPoint[];
  trafficSources: TrafficSourceStat[];
  devices: DeviceDistribution[];
  pages: PageVisitStat[];
  topServices: TopServiceStat[];
  funnel: FunnelStep[];
  geography: GeographicStat[];
  liveVisitors: LiveVisitor[];
  recentActivities: VisitorActivityEvent[];
}
