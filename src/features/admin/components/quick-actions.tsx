"use client";

import * as React from "react";
import Link from "next/link";
import {
  CalendarPlus,
  UserPlus,
  PlusCircle,
  ShieldPlus,
  CalendarDays,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react";

export function QuickActions() {
  const [reportGenerated, setReportGenerated] = React.useState(false);

  const handleGenerateReport = () => {
    setReportGenerated(true);
    setTimeout(() => {
      setReportGenerated(false);
      // Simulate file download
      const element = document.createElement("a");
      const file = new Blob([
        `YOU SCUFF WE BUFF - OPERATIONS PERFORMANCE REPORT\nGenerated: ${new Date().toLocaleString()}\nEnvironment: Demo Studio Operations\nTotal MTD Bookings: 148\nGross Revenue: £42,850\nStudio Utilization: 88.4%\nStaff Active: 5 Specialists\nVerified by Master Supervisor.`
      ], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `YSWB_Report_${new Date().toISOString().split("T")[0]}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
      <div className="pb-3 border-b border-border/60">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
          Quick Operations Actions
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          One-click shortcuts to schedule, register, and generate reports
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <Link
          href="/admin/bookings"
          className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/60 hover:border-electric/50 transition-all flex flex-col items-center justify-center text-center gap-1.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-electric/10 text-electric flex items-center justify-center group-hover:scale-110 transition-transform">
            <CalendarPlus className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-foreground">
            New Booking
          </span>
        </Link>

        <Link
          href="/admin/customers"
          className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/60 hover:border-electric/50 transition-all flex flex-col items-center justify-center text-center gap-1.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <UserPlus className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-foreground">
            Add Client
          </span>
        </Link>

        <Link
          href="/admin/services"
          className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/60 hover:border-electric/50 transition-all flex flex-col items-center justify-center text-center gap-1.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <PlusCircle className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-foreground">
            Add Service
          </span>
        </Link>

        <Link
          href="/admin/staff"
          className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/60 hover:border-electric/50 transition-all flex flex-col items-center justify-center text-center gap-1.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldPlus className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-foreground">
            Add Staff
          </span>
        </Link>

        <Link
          href="/admin/calendar"
          className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/60 hover:border-electric/50 transition-all flex flex-col items-center justify-center text-center gap-1.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <CalendarDays className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-foreground">
            Calendar
          </span>
        </Link>

        <button
          type="button"
          onClick={handleGenerateReport}
          className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/60 hover:border-electric/50 transition-all flex flex-col items-center justify-center text-center gap-1.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            {reportGenerated ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <FileSpreadsheet className="w-4 h-4" />
            )}
          </div>
          <span className="text-[11px] font-bold text-foreground">
            {reportGenerated ? "Exporting..." : "Export KPI"}
          </span>
        </button>
      </div>
    </div>
  );
}
