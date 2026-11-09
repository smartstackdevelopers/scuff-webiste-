import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-glow-sm active:scale-[0.98]",
        glow:
          "bg-primary text-primary-foreground shadow-glow-neon hover:shadow-[0_0_30px_-2px_rgba(72,200,77,0.65)] hover:bg-primary/95 active:scale-[0.98]",
        amber:
          "bg-amber-500 text-black font-bold shadow-[0_0_20px_-3px_rgba(245,158,11,0.45)] hover:bg-amber-400 hover:shadow-[0_0_28px_-1px_rgba(245,158,11,0.65)] active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/80 hover:bg-secondary/80 hover:border-border active:scale-[0.98]",
        outline:
          "border border-border/80 bg-transparent text-foreground hover:bg-accent hover:border-electric/50 active:scale-[0.98]",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto font-normal",
      },
      size: {
        xs: "h-7 px-2.5 text-xs font-medium rounded-lg gap-1.5",
        sm: "h-9 px-3.5 text-xs font-medium rounded-lg gap-1.5",
        default: "h-11 px-5 py-2 text-sm font-semibold tracking-wide gap-2",
        lg: "h-[3.25rem] px-7 text-base font-semibold rounded-xl gap-2.5",
        xl: "h-14 px-8 text-lg font-bold rounded-2xl gap-3",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>
        )}
        {children != null && children !== false && (
          <span className="inline-flex items-center justify-center gap-2 min-w-0">
            {children}
          </span>
        )}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
