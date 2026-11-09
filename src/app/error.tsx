"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log unexpected errors
    console.error("Application Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-card border border-rose-500/30 shadow-2xl relative z-10">
        <div className="inline-flex p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground font-serif tracking-tight">
            Unexpected Workshop Interruption
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our systems encountered a temporary glitch while rendering this studio interface.
            No booking or financial data has been compromised.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-muted-foreground/80 bg-secondary/50 p-1.5 rounded-lg">
              Trace ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            size="sm"
            onClick={() => reset()}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2">
              <Home className="w-4 h-4" />
              <span>Back Home</span>
            </Button>
          </Link>
        </div>

        <div className="pt-4 border-t border-border/40 text-[11px] text-muted-foreground">
          Need immediate support? Contact our Master Detailing Concierge at{" "}
          <Link href="/contact" className="text-amber-400 font-semibold hover:underline">
            Support Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
