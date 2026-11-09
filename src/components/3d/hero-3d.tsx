"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { BRAND_ASSETS } from "@/constants/theme";
import {
  useReducedMotion,
  useWebGLSupport,
} from "@/hooks/use-reduced-motion";
import type { WheelSceneState } from "@/components/3d/hero-wheel-scene";

const HeroWheelCanvas = dynamic(
  () =>
    import("@/components/3d/hero-wheel-scene").then((m) => m.HeroWheelCanvas),
  {
    ssr: false,
    loading: () => <HeroFallback />,
  }
);

function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={BRAND_ASSETS.wheels}
        alt="Diamond-cut alloy wheels ready for refurbishment"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="absolute inset-0 workshop-mesh opacity-80" />
    </div>
  );
}

interface Hero3DProps {
  progress: number;
  className?: string;
}

export function Hero3D({ progress, className }: Hero3DProps) {
  const reduced = useReducedMotion();
  const webgl = useWebGLSupport();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const state = React.useMemo<WheelSceneState>(() => {
    const p = Math.max(0, Math.min(1, progress));
    // Scratch peaks mid-journey then clears (restoration narrative)
    const scratched =
      p < 0.35 ? p / 0.35 : p < 0.55 ? 1 : Math.max(0, 1 - (p - 0.55) / 0.25);
    const particles = p > 0.28 && p < 0.62 ? Math.sin(((p - 0.28) / 0.34) * Math.PI) : 0;
    const spinSpeed = 0.6 + (1 - Math.abs(p - 0.5) * 2) * 1.4;

    return {
      progress: p,
      scratched,
      particles,
      spinSpeed,
    };
  }, [progress]);

  if (!mounted || reduced || !webgl) {
    return (
      <div className={className}>
        <HeroFallback />
      </div>
    );
  }

  return (
    <div className={className}>
      <HeroWheelCanvas state={state} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-background/40" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background/80 via-transparent to-background/50" />
    </div>
  );
}
