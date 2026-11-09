"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND_ASSETS } from "@/constants/theme";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
  variant?: "full" | "mark" | "badge";
}

const sizeConfig = {
  sm: {
    fullClass: "h-7 xs:h-8 sm:h-9 max-w-[120px] xs:max-w-[145px] sm:max-w-[170px]",
    box: "w-7 h-7 sm:w-8 sm:h-8",
    img: 28,
    textMain: "text-xs sm:text-sm",
    textSub: "text-[9px] sm:text-[10px]",
  },
  md: {
    fullClass: "h-7 xs:h-8 sm:h-10 md:h-12 max-w-[125px] xs:max-w-[155px] sm:max-w-[210px] md:max-w-[240px]",
    box: "w-8 h-8 sm:w-10 sm:h-10",
    img: 36,
    textMain: "text-xs sm:text-base",
    textSub: "text-[9px] sm:text-[11px]",
  },
  lg: {
    fullClass: "h-9 xs:h-11 sm:h-13 md:h-16 max-w-[180px] xs:max-w-[230px] sm:max-w-[270px] md:max-w-[300px]",
    box: "w-9 h-9 sm:w-12 sm:h-12",
    img: 44,
    textMain: "text-sm sm:text-lg",
    textSub: "text-[10px] sm:text-[12px]",
  },
};

export function BrandLogo({
  className,
  showText,
  size = "md",
  href = "/",
  variant = "full",
}: BrandLogoProps) {
  const conf = sizeConfig[size];

  // If variant === "full" (default), render the complete, official brand logo graphic
  // with correct aspect ratio, crisp styling, and zero cropped text.
  const content =
    variant === "full" ? (
      <span
        className={cn(
          "inline-flex items-center group focus-visible:outline-none select-none max-w-full",
          className
        )}
      >
        <span className="relative inline-flex items-center transition-all duration-300 group-hover:scale-[1.02] max-w-full">
          <Image
            src={BRAND_ASSETS.logo}
            alt={`${siteConfig.name} - Premium Mobile Alloy Wheel & SMART Repairs`}
            width={200}
            height={44}
            className={cn(
              "w-auto max-w-full object-contain transition-all duration-300 filter group-hover:drop-shadow-[0_0_14px_rgba(72,200,77,0.45)]",
              conf.fullClass
            )}
            priority
          />
        </span>
        <span className="sr-only">You Scuff We Buff</span>
      </span>
    ) : (
      // If variant === "mark" or "badge", render the square automotive badge + optional text
      <span
        className={cn(
          "flex items-center gap-2.5 group focus-visible:outline-none select-none",
          className
        )}
      >
        <span
          className={cn(
            "relative overflow-hidden rounded-xl border border-electric/40 shadow-glow-sm shrink-0 bg-charcoal-950 p-1 ring-1 ring-electric/20 transition-all duration-300 group-hover:border-electric group-hover:shadow-glow-neon",
            conf.box
          )}
        >
          <Image
            src={BRAND_ASSETS.icon}
            alt={`${siteConfig.name} mark`}
            width={conf.img}
            height={conf.img}
            className="object-contain w-full h-full"
            priority
          />
        </span>
        {showText !== false && (
          <span className="flex flex-col min-w-0">
            <span
              className={cn(
                "font-black tracking-wider uppercase text-foreground leading-tight font-display truncate",
                conf.textMain
              )}
            >
              You Scuff
            </span>
            <span
              className={cn(
                "font-bold tracking-[0.18em] uppercase text-electric leading-tight",
                conf.textSub
              )}
            >
              We Buff
            </span>
          </span>
        )}
      </span>
    );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
      aria-label={siteConfig.name}
    >
      {content}
    </Link>
  );
}
