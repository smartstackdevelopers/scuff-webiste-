"use client";

import * as React from "react";
import { AnalyticsChartsSection, AdminKPIGrid, useAdmin } from "@/features/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AdminReportsPage() {
  const { kpiData } = useAdmin();

  const handleExport = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `FINANCIAL & OPERATIONS REPORT\nExported: ${new Date().toISOString()}\nTotal Revenue: £${kpiData.totalRevenue}\nTotal Completed Services: ${kpiData.completedServices}\nCustomer Count: ${kpiData.totalCustomers}\nYou Scuff We Buff Operations Engine.`
    ], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Analytics_Report_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Analytics & Business Intelligence
            </h1>
            <Badge variant="electric" className="text-xs">
              Executive Reports
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Turnover projections, capacity distribution, and service profitability breakdowns.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="text-xs font-bold"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" />
          <span>Export Audit Log</span>
        </Button>
      </div>

      <AdminKPIGrid kpi={kpiData} />

      <AnalyticsChartsSection />
    </div>
  );
}
