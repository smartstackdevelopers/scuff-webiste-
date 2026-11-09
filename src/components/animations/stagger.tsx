"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { createStaggerContainer, staggerItemVariants } from "@/lib/animations";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  delayChildren?: number;
  children: React.ReactNode;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  delayChildren = 0,
  className,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={createStaggerContainer(staggerDelay, delayChildren)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={staggerItemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
