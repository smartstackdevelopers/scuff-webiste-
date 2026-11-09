"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  CinematicHeroPlayer,
  type HeroSceneClip,
} from "@/features/home/components/cinematic-hero-player";
import { HERO_MASTER_VIDEO, HERO_SCENES } from "@/features/home/data/hero-scenes";
import { BRAND_ASSETS } from "@/constants/theme";
import { useLanguage } from "@/lib/i18n/language-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const [sceneIndex, setSceneIndex] = React.useState(0);
  const [showBrandFinale, setShowBrandFinale] = React.useState(false);
  const [useMasterOnly, setUseMasterOnly] = React.useState(false);

  const scenes = React.useMemo<HeroSceneClip[]>(() => {
    if (useMasterOnly) {
      return [
        {
          id: "master",
          src: HERO_MASTER_VIDEO,
          label: "You Scuff We Buff",
        },
      ];
    }
    return HERO_SCENES;
  }, [useMasterOnly]);

  const handleSceneChange = React.useCallback(
    (index: number, scene: HeroSceneClip) => {
      setSceneIndex(index);
      setShowBrandFinale(scene.id === "final-reveal" || scene.id === "master");
    },
    []
  );

  // If first scene 404s in production edge cases, fall back to master
  React.useEffect(() => {
    let cancelled = false;
    const probe = async () => {
      try {
        const res = await fetch(HERO_SCENES[0].src, { method: "HEAD" });
        if (!cancelled && !res.ok) setUseMasterOnly(true);
      } catch {
        if (!cancelled) setUseMasterOnly(true);
      }
    };
    probe();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeLabel = scenes[sceneIndex]?.label ?? "";

  return (
    <section className="relative min-h-[100svh] bg-charcoal-950 overflow-hidden">
      <div className="relative min-h-[100svh] flex items-end sm:items-center">
        {/* Cinematic multi-scene video stage — no cartoon mascot */}
        <CinematicHeroPlayer
          scenes={scenes}
          onSceneChange={handleSceneChange}
          className="absolute inset-0 z-0"
        />

        {/* Readable dark glass plate behind copy */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-y-0 left-0 w-full sm:w-[62%] bg-gradient-to-r from-charcoal-950 via-charcoal-950/75 to-transparent" />
        </div>

        <Container className="relative z-10 w-full pt-28 pb-24 sm:py-28 md:py-32">
          <div className="max-w-2xl space-y-7">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <div className="relative w-[min(100%,220px)] h-11 sm:h-12">
                <Image
                  src={BRAND_ASSETS.logo}
                  alt="You Scuff We Buff official logo"
                  fill
                  priority
                  sizes="220px"
                  className="object-contain object-left drop-shadow-[0_0_28px_rgba(72,200,77,0.4)]"
                />
              </div>

              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-electric">
                {t("heroSlogan")}
              </p>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.98] text-white">
                <span className="block text-gradient-electric">
                  {t("heroTagline")}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-metallic max-w-xl leading-relaxed font-medium">
                {t("heroSlogan2")}
              </p>

              <p className="text-sm sm:text-base text-white/70 max-w-lg leading-relaxed">
                {t("heroSubtitle")}
              </p>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Link href="/booking" className="w-full sm:w-auto">
                <Button
                  variant="glow"
                  size="lg"
                  className="w-full sm:w-auto shadow-glow-neon"
                  leftIcon={<Calendar className="w-5 h-5" />}
                >
                  {t("heroCtaBook")}
                </Button>
              </Link>

              <Link href="/services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/25 bg-black/35 text-white backdrop-blur-md hover:bg-black/50 hover:border-electric"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {t("heroCtaServices")}
                </Button>
              </Link>
            </motion.div>

            {/* Premium Trust Indicators Strip */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-white/80"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {"★".repeat(5)}
                </div>
                <span className="font-bold text-white">4.9/5 Rating</span>
                <span className="text-white/50 hidden sm:inline">(240+ UK Reviews)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                <span className="text-white/90 font-medium">Fully Insured Fleet & Bay</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                <span className="text-white/90 font-medium">Lifetime Workmanship Warranty</span>
              </div>
            </motion.div>

            {/* Scene progress rail */}
            {!reduced && scenes.length > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="pt-4 space-y-3"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  {scenes.map((scene, i) => (
                    <span
                      key={scene.id}
                      className={cn(
                        "h-1 rounded-full transition-all duration-500",
                        i === sceneIndex
                          ? "w-8 bg-electric shadow-glow-sm"
                          : i < sceneIndex
                            ? "w-4 bg-electric/50"
                            : "w-4 bg-white/20"
                      )}
                      aria-hidden
                    />
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeLabel}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-[10px] uppercase tracking-[0.22em] font-bold text-white/55"
                  >
                    {activeLabel}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            )}

            {/* Brand finale cue on last scene */}
            <AnimatePresence>
              {showBrandFinale && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="pt-2"
                >
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-electric/35 bg-black/45 backdrop-blur-md px-4 py-3 metallic-surface">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-electric/30 shrink-0">
                      <Image
                        src={BRAND_ASSETS.logo}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-electric">
                        You Scuff We Buff
                      </p>
                      <p className="text-xs text-white/75">
                        {t("heroAlloy")} · {t("heroDiamond")} · {t("heroMobile")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>

        <a
          href="#services"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/55 hover:text-white transition-colors"
          aria-label={t("heroScroll")}
        >
          <span className="text-[10px] uppercase font-bold tracking-widest">
            {t("heroScroll")}
          </span>
          <ChevronDown className="w-4 h-4 text-electric animate-bounce" />
        </a>
      </div>
    </section>
  );
}
