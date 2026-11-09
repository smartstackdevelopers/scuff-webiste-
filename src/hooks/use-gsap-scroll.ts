"use client";

import * as React from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ScrollFadeOptions {
  y?: number;
  duration?: number;
  start?: string;
  stagger?: number;
}

export function useGsapScrollFade<T extends HTMLElement>(
  options: ScrollFadeOptions = {}
) {
  const ref = React.useRef<T | null>(null);
  const reduced = useReducedMotion();
  const {
    y = 40,
    duration = 0.8,
    start = "top 85%",
    stagger = 0.1,
  } = options;

  React.useEffect(() => {
    const el = ref.current;
    if (reduced || !el) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll("[data-gsap-item]");
      if (targets.length > 0) {
        gsap.fromTo(
          targets,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [reduced, y, duration, start, stagger]);

  return ref;
}
