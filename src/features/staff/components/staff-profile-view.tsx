"use client";

import * as React from "react";
import {
  ShieldCheck,
  Award,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function StaffProfileView() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Header Profile Card */}
      <div className="rounded-3xl bg-gradient-to-br from-charcoal-900 via-card to-charcoal-950 border border-amber-500/30 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-400 flex items-center justify-center font-extrabold text-2xl font-mono shrink-0 shadow-lg shadow-amber-500/10">
            MV
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground font-serif">Marcus Vance</h1>
              <Badge variant="electric" className="text-[10px] font-bold">
                Master Technician
              </Badge>
              <Badge variant="warning" className="text-[10px] font-bold">
                Level 3 Specialist
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Lead Automotive Surface Restoration Engineer • Employee ID: <span className="font-mono text-foreground font-bold">TECH-008</span>
            </p>
            <p className="text-xs text-amber-400 font-mono font-semibold pt-0.5">
              Primary Facility: Studio Bay 1 (Cleanroom & Infrared Bake)
            </p>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-card border border-border/70 shadow-sm">
          <span className="text-xs text-muted-foreground">Completed Transformations</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-foreground">142</p>
          <p className="text-[11px] text-muted-foreground mt-1">Supercars & exotics prepared</p>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border/70 shadow-sm">
          <span className="text-xs text-muted-foreground">Verified Client Rating</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-amber-400">4.98 / 5.0</p>
          <p className="text-[11px] text-muted-foreground mt-1">Based on 98 reviews</p>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border/70 shadow-sm">
          <span className="text-xs text-muted-foreground">Quality Audit Pass Rate</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-emerald-400">99.4%</p>
          <p className="text-[11px] text-muted-foreground mt-1">0 coating warranty defects</p>
        </div>
      </div>

      {/* Certifications & Badges */}
      <div className="p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-3">
          <Award className="w-4 h-4 text-amber-400" />
          Certified Technician Accreditations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            { title: "9H Graphene & Ceramic Accredited Master", issuer: "Gtechniq UK Certified Bay", date: "Verified 2026" },
            { title: "XPEL & SunTek Paint Protection Film Installer", issuer: "Automotive Film Guild", date: "Verified 2026" },
            { title: "Multi-Stage Rotary & Dual-Action Correction", issuer: "Rupes BigFoot Detailing Academy", date: "Verified 2025" },
            { title: "SMART Paint Spot & Micro-Blending Tech", issuer: "IMI Accredited Vehicle Bodywork", date: "Verified 2025" },
          ].map((cert, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-background/60 border border-border/50 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground">{cert.title}</p>
                <p className="text-[11px] text-muted-foreground">{cert.issuer}</p>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop Bay Setup & Logistics */}
      <div className="p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-3">
          <Wrench className="w-4 h-4 text-electric" />
          Dedicated Equipment in Bay 1
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
          <div className="p-3 rounded-xl bg-secondary/40 border border-border/40">
            <span className="font-bold text-foreground block">Lighting Rig</span>
            <span>Scangrip Multi-Spectrum 5000K CRI 96+ Inspection Hex Lamps</span>
          </div>
          <div className="p-3 rounded-xl bg-secondary/40 border border-border/40">
            <span className="font-bold text-foreground block">Bake Technology</span>
            <span>Short-Wave Dual Cassette Infrared Curing Lamps (90°C)</span>
          </div>
          <div className="p-3 rounded-xl bg-secondary/40 border border-border/40">
            <span className="font-bold text-foreground block">Measurement Tools</span>
            <span>PosiTector 200 Ultrasonic Multi-Layer Paint Depth Gauge</span>
          </div>
        </div>
      </div>
    </div>
  );
}
