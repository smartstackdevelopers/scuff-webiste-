"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND_ASSETS } from "@/constants/theme";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface HeroSceneClip {
  id: string;
  src: string;
  label: string;
  durationHint?: number;
}

interface CinematicHeroPlayerProps {
  scenes: HeroSceneClip[];
  className?: string;
  onSceneChange?: (index: number, scene: HeroSceneClip) => void;
  onCycleComplete?: () => void;
}

export function CinematicHeroPlayer({
  scenes,
  className,
  onSceneChange,
  onCycleComplete,
}: CinematicHeroPlayerProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const fadeRef = React.useRef<HTMLVideoElement>(null);
  const activeRef = React.useRef(0);
  const transitioning = React.useRef(false);

  const hasScenes = scenes.length > 0;
  const singleLoop = scenes.length === 1;

  React.useEffect(() => {
    activeRef.current = active;
    const scene = scenes[active];
    if (scene) onSceneChange?.(active, scene);
  }, [active, onSceneChange, scenes]);

  const goTo = React.useCallback(
    async (nextIndex: number) => {
      const main = videoRef.current;
      const fade = fadeRef.current;
      const next = scenes[nextIndex];
      if (!main || !fade || !next || transitioning.current) return;

      if (singleLoop) {
        main.currentTime = 0;
        await main.play().catch(() => undefined);
        setActive(0);
        return;
      }

      transitioning.current = true;
      try {
        fade.src = next.src;
        fade.load();
        await new Promise<void>((resolve, reject) => {
          const ok = () => {
            cleanup();
            resolve();
          };
          const bad = () => {
            cleanup();
            reject(new Error("load"));
          };
          const cleanup = () => {
            fade.removeEventListener("canplay", ok);
            fade.removeEventListener("error", bad);
          };
          if (fade.readyState >= 3) {
            resolve();
            return;
          }
          fade.addEventListener("canplay", ok);
          fade.addEventListener("error", bad);
        });

        fade.style.opacity = "1";
        main.style.opacity = "0";
        await fade.play().catch(() => undefined);

        window.setTimeout(() => {
          main.src = next.src;
          main.currentTime = fade.currentTime || 0;
          main.load();
          main.play().catch(() => undefined).finally(() => {
            main.style.opacity = "1";
            fade.style.opacity = "0";
            fade.pause();
            transitioning.current = false;
          });
        }, 650);

        setActive(nextIndex);
        setReady(true);
      } catch {
        transitioning.current = false;
        setFailed(true);
      }
    },
    [scenes, singleLoop]
  );

  React.useEffect(() => {
    if (reduced || !hasScenes) return;
    const main = videoRef.current;
    if (!main) return;

    let cancelled = false;
    main.src = scenes[0].src;
    main.loop = singleLoop;
    main.load();

    const start = async () => {
      try {
        await main.play();
        if (!cancelled) {
          main.style.opacity = "1";
          setReady(true);
          setActive(0);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    start();
    return () => {
      cancelled = true;
    };
  }, [hasScenes, reduced, scenes, singleLoop]);

  React.useEffect(() => {
    if (reduced || !hasScenes || singleLoop) return;
    const main = videoRef.current;
    if (!main) return;

    const onEnded = () => {
      const next = (activeRef.current + 1) % scenes.length;
      if (next === 0) onCycleComplete?.();
      goTo(next);
    };

    main.addEventListener("ended", onEnded);
    return () => main.removeEventListener("ended", onEnded);
  }, [goTo, hasScenes, onCycleComplete, reduced, scenes.length, singleLoop]);

  if (reduced || failed || !hasScenes) {
    return (
      <div className={cn("absolute inset-0", className)}>
        <Image
          src={BRAND_ASSETS.wheels}
          alt="Diamond-cut alloy wheels refurbished by You Scuff We Buff"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/40" />
        <div className="absolute inset-0 workshop-mesh opacity-70" />
      </div>
    );
  }

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden bg-[#050505]", className)}
      aria-hidden
    >
      {!ready && (
        <div className="absolute inset-0 z-10">
          <Image
            src={BRAND_ASSETS.wheels}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-[#050505]/55" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-electric/30 border-t-electric animate-spin" />
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
        style={{ opacity: 0 }}
        muted
        playsInline
        autoPlay
        preload="auto"
      />
      <video
        ref={fadeRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out pointer-events-none"
        style={{ opacity: 0 }}
        muted
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050505]/85 via-transparent to-[#050505]/40" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.6)_100%)]" />
      <div className="absolute -left-8 top-1/3 w-72 h-72 bg-electric/15 blur-[110px] pointer-events-none" />
      <div className="absolute right-0 bottom-10 w-80 h-80 bg-electric/10 blur-[120px] pointer-events-none" />
    </div>
  );
}
