"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverGlow?: boolean;
  glowColor?: "purple" | "orange" | "pink" | "none";
}

export function GlassCard({
  children,
  className,
  hoverGlow = true,
  glowColor = "purple",
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowStyles = {
    purple: "rgba(139, 92, 246, 0.15)",
    orange: "rgba(255, 153, 0, 0.15)",
    pink: "rgba(236, 72, 153, 0.15)",
    none: "rgba(255, 255, 255, 0.08)",
  };

  const selectedGlow = glowStyles[glowColor];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "glass-card relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]",
        className
      )}
      {...props}
    >
      {/* Interactive Spotlight Effect */}
      {hoverGlow && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, ${selectedGlow}, transparent 80%)`,
          }}
        />
      )}

      {/* Content wrapper to stay above spotlight */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
