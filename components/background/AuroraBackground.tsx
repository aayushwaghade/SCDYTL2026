"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion();

  // Animate values for moving glowing mesh blobs
  const animationProps = (delay: number, duration: number, x: number[], y: number[]) => {
    if (shouldReduceMotion) {
      return {};
    }
    return {
      animate: {
        x,
        y,
        scale: [1, 1.12, 0.95, 1],
      },
      transition: {
        duration,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut" as const,
        delay,
      },
    };
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none opacity-45">
      {/* Orb 1: Purple Glow */}
      <motion.div
        {...animationProps(0, 30, [0, 60, -40, 0], [0, -50, 30, 0])}
        className="absolute top-[10%] left-[10%] w-[32rem] h-[32rem] rounded-full bg-purple-primary/15 blur-[120px]"
      />

      {/* Orb 2: Pink Glow */}
      <motion.div
        {...animationProps(3, 35, [0, -80, 40, 0], [0, 60, -40, 0])}
        className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] rounded-full bg-pink-primary/10 blur-[130px]"
      />

      {/* Orb 3: AWS Orange Blend */}
      <motion.div
        {...animationProps(6, 40, [0, 40, -50, 0], [0, 70, -60, 0])}
        className="absolute top-[40%] right-[20%] w-[28rem] h-[28rem] rounded-full bg-aws-orange/5 blur-[110px]"
      />

      {/* Orb 4: Indigo Glow */}
      <motion.div
        {...animationProps(1.5, 38, [0, -40, 30, 0], [0, -60, 50, 0])}
        className="absolute bottom-[10%] left-[20%] w-[30rem] h-[30rem] rounded-full bg-indigo-primary/12 blur-[115px]"
      />
    </div>
  );
}
