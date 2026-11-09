"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, Car, Wrench, Clock, ShieldCheck } from "lucide-react";
import { TransformationCase } from "../types/gallery";
import { DEMO_TRANSFORMATIONS } from "../data/transformations";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BeforeAfterSlider } from "./before-after-slider";
import { TransformationCard } from "./transformation-card";

export function TransformationShowcase() {
  const [selectedCase, setSelectedCase] = React.useState<TransformationCase>(
    DEMO_TRANSFORMATIONS[0]
  );

  return (
    <section id="transformations" className="py-20 md:py-28 bg-surface-secondary border-t border-border/40 relative">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            Verified Case Studies
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
            See the Transformation.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Discover the difference professional vehicle detailing can make. Drag the slider to inspect high-definition clearcoat recovery.
          </p>
        </div>

        {/* Featured Interactive Comparison Slider Area */}
        <div className="max-w-4xl mx-auto mb-16 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCase.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Interactive Comparison Slider */}
              <BeforeAfterSlider
                beforeImage={selectedCase.beforeImage}
                beforeAlt={selectedCase.beforeAlt}
                beforeLabel={selectedCase.beforeLabel}
                afterImage={selectedCase.afterImage}
                afterAlt={selectedCase.afterAlt}
                afterLabel={selectedCase.afterLabel}
              />

              {/* Case Details Card below slider */}
              <Card className="p-6 bg-card/95 border-border/80 shadow-xl space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="electric" className="text-xs">
                        <Car className="w-3 h-3 mr-1" />
                        {selectedCase.vehicleCategory}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3 text-electric" />
                        {selectedCase.turnaround} Turnaround
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground mt-1">
                      {selectedCase.vehicle}
                    </h3>
                  </div>

                  <Link
                    href={`/booking?service=paint-correction`}
                    className={cn(buttonVariants({ size: "sm", variant: "glow" }))}
                  >
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    Book Similar Service
                  </Link>
                </div>

                {/* Split Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
                    <span className="font-bold uppercase tracking-wider text-muted-foreground block">
                      Initial Condition ({selectedCase.beforeLabel})
                    </span>
                    <p className="text-foreground/90 leading-relaxed">
                      {selectedCase.beforeNotes}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-electric/5 border border-electric/30 space-y-1.5">
                    <span className="font-bold uppercase tracking-wider text-electric block flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Studio Result ({selectedCase.afterLabel})
                    </span>
                    <p className="text-foreground/90 leading-relaxed">
                      {selectedCase.afterNotes}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-electric shrink-0" />
                    Treatment: <strong>{selectedCase.service}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    Handover Inspection Verified
                  </span>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Transformation Case Studies Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-electric" />
              <span>Select Transformation Case Study</span>
            </h3>
            <span className="text-xs text-muted-foreground">
              Click any card to load into comparison slider
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEMO_TRANSFORMATIONS.map((caseItem) => (
              <TransformationCard
                key={caseItem.id}
                item={caseItem}
                isSelected={selectedCase.id === caseItem.id}
                onSelect={(item) => setSelectedCase(item)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
