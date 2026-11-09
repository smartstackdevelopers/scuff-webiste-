"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { DetailedService } from "../types";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
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
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  ServiceAvailabilityBadge,
  ServiceBookingAvailableBadge,
} from "./service-availability-badge";

interface ServiceDetailHeroProps {
  service: DetailedService;
}

export function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const reduced = useReducedMotion();

  // Dynamic authentic photography selection based on service specialty
  const heroImageSrc = React.useMemo(() => {
    if (service.heroImage?.url) return service.heroImage.url;
    switch (service.slug) {
      case "paint-correction":
      case "smart-repairs":
        return "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop";
      case "alloy-wheel-refurbishment":
        return "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2070&auto=format&fit=crop";
      case "ceramic-coating":
        return "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop";
      case "full-vehicle-detailing":
        return "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop";
      case "mobile-repairs":
      case "maintenance-detailing":
        return "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2070&auto=format&fit=crop";
      case "interior-detailing":
      default:
        return "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop";
    }
  }, [service.slug, service.heroImage]);

  return (
    <section className="relative min-h-[46vh] sm:min-h-[52vh] md:min-h-[56vh] flex items-center justify-center overflow-hidden bg-background border-b border-border text-foreground transition-colors duration-200">
      {/* Real Automotive Photography Background */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none">
        <Image
          src={heroImageSrc}
          alt={`${service.title} - You Scuff We Buff`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.72] contrast-[1.06] transition-transform duration-1000 group-hover:scale-105"
        />
      </div>

      {/* Cinematic Contrast Overlays for Perfect Readability */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-background via-black/50 to-black/30 dark:from-[#050505] dark:via-[#050505]/70 dark:to-[#050505]/35" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-primary/15 blur-[120px] pointer-events-none z-[2]" />

      <Container className="relative z-10 py-10 sm:py-14 md:py-16">
        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto space-y-4 sm:space-y-5">
          {/* Breadcrumbs */}
          <div className="flex">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors text-xs uppercase tracking-wider"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/services"
                    className="text-muted-foreground hover:text-foreground transition-colors text-xs uppercase tracking-wider"
                  >
                    Services
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground font-medium text-xs uppercase tracking-wider">
                    {service.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <Badge variant="electric" dot className="bg-card/90 border-border text-foreground backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.badge}</span>
            </Badge>

            {service.popular && (
              <Badge variant="outline" className="text-amber-500 border-amber-500/40 bg-card/90">
                Highly Recommended
              </Badge>
            )}
            <ServiceAvailabilityBadge service={service} />
            <ServiceBookingAvailableBadge />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-foreground font-display leading-[0.98]"
          >
            {service.title}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base sm:text-xl font-bold text-primary tracking-wide"
          >
            {service.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-4xl leading-relaxed"
          >
            {service.longDescription}
          </motion.p>

          {/* Pricing & Duration Floating Luxury Glass Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="p-5 sm:p-6 rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-sm flex flex-wrap items-center justify-between gap-6"
          >
            <div className="flex flex-wrap items-center gap-6 sm:gap-10">
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground block font-semibold">
                  Investment
                </span>
                <span className="text-2xl sm:text-3xl font-black text-foreground font-display uppercase tracking-tight">
                  {service.priceOnAssessment
                    ? "Quote on assessment"
                    : `From ${service.currency}${service.startingPrice}`}
                </span>
              </div>

              <div className="h-10 w-px bg-border hidden sm:block" />

              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 text-primary flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground block font-semibold">
                    Turnaround
                  </span>
                  <span className="text-sm sm:text-base font-bold text-foreground">
                    {service.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href={`/booking?service=${service.slug}`}
                className={cn(
                  buttonVariants({ size: "lg", variant: "amber" }),
                  "w-full sm:w-auto text-sm sm:text-base shadow-glow-sm"
                )}
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Reserve Appointment</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </motion.div>

          {/* Suitable For note */}
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Ideal for: {service.recommendedFor}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
