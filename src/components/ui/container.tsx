import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "lg" | "full";
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8",
          {
            "max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1560px]": size === "default",
            "max-w-5xl": size === "sm",
            "max-w-[1680px]": size === "lg",
            "max-w-none px-0 sm:px-0 lg:px-0": size === "full",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
