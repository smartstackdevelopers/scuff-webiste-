"use client";

import * as React from "react";
import {
  FileText,
  Globe,
  Wrench,
  Activity,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle2,
} from "lucide-react";
import {
  PageVisitStat,
  TopServiceStat,
  TrafficSourceStat,
  VisitorActivityEvent,
} from "../types/analytics";

interface AnalyticsTablesProps {
  pages: PageVisitStat[];
  trafficSources: TrafficSourceStat[];
  topServices: TopServiceStat[];
  activities: VisitorActivityEvent[];
}

type ActiveTableTab = "pages" | "sources" | "services" | "activity";

export function AnalyticsTables({
  pages,
  trafficSources,
  topServices,
  activities,
}: AnalyticsTablesProps) {
  const [activeTab, setActiveTab] = React.useState<ActiveTableTab>("pages");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  // Reset pagination when tab or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  // Tab definitions
  const tabs = [
    { id: "pages" as const, label: "Most Visited Pages", icon: FileText, count: pages.length },
    { id: "sources" as const, label: "Top Traffic Sources", icon: Globe, count: trafficSources.length },
    { id: "services" as const, label: "Top Performing Services", icon: Wrench, count: topServices.length },
    { id: "activity" as const, label: "Recent Visitor Activity", icon: Activity, count: activities.length },
  ];

  // Filtered Pages
  const filteredPages = React.useMemo(() => {
    return pages.filter(
      (p) =>
        p.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pages, searchQuery]);

  // Filtered Sources
  const filteredSources = React.useMemo(() => {
    return trafficSources.filter(
      (s) =>
        s.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.channel.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [trafficSources, searchQuery]);

  // Filtered Services
  const filteredServices = React.useMemo(() => {
    return topServices.filter(
      (s) =>
        s.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [topServices, searchQuery]);

  // Filtered Activities
  const filteredActivities = React.useMemo(() => {
    return activities.filter(
      (a) =>
        a.eventLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.page.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activities, searchQuery]);

  // Get current active count
  const currentTotal =
    activeTab === "pages"
      ? filteredPages.length
      : activeTab === "sources"
      ? filteredSources.length
      : activeTab === "services"
      ? filteredServices.length
      : filteredActivities.length;

  const totalPages = Math.max(1, Math.ceil(currentTotal / itemsPerPage));

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

  const getEventBadge = (type: VisitorActivityEvent["eventType"]) => {
    switch (type) {
      case "booking_completed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            Deposit Paid
          </span>
        );
      case "booking_started":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-3 h-3" />
            Booking Started
          </span>
        );
      case "quote_requested":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
            Quote Request
          </span>
        );
      case "cta_click":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30">
            Showcase Click
          </span>
        );
      case "page_view":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-secondary text-muted-foreground border border-border">
            Screen View
          </span>
        );
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-6">
      {/* Tab Switcher & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="flex items-center flex-wrap gap-1.5 bg-secondary/60 p-1.5 rounded-2xl border border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? "bg-zinc-950 text-amber-300" : "bg-card border border-border"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Real-time Search Filter */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search records in active table..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-secondary/50 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="rounded-xl border border-border/80 overflow-hidden bg-card/40">
        <div className="overflow-x-auto">
          {/* TAB 1: MOST VISITED PAGES */}
          {activeTab === "pages" && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/80 bg-secondary/50 font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="py-3 px-4">Page Path &amp; Title</th>
                  <th className="py-3 px-4 text-right">Page Views</th>
                  <th className="py-3 px-4 text-right">Unique Views</th>
                  <th className="py-3 px-4 text-center">Avg Time on Page</th>
                  <th className="py-3 px-4 text-right">Bounce Rate</th>
                  <th className="py-3 px-4 text-right">Exit Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredPages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No matching pages found for query &quot;{searchQuery}&quot;.
                    </td>
                  </tr>
                ) : (
                  filteredPages
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <p className="font-mono font-bold text-foreground text-xs">{p.path}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{p.title}</p>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-400">
                          {p.pageViews.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-foreground">
                          {p.uniqueViews.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono text-foreground">
                          {p.avgTimeOnPage}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-muted-foreground">
                          {p.bounceRate}%
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-muted-foreground">
                          {p.exitRate}%
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          )}

          {/* TAB 2: TOP TRAFFIC SOURCES */}
          {activeTab === "sources" && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/80 bg-secondary/50 font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="py-3 px-4">Source &amp; Acquisition Channel</th>
                  <th className="py-3 px-4 text-right">Total Visitors</th>
                  <th className="py-3 px-4 text-right">Traffic Share</th>
                  <th className="py-3 px-4 text-right">Bounce Rate</th>
                  <th className="py-3 px-4 text-center">Avg Session Duration</th>
                  <th className="py-3 px-4 text-right">Booking Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredSources.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No traffic sources matching query.
                    </td>
                  </tr>
                ) : (
                  filteredSources
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((s) => (
                      <tr key={s.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-foreground">{s.source}</p>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">
                            Channel: {s.channel}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-foreground">
                          {s.visitors.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-400">
                          {s.percentage}%
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-muted-foreground">
                          {s.bounceRate}%
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono text-foreground">
                          {s.avgDuration}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-extrabold text-emerald-400">
                          {s.conversionRate}%
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          )}

          {/* TAB 3: TOP PERFORMING SERVICES */}
          {activeTab === "services" && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/80 bg-secondary/50 font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="py-3 px-4">Service Package</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Package Views</th>
                  <th className="py-3 px-4 text-right">Booking Inquiries</th>
                  <th className="py-3 px-4 text-right">Inquiry Conversion</th>
                  <th className="py-3 px-4 text-right">Est Pipeline Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No matching services found.
                    </td>
                  </tr>
                ) : (
                  filteredServices
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((srv) => (
                      <tr key={srv.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-foreground">{srv.serviceName}</td>
                        <td className="py-3.5 px-4 text-muted-foreground">{srv.category}</td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-foreground">
                          {srv.views.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-400">
                          {srv.bookingInquiries.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-extrabold text-emerald-400">
                          {srv.conversionRate}%
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-foreground">
                          £{srv.estimatedPipeline.toLocaleString()}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          )}

          {/* TAB 4: RECENT VISITOR ACTIVITY FEED */}
          {activeTab === "activity" && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/80 bg-secondary/50 font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Action Event</th>
                  <th className="py-3 px-4">Page / Endpoint</th>
                  <th className="py-3 px-4">Device</th>
                  <th className="py-3 px-4">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredActivities.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No activity events found for query.
                    </td>
                  </tr>
                ) : (
                  filteredActivities
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((act) => (
                      <tr key={act.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-muted-foreground whitespace-nowrap">
                          {act.timestamp}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            {getEventBadge(act.eventType)}
                            <span className="font-semibold text-foreground">{act.eventLabel}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-muted-foreground">{act.page}</td>
                        <td className="py-3.5 px-4 capitalize">
                          <span className="inline-flex items-center gap-1.5 text-foreground">
                            {getDeviceIcon(act.device)}
                            {act.device}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-foreground">{act.location}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Toolbar */}
        <div className="p-3.5 border-t border-border bg-secondary/30 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing page <strong className="text-foreground">{currentPage}</strong> of{" "}
            <strong className="text-foreground">{totalPages}</strong> ({currentTotal} records)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg bg-card border border-border text-foreground hover:bg-secondary disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg bg-card border border-border text-foreground hover:bg-secondary disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
