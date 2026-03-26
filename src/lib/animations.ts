import type { Variants, Transition } from "motion/react";

export const transitions = {
  fast: { duration: 0.15, ease: "easeOut" } satisfies Transition,
  normal: { duration: 0.25, ease: "easeOut" } satisfies Transition,
  slow: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } satisfies Transition,
  spring: { type: "spring", stiffness: 300, damping: 25 } satisfies Transition,
  gentleSpring: {
    type: "spring",
    stiffness: 200,
    damping: 22,
  } satisfies Transition,
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: transitions.normal,
};

export const fadeSlideUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: transitions.slow,
};

export const slideUp = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
  transition: transitions.gentleSpring,
};

export const slideUpMini = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
  transition: { ...transitions.spring, stiffness: 350 },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

export const tapScale = {
  whileTap: { scale: 0.97 },
  transition: transitions.fast,
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.92 },
  transition: transitions.slow,
};
