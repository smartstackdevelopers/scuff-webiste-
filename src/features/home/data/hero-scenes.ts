import type { HeroSceneClip } from "@/features/home/components/cinematic-hero-player";

export const HERO_SCENES: HeroSceneClip[] = [
  {
    id: "wheel-intro",
    src: "/videos/hero/01-wheel-intro.mp4",
    label: "Alloy Introduction",
  },
  {
    id: "wheel-fit",
    src: "/videos/hero/02-wheel-fit.mp4",
    label: "Precision Fitment",
  },
  {
    id: "car-drive",
    src: "/videos/hero/03-car-drive.mp4",
    label: "Departure",
  },
  {
    id: "painting",
    src: "/videos/hero/04-painting.mp4",
    label: "Paint Booth",
  },
  {
    id: "wheel-refurb",
    src: "/videos/hero/05-wheel-refurb.mp4",
    label: "Alloy Refurbishment",
  },
  {
    id: "final-reveal",
    src: "/videos/hero/06-final-reveal.mp4",
    label: "Restored Reveal",
  },
];

/** Single continuous commercial fallback if multi-scene fails */
export const HERO_MASTER_VIDEO = "/videos/hero/master.mp4";
