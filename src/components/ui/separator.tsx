import * as React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  label?: React.ReactNode;
}

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  label,
  ...props
}: SeparatorProps) {
  if (label && orientation === "horizontal") {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center my-4",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/80" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-card px-3 text-muted-foreground font-semibold">
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-border/80",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  );
}
