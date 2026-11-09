"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Eye, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ABOUT_CONTENT } from "../data/about-content";

export function WorkshopShowcase() {
  const { workshopGallery } = ABOUT_CONTENT;

  return (
    <section className="py-20 md:py-28 bg-[#0C0F15] border-t border-white/[0.08] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-vignette opacity-15 pointer-events-none" />

      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="electric" dot>
              Controlled Studio Environment & Field Units
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
              Workshop Standards in Action
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Every stage of our process is performed under laboratory-grade conditions—from positive-pressure air filtration to high-CRI inspection lamps.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-wider bg-primary/10 border border-primary/25 px-4 py-2 rounded-full self-start md:self-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>Class 100 Cleanroom Specification</span>
          </div>
        </div>

        {/* 4-Card Luxury Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workshopGallery.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden bg-[#07080A] border border-white/[0.08] hover:border-primary/50 transition-all duration-300 shadow-luxury-dark aspect-[4/5] flex flex-col justify-end p-6"
            >
              {/* Real Photograph */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-[0.8] contrast-[1.05]"
              />

              {/* Ambient gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/60 to-transparent pointer-events-none" />

              {/* Card Meta Content */}
              <div className="relative z-10 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-[10px] font-bold text-primary uppercase tracking-widest inline-block">
                  {item.category}
                </span>

                <h3 className="text-lg font-bold uppercase tracking-tight text-white font-display group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
