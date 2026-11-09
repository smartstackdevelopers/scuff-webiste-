import * as React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Access Restricted | You Scuff We Buff",
  description: "Administrative and Technician clearance required for this workspace.",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-card border border-border/80 shadow-2xl relative z-10">
        <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground font-serif tracking-tight">
            Clearance Required
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This module requires verified Super Admin, Detailing Manager, or Certified Technician credentials.
            Please authenticate with the appropriate role-based profile.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-secondary/50 border border-border/50 text-[11px] text-muted-foreground flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>Role Guard: Admin / Manager / Staff</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="sm" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold gap-2">
              <LogIn className="w-4 h-4" />
              <span>Sign In with Credentials</span>
            </Button>
          </Link>

          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
