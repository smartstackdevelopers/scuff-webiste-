import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const alertVariants = cva(
  "relative w-full rounded-2xl border p-4 sm:p-5 flex items-start gap-3.5 transition-colors shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-card border-border/80 text-foreground",
        info:
          "bg-primary/5 border-primary/20 text-foreground",
        electric:
          "bg-electric/10 border-electric/30 text-foreground shadow-glow-sm",
        success:
          "bg-emerald-500/10 border-emerald-500/25 text-foreground",
        warning:
          "bg-amber-500/10 border-amber-500/25 text-foreground",
        destructive:
          "bg-destructive/10 border-destructive/25 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  onClose?: () => void;
}

export function Alert({
  className,
  variant = "default",
  icon,
  onClose,
  children,
  ...props
}: AlertProps) {
  const defaultIcon = {
    default: <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />,
    info: <Info className="w-5 h-5 text-electric shrink-0 mt-0.5" />,
    electric: <Sparkles className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />,
    success: (
      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
    ),
    warning: (
      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
    ),
    destructive: (
      <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
    ),
  }[variant || "default"];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon || defaultIcon}
      <div className="flex-1 space-y-1">{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn(
        "font-semibold text-sm leading-none tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      className={cn("text-xs sm:text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}
