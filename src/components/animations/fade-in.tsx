"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { fadeInVariants, transitions } from "@/lib/animations";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export function FadeIn({
  children,
  delay = 0,
  duration,
  className,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        ...transitions.smooth,
        ...(duration ? { duration } : {}),
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
