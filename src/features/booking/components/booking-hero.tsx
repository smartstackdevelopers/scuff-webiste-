"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Clock, CheckCircle2, Car } from "lucide-react";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";

export function BookingHero() {
  return (
    <CinematicVideoHero
      videoSrc="/videos/hero/03-car-drive.mp4"
      posterSrc="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2000&auto=format&fit=crop"
      badgeText="Studio Clean Bay & Mobile Van Reservations"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      badgeVariant="electric"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Online Booking Wizard" },
      ]}
      title={
        <>
          RESERVE YOUR VEHICLE&apos;S <br className="hidden sm:inline" />
          <span className="text-gradient-electric">PERFECT RESTORATION.</span>
        </>
      }
      subtitle="Complete your bespoke appointment in 4 simple steps. Select whether you prefer our climate-controlled detailing studio or our fully self-sufficient mobile van to come to your home or office."
      align="center"
      minHeightClass="min-h-[50vh] sm:min-h-[58vh]"
      metrics={[
        { label: "Upfront Cost", value: "£0 Deposit", icon: <ShieldCheck className="w-4 h-4" /> },
        { label: "Confirmation", value: "Instant Ref", icon: <Clock className="w-4 h-4" /> },
        { label: "Van Requirements", value: "100% Self-Contained", icon: <Car className="w-4 h-4" /> },
      ]}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-400 font-medium"
      >
        <span className="flex items-center gap-1.5 text-primary">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Full £5M Public Liability Insurance</span>
        </span>
        <span className="hidden sm:inline text-white/20">•</span>
        <span className="flex items-center gap-1.5 text-primary">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Free Cancellation & Rescheduling</span>
        </span>
      </motion.div>
    </CinematicVideoHero>
  );
}
