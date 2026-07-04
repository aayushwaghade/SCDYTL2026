"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Custom premium easing curve (easeOutExpo)
export const EASE_CUSTOM = [0.16, 1, 0.3, 1] as const;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? 0.6,
      delay: custom.delay ?? 0,
      ease: EASE_CUSTOM,
    },
  }),
};

export const fadeLeftVariants = {
  hidden: { opacity: 0, x: 25 },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration ?? 0.6,
      delay: custom.delay ?? 0,
      ease: EASE_CUSTOM,
    },
  }),
};

export const fadeRightVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration ?? 0.6,
      delay: custom.delay ?? 0,
      ease: EASE_CUSTOM,
    },
  }),
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration ?? 0.6,
      delay: custom.delay ?? 0,
      ease: EASE_CUSTOM,
    },
  }),
};

export const blurRevealVariants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 15 },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: custom.duration ?? 0.7,
      delay: custom.delay ?? 0,
      ease: EASE_CUSTOM,
    },
  }),
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeUp({ children, delay = 0, duration = 0.6, ...props }: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={{ delay, duration }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeLeft({ children, delay = 0, duration = 0.6, ...props }: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;

  return (
    <motion.div
      variants={fadeLeftVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={{ delay, duration }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeRight({ children, delay = 0, duration = 0.6, ...props }: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;

  return (
    <motion.div
      variants={fadeRightVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={{ delay, duration }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, duration = 0.6, ...props }: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;

  return (
    <motion.div
      variants={scaleInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={{ delay, duration }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function BlurReveal({ children, delay = 0, duration = 0.7, ...props }: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;

  return (
    <motion.div
      variants={blurRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={{ delay, duration }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerChildrenProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export function StaggerChildren({ children, ...props }: StaggerChildrenProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
