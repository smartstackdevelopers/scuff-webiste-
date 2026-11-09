"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export interface BreadcrumbLinkItem {
  label: string;
  href?: string;
}

export interface MetricChipItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface CinematicVideoHeroProps {
  imageSrc?: string;
  posterSrc?: string;
  videoSrc?: string; // Optional legacy compatibility
  imageAlt?: string;
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  badgeVariant?: BadgeProps["variant"];
  title: React.ReactNode;
  subtitle: string;
  breadcrumbs: BreadcrumbLinkItem[];
  primaryCta?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    variant?: "glow" | "amber" | "default";
  };
  secondaryCta?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  metrics?: MetricChipItem[];
  children?: React.ReactNode;
  minHeightClass?: string;
  overlayGradient?: string;
  align?: "center" | "left" | "split";
  className?: string;
  extraContent?: React.ReactNode;
}

export function CinematicVideoHero({
  imageSrc,
  posterSrc,
  imageAlt = "You Scuff We Buff automotive detailing craftsmanship",
  badgeText,
  badgeIcon,
  badgeVariant = "electric",
  title,
  subtitle,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  metrics,
  children,
  minHeightClass = "min-h-[58vh] sm:min-h-[66vh]",
  overlayGradient,
  align = "center",
  className,
  extraContent,
}: CinematicVideoHeroProps) {
  // Use imageSrc or fallback to posterSrc for authentic real photography background
  const finalImage =
    imageSrc ||
    posterSrc ||
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop";

  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-[#07080A] border-b border-white/[0.08]",
        minHeightClass,
        className
      )}
    >
      {/* Real High-Resolution Automotive Photograph Background */}
      <div className="absolute inset-0 -z-30 overflow-hidden select-none" aria-hidden="true">
        <Image
          src={finalImage}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
        />
      </div>

      {/* Professional Cinematic Dark Overlays for Flawless Contrast */}
      <div
        className={cn(
          "absolute inset-0 -z-10 bg-gradient-to-t from-[#07080A] via-[#07080A]/85 to-[#07080A]/60",
          overlayGradient
        )}
      />
      <div className="absolute inset-0 -z-10 bg-black/45" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,8,10,0.75)_100%)]" />

      {/* Subtle Atmospheric Ambient Glow Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-primary/10 blur-[140px] pointer-events-none -z-10" />

      {/* Content Container */}
      <Container className="relative z-10 py-16 sm:py-20 md:py-24">
        {align === "split" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Heading, Subtitle & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Breadcrumbs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbs.map((bc, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <BreadcrumbSeparator />}
                        <BreadcrumbItem>
                          {bc.href ? (
                            <BreadcrumbLink
                              href={bc.href}
                              className="text-muted-foreground hover:text-white transition-colors text-xs uppercase tracking-wider"
                            >
                              {bc.label}
                            </BreadcrumbLink>
                          ) : (
                            <BreadcrumbPage className="text-white font-medium text-xs uppercase tracking-wider">
                              {bc.label}
                            </BreadcrumbPage>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </motion.div>

              {/* Badge */}
              {badgeText && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="inline-flex"
                >
                  <Badge
                    variant={badgeVariant}
                    dot
                    className="bg-[#0C0F15]/90 border-white/[0.12] text-xs py-1 px-3 shadow-luxury-dark backdrop-blur-md"
                  >
                    {badgeIcon || <Sparkles className="w-3.5 h-3.5" />}
                    <span>{badgeText}</span>
                  </Badge>
                </motion.div>
              )}

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-display leading-[0.95]"
              >
                {title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed"
              >
                {subtitle}
              </motion.p>

              {/* Actions */}
              {(primaryCta || secondaryCta) && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-3.5 pt-2"
                >
                  {primaryCta && (
                    <Link
                      href={primaryCta.href}
                      className={cn(
                        buttonVariants({
                          variant: (primaryCta.variant as any) || "glow",
                          size: "lg",
                        }),
                        "shadow-glow-sm"
                      )}
                    >
                      {primaryCta.icon}
                      <span>{primaryCta.label}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  )}
                  {secondaryCta && (
                    <Link
                      href={secondaryCta.href}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "border-white/[0.14] hover:bg-white/[0.05] text-white"
                      )}
                    >
                      {secondaryCta.icon}
                      <span>{secondaryCta.label}</span>
                    </Link>
                  )}
                </motion.div>
              )}

              {/* Metrics Chips */}
              {metrics && metrics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="pt-4 flex flex-wrap gap-3"
                >
                  {metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-card/85 border border-white/[0.08] backdrop-blur-md"
                    >
                      {m.icon && <span className="text-primary">{m.icon}</span>}
                      <div>
                        <div className="text-sm font-bold text-white leading-none font-display uppercase tracking-wide">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          {m.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right Column: Custom Children or Feature Showcase */}
            <div className="lg:col-span-5">
              {children || extraContent}
            </div>
          </div>
        ) : (
          /* Center / Left Aligned Single Column */
          <div
            className={cn(
              "max-w-4xl mx-auto space-y-6",
              align === "center" ? "text-center" : "text-left"
            )}
          >
            {/* Breadcrumbs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={cn("flex", align === "center" && "justify-center")}
            >
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((bc, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {bc.href ? (
                          <BreadcrumbLink
                            href={bc.href}
                            className="text-muted-foreground hover:text-white transition-colors text-xs uppercase tracking-wider"
                          >
                            {bc.label}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage className="text-white font-medium text-xs uppercase tracking-wider">
                            {bc.label}
                          </BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>

            {/* Badge */}
            {badgeText && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className={cn("flex", align === "center" && "justify-center")}
              >
                <Badge
                  variant={badgeVariant}
                  dot
                  className="bg-[#0C0F15]/90 border-white/[0.12] text-xs py-1 px-3 shadow-luxury-dark backdrop-blur-md"
                >
                  {badgeIcon || <Sparkles className="w-3.5 h-3.5" />}
                  <span>{badgeText}</span>
                </Badge>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-display leading-[0.95]"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={cn(
                "text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed",
                align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
              )}
            >
              {subtitle}
            </motion.p>

            {/* Actions */}
            {(primaryCta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={cn(
                  "flex flex-wrap items-center gap-3.5 pt-2",
                  align === "center" ? "justify-center" : "justify-start"
                )}
              >
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className={cn(
                      buttonVariants({
                        variant: (primaryCta.variant as any) || "glow",
                        size: "lg",
                      }),
                      "shadow-glow-sm"
                    )}
                  >
                    {primaryCta.icon}
                    <span>{primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "border-white/[0.14] hover:bg-white/[0.05] text-white"
                    )}
                  >
                    {secondaryCta.icon}
                    <span>{secondaryCta.label}</span>
                  </Link>
                )}
              </motion.div>
            )}

            {/* Metric Chips */}
            {metrics && metrics.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className={cn(
                  "pt-4 flex flex-wrap gap-3",
                  align === "center" ? "justify-center" : "justify-start"
                )}
              >
                {metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-card/85 border border-white/[0.08] backdrop-blur-md"
                  >
                    {m.icon && <span className="text-primary">{m.icon}</span>}
                    <div className="text-left">
                      <div className="text-sm font-bold text-white leading-none font-display uppercase tracking-wide">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        {m.label}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {children}
            {extraContent}
          </div>
        )}
      </Container>
    </section>
  );
}

// Export InnerPageHero alias for clarity
export { CinematicVideoHero as InnerPageHero };
