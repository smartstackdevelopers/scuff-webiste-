"use client";

import * as React from "react";
import { ActivityEvent } from "../types/admin";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Wrench,
  Shield,
  Layers,
} from "lucide-react";
import { useAdmin } from "../hooks/use-admin";

export function ActivityTimeline() {
  const { activities } = useAdmin();
  const [filter, setFilter] = React.useState<string>("all");

  const filteredActivities = activities.filter((act) => {
    if (filter === "all") return true;
    return act.category === filter;
  });

  const getCategoryIcon = (category: ActivityEvent["category"]) => {
    switch (category) {
      case "booking":
        return <Calendar className="w-4 h-4 text-electric" />;
      case "customer":
        return <Users className="w-4 h-4 text-purple-400" />;
      case "service":
        return <Wrench className="w-4 h-4 text-emerald-400" />;
      case "staff":
        return <Shield className="w-4 h-4 text-amber-400" />;
      case "system":
      default:
        return <Layers className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Operations Activity Log
            </h1>
            <Badge variant="outline" className="text-xs font-mono">
              Real-time Audit Trail
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Chronological record of bookings, customer registrations, staff dispatches, and catalog updates.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="p-4 rounded-2xl bg-card border border-border/80 flex items-center gap-1.5 overflow-x-auto">
        {[
          { key: "all", label: "All Activities" },
          { key: "booking", label: "Bookings" },
          { key: "customer", label: "Clients" },
          { key: "service", label: "Services" },
          { key: "staff", label: "Staff & Vans" },
          { key: "system", label: "System & Vault" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
              filter === tab.key
                ? "bg-electric text-black font-bold shadow-glow-sm"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-6">
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
          {filteredActivities.map((act) => (
            <div key={act.id} className="relative group">
              {/* Bullet Icon */}
              <div className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-xl bg-secondary border border-border flex items-center justify-center shadow-sm">
                {getCategoryIcon(act.category)}
              </div>

              {/* Event Content */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-foreground">
                      {act.title}
                    </h3>
                    <Badge variant="secondary" className="text-[9px] uppercase py-0">
                      {act.category}
                    </Badge>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {act.timestamp} ({act.relativeTime})
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {act.description}
                </p>

                {/* Metadata tags & Actor */}
                <div className="pt-1.5 flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="text-muted-foreground">
                    Logged by: <strong className="text-foreground">{act.actorName}</strong> ({act.actorRole})
                  </span>

                  {act.metadata && (
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(act.metadata).map(([k, v]) => (
                        <span
                          key={k}
                          className="px-2 py-0.2 rounded bg-background border border-border/60 font-mono text-[10px] text-electric"
                        >
                          {k}: {v}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
