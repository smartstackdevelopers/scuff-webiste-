"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, Eye, ShieldCheck, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";

export function GalleryHero() {
  return (
    <CinematicVideoHero
      videoSrc="/videos/hero/06-final-reveal.mp4"
      posterSrc="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop"
      badgeText="Documented Studio & Mobile Transformations"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      badgeVariant="electric"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Transformation Gallery" },
      ]}
      title={
        <>
          EVERY REFLECTION <br className="hidden sm:inline" />
          <span className="text-gradient-electric">TELLS A RESTORATION STORY.</span>
        </>
      }
      subtitle="Witness forensic-level automotive transformations. From heavy swirl mark elimination and oxidized clear coat revival to CNC diamond-cut alloy restoration and undetectable SMART bumper blending."
      align="center"
      minHeightClass="min-h-[46vh] sm:min-h-[52vh] md:min-h-[56vh]"
      primaryCta={{
        label: "Book Your Transformation",
        href: "/booking",
        variant: "amber",
        icon: <Calendar className="w-4 h-4 mr-2" />,
      }}
      secondaryCta={{
        label: "Compare Before & After",
        href: "#transformations",
        icon: <Eye className="w-4 h-4 mr-2" />,
      }}
      metrics={[
        { label: "Completed Projects", value: "120+ Logged", icon: <ImageIcon className="w-4 h-4" /> },
        { label: "Defect Removal", value: "Up to 95%", icon: <CheckCircle2 className="w-4 h-4" /> },
        { label: "Optical Clarity", value: "100% Mirror", icon: <ShieldCheck className="w-4 h-4" /> },
      ]}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="pt-2 text-xs text-muted-foreground flex items-center justify-center gap-2"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span>All photos captured under calibrated 5000K daylight detailing inspection lamps.</span>
      </motion.div>
    </CinematicVideoHero>
  );
}
