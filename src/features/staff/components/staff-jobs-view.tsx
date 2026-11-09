"use client";

import * as React from "react";
import Link from "next/link";
import {
  Phone,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_STAFF_JOBS } from "../data/jobs";
import { TechnicianJob, JobStatus } from "../types/staff";

export function StaffJobsView() {
  const [jobs] = React.useState<TechnicianJob[]>(MOCK_STAFF_JOBS);
  const [tab, setTab] = React.useState<"today" | "upcoming">("today");

  const todayJobs = jobs.filter((j) => j.scheduledDate === "Today");
  const upcomingJobs = jobs.filter((j) => j.scheduledDate !== "Today");
  const displayJobs = tab === "today" ? todayJobs : upcomingJobs;

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case "in_progress":
        return <Badge variant="electric" className="text-[10px] animate-pulse">In Bay Detailing</Badge>;
      case "paint_curing":
        return <Badge variant="warning" className="text-[10px]">Infrared Curing</Badge>;
      case "quality_checked":
        return <Badge variant="secondary" className="text-[10px]">QC Inspection</Badge>;
      case "completed":
        return <Badge variant="success" className="text-[10px]">Handover Ready</Badge>;
      case "scheduled":
      default:
        return <Badge variant="outline" className="text-[10px]">Scheduled</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-charcoal-900 via-card to-charcoal-950 border border-amber-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono">
              Lead Technician • Marcus Vance
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground font-serif tracking-tight mt-1">
            Assigned Workshop & Mobile Jobs
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Studio Bay 1 (Cleanroom) • 3 Vehicles Booked Today
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/staff/profile">
            <Button size="sm" variant="outline" className="text-xs h-8">
              My Profile & Bay
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-card rounded-2xl border border-border/70 select-none">
        <button
          onClick={() => setTab("today")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            tab === "today"
              ? "bg-amber-500 text-zinc-950 shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Today&apos;s Jobs ({todayJobs.length})
        </button>
        <button
          onClick={() => setTab("upcoming")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            tab === "upcoming"
              ? "bg-amber-500 text-zinc-950 shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Upcoming Schedule ({upcomingJobs.length})
        </button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {displayJobs.map((job) => {
          const completedTasks = job.checklist.filter((c) => c.completed).length;
          const totalTasks = job.checklist.length;
          const progressPct = Math.round((completedTasks / (totalTasks || 1)) * 100);

          return (
            <div
              key={job.id}
              className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6 space-y-4 hover:border-amber-500/40 transition-all shadow-md relative overflow-hidden"
            >
              {/* Top Row: Ref & Status */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 text-xs">
                      {job.jobReference}
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {job.scheduledTime} ({job.estimatedDuration})
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-foreground font-serif mt-1">
                    {job.vehicleMake} {job.vehicleModel}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono font-bold text-[11px] border border-amber-500/30">
                      {job.vehicleRegistration}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {job.vehicleColour}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  {getStatusBadge(job.status)}
                  <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                    {job.bayNumber}
                  </p>
                </div>
              </div>

              {/* Service description */}
              <p className="text-xs font-medium text-foreground/90 bg-background/50 p-3 rounded-2xl border border-border/40">
                {job.serviceName}
              </p>

              {/* Checklist Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground font-semibold">
                    Detailing Checklist: {completedTasks}/{totalTasks} steps completed
                  </span>
                  <span className="font-mono font-bold text-amber-400">{progressPct}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-secondary/80 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Customer quick phone & Link to details */}
              <div className="pt-2 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-muted-foreground">Owner: <strong className="text-foreground">{job.customerName}</strong></span>
                  <a
                    href={`tel:${job.customerPhone}`}
                    className="p-1.5 rounded-lg bg-secondary/70 hover:bg-secondary text-emerald-400 flex items-center gap-1 font-mono text-[11px]"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Client</span>
                  </a>
                </div>

                <Link href={`/staff/jobs/${job.id}`}>
                  <Button size="sm" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs gap-1.5">
                    <span>Manage Job & Photos</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
