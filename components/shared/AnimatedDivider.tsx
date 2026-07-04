"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface AnimatedDividerProps {
  className?: string;
  glowColor?: "purple" | "orange" | "pink";
}

export function AnimatedDivider({ className, glowColor = "purple" }: AnimatedDividerProps) {
  const shouldReduceMotion = useReducedMotion();

  const glowColors = {
    purple: "from-transparent via-purple-500 to-transparent",
    orange: "from-transparent via-aws-orange to-transparent",
    pink: "from-transparent via-pink-500 to-transparent",
  }[glowColor];

  return (
    <div className={cn("relative w-full h-[1px] bg-white/10 select-none overflow-hidden", className)}>
      {!shouldReduceMotion && (
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className={cn("absolute inset-y-0 w-1/3 bg-gradient-to-r", glowColors)}
        />
      )}
    </div>
  );
}
