import * as React from "react";
import { Sparkles } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 select-none">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-3xl bg-card border border-amber-500/30 flex items-center justify-center shadow-xl shadow-amber-500/10 animate-pulse">
          <Sparkles className="w-7 h-7 text-amber-400 animate-spin" style={{ animationDuration: "3s" }} />
        </div>
        <div className="absolute -inset-2 rounded-full border border-amber-500/20 animate-ping pointer-events-none" style={{ animationDuration: "2s" }} />
      </div>

      <div className="text-center space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-foreground font-mono">
          YOU SCUFF WE BUFF
        </p>
        <p className="text-[11px] text-muted-foreground">
          Calibrating studio interface...
        </p>
      </div>
    </div>
  );
}
