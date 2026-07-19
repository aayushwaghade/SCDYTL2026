"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface OrbitNodeProps {
  name: string;
  icon: LucideIcon;
  angle: number;        // current rotation angle in degrees
  radius: number;       // distance from center in px
  index: number;
  isActive: boolean;
  isDimmed: boolean;
  containerSize: number; // total container width/height
  onActivate: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export function OrbitNode({
  name,
  icon: Icon,
  angle,
  radius,
  index,
  isActive,
  isDimmed,
  containerSize,
  onActivate,
  onHoverStart,
  onHoverEnd,
}: OrbitNodeProps) {
  const center = containerSize / 2;
  const rad = (angle * Math.PI) / 180;
  const x = center + radius * Math.cos(rad);
  const y = center + radius * Math.sin(rad);

  // Responsive node sizing based on container
  const isTiny = containerSize < 340;
  const isCompact = containerSize < 420;
  const nodeSize = isActive
    ? (isTiny ? 34 : isCompact ? 38 : 56)
    : (isTiny ? 28 : isCompact ? 32 : 46);
  const iconSize = isActive
    ? (isTiny ? 16 : isCompact ? 17 : 24)
    : (isTiny ? 13 : isCompact ? 14 : 20);

  return (
    <motion.button
      className="absolute flex flex-col items-center gap-0.5 sm:gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-aws-orange/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        zIndex: isActive ? 30 : 10,
      }}
      animate={{
        scale: isActive ? 1.15 : isDimmed ? 0.88 : 1,
        opacity: isDimmed ? 0.35 : 1,
        filter: isActive
          ? "drop-shadow(0 0 18px rgba(168,85,247,0.6)) drop-shadow(0 0 8px rgba(255,153,0,0.5))"
          : isDimmed
          ? "none"
          : "drop-shadow(0 0 6px rgba(168,85,247,0.2))",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={(e) => {
        e.stopPropagation();
        onActivate();
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      tabIndex={0}
      role="button"
      aria-label={`Learn about ${name}`}
      data-node-index={index}
    >
      {/* Node circle */}
      <div
        className="relative flex items-center justify-center rounded-full transition-colors duration-300"
        style={{
          width: nodeSize,
          height: nodeSize,
          background: isActive
            ? "linear-gradient(135deg, rgba(168,85,247,0.35), rgba(255,153,0,0.3))"
            : "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(255,153,0,0.06))",
          border: isActive
            ? "2px solid rgba(168,85,247,0.65)"
            : "1.5px solid rgba(255,255,255,0.12)",
          boxShadow: isActive
            ? "0 0 24px rgba(168,85,247,0.4), inset 0 0 12px rgba(255,153,0,0.15)"
            : "0 0 8px rgba(168,85,247,0.08)",
        }}
      >
        <Icon
          className="transition-colors duration-200"
          style={{
            width: iconSize,
            height: iconSize,
            color: isActive ? "#ff9900" : "rgba(255,255,255,0.7)",
          }}
        />
      </div>

      {/* Label — responsive text size */}
      <span
        className="font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-200 select-none"
        style={{
          fontSize: isTiny ? "7px" : isCompact ? "8px" : undefined,
          color: isActive ? "#ffffff" : isDimmed ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.6)",
          textShadow: isActive ? "0 0 8px rgba(168,85,247,0.5)" : "none",
        }}
      >
        <span className={isCompact ? "" : "text-[10px] sm:text-[11px]"}>
          {name}
        </span>
      </span>
    </motion.button>
  );
}
