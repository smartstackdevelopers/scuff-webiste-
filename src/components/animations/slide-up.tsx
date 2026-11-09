"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { slideUpVariants, transitions } from "@/lib/animations";

interface SlideUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  distance?: number;
  children: React.ReactNode;
}

export function SlideUp({
  children,
  delay = 0,
  duration,
  distance = 16,
  className,
  ...props
}: SlideUpProps) {
  const customVariants = {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: distance / 2 },
  };

  return (
    <motion.div
      variants={distance === 16 ? slideUpVariants : customVariants}
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
