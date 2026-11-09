"use client";

import * as React from "react";
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
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Dynamic video selection based on service specialty
  const videoSrc = React.useMemo(() => {
    switch (service.slug) {
      case "paint-correction":
      case "smart-repairs":
        return "/videos/hero/04-painting.mp4"; // Automotive spray painting, booth curing & paint finishing
      case "alloy-wheel-refurbishment":
        return "/videos/hero/05-wheel-refurb.mp4"; // CNC diamond-cut wheel lathe machining
      case "ceramic-coating":
      case "full-vehicle-detailing":
        return "/videos/hero/06-final-reveal.mp4"; // Mirror shine ceramic reflection reveal
      case "mobile-repairs":
        return "/videos/hero/03-car-drive.mp4"; // Mobile fleet on-location dispatch
      case "interior-detailing":
      case "maintenance-detailing":
      default:
        return "/videos/hero/01-wheel-intro.mp4";
    }
  }, [service.slug]);

  const posterSrc =
    service.heroImage?.url ||
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop";

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // DOM-level attributes & properties for guaranteed browser autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");

    if (reduced) {
      video.pause();
      return;
    }

    const tryPlay = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setVideoLoaded(true))
          .catch(() => {
            const onUserInteraction = () => {
              if (videoRef.current) {
                videoRef.current.muted = true;
                videoRef.current
                  .play()
                  .then(() => setVideoLoaded(true))
                  .catch(() => undefined);
              }
              window.removeEventListener("click", onUserInteraction);
              window.removeEventListener("touchstart", onUserInteraction);
              window.removeEventListener("scroll", onUserInteraction);
            };
            window.addEventListener("click", onUserInteraction, { once: true, passive: true });
            window.addEventListener("touchstart", onUserInteraction, { once: true, passive: true });
            window.addEventListener("scroll", onUserInteraction, { once: true, passive: true });
          });
      }
    };

    const handlePlaying = () => setVideoLoaded(true);
    const handleCanPlay = () => {
      setVideoLoaded(true);
      tryPlay();
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleCanPlay);
    video.addEventListener("playing", handlePlaying);

    tryPlay();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [reduced, videoSrc]);

  return (
    <section className="relative min-h-[66vh] md:min-h-[74vh] flex items-center justify-center overflow-hidden bg-[#07080A] border-b border-white/[0.08]">
      {/* Background Poster Image */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url(${posterSrc})`,
          opacity: videoLoaded ? 0.2 : 0.6,
        }}
        aria-hidden="true"
      />

      {/* HTML5 Cinematic Automotive Video Background */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={cn(
          "absolute inset-0 -z-20 w-full h-full object-cover object-center transition-opacity duration-700 ease-out",
          videoLoaded ? "opacity-80 sm:opacity-90" : "opacity-35"
        )}
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Cinematic Contrast Overlays */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-t from-[#07080A] via-black/20 to-[#07080A]/70" />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-r from-[#07080A]/85 via-transparent to-[#07080A]/60" />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,8,10,0.65)_100%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-primary/10 blur-[130px] pointer-events-none -z-10" />

      <Container className="relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumbs */}
          <div className="flex">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="text-muted-foreground hover:text-white transition-colors text-xs uppercase tracking-wider"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/services"
                    className="text-muted-foreground hover:text-white transition-colors text-xs uppercase tracking-wider"
                  >
                    Services
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white font-medium text-xs uppercase tracking-wider">
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
            <Badge variant="electric" dot className="bg-[#0C0F15]/90 border-white/[0.12] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.badge}</span>
            </Badge>

            {service.popular && (
              <Badge variant="outline" className="text-amber-400 border-amber-400/40 bg-[#0C0F15]/80">
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
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-display leading-[0.98]"
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
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed"
          >
            {service.longDescription}
          </motion.p>

          {/* Pricing & Duration Floating Luxury Glass Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="p-5 sm:p-6 rounded-2xl bg-surface-card/90 backdrop-blur-xl border border-white/[0.1] shadow-luxury-dark flex flex-wrap items-center justify-between gap-6"
          >
            <div className="flex flex-wrap items-center gap-6 sm:gap-10">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                  Investment
                </span>
                <span className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
                  {service.priceOnAssessment
                    ? "Quote on assessment"
                    : `From ${service.currency}${service.startingPrice}`}
                </span>
              </div>

              <div className="h-10 w-px bg-white/[0.1] hidden sm:block" />

              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 text-primary flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                    Turnaround
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white">
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
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Ideal for: {service.recommendedFor}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
