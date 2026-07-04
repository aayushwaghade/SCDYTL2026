import React from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  type?: "grid" | "dot";
  className?: string;
}

export function GridBackground({ type = "grid", className }: GridBackgroundProps) {
  const bgStyle =
    type === "grid"
      ? `linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
         linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`
      : `radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)`;

  const bgSize = type === "grid" ? "50px 50px" : "24px 24px";

  return (
    <div
      className={cn("absolute inset-0 w-full h-full pointer-events-none z-0 select-none", className)}
      style={{
        backgroundImage: bgStyle,
        backgroundSize: bgSize,
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
      }}
    />
  );
}
