"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { scaleInVariants, transitions } from "@/lib/animations";

interface ScaleInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export function ScaleIn({
  children,
  delay = 0,
  duration,
  className,
  ...props
}: ScaleInProps) {
  return (
    <motion.div
      variants={scaleInVariants}
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
