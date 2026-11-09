"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const avatarVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full border border-border/80 bg-secondary select-none",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm font-semibold",
        lg: "h-12 w-12 text-base font-semibold",
        xl: "h-16 w-16 text-xl font-bold",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  status?: "online" | "busy" | "offline" | "verified";
}

export function Avatar({
  className,
  size = "md",
  status,
  children,
  ...props
}: AvatarProps) {
  const statusColor = {
    online: "bg-emerald-500",
    busy: "bg-amber-500",
    offline: "bg-muted-foreground",
    verified: "bg-electric",
  }[status || "online"];

  return (
    <div className="relative inline-block">
      <div className={cn(avatarVariants({ size, className }))} {...props}>
        {children}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background",
            size === "xs" && "h-1.5 w-1.5",
            size === "sm" && "h-2 w-2",
            size === "md" && "h-2.5 w-2.5",
            size === "lg" && "h-3 w-3",
            size === "xl" && "h-3.5 w-3.5",
            statusColor
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export interface AvatarImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string;
  alt: string;
}

export function AvatarImage({ src, alt, className, ...props }: AvatarImageProps) {
  const [hasError, setHasError] = React.useState(!src);

  if (!src || hasError) {
    return null;
  }

  // Use standard img or next/image for avatar
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={cn("h-full w-full object-cover", className)}
      {...props}
    />
  );
}

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AvatarFallback({
  children,
  className,
  ...props
}: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-secondary text-secondary-foreground uppercase font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
