"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Wrench,
  CheckCircle2,
  Phone,
  Camera,
  Upload,
  CheckSquare,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_STAFF_JOBS } from "../data/jobs";
import { TechnicianJob, JobStatus } from "../types/staff";

interface StaffJobDetailViewProps {
  id: string;
}

export function StaffJobDetailView({ id }: StaffJobDetailViewProps) {
  const initialJob = MOCK_STAFF_JOBS.find((j) => j.id === id) || MOCK_STAFF_JOBS[0];

  const [job, setJob] = React.useState<TechnicianJob>(initialJob);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [notes, setNotes] = React.useState(job.technicianNotes || "");
  const [uploading, setUploading] = React.useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleChecklist = (taskId: string) => {
    setJob((prev) => ({
      ...prev,
      checklist: prev.checklist.map((c) =>
        c.id === taskId ? { ...c, completed: !c.completed } : c
      ),
    }));
  };

  const handleChangeStatus = (newStatus: JobStatus) => {
    setJob((prev) => ({ ...prev, status: newStatus }));
    showToast(`Job status updated to ${newStatus.replace("_", " ").toUpperCase()}`);
  };

  const handleUploadPhoto = () => {
    setUploading(true);
    setTimeout(() => {
      const mockNewPhoto =
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop";
      setJob((prev) => ({
        ...prev,
        afterPhotos: [...prev.afterPhotos, mockNewPhoto],
      }));
      setUploading(false);
      showToast("Job photo logged to vehicle inspection file.");
    }, 600);
  };

  const completedCount = job.checklist.filter((c) => c.completed).length;
  const progressPct = Math.round((completedCount / (job.checklist.length || 1)) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-zinc-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link href="/staff/jobs">
          <Button variant="ghost" size="sm" className="gap-2 text-xs">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bay Jobs</span>
          </Button>
        </Link>
        <span className="font-mono text-xs text-muted-foreground">{job.jobReference}</span>
      </div>

      {/* Main Vehicle & Job Card */}
      <div className="p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
                {job.vehicleRegistration}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Paint: {job.vehicleColour} {job.paintCode && `(${job.paintCode})`}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-serif tracking-tight mt-1">
              {job.vehicleMake} {job.vehicleModel}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={job.status}
              onChange={(e) => handleChangeStatus(e.target.value as JobStatus)}
              className="bg-secondary text-foreground border border-border font-bold text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In Bay Detailing</option>
              <option value="paint_curing">Infrared Curing</option>
              <option value="quality_checked">QC Inspection</option>
              <option value="completed">Completed / Handover</option>
            </select>
          </div>
        </div>

        {/* Client details & phone */}
        <div className="pt-2 border-t border-border/40 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-muted-foreground block text-[11px]">Client Name</span>
            <span className="font-bold text-foreground">{job.customerName}</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[11px]">Contact Telephone</span>
            <a href={`tel:${job.customerPhone}`} className="font-mono text-emerald-400 hover:underline flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>{job.customerPhone}</span>
            </a>
          </div>
          <div>
            <span className="text-muted-foreground block text-[11px]">Assigned Facility</span>
            <span className="font-mono text-foreground font-bold">{job.bayNumber}</span>
          </div>
        </div>
      </div>

      {/* Detailing Checklist */}
      <div className="p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-400" />
              Master Technician Step-by-Step Checklist
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Check off tasks as you progress around the vehicle.
            </p>
          </div>
          <span className="font-mono font-bold text-amber-400 text-xs">
            {completedCount}/{job.checklist.length} Done ({progressPct}%)
          </span>
        </div>

        <div className="space-y-2.5">
          {job.checklist.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleToggleChecklist(item.id)}
              className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                item.completed
                  ? "bg-emerald-950/15 border-emerald-500/30 text-foreground"
                  : "bg-background/60 border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              }`}
            >
              {item.completed ? (
                <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-muted-foreground shrink-0" />
              )}
              <span className={`text-xs font-medium leading-snug ${item.completed ? "line-through opacity-80" : ""}`}>
                {item.task}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Before & After Job Photos */}
      <div className="p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Camera className="w-4 h-4 text-electric" />
              Job Photographic Log & Quality Evidence
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Capture paint defects before cutting and final gloss reflection after coating.
            </p>
          </div>
          <Button
            size="sm"
            onClick={handleUploadPhoto}
            disabled={uploading}
            className="bg-card border border-border hover:bg-muted text-xs gap-1.5 h-8"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>{uploading ? "Saving..." : "Upload Photo"}</span>
          </Button>
        </div>

        {/* Photos Grid */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Pre-Detailing Condition Photos ({job.beforePhotos.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {job.beforePhotos.map((url, i) => (
                <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-border/50 relative bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Before defect ${i + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono font-bold text-amber-400">
                    Before #{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Post-Correction / Cured Results ({job.afterPhotos.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {job.afterPhotos.map((url, i) => (
                <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-emerald-500/40 relative bg-black shadow-md shadow-emerald-500/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`After result ${i + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-emerald-500/90 text-[9px] font-mono font-bold text-black">
                    Result #{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Internal Technician Notes */}
      <div className="p-6 rounded-3xl bg-card border border-border/70 space-y-3 shadow-sm">
        <h2 className="text-base font-bold text-foreground">Workshop Internal Notes</h2>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Log micron clear-coat thickness, specific paint blemishes, or customer collection requests..."
          className="w-full bg-background border border-border rounded-2xl p-3 text-xs text-foreground resize-none focus:outline-none focus:border-amber-500"
        />
        <Button
          size="sm"
          onClick={() => showToast("Technician notes saved to vehicle dossier.")}
          className="bg-card border border-border hover:bg-muted text-xs h-8"
        >
          Save Notes
        </Button>
      </div>

      {/* Complete & Release Action Bar */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/30 via-card to-card border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-foreground">Final Quality Inspection Complete?</h3>
          <p className="text-xs text-muted-foreground">
            Marking completed notifies the front desk and triggers customer vehicle handover notification.
          </p>
        </div>
        <Button
          onClick={() => {
            handleChangeStatus("completed");
            showToast("Vehicle completed and marked ready for handover!");
          }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs gap-1.5 shadow-lg shadow-emerald-600/20"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Mark Completed & Handover</span>
        </Button>
      </div>
    </div>
  );
}
