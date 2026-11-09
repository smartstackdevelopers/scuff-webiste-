"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Wrench, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

const CRAFTSMANSHIP_GALLERY = [
  {
    title: "Alloy Wheel Refurbishment",
    desc: "Complete removal of kerb gouges, rash, and paint flaking with high-grade clearcoat.",
    image: "/images/brand/wheels.jpg",
    category: "Alloy Wheels",
  },
  {
    title: "Diamond Cut Precision",
    desc: "Machined alloy face restoration with factory UV-stable protective lacquer.",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
    category: "Diamond Cutting",
  },
  {
    title: "SMART Bumper Repair",
    desc: "Targeted bumper corner scuff repair and seamless paint blending.",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop",
    category: "SMART Repair",
  },
  {
    title: "Mobile Van Dispatch",
    desc: "Fully equipped mobile repair units visiting homes and workplaces across the West Midlands.",
    image: "/images/brand/van.jpg",
    category: "Mobile Service",
  },
];

export function WorkshopShowcase() {
  return (
    <section className="py-20 md:py-28 bg-surface-secondary border-t border-border relative overflow-hidden transition-colors duration-200">
      <div className="absolute inset-0 bg-radial-vignette opacity-15 pointer-events-none" />

      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="electric" dot>
              Craftsmanship In Action
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground font-display">
              Our Repair Standards
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Every wheel refurbishment and SMART repair is carried out with professional automotive equipment, quality primers, and high-durability protective lacquers.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-wider bg-primary/10 border border-primary/25 px-4 py-2 rounded-full self-start md:self-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>High-Quality Finishes Guaranteed</span>
          </div>
        </div>

        {/* 4-Card Luxury Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CRAFTSMANSHIP_GALLERY.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden bg-surface-card border border-border hover:border-primary/50 transition-all duration-300 shadow-sm aspect-[4/5] flex flex-col justify-end p-6"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-[0.8] contrast-[1.05]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-[10px] font-bold text-primary uppercase tracking-widest inline-block">
                  {item.category}
                </span>

                <h3 className="text-lg font-bold uppercase tracking-tight text-white font-display group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-200 leading-relaxed line-clamp-2">
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
