import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wider transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary border border-primary/20",
        electric:
          "bg-electric/15 text-electric-cyan border border-electric/30 shadow-glow-sm",
        neutral:
          "bg-secondary text-secondary-foreground border border-border/80",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/80",
        outline:
          "border border-border text-foreground bg-transparent",
        success:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25",
        pending:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25",
        warning:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25",
        error:
          "bg-destructive/10 text-destructive border border-destructive/25",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/25",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        default: "px-3 py-1 text-xs",
        lg: "px-3.5 py-1.5 text-xs font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({
  className,
  variant,
  size,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const dotColor = {
    default: "bg-primary",
    electric: "bg-electric-cyan",
    neutral: "bg-muted-foreground",
    secondary: "bg-muted-foreground",
    outline: "bg-foreground",
    success: "bg-emerald-500",
    pending: "bg-amber-500 animate-pulse",
    warning: "bg-amber-500",
    error: "bg-destructive",
    destructive: "bg-destructive",
  }[variant || "default"];

  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColor)}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
