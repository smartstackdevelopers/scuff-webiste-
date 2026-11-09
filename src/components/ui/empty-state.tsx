import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-border/80 bg-card/40 max-w-lg mx-auto",
        className
      )}
    >
      {icon && (
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/80 border border-border/80 text-muted-foreground mb-4 shadow-sm">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-bold text-foreground tracking-tight mb-1.5">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
        {description}
      </p>

      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
