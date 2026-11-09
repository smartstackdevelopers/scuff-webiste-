"use client";

import * as React from "react";
import { Salesperson } from "../types/crm";
import { useCrm } from "../hooks/use-crm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Plus,
  Search,
  Pencil,
  Power,
  Target,
  Mail,
  Phone,
  Download,
} from "lucide-react";
import { SalespersonModal } from "./salesperson-modal";
import { exportToCsv } from "../lib/crm-calculations";

export function SalespersonTable() {
  const { salespersons, toggleSalespersonActive, commissions } = useCrm();

  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingRep, setEditingRep] = React.useState<Salesperson | null>(null);

  // Aggregates
  const totalReps = salespersons.length;
  const activeReps = salespersons.filter((s) => s.active ?? s.isActive ?? true).length;
  const totalTarget = salespersons.reduce((sum, s) => sum + s.monthlyTarget, 0);
  const topPerformer = [...salespersons].sort((a, b) => b.currentMonthSales - a.currentMonthSales)[0];

  const filteredReps = salespersons.filter((s) => {
    const name = s.fullName || s.name || "";
    const dept = s.department || s.role || "";
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      dept.toLowerCase().includes(search.toLowerCase()) ||
      s.employeeId.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleExportCsv = () => {
    const csvData = filteredReps.map((s) => ({
      ID: s.employeeId,
      Name: s.fullName || s.name,
      Role: s.department || s.role,
      Email: s.email,
      Phone: s.phone,
      CommissionRatePct: s.commissionRate,
      MonthlyTarget: s.monthlyTarget,
      CurrentMonthSales: s.currentMonthSales,
      TotalSalesValue: s.totalSalesValue,
      LeadsAssigned: s.assignedLeadsCount,
      LeadsConverted: s.convertedLeadsCount,
      Status: (s.active ?? s.isActive ?? true) ? "Active" : "Inactive",
    }));
    exportToCsv(csvData, "you-scuff-we-buff-sales-team");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-serif">
            Sales Representatives & Commission Tiers
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage sales consultants, lead dispatching capacity, quota targets and commission percentage structures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            <Download className="mr-1.5 h-4 w-4" />
            Export Team Data
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setEditingRep(null);
              setModalOpen(true);
            }}
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Add Representative
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Total Representatives</span>
          <p className="mt-1 text-2xl font-bold text-foreground font-mono">{totalReps}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Active in Dispatch</span>
          <p className="mt-1 text-2xl font-bold text-emerald-400 font-mono">{activeReps}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Monthly Team Quota</span>
          <p className="mt-1 text-2xl font-bold text-foreground font-mono">
            £{(totalTarget / 1000).toFixed(0)}k
          </p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Top Producer This Month</span>
          <p className="mt-1 text-lg font-bold text-primary truncate">
            {topPerformer ? (topPerformer.fullName || topPerformer.name || "").split(" ")[0] : "—"} (£{topPerformer ? (topPerformer.currentMonthSales / 1000).toFixed(1) : 0}k)
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search representative, email, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>
      </div>

      {/* Representatives Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReps.length > 0 ? (
          filteredReps.map((rep) => {
            const repName = rep.fullName || rep.name || "Advisor";
            const isRepActive = rep.active ?? rep.isActive ?? true;
            const targetPct = Math.min(100, Math.round((rep.currentMonthSales / rep.monthlyTarget) * 100));
            const winRate = rep.assignedLeadsCount > 0 ? Math.round((rep.convertedLeadsCount / rep.assignedLeadsCount) * 100) : 0;
            const accrued = commissions
              .filter((c) => c.salespersonId === rep.id)
              .reduce((sum, c) => sum + c.commissionAmount, 0);

            return (
              <div
                key={rep.id}
                className={`rounded-xl border p-5 bg-card/60 flex flex-col justify-between transition-all ${
                  isRepActive
                    ? "border-border/40 hover:border-primary/40"
                    : "border-border/30 opacity-70 bg-muted/20"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Avatar, Name, Role, Status & Tier */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                        {repName
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground text-sm leading-tight">
                            {repName}
                          </h3>
                          <Badge
                            variant={isRepActive ? "success" : "secondary"}
                            className="text-[10px]"
                          >
                            {isRepActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {rep.department || rep.role} • <span className="font-mono">{rep.employeeId}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        Tier Rate
                      </span>
                      <Badge variant="secondary" className="font-mono text-xs bg-primary/10 text-primary border-primary/20 font-bold">
                        {rep.commissionRate}%
                      </Badge>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground pt-1 border-t border-border/20">
                    <a
                      href={`mailto:${rep.email}`}
                      className="hover:text-primary transition-colors flex items-center gap-1.5 truncate"
                    >
                      <Mail className="h-3 w-3 shrink-0" />
                      <span className="truncate">{rep.email}</span>
                    </a>
                    <a
                      href={`tel:${rep.phone}`}
                      className="hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="h-3 w-3 shrink-0" />
                      <span>{rep.phone}</span>
                    </a>
                  </div>

                  {/* Target Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Target className="h-3 w-3 text-primary" /> Monthly Quota
                      </span>
                      <span className="font-mono text-foreground font-semibold">
                        £{rep.currentMonthSales.toLocaleString()} / £{rep.monthlyTarget.toLocaleString()} ({targetPct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden">
                      <div
                        style={{ width: `${targetPct}%` }}
                        className={`h-full rounded-full transition-all ${
                          targetPct >= 100 ? "bg-emerald-400" : "bg-primary"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Performance Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/20 text-center">
                    <div className="p-2 rounded-lg bg-background/50 border border-border/30">
                      <span className="text-[10px] text-muted-foreground block">Leads / Won</span>
                      <span className="font-mono font-bold text-xs text-foreground">
                        {rep.assignedLeadsCount} / <strong className="text-emerald-400">{rep.convertedLeadsCount}</strong>
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-background/50 border border-border/30">
                      <span className="text-[10px] text-muted-foreground block">Win Rate</span>
                      <span className="font-mono font-bold text-xs text-primary">
                        {winRate}%
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-background/50 border border-border/30">
                      <span className="text-[10px] text-muted-foreground block">Accrued Commission</span>
                      <span className="font-mono font-bold text-xs text-emerald-400">
                        £{accrued.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 mt-3 border-t border-border/30 flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => {
                      setEditingRep(rep);
                      setModalOpen(true);
                    }}
                  >
                    <Pencil className="mr-1.5 h-3.5 w-3.5" />
                    Edit Profile
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className={`text-xs ${
                      isRepActive
                        ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        : "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                    }`}
                    onClick={() => toggleSalespersonActive(rep.id)}
                  >
                    <Power className="mr-1.5 h-3.5 w-3.5" />
                    {isRepActive ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full rounded-xl border border-border/40 bg-card p-12 text-center">
            <Users className="mx-auto h-10 w-10 text-muted-foreground/60" />
            <h3 className="mt-3 text-base font-semibold text-foreground">No Representatives Found</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your search criteria or add a new sales representative.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <SalespersonModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialData={editingRep}
      />
    </div>
  );
}
