"use client";

import * as React from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  X,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { DateRangeFilter } from "../types/analytics";

interface AnalyticsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  filter: DateRangeFilter;
  onExport: (format: "csv" | "excel" | "pdf") => void;
}

export function AnalyticsExportModal({
  isOpen,
  onClose,
  filter,
  onExport,
}: AnalyticsExportModalProps) {
  const [selectedFormat, setSelectedFormat] = React.useState<"csv" | "excel" | "pdf">("csv");

  if (!isOpen) return null;

  const handleConfirm = () => {
    onExport(selectedFormat);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-card border border-border rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Download className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-foreground">
            Export Visitor Analytics Report
          </h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Download certified executive traffic and conversion analytics dataset.
        </p>

        {/* Selected Date Range Badge */}
        <div className="p-3 rounded-xl bg-secondary/50 border border-border/80 flex items-center gap-2 text-xs mb-4">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span className="text-muted-foreground">Active Filter Interval:</span>
          <strong className="text-foreground font-mono">{filter.label}</strong>
        </div>

        {/* Format Selection Cards */}
        <div className="space-y-2.5 mb-6">
          <div
            onClick={() => setSelectedFormat("csv")}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              selectedFormat === "csv"
                ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                : "bg-secondary/40 border-border/60 hover:bg-secondary/70 text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              <div>
                <p className="font-bold text-xs">Standard CSV (.csv)</p>
                <p className="text-[11px] text-muted-foreground">
                  Universal comma-separated format for BI and databases
                </p>
              </div>
            </div>
            {selectedFormat === "csv" && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
          </div>

          <div
            onClick={() => setSelectedFormat("excel")}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              selectedFormat === "excel"
                ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                : "bg-secondary/40 border-border/60 hover:bg-secondary/70 text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="font-bold text-xs">Microsoft Excel (.xls)</p>
                <p className="text-[11px] text-muted-foreground">
                  Formatted spreadsheet compatible with Excel and Numbers
                </p>
              </div>
            </div>
            {selectedFormat === "excel" && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
          </div>

          <div
            onClick={() => setSelectedFormat("pdf")}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              selectedFormat === "pdf"
                ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                : "bg-secondary/40 border-border/60 hover:bg-secondary/70 text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <Printer className="w-5 h-5 text-blue-400" />
              <div>
                <p className="font-bold text-xs">Printable Document / PDF</p>
                <p className="text-[11px] text-muted-foreground">
                  Certified executive PDF export ready for printing
                </p>
              </div>
            </div>
            {selectedFormat === "pdf" && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}
