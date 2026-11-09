import { type Transition, type Variants } from "framer-motion";

/**
 * Premium Luxury Automotive Easings & Transitions
 * Subtle, confident, and refined — avoiding jarring or bouncy movements.
 */
export const transitions = {
  smooth: {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1], // Custom cubic bezier
  } as Transition,
  slow: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  } as Transition,
  micro: {
    duration: 0.2,
    ease: "easeOut",
  } as Transition,
  spring: {
    type: "spring",
    damping: 30,
    stiffness: 400,
  } as Transition,
  springSubtle: {
    type: "spring",
    damping: 35,
    stiffness: 300,
  } as Transition,
};

/**
 * Reusable Framer Motion Variants
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    transition: transitions.micro,
  },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: transitions.micro,
  },
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: transitions.micro,
  },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: transitions.micro,
  },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 28,
      stiffness: 350,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export const createStaggerContainer = (
  staggerDelay = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

/**
 * Micro-interactions for interactive buttons and cards
 */
export const interactiveHover = {
  tap: { scale: 0.98 },
  hoverCard: {
    y: -4,
    transition: transitions.micro,
  },
};
