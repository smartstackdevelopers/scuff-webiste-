"use client";

import * as React from "react";
import {
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  Globe2,
  Compass,
} from "lucide-react";
import { GeographicStat } from "../types/analytics";

interface AnalyticsGeoSectionProps {
  geography: GeographicStat[];
}

export function AnalyticsGeoSection({ geography }: AnalyticsGeoSectionProps) {
  const [filterRegion, setFilterRegion] = React.useState<string>("all");

  const regions = [
    { id: "all", label: "All Territories" },
    { id: "England", label: "England" },
    { id: "Scotland", label: "Scotland" },
    { id: "Middle East", label: "UAE (Supercars)" },
    { id: "Europe", label: "Monaco" },
  ];

  const filteredGeo = React.useMemo(() => {
    if (filterRegion === "all") return geography;
    return geography.filter((g) => g.region === filterRegion);
  }, [geography, filterRegion]);

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

  return (
    <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-amber-400" />
              Visitor Geographic Distribution
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              High-Net-Worth Corridors
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Territories and metropolitan areas generating high-intent supercar and detailing inquiries.
          </p>
        </div>

        {/* Region filter pills */}
        <div className="flex items-center flex-wrap gap-1 bg-secondary/80 p-1 rounded-xl border border-border text-xs">
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => setFilterRegion(r.id)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterRegion === r.id
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Territorial Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredGeo.map((loc) => (
          <div
            key={loc.id}
            className="p-4 rounded-xl bg-secondary/40 border border-border/70 hover:border-amber-500/30 transition-colors flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {loc.country}
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {loc.percentage}% share
                </span>
              </div>
              <p className="text-xs font-semibold text-foreground">{loc.city}</p>
              {loc.region && (
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono mt-0.5">
                  Region: {loc.region}
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-muted-foreground text-[10px] block">Visitors</span>
                <strong className="text-foreground">{loc.visitors.toLocaleString()}</strong>
              </div>

              <div className="text-right">
                <span className="text-muted-foreground text-[10px] block">Top Device</span>
                <span className="inline-flex items-center gap-1 text-foreground capitalize">
                  {getDeviceIcon(loc.topDevice)}
                  {loc.topDevice}
                </span>
              </div>

              <div className="text-right">
                <span className="text-muted-foreground text-[10px] block">Booking Conv.</span>
                <span className="text-emerald-400 font-bold">{loc.conversionRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          Primary physical studio facility: 14 Berkeley Square, Mayfair, London W1J 6BD
        </span>
        <span className="font-mono text-foreground font-semibold">
          Coverage: Mobile detailing vans service within 35 miles of M25
        </span>
      </div>
    </div>
  );
}
